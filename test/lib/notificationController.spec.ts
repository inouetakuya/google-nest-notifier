import httpMocks from 'node-mocks-http'
import notificationController from '~/lib/notificationController'

describe('notificationController', () => {
  describe('create', () => {
    let request
    const response = httpMocks.createResponse()

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
})
