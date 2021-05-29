// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'
import { getMulticastDnsDataByDeviceName } from './lib/multicastDnsService'
import { textToSpeechUrl } from './lib/textToSpeechUrl'

type NotificationOptions = {
  deviceName?: string
  ipAddress?: string
  language?: string
}

type Media = {
  contentId: string
  contentType: string // contentType: 'video/mp3'
  streamType: string // streamType: 'BUFFERED'
}

export class GoogleNestNotifier {
  private readonly defaultDeviceName: string = ''
  private readonly defaultIpAddress: string = ''
  private readonly defaultLanguage: string = ''
  private client: castv2.Client

  constructor(
    { deviceName, ipAddress, language }: NotificationOptions = {},
    client = new castv2.Client()
  ) {
    if (deviceName) this.defaultDeviceName = deviceName
    if (ipAddress) this.defaultIpAddress = ipAddress
    if (language) this.defaultLanguage = language
    this.client = client // Dependency injection for testing
  }

  connect(ipAddress: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.on('error', (error: Error) => {
        reject(error)
      })
      this.client.connect(ipAddress, () => {
        resolve(true)
      })
    })
  }

  async notify(
    text: string,
    { deviceName, ipAddress, language }: NotificationOptions = {}
  ): Promise<boolean> {
    if (
      !(
        deviceName ||
        ipAddress ||
        this.defaultDeviceName ||
        this.defaultIpAddress
      )
    )
      throw new Error('Neither deviceName nor ipAddress is assigned')

    const _ipAddress =
      ipAddress ||
      this.defaultIpAddress ||
      (await this.getIpAddress(deviceName || this.defaultDeviceName))

    if (!_ipAddress) throw new Error('Google Nest device is not found')

    const media = await this.getMedia(text, {
      language: language || this.defaultLanguage || 'en',
    })

    await this.connect(_ipAddress)
    const mediaReceiver = await this.launchMediaReceiver()
    await this.loadMedia({ mediaReceiver, media })

    return true
  }

  async getIpAddress(deviceName: string): Promise<string | undefined> {
    const multicastDnsData = await getMulticastDnsDataByDeviceName(deviceName)
    return multicastDnsData ? multicastDnsData.ipAddress : undefined
  }

  async getMedia(
    text: string,
    { language }: Pick<NotificationOptions, 'language'>
  ): Promise<Media> {
    const speechUrl: string = await textToSpeechUrl({
      text,
      language,
      speed: 1,
    })

    return {
      contentId: speechUrl,
      contentType: 'video/mp3',
      streamType: 'BUFFERED',
    }
  }

  launchMediaReceiver(): Promise<castv2.DefaultMediaReceiver> {
    return new Promise((resolve, reject) => {
      this.client.launch(
        castv2.DefaultMediaReceiver,
        (error: Error, mediaReceiver: castv2.DefaultMediaReceiver) => {
          if (error) return reject(error)
          resolve(mediaReceiver)
        }
      )
    })
  }

  loadMedia({
    mediaReceiver,
    media,
  }: {
    mediaReceiver: castv2.DefaultMediaReceiver
    media: any
  }): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      mediaReceiver.load(
        media,
        { autoplay: true },
        (error: Error, status: Record<string, any>) => {
          if (error) reject(error)
          resolve(status)
        }
      )
    })
  }
}
