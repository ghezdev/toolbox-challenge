import { Router } from 'express'
import validation from '../middlewares/validations.js'
import filesController from '../controllers/files.js'
import { queryParam } from '../schemas/reqGetData.js'

const { validationSchema } = validation
const router = Router()

router.get('/data', validationSchema(queryParam), filesController.getData)
router.get('/list', filesController.getList)

export default router
