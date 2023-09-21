import filesService from '../services/files.js'

const getData = async (req, res) => {
  const { fileName } = req.query

  const response = await filesService.getFiles(fileName)

  res.sendSuccess(response, 200)
}

const getList = async (req, res) => {
  const response = await filesService.getAvailableFiles()

  res.sendSuccess(response, 200)
}

export default {
  getData,
  getList
}
