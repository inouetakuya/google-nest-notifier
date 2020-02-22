// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import GoogleHomeClient from '~/lib/GoogleHomeClient'

describe('GoogleHomeClient', () => {
  describe('constructor', () => {
    test('sets castv2.Client', () => {
      const client = new GoogleHomeClient('192.168.3.1')
      expect(client.ip).toBe('192.168.3.1')
      expect(client.castv2Client).toBeInstanceOf(castv2.Client)
    })
  })
})
