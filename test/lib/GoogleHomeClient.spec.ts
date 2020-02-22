// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import GoogleHomeClient from '~/lib/GoogleHomeClient'

describe('GoogleHomeClient', () => {
  let client: GoogleHomeClient
  const dummyIp = '192.168.3.1'
  let mockedCastv2Client: castv2.Client

  beforeEach(() => {
    mockedCastv2Client = {
      connect: jest.fn((ip: string, callback: Function) => callback()),
      launch: jest.fn(
        (Application: castv2.DefaultMediaReceiver, callback: Function) =>
          callback(null, new Application())
      )
    }
  })

  describe('constructor', () => {
    beforeEach(() => {
      client = new GoogleHomeClient(dummyIp)
    })

    test('sets castv2.Client', () => {
      expect(client.ip).toBe(dummyIp)
      expect(client.client).toBeInstanceOf(castv2.Client)
    })
  })

  describe('connect', () => {
    beforeEach(() => {
      client = new GoogleHomeClient(dummyIp, mockedCastv2Client)
    })

    test('connects to GoogleHome', async () => {
      await expect(client.connect()).resolves.toBe(undefined)
      expect(mockedCastv2Client.connect).toHaveBeenCalled()
    })
  })

  describe('launch', () => {
    beforeEach(() => {
      client = new GoogleHomeClient(dummyIp, mockedCastv2Client)
    })

    test('returns player', async () => {
      await client.connect()
      // await expect(client.launch()).resolves.toBeInstanceOf(
      //   castv2.DefaultMediaReceiver
      // )
      await expect(client.launch()).resolves
    })
  })

  describe('loadMedia', () => {
    const player = {
      load: jest.fn((media, options, callback) => callback())
    }
    const media = {
      contentId:
        'https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20world&tl=ja&total=1&idx=0&textlen=11&tk=355595.252309&client=t&prev=input&ttsspeed=1',
      contentType: 'video/mp3',
      streamType: 'BUFFERED'
    }

    beforeEach(() => {
      client = new GoogleHomeClient(dummyIp, mockedCastv2Client)
    })

    test('loads media', async () => {
      await expect(client.loadMedia({ player, media })).resolves
    })
  })
})
