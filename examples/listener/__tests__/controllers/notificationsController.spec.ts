import { badData } from '@hapi/boom'
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import { EventEmitter } from 'events'
import { Request, Response } from 'express'
import { notificationsController } from '../../src/controllers/notificationsController'

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

      it('returns response successfully', () => {
        response.on('end', (done) => {
          expect(response.statusCode).toBe(201)
          expect(response._getJSONData().status).toEqual(mockedStatus)
          expect(next).not.toHaveBeenCalled()
          done()
        })

        notificationsController.create(request, response, next)
      })
    })

    describe('when neither deviceName nor ipAddress is specified', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            text: 'Hello',
            language: 'ja',
          },
        })
      })

      it('calls next() with Error', () => {
        response.on('end', (done) => {
          expect(next).toHaveBeenCalledWith(
            badData('Either deviceName or ipAddress is required')
          )
          done()
        })

        notificationsController.create(request, response, next)
      })
    })

    describe('when text is not set', () => {
      beforeEach(() => {
        request = httpMocks.createRequest({
          method: 'POST',
          url: '/notifications',
          body: {
            deviceName: 'Rachael',
            language: 'ja',
          },
        })
      })

      it('calls next() with Error', () => {
        response.on('end', (done) => {
          expect(next).toHaveBeenCalledWith(badData('Text is required'))
          done()
        })

        notificationsController.create(request, response, next)
      })
    })
  })
})
