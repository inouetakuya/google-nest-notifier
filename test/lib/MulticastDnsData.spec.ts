import MulticastDnsData from '~/lib/MulticastDnsData'
import multicastDnsResponseHome from 'test/fixtures/multicastDnsResponseHome'
import multicastDnsResponseNestHub from 'test/fixtures/multicastDnsResponseNestHub'

describe('MulticastDnsData', () => {
  let multicastDnsData: MulticastDnsData

  describe('Google Home のとき', () => {
    beforeEach(() => {
      multicastDnsData = new MulticastDnsData(multicastDnsResponseHome)
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
})
