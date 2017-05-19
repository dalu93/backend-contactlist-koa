import compose from 'koa-compose'
import log from '../common/logger'
import crypto from '../utils/crypto'
import firebaseService from '../services/firebase-service'
import middleware from '../middleware'
import * as admin from 'firebase-admin'
import errors from '../common/errors'

export default {
  getAccessToken: compose([
      middleware.auth.isLogged,
      async ctx => {
          log.info('Creating a Firebase access token.')

          const token = firebaseService.getAccessToken(ctx.request.user)
          return { token }
        },
    ]),
}
