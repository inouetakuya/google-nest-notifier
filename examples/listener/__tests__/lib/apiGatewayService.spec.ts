import { apiGatewayService } from '../../src/lib/apiGatewayService'

jest.mock('child_process', () => ({ execSync: jest.fn(() => 0) }))

describe('apiGatewayService', () => {
  describe('putIntegration()', () => {
    describe('when all params are set', () => {
      let apiGatewayUrl: string

      beforeEach(() => {
        apiGatewayUrl = apiGatewayService.putIntegration({
          region: 'ap-northeast-1',
          restApiId: 'xxxxxxxx',
          resourceId: 'xxxxxxxx',
          httpMethod: 'POST',
          url: 'https://xxxxxxxx.ngrok-free.app',
          path: '/notifications',
        })
      })

      test('returns apiGatewayUrl', () => {
        expect(apiGatewayUrl).toBe(
          'https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications'
        )
      })
    })

    describe('when all params are not set', () => {
      test('throws an error', () => {
        expect(() => {
          apiGatewayService.putIntegration({})
        }).toThrow('API Gateway region is required')
      })
    })
  })
})
