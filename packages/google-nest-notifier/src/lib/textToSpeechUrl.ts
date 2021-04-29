// @ts-ignore TS7016: Could not find a declaration file for module 'google-tts-api'
import googleTtsApi from 'google-tts-api'

export default function textToSpeechUrl({
  text,
  language = 'en',
  speed,
}: {
  text: string
  language?: string // https://cloud.google.com/translate/docs/languages
  speed?: number
}): Promise<string> {
  const speechUrl = googleTtsApi(text, language, speed)
  return speechUrl
}
