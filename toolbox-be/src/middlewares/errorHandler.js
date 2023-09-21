import joi from 'joi'
import HttpException from '../errors/http.js'

const errorHandler = (err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.sendError(err.details[0].message, 400)
  }

  if (err instanceof HttpException) {
    return res.sendError(err.error, err.statusCode)
  }

  res.sendError({ message: 'Internal server error' })
}

export default errorHandler
