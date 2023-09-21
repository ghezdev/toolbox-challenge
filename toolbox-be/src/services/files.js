import axios from 'axios'
import HttpException from '../errors/http.js'
import { hasDataFiles, prettierTableFiles } from '../utils/formatters.js'

const BASE_URL = 'https://echo-serv.tbxnet.com/v1'

const getFiles = async fileName => {
  try {
    const {
      data: { files }
    } = await axios.get(`${BASE_URL}/secret/files`, {
      headers: {
        authorization: process.env.API_KEY
      }
    })

    const promisesFile = files.map(file =>
      axios.get(`${BASE_URL}/secret/file/${file}`, {
        headers: {
          authorization: process.env.API_KEY
        }
      })
    )

    // Promise.allSettled para filtrar por archivos que sí funcionan
    const filesDownloaded = (await Promise.allSettled(promisesFile))
      .filter(response => response.status === 'fulfilled')
      .map(response => response.value.data)

    // Obtener archivos sin importar que haya alguno que no funcione
    // const filesDownloaded = (await Promise.all(promisesFile)).map(data => data)

    const tableFilesFiltered = filesDownloaded.filter(hasDataFiles)

    const filesFormatted = tableFilesFiltered.map(prettierTableFiles)

    if (fileName) {
      const fileFound = filesFormatted.filter(({ file }) => file === fileName)

      return fileFound
    }

    return filesFormatted
  } catch (error) {
    throw new HttpException({
      error: error.response.data,
      statusCode: error.response.data.status,
      message: error.response.data.message
    })
  }
}

const getAvailableFiles = async fileName => {
  try {
    const {
      data: { files: availableFiles }
    } = await axios.get(`${BASE_URL}/secret/files`, {
      headers: {
        authorization: process.env.API_KEY
      }
    })

    return availableFiles
  } catch (error) {
    throw new HttpException({
      error: error.response.data,
      statusCode: error.response.data.status,
      message: error.response.data.message
    })
  }
}

export default { getFiles, getAvailableFiles }
