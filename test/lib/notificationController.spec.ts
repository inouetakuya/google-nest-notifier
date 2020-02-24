import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import notificationController from '~/lib/notificationController'

describe('notificationController', () => {
  describe('create', () => {
    let request: MockRequest<Request>
    const response: MockResponse<Response> = httpMocks.createResponse()

    describe('when text is set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          params: {
            text: 'Hello world'
          }
        })

        notificationController.create(request, response)
      })

      test('returns response successfully', () => {
        expect(response.statusCode).toBe(201)
        expect(response._getJSONData()).toEqual({ text: 'Hello world' })
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

      test('throws Error', () => {
        expect(() => {
          notificationController.create(request, response)
        }).toThrowError('text is required')
      })
    })
  })
})
