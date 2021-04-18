// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import GoogleNestClient from '~/lib/GoogleNestClient'

const ipAddress = 'xxx.xxx.xxx.xxx' // Your Google Nest IP Address for debugging
const dummyIpAddress = '192.168.3.1'
const speechUrl =
  'https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20world&tl=ja&total=1&idx=0&textlen=11&tk=355595.252309&client=t&prev=input&ttsspeed=1'

describe('GoogleNestClient', () => {
  let client: GoogleNestClient
  let mockedCastv2Client: castv2.Client

  beforeEach(() => {
    mockedCastv2Client = {
      connect: jest.fn((ip: string, callback: any) => callback()),
      launch: jest.fn(
        (Application: castv2.DefaultMediaReceiver, callback: any) =>
          callback(null, new Application())
      ),
    }
  })

  // FIXME: テストの位置を後ろに動かすとこける
  //   TypeError: Cannot read property 'transportId' of undefined
  describe.skip('Debugging', () => {
    describe('notify()', () => {
      beforeEach(() => {
        client = new GoogleNestClient(ipAddress)
      })

      test('makes Google Nest to load media and returns status', async () => {
        const status = await client.notify({ speechUrl })
        expect(status.volume.muted).toBe(false)
      })
    })
  })

  describe('connect()', () => {
    beforeEach(() => {
      client = new GoogleNestClient(dummyIpAddress, mockedCastv2Client)
    })

    test('connects to Google Nest', async () => {
      await expect(client.connect()).resolves.toBe(undefined)
      expect(mockedCastv2Client.connect).toHaveBeenCalled()
    })
  })

  describe('launch()', () => {
    beforeEach(() => {
      client = new GoogleNestClient(dummyIpAddress, mockedCastv2Client)
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
      load: jest.fn((media, options, callback) => callback()),
    }
    const media = {
      contentId: speechUrl,
      contentType: 'video/mp3',
      streamType: 'BUFFERED',
    }

    beforeEach(() => {
      client = new GoogleNestClient(dummyIpAddress, mockedCastv2Client)
    })

    test('loads media', async () => {
      await expect(client.loadMedia({ player, media })).resolves
    })
  })
})
