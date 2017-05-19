import uuid from 'uuid'
import log from '../common/logger'
import config from '../config'
import * as errors from '../common/errors'

export default {

  /**
   * Global error handler which formats thrown errors to client friendly JSON
   * @param {Object} ctx Koa context
   * @param {Function} middleware Reference to the next middleware
   * @returns {void}
   */
  async handleErrors(ctx, middleware) {
    try {
      await middleware()
    } catch (err) {

      // Known error, we threw it
      if (err instanceof errors.ApiError) {
        return void processKnownError(ctx, err)
      }

      // Unknown error
      processUnknownError(ctx, err)
    }
  },
}

function processKnownError(ctx, err) {
  ctx.status = err.status || 500
  ctx.body = {
    type: err.type,
    message: err.message,
  }
}

function processUnknownError(ctx, err) {

  // Generate correlationId so that we can track error
  err.correlationId = uuid.v1()
  log.error(err, 'Unhandled error')

  ctx.status = 500

  // Do not leak info in production environment
  if (config.env === 'production') {
    ctx.body = {
      correlationId: err.correlationId,
      message: 'Unknown error occurred.',
    }
    return
  }

  // Not production environment, include error info
  ctx.body = {
    message: err.message,
    stacktrace: err.stacktrace,
  }
}
