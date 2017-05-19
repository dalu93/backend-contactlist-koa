import Router from 'koa-router'
import controllers from '../controllers'

const router = new Router()

// User
// - Registration
router.post('/api/users', controllers.user.register)
// - Login
router.post('/api/auth/login', controllers.user.login)
// - Firebase token
router.get('/api/auth/firebase/refresh', controllers.firebase.getAccessToken)

// Contacts
// - Save contact
router.post('/api/contacts', controllers.contact.create)


const routes = router.routes()
export default routes
