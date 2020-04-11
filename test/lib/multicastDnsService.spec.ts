import multicastDnsService from '~/lib/multicastDnsService'

describe('apiGatewayService', () => {
  describe('queryMulticastDnsDataByDeviceName()', () => {
    test('returns multicastDnsData[]', async () => {
      const deviceName = 'Rachael'
      const dataArray = await multicastDnsService.queryMulticastDnsDataByDeviceName(
        deviceName
      )
      expect(dataArray[0].deviceName).toBe('Rachael')
    })
  })
})
