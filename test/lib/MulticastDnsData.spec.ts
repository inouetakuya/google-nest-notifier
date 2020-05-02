import MulticastDnsData from '~/lib/MulticastDnsData'
import multicastDnsResponseHome from 'test/fixtures/multicastDnsResponseHome'
import multicastDnsResponseNestHub from 'test/fixtures/multicastDnsResponseNestHub'
import multicastDnsResponseRpc from 'test/fixtures/multicastDnsResponseRpc'

describe('MulticastDnsData', () => {
  let multicastDnsData: MulticastDnsData

  describe('Google Home のとき', () => {
    beforeEach(() => {
      multicastDnsData = new MulticastDnsData(multicastDnsResponseHome)
    })

    describe('isValid()', () => {
      test('returns truthy', () => {
        expect(multicastDnsData.isValid()).toBeTruthy()
      })
    })

    describe('ipAddress', () => {
      test('returns ip address', () => {
        expect(multicastDnsData.ipAddress).toBe('192.168.3.8')
      })
    })

    describe('deviceName', () => {
      test('returns deviceName', () => {
        expect(multicastDnsData.deviceName).toBe('Rachael')
      })
    })

    describe('machineName', () => {
      test('returns machineName', () => {
        expect(multicastDnsData.machineName).toBe('Google Home')
      })
    })
  })

  describe('Google Nest Hub のとき', () => {
    beforeEach(() => {
      multicastDnsData = new MulticastDnsData(multicastDnsResponseNestHub)
    })

    describe('isValid()', () => {
      test('returns truthy', () => {
        expect(multicastDnsData.isValid()).toBeTruthy()
      })
    })

    describe('ipAddress', () => {
      test('returns ip address', () => {
        expect(multicastDnsData.ipAddress).toBe('192.168.3.7')
      })
    })

    describe('deviceName', () => {
      test('returns deviceName', () => {
        expect(multicastDnsData.deviceName).toBe('Joi')
      })
    })

    describe('machineName', () => {
      test('returns machineName', () => {
        expect(multicastDnsData.machineName).toBe('Google Nest Hub')
      })
    })
  })

  describe('deviceName などが取得できないとき', () => {
    beforeEach(() => {
      multicastDnsData = new MulticastDnsData(multicastDnsResponseRpc)
    })

    describe('isValid()', () => {
      test('returns falsy', () => {
        expect(multicastDnsData.isValid()).toBeFalsy()
      })
    })
  })
})
