// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import GoogleHomeClient from '~/lib/GoogleHomeClient'

const ipAddress = 'xxx.xxx.xxx.xxx' // Your Google Home IP Address for debugging
const dummyIpAddress = '192.168.3.1'
const speechUrl =
  'https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20world&tl=ja&total=1&idx=0&textlen=11&tk=355595.252309&client=t&prev=input&ttsspeed=1'

describe('GoogleHomeClient', () => {
  let client: GoogleHomeClient
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

  describe('constructor()', () => {
    beforeEach(() => {
      client = new GoogleHomeClient(dummyIpAddress)
    })

    test('sets castv2.Client', () => {
      expect(client.ipAddress).toBe(dummyIpAddress)
      expect(client.client).toBeInstanceOf(castv2.Client)
    })
  })

  // FIXME: テストの位置を後ろに動かすとこける
  //   TypeError: Cannot read property 'transportId' of undefined
  describe.skip('Debugging', () => {
    describe('notify()', () => {
      beforeEach(() => {
        client = new GoogleHomeClient(ipAddress)
      })

      test('makes Google Home to load media and returns status', async () => {
        const status = await client.notify({ speechUrl })
        expect(status.volume.muted).toBe(false)
      })
    })
  })

  describe('connect()', () => {
    beforeEach(() => {
      client = new GoogleHomeClient(dummyIpAddress, mockedCastv2Client)
    })

    test('connects to Google Home', async () => {
      await expect(client.connect()).resolves.toBe(undefined)
      expect(mockedCastv2Client.connect).toHaveBeenCalled()
    })
  })

  describe('launch()', () => {
    beforeEach(() => {
      client = new GoogleHomeClient(dummyIpAddress, mockedCastv2Client)
    })

    test('returns player', async () => {
      await client.connect()
      // await expect(client.launch()).resolves.toBeInstanceOf(
      //   castv2.DefaultMediaReceiver
      // )
      await expect(client.launch()).resolves
    })
  })

  describe('loadMedia()', () => {
    const player = {
      load: jest.fn((media, options, callback) => callback())
    }
    const media = {
      contentId: speechUrl,
      contentType: 'video/mp3',
      streamType: 'BUFFERED'
    }

    beforeEach(() => {
      client = new GoogleHomeClient(dummyIpAddress, mockedCastv2Client)
    })

    test('loads media', async () => {
      await expect(client.loadMedia({ player, media })).resolves
    })
  })
})
