import MulticastDnsResponse from '~/types/MulticastDnsResponse'

export default class MulticastDnsData {
  ipAddress: string

  constructor(private response: MulticastDnsResponse) {
    this.ipAddress = response.addresses[0]
  }
}
