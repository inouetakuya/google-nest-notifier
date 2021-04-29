import { GoogleNestNotifier } from '../src'

describe('google-nest-notifier', () => {
  let googleNestNotifier: GoogleNestNotifier

  describe('notify', () => {
    beforeEach(() => {
      googleNestNotifier = new GoogleNestNotifier({ language: 'jp' })
    })

    it('succeeds', () => {
      googleNestNotifier.notify('Hello', { deviceName: 'Rachael' })
    })

    describe('when neither deviceName nor ipAddress is assigned', () => {
      it('throws an error', () => {
        expect(() => googleNestNotifier.notify('Hello')).toThrow()
      })
    })
  })
})
