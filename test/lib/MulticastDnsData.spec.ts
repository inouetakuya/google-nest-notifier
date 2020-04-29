import MulticastDnsData from '~/lib/MulticastDnsData'
import multicastDnsResponse from 'test/fixtures/multicastDnsResponse'

describe('MulticastDnsData', () => {
  let multicastDnsData: MulticastDnsData

  beforeEach(() => {
    multicastDnsData = new MulticastDnsData(multicastDnsResponse)
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
