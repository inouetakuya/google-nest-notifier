import request from 'supertest'
import { app } from '../../src/app'

const mockedStatus = { volume: { muted: false } }
const mockedNotify = jest.fn().mockResolvedValue(mockedStatus)
const mockedGetIpAddress = jest.fn().mockResolvedValue('192.168.3.1')

jest.mock('../../../../packages/google-nest-notifier/src', () => {
  return {
    GoogleNestNotifier: jest.fn().mockImplementation(() => {
      return { notify: mockedNotify, getIpAddress: mockedGetIpAddress }
    }),
  }
})

describe('app', () => {
  describe('POST /notifications', () => {
    describe('when all required params are set', () => {
      it('returns response successfully', async () => {
        const response = await request(app)
          .post('/notifications')
          .set('Accept', 'application/json')
          .send({
            deviceName: 'Rachael',
            text: 'Hello',
            language: 'ja',
          })
          .expect('Content-Type', /json/)

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({ status: mockedStatus })
      })
    })
  })
})
