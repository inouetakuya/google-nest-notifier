import { EventEmitter } from 'events'
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import { notificationsController } from '../../src/controllers/notificationsController'

const mockedStatus = { volume: { muted: false } }
const mockedNotify = jest.fn().mockResolvedValue(mockedStatus)

jest.mock('../../../../packages/google-nest-notifier/src', () => {
  return {
    GoogleNestNotifier: jest.fn().mockImplementation(() => {
      return { notify: mockedNotify }
    }),
  }
})

describe('notificationsController', () => {
  describe('create', () => {
    let request: MockRequest<Request>
    const response: MockResponse<Response> = httpMocks.createResponse({
      eventEmitter: EventEmitter,
    })
    const next = jest.fn()

    describe('when all required params are set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            deviceName: 'Rachael',
            text: 'Hello',
            language: 'ja',
          },
        })
      })

      it('returns response successfully', (done) => {
        response.on('end', () => {
          expect(response.statusCode).toBe(201)
          expect(response._getJSONData().status).toEqual(mockedStatus)
          expect(next).not.toHaveBeenCalled()
          done()
        })

        notificationsController.create(request, response, next)
      })
    })

    describe('when neither deviceName or ipAddress is specified', () => {
      it.todo('calls next() with Error')
    })

    describe('when text is not set', () => {
      it.todo('calls next() with Error')
    })
  })
})
