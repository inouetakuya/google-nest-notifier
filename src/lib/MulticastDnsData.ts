import MulticastDnsResponse from '~/types/MulticastDnsResponse'

export default class MulticastDnsData {
  ipAddress: string
  deviceName: string

  constructor(private response: MulticastDnsResponse) {
    this.ipAddress = response.addresses[0]
    this.deviceName = this.extractDeviceName()
  }

  extractDeviceName(): string {
    const txtRecord:
      | string
      | undefined = this.response.txt.find((value: string) =>
      value.match(/^fn=/)
    )

    return txtRecord ? txtRecord.replace('fn=', '') : ''
  }
}
