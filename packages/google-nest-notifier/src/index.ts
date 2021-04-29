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

  notify(
    message: string,
    { deviceName, ipAddress, language }: NotificationOptions = {}
  ): boolean {
    if (
      !(
        deviceName ||
        ipAddress ||
        this.defaultDeviceName ||
        this.defaultIpAddress
      )
    )
      throw new Error('Neither deviceName nor ipAddress is assigned')

    return true
  }
}
