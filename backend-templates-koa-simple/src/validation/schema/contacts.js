import joi from 'joi'

export const create = joi.object().keys({
  email: joi.string().email().required(),
  firstName: joi.string().min(3).max(32),
  lastName: joi.string().min(3).max(32),
})
