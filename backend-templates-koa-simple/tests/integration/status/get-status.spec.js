import request from 'supertest-koa-agent'
import app from '../../../src/app'
import { expect } from '../../common/chai'

describe('status', () => {
  it('should return version of the app', async () => {
    const res = await request(app)
      .get('/')
      .expect(200)

    expect(res.body).to.have.keys(['start', 'version'])
  })
})
