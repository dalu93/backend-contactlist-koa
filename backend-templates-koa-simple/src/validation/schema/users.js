import joi from 'joi'

export const register = joi.object().keys({
  email: joi.string().email().required(),
  firstName: joi.string(),
  lastName: joi.string(),
  password: joi.string().min(5).required(),
})

export const resetPassword = joi.object().keys({
  email: joi.string().email().required(),
})

export const login = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
})
