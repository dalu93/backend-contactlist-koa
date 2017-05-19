import { expect } from '../common/chai'
import generate from '../data/generate'
import { resetDb } from '../data/cleaner'
import userService from '../../src/services/user-service'
import * as errors from '../../src/common/errors'

describe('userService', () => {

  beforeEach(resetDb)

  it('should create a new user', async () => {
    const login = generate.login()
    const user = await userService.register(login)

    expect(user.id).to.be.a('number')
    expect(user.email).to.equal(login.email)
  })

  it('should not allow creating duplicate user', async () => {
    const login = generate.login()

    // Create first one
    await userService.register(login)

    // Create conflict
    expect(userService.register(login)).to.be.rejectedWith(errors.ConflictError)
  })
})
