import { getAudioUrl } from 'google-tts-api'

export const textToSpeechUrl = ({
  text,
  language = 'en',
  slow = false,
}: {
  text: string
  language?: string // https://cloud.google.com/translate/docs/languages
  slow?: boolean
}): Promise<string> => {
  if (text.length > 200) {
    return Promise.reject(
      new RangeError('text length (201) should be less than 200 characters'),
    )
  }

  const url = getAudioUrl(text, { lang: language, slow })
  return Promise.resolve(url)
}
