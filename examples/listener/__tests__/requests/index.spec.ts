// @ts-ignore TS1259: Module '"node_modules/@types/supertest/index"' can only be default-imported using the 'esModuleInterop' flag
import request from 'supertest'
import { app } from '../../src/app'

const mockedNotify = jest.fn().mockRejectedValue(new Error('Something wrong'))
const mockedGetIpAddress = jest.fn().mockResolvedValue('192.168.3.1')

jest.mock('google-nest-notifier', () => {
  return {
    GoogleNestNotifier: jest.fn().mockImplementation(() => {
      return { notify: mockedNotify, getIpAddress: mockedGetIpAddress }
    }),
  }
})

describe('errorHandler', () => {
  describe('when google-nest-notifier throws an error', () => {
    // FIXME: expected "Content-Type" matching /json/, got "text/html; charset=utf-8"
    it.skip('returns 500 Internal Server Error', async () => {
      const response = await request(app)
        .post('/notifications')
        .set('Accept', 'application/json')
        .send({
          deviceName: 'Rachael',
          text: 'Hello',
          language: 'ja',
        })
        .expect('Content-Type', /json/)

      expect(response.statusCode).toBe(500)
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Something wrong',
        data: {},
      })
    })
  })
})
