import joi from 'joi'

export const create = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().min(5).required(),
})
