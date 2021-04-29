type NotificationOptions = {
  deviceName?: string
  ipAddress?: string
  language?: string
}

export class GoogleNestNotifier {
  private defaultDeviceName = ''
  private defaultIpAddress = ''
  private defaultLanguage = ''

  constructor({ deviceName, ipAddress, language }: NotificationOptions) {
    if (deviceName) this.defaultDeviceName = deviceName
    if (ipAddress) this.defaultIpAddress = ipAddress
    if (language) this.defaultLanguage = language
  }

  notify(
    message: string,
    { deviceName, ipAddress, language }: NotificationOptions
  ): boolean {
    return true
  }
}
