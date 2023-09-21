class HttpException extends Error {
  constructor ({ error, message, statusCode = 500 }) {
    super(message)
    this.error = error
    this.name = 'HttpException'
    this.statusCode = statusCode
  }
}

export default HttpException
