import compose from 'koa-compose'
import log from '../common/logger'
import middleware from '../middleware'
import schema from '../validation/schema'
import contactService from '../services/contact-service'

export default {
  create: compose([
      middleware.auth.isLogged,
      middleware.validation.validateBody(schema.contacts.create),
      ctx => {
        log.info('Creating a new contact')
        contactService.createContact(ctx.request.validatedBody, ctx.request.user)
        ctx.status = 201
      },
    ]),
}
