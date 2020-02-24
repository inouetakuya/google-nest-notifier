import { EventEmitter } from 'events'
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import notificationController from '~/lib/notificationController'

const mockedStatus = { volume: { muted: false } }
const mockedNotify = jest.fn().mockResolvedValue(mockedStatus)

// https://jestjs.io/docs/ja/es6-class-mocks
jest.mock('~/lib/GoogleHomeClient', () => {
  return jest.fn().mockImplementation(() => {
    return { notify: mockedNotify }
  })
})

describe('notificationController', () => {
  describe('create', () => {
    let request: MockRequest<Request>
    const response: MockResponse<Response> = httpMocks.createResponse({
      eventEmitter: EventEmitter
    })
    const next = jest.fn()
    const dummyIpAddress = '192.168.3.1'

    describe('when all required params is set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            ipAddress: dummyIpAddress,
            text: 'Hello world'
          }
        })
      })

      test('returns response successfully', done => {
        response.on('end', () => {
          expect(response.statusCode).toBe(201)
          expect(response._getJSONData().status).toEqual(mockedStatus)
          expect(next).not.toHaveBeenCalled()
          done()
        })

        notificationController.create(request, response, next)
      })
    })

    describe('when ipAddress is not set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            text: 'Hello world'
          }
        })
      })

      test('calls next() with Error', () => {
        response.on('end', done => {
          expect(next).toHaveBeenCalledWith(new Error('ipAddress is required'))
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
            ipAddress: dummyIpAddress
          }
        })
      })

      test('calls next() with Error', () => {
        response.on('end', done => {
          expect(next).toHaveBeenCalledWith(new Error('text is required'))
          done()
        })

        notificationController.create(request, response, next)
      })
    })
  })
})
