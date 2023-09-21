import { expect } from 'chai'
import { afterEach, describe, it } from 'mocha'
import sinon from 'sinon'
import filesController from '../src/controllers/files.js'
import filesService from '../src/services/files.js'

describe('files controller', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('getData', () => {
    it('should get the files correctly', async () => {
      const req = {
        query: {
          fileName: 'test2.csv'
        }
      }
      const res = {
        sendSuccess: sinon.stub()
      }
      const responseGetFiles = [
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

      const getFilesStub = sinon.stub().resolves(responseGetFiles)

      sinon.replace(filesService, 'getFiles', getFilesStub)

      await filesController.getData(req, res)

      expect(getFilesStub.calledOnceWithExactly(req.query.fileName))
      expect(res.sendSuccess.calledOnceWithExactly(responseGetFiles, 200))
    })
  })

  describe('getList', () => {
    it('should get the list of available files correctly', async () => {
      const req = {}
      const res = {
        sendSuccess: sinon.stub()
      }

      const responseGetList = { files: ['test1.csv', 'test2.csv'] }
      const getAvailableFilesStub = sinon.stub().resolves(responseGetList)

      sinon.replace(filesService, 'getAvailableFiles', getAvailableFilesStub)

      await filesController.getList(req, res)

      expect(getAvailableFilesStub.callCount).to.be.greaterThanOrEqual(1)
      expect(res.sendSuccess.calledOnceWithExactly(responseGetList, 200))

      sinon.restore()
    })
  })
})
