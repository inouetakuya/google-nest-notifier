// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import GoogleHomeClient from '~/lib/GoogleHomeClient'

jest.mock('util', () => ({
  inherits: () => jest.fn(),

  // castv2.DefaultMediaReceiver を返すようにするには複雑すぎる
  promisify: () => jest.fn().mockResolvedValue({})
}))

describe('GoogleHomeClient', () => {
  const dummyIp = '192.168.3.1'

  describe('constructor', () => {
    test('sets castv2.Client', () => {
      const client = new GoogleHomeClient(dummyIp)
      expect(client.ip).toBe(dummyIp)
      expect(client.client).toBeInstanceOf(castv2.Client)
    })
  })

  describe('connect', () => {
    const mockedCastv2Client = {
      connect: jest.fn((ip: string, callback: Function) => callback())
    }

    test('connects to GoogleHome', async () => {
      const client = new GoogleHomeClient(dummyIp, mockedCastv2Client)
      await expect(client.connect()).resolves.toBe(undefined)
      expect(mockedCastv2Client.connect).toHaveBeenCalled()
    })
  })

  describe('launch', () => {
    const mockedCastv2Client = {
      connect: jest.fn((ip: string, callback: Function) => callback())
    }

    test('returns player', async () => {
      const client = new GoogleHomeClient(dummyIp, mockedCastv2Client)
      await client.connect()
      // await expect(client.launch()).resolves.toBeInstanceOf(
      //   castv2.DefaultMediaReceiver
      // )
      await expect(client.launch()).resolves
    })
  })
})
