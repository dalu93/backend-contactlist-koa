import firebaseService from './firebase-service'
import log from '../common/logger'

export default {

  createContact(contact, user) {
        log.info('creating contact with user')
      const path = `${user.id}/contacts/`
      firebaseService.saveValue(contact, path)
    },
}
