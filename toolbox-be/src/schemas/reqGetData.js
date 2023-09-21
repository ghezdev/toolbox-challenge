import Joi from 'joi'

export const queryParam = Joi.object({
  fileName: Joi.string().pattern(/\.csv$/)
}).unknown(true)
