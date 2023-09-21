import { expect } from 'chai'
import { afterEach, before, describe, it } from 'mocha'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import filesService from '../src/services/files.js'
import HttpException from '../src/errors/http.js'

const urlFiles = 'https://echo-serv.tbxnet.com/v1/secret/files'
const urlFile = new RegExp(`${'https://echo-serv.tbxnet.com/v1/secret/file'}/*`)

describe('files service', () => {
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  describe('getFiles', () => {
    it('should get formatted files', async () => {
      const mockResFiles = {
        files: ['test2.csv']
      }
      const mockResFile =
        'file,text,number,hex\ntest2.csv,NGLlRnvUgnjikcmZNZsxTBf,5936461511,ead4a9a6afe26ddf564b893e2fdddd9a'
      const responseExpected = [
        {
          file: 'test2.csv',
          lines: [
            {
              text: 'NGLlRnvUgnjikcmZNZsxTBf',
              number: 5936461511,
              hex: 'ead4a9a6afe26ddf564b893e2fdddd9a'
            }
          ]
        }
      ]

      mockAxios.onGet(urlFiles).reply(200, mockResFiles)
      mockAxios.onGet(urlFile).reply(200, mockResFile)

      const result = await filesService.getFiles()

      expect(result).to.deep.equal(responseExpected)
    })

    it('should handle error in external calls', async () => {
      const mockResFiles = {
        code: 'BASE-401',
        message: 'API KEY is required',
        details: 'API KEY is required',
        status: 401
      }
      mockAxios.onGet(urlFiles).reply(401, mockResFiles)

      try {
        await filesService.getFiles()
      } catch (error) {
        expect(error).to.instanceOf(HttpException)
        expect(error.error).to.deep.equal(mockResFiles)
        expect(error.message).to.equal(mockResFiles.message)
        expect(error.statusCode).to.equal(mockResFiles.status)
      }
    })
  })

  describe('getAvailableFiles', () => {
    it('should get files available', async () => {
      const mockResFiles = {
        files: ['test1.csv', 'test2.csv']
      }

      mockAxios.onGet(urlFiles).reply(200, mockResFiles)

      const result = await filesService.getAvailableFiles()

      expect(result).to.deep.equal(['test1.csv', 'test2.csv'])
    })

    it('should handle error in external calls', async () => {
      const mockResFiles = {
        code: 'BASE-401',
        message: 'API KEY is required',
        details: 'API KEY is required',
        status: 401
      }
      mockAxios.onGet(urlFiles).reply(401, mockResFiles)

      try {
        await filesService.getAvailableFiles()
      } catch (error) {
        expect(error).to.instanceOf(HttpException)
        expect(error.error).to.deep.equal(mockResFiles)
        expect(error.message).to.equal(mockResFiles.message)
        expect(error.statusCode).to.equal(mockResFiles.status)
      }
    })
  })
})
