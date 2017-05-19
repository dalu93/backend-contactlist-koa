import compose from 'koa-compose'
import log from '../common/logger'
import middleware from '../middleware'
import schema from '../validation/schema'
import crypto from '../utils/crypto'
import userService from '../services/user-service'

export default {

  /**
   * Creates a new user account based on sent credentials.
   * @param {Object} ctx Koa context
   * @returns {Function} Koa middleware
   */
  register: compose([
    middleware.validation.validateBody(schema.users.register),
    async ctx => {
      const body = ctx.request.validatedBody
      log.info({ email: body.email }, 'Registering a new user account.')

      // Create user record
      const profile = await userService.register(body)
      generateAuthResponse(ctx, profile)
    },
  ]),

  login: compose([
    middleware.validation.validateBody(schema.users.login),
    async ctx => {
      // Retrieving user
      const validatedUser = await userService.validateUser(ctx.request.validatedBody)
      generateAuthResponse(ctx, validatedUser)
    }
  ]),
}

function generateAuthResponse(ctx, profile) {
  const token = crypto.generateAccessToken(profile.id)
  ctx.status = 201
  ctx.body = {
    accessToken: token,
    profile,
  }
}
