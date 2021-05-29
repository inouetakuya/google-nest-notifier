import { MulticastDnsResponse } from '../types/MulticastDnsResponse'

export class MulticastDnsData {
  ipAddress: string
  deviceName: string
  machineName: string

  constructor(private response: MulticastDnsResponse) {
    this.ipAddress = response.addresses[0]
    this.deviceName = this.extractDeviceName()
    this.machineName = this.extractMachineName()
  }

  isValid(): boolean {
    return !!(this.ipAddress && this.deviceName && this.machineName)
  }

  private extractDeviceName(): string {
    if (!this.response.txt) return ''

    const txtRecord: string | undefined = this.response.txt.find(
      (value: string) => value.match(/^fn=/)
    )

    return txtRecord ? txtRecord.replace(/^fn=/, '') : ''
  }

  private extractMachineName(): string {
    if (!this.response.txt) return ''

    const txtRecord: string | undefined = this.response.txt.find(
      (value: string) => value.match(/^md=/)
    )

    return txtRecord ? txtRecord.replace(/^md=/, '') : ''
  }
}
