// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import GoogleHomeClient from '~/lib/GoogleHomeClient'

describe('GoogleHomeClient', () => {
  describe('constructor', () => {
    test('sets castv2.Client', () => {
      const client = new GoogleHomeClient('xxx.xxx.xxx.xxx')
      expect(client.ip).toBe('xxx.xxx.xxx.xxx')
      expect(client.client).toBeInstanceOf(castv2.Client)
    })
  })

  describe('connect', () => {
    const mockedCastv2Client = {
      connect: (ip: string, callback: Function) => callback()
    }

    test('connects to GoogleHome', async () => {
      const client = new GoogleHomeClient('xxx.xxx.xxx.xxx', mockedCastv2Client)
      await expect(client.connect()).resolves.toBe(undefined)
    })
  })
})
