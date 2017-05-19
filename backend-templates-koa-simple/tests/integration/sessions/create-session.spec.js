import request from 'supertest-koa-agent'
import generate from '../../data/generate'
import app from '../../../src/app'

describe('sessions', () => {
  it('should create a new session', () => {
    const login = generate.login()
    return request(app)
      .post('/sessions')
      .send(login)
      .expect(201)
  })
})
