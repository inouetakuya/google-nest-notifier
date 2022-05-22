import { getAudioUrl } from 'google-tts-api'

export const textToSpeechUrl = ({
  text,
  language = 'en',
  speed = 1,
}: {
  text: string
  language?: string // https://cloud.google.com/translate/docs/languages
  speed?: number
}): Promise<string> => {
  if (text.length > 200) {
    return Promise.reject(
      new RangeError('text length (201) should be less than 200 characters')
    )
  }

  const slow: boolean = speed === 1 ? false : true
  const url = getAudioUrl(text, { lang: language, slow })

  return Promise.resolve(url)
}
