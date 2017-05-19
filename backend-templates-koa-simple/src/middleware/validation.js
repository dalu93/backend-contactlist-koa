import joi from 'joi'
import Promise from 'bluebird'
import log from '../common/logger'
import * as errors from '../common/errors'

export default {

  /**
   * Validates request body and fills request
   * @param {Object} schema Joi validation schema used for body validation
   * @returns {void}
   */
  validateBody(schema) {
    return async (ctx, middleware) => {
      log.info({ body: ctx.request.body }, 'Incoming body')

      // Run request validation
      try {
        const result = await Promise.fromCallback(done =>
          joi.validate(ctx.request.body, schema, done))

        ctx.request.validatedBody = result
      } catch (err) {
        log.warn(err, 'Request validation error.')
        throw new errors.ValidationError()
      }

      // Run next middleware
      await middleware()
    }
  },
}
