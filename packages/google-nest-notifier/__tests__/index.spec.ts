import { GoogleNestNotifier } from '../src'
import * as multicastDnsService from '../src/lib/multicastDnsService'
import { MulticastDnsData } from '../src/lib/MulticastDnsData'

describe('google-nest-notifier', () => {
  let googleNestNotifier: GoogleNestNotifier

  beforeEach(() => {
    googleNestNotifier = new GoogleNestNotifier({ language: 'jp' })
  })

  describe('notify', () => {
    it('succeeds', async () => {
      await expect(
        googleNestNotifier.notify('Hello', { deviceName: 'Rachael' })
      ).toBeTruthy()
    })

    describe('when neither deviceName nor ipAddress is assigned', () => {
      it('throws an error', async () => {
        await expect(() => googleNestNotifier.notify('Hello')).rejects.toThrow()
      })
    })
  })

  describe('getIpAddress', () => {
    describe('when Google Nest device is found', () => {
      const dummyIpAddress = '192.168.3.1'

      beforeEach(() => {
        jest
          .spyOn(multicastDnsService, 'getMulticastDnsDataByDeviceName')
          .mockResolvedValue({
            ipAddress: dummyIpAddress,
          } as MulticastDnsData)
      })

      it('returns ipAddress', async () => {
        const ipAddress = await googleNestNotifier.getIpAddress('Rachael')
        expect(ipAddress).toBe(dummyIpAddress)
      })
    })

    describe('when Google Nest device is not found', () => {
      beforeEach(() => {
        jest
          .spyOn(multicastDnsService, 'getMulticastDnsDataByDeviceName')
          .mockResolvedValue(undefined)
      })

      it('throws an error', async () => {
        await expect(() =>
          googleNestNotifier.getIpAddress('wrongDeviceName')
        ).rejects.toThrow()
      })
    })
  })
})
