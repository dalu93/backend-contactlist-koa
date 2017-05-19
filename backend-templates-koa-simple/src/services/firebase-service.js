import * as admin from 'firebase-admin'
import log from '../common/logger'

export default {

  getAccessToken(user) {
    return admin.auth().createCustomToken(user.id)
  },

  saveValue(value, path) {
    log.info('sending to firebase')
    admin.database().ref(path).push(value)
  },
}
