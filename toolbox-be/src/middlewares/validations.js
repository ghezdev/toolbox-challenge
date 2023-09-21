export const validationSchema = schema => (req, res, next) => {
  const { error } = schema.validate(req.query)

  if (error) {
    res.sendError({ message: error.details[0].message }, 400)
  } else {
    next()
  }
}

export default { validationSchema }
