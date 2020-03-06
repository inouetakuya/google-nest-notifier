import NgrokClient from '~/lib/NgrokClient'

const dummyPort = 3000
const dummyNgrokUrl = 'https://xxxxxxxx.ngrok.io'

describe('NgrokClient', () => {
  let client: NgrokClient
  let mockedNgrok

  describe('connect()', () => {
    beforeEach(() => {
      mockedNgrok = {
        connect: jest.fn().mockResolvedValue(dummyNgrokUrl)
      }

      client = new NgrokClient(dummyPort, mockedNgrok)
    })

    test('returns ngrokUrl', async () => {
      const ngrokUrl = await client.connect()
      expect(ngrokUrl).toBe(dummyNgrokUrl)
    })
  })
})
