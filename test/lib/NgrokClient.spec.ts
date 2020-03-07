import NgrokClient from '~/lib/NgrokClient'

const dummyPort = 3000
const dummyNgrokUrl = 'https://xxxxxxxx.ngrok.io'

jest.mock('ngrok', () => {
  return {
    // connect: jest.fn().mockResolvedValue(dummyNgrokUrl) だと
    // ReferenceError: Cannot access 'dummyNgrokUrl' before initialization
    connect: jest.fn().mockResolvedValue('https://xxxxxxxx.ngrok.io')
  }
})

describe('NgrokClient', () => {
  let client: NgrokClient

  describe('connect()', () => {
    beforeEach(() => {
      client = new NgrokClient(dummyPort)
    })

    test('returns ngrokUrl', async () => {
      const ngrokUrl = await client.connect()
      expect(ngrokUrl).toBe(dummyNgrokUrl)
    })
  })
})
