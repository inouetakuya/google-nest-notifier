import { EventEmitter } from 'events'
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import { badData } from '@hapi/boom'
import notificationController from '~/lib/notificationController'

const mockedStatus = { volume: { muted: false } }
const mockedNotify = jest.fn().mockResolvedValue(mockedStatus)

jest.mock('~/lib/multicastDnsService', () => {
  return {
    getMulticastDnsDataByDeviceName: jest
      .fn()
      .mockResolvedValue({ ipAddress: '192.168.3.1' }),
  }
})

// https://jestjs.io/docs/ja/es6-class-mocks
jest.mock('~/lib/GoogleNestClient', () => {
  return jest.fn().mockImplementation(() => {
    return { notify: mockedNotify }
  })
})

describe('notificationController', () => {
  describe('create', () => {
    let request: MockRequest<Request>
    const response: MockResponse<Response> = httpMocks.createResponse({
      eventEmitter: EventEmitter,
    })
    const next = jest.fn()

    describe('when all required params is set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            deviceName: 'rachael',
            text: 'Hello world',
          },
        })
      })

      test('returns response successfully', (done) => {
        response.on('end', () => {
          expect(response.statusCode).toBe(201)
          expect(response._getJSONData().status).toEqual(mockedStatus)
          expect(next).not.toHaveBeenCalled()
          done()
        })

        notificationController.create(request, response, next)
      })
    })

    describe('when deviceName is not set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            text: 'Hello world',
          },
        })
      })

      test('calls next() with Error', () => {
        response.on('end', (done) => {
          expect(next).toHaveBeenCalledWith(badData('deviceName is required'))
          done()
        })

        notificationController.create(request, response, next)
      })
    })

    describe('when text is not set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            deviceName: 'rachael',
          },
        })
      })

      test('calls next() with Error', () => {
        response.on('end', (done) => {
          expect(next).toHaveBeenCalledWith(badData('text is required'))
          done()
        })

        notificationController.create(request, response, next)
      })
    })
  })
})
