import { getMulticastDnsDataByDeviceName } from './lib/multicastDnsService'

type NotificationOptions = {
  deviceName?: string
  ipAddress?: string
  language?: string
}

export class GoogleNestNotifier {
  private readonly defaultDeviceName: string = ''
  private readonly defaultIpAddress: string = ''
  private readonly defaultLanguage: string = ''

  constructor({ deviceName, ipAddress, language }: NotificationOptions) {
    if (deviceName) this.defaultDeviceName = deviceName
    if (ipAddress) this.defaultIpAddress = ipAddress
    if (language) this.defaultLanguage = language
  }

  async notify(
    message: string,
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

    return true
  }

  async getIpAddress(deviceName: string): Promise<string> {
    const multicastDnsData = await getMulticastDnsDataByDeviceName(deviceName)
    if (!multicastDnsData) throw new Error('Google Nest device is not found')
    return multicastDnsData.ipAddress
  }
}
