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
  })
})
