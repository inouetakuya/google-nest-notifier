// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import GoogleHomeClient from '~/lib/GoogleHomeClient'

// jest.mock('util', () => ({
//   inherits: () => jest.fn(),
//
//   // castv2.DefaultMediaReceiver を返すようにするには複雑すぎる
//   promisify: () => jest.fn().mockResolvedValue({})
// }))

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

  // describe('launch', () => {
  //   const mockedCastv2Client = {
  //     connect: jest.fn((ip: string, callback: Function) => callback())
  //   }
  //
  //   test('returns player', async () => {
  //     const client = new GoogleHomeClient(dummyIp, mockedCastv2Client)
  //     await client.connect()
  //     // await expect(client.launch()).resolves.toBeInstanceOf(
  //     //   castv2.DefaultMediaReceiver
  //     // )
  //     await expect(client.launch()).resolves
  //   })
  // })

  describe('loadMedia', () => {
    test('loads media', async () => {
      const client = new GoogleHomeClient('192.168.3.18')
      await client.connect()
      const player = await client.launch()
      const media = {
        contentId:
          'https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20world&tl=ja&total=1&idx=0&textlen=11&tk=355595.252309&client=t&prev=input&ttsspeed=1',
        contentType: 'video/mp3',
        streamType: 'BUFFERED'
      }
      await expect(client.loadMedia({ player, media })).resolves
    })
  })
})
