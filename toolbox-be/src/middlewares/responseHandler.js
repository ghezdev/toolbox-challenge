const responseHandler = (req, res, next) => {
  res.sendSuccess = (data, statusCode) => {
    const response = {
      data,
      error: {}
    }
    res.status(statusCode).json(response)
  }

  res.sendError = (error, statusCode = 500) => {
    const response = {
      data: {},
      error
    }
    res.status(statusCode).json(response)
  }

  next()
}

export default responseHandler
