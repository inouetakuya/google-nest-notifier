import { EventEmitter } from 'events'
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import notificationController from '~/lib/notificationController'

describe('notificationController', () => {
  describe('create', () => {
    let request: MockRequest<Request>
    const response: MockResponse<Response> = httpMocks.createResponse({
      eventEmitter: EventEmitter
    })
    const next = jest.fn()

    describe('when text is set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          params: {
            text: 'Hello world'
          }
        })
      })

      test('returns response successfully', done => {
        response.on('end', () => {
          expect(response.statusCode).toBe(201)
          expect(response._getJSONData()).toEqual({ text: 'Hello world' })
          expect(next).not.toHaveBeenCalled()
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
          params: {}
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
