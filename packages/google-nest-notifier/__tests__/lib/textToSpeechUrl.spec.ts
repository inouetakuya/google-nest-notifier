import { textToSpeechUrl } from '../../src/lib/textToSpeechUrl'

describe('textToSpeechUrl', () => {
  describe('when text.length <= 200', () => {
    test('returns speechUrl', async () => {
      await expect(
        textToSpeechUrl({
          text: 'あ'.repeat(200),
          language: 'ja',
        }),
      ).resolves.toMatch(/^https:\/\/translate\.google\.com\/translate_tts\?/)
    })
  })

  describe('when text.length > 200', () => {
    test('throws RangeError', async () => {
      await expect(
        textToSpeechUrl({
          text: 'あ'.repeat(201),
          language: 'ja',
        }),
      ).rejects.toThrow(
        new RangeError('text length (201) should be less than 200 characters'),
      )
    })
  })
})
