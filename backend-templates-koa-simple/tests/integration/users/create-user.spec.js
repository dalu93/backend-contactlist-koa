import _ from 'lodash'
import request from 'supertest-koa-agent'
import { expect } from '../../common/chai'
import { resetDb } from '../../data/cleaner'
import generate from '../../data/generate'
import app from '../../../src/app'

describe('users', () => {

  beforeEach(() => resetDb())

  it('should create a new user', async () => {
    const user = generate.user()
    const res = await request(app)
      .post('/users')
      .send(user)
      .expect(201)

    expect(res.body).to.have.keys(['accessToken', 'profile'])
    expect(res.body.profile).to.include.keys(['id', 'email', 'firstName', 'lastName'])
  })

  it('should return 400 when user record is not valid', () => {
    const user = _.omit(generate.user(), 'password')
    return request(app)
      .post('/users')
      .send(user)
      .expect(400)
  })

})
