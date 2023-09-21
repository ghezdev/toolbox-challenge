import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import './config.js'
import filesRoutes from './src/routes/files.js'
import errorHandler from './src/middlewares/errorHandler.js'
import responseHandler from './src/middlewares/responseHandler.js'

const app = express()
const port = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(cors())

app.use(errorHandler)
app.use(responseHandler)

app.use('/files', filesRoutes)

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`)
})
