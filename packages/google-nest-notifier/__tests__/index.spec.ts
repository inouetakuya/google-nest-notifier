// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import { GoogleNestNotifier } from '../src'
import * as multicastDnsService from '../src/lib/multicastDnsService'
import { MulticastDnsData } from '../src/lib/MulticastDnsData'

describe('google-nest-notifier', () => {
  let mockedCastv2Client: castv2.Client
  let googleNestNotifier: GoogleNestNotifier

  beforeEach(() => {
    mockedCastv2Client = {
      connect: jest.fn((ip: string, callback: any) => callback()),
      launch: jest.fn(
        (Application: castv2.DefaultMediaReceiver, callback: any) =>
          callback(null, new Application())
      ),
    }
    googleNestNotifier = new GoogleNestNotifier(
      { language: 'jp' },
      mockedCastv2Client
    )
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

  describe('launchMediaReceiver', () => {
    it('returns mediaReceiver', async () => {
      await expect(googleNestNotifier.launchMediaReceiver()).resolves
    })
  })

  describe('loadMedia', () => {
    const mediaReceiver = {
      load: jest.fn((media, options, callback) => callback()),
    }
    const media = {
      contentId: 'https://example.com', // dummy speechUrl
      contentType: 'video/mp3',
      streamType: 'BUFFERED',
    }

    it('loads media', async () => {
      await expect(googleNestNotifier.loadMedia({ mediaReceiver, media }))
        .resolves
    })
  })
})
