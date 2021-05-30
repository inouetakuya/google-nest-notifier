import request from 'supertest'
import { app } from '../../src/app'

const mockedStatus = { volume: { muted: false } }
const mockedNotify = jest.fn().mockResolvedValue(mockedStatus)
let mockedGetIpAddress = jest.fn().mockResolvedValue('192.168.3.1')

jest.mock('../../../../packages/google-nest-notifier/src', () => {
  return {
    GoogleNestNotifier: jest.fn().mockImplementation(() => {
      return { notify: mockedNotify, getIpAddress: mockedGetIpAddress }
    }),
  }
})

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

  describe('when neither deviceName nor ipAddress is specified', () => {
    it('returns 422 Unprocessable Entity', async () => {
      const requestBody = {
        text: 'Hello',
        language: 'ja',
      }

      const response = await request(app)
        .post('/notifications')
        .set('Accept', 'application/json')
        .send(requestBody)
        .expect('Content-Type', /json/)

      expect(response.statusCode).toBe(422)
      expect(response.body).toEqual({
        error: 'Unprocessable Entity',
        message: 'Either deviceName or ipAddress is required',
        data: {
          requestBody,
        },
      })
    })
  })

  describe('when text is not set', () => {
    it('returns 422 Unprocessable Entity', async () => {
      const requestBody = {
        deviceName: 'Rachael',
        language: 'ja',
      }

      const response = await request(app)
        .post('/notifications')
        .set('Accept', 'application/json')
        .send(requestBody)
        .expect('Content-Type', /json/)

      expect(response.statusCode).toBe(422)
      expect(response.body).toEqual({
        error: 'Unprocessable Entity',
        message: 'Text is required',
        data: {
          requestBody,
        },
      })
    })
  })

  describe('when Google Nest device is not found', () => {
    beforeEach(() => {
      mockedGetIpAddress = jest.fn().mockResolvedValue(undefined)
    })

    it('returns 404 Not Found', async () => {
      const requestBody = {
        deviceName: 'Wrong',
        text: 'Hello',
        language: 'ja',
      }

      const response = await request(app)
        .post('/notifications')
        .set('Accept', 'application/json')
        .send(requestBody)
        .expect('Content-Type', /json/)

      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual({
        error: 'Not Found',
        message: 'Google Nest device is not found',
        data: {
          requestBody,
        },
      })
    })
  })
})
