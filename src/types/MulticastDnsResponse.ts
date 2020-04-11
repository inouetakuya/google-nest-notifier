export default interface MulticastDnsResponse {
  addresses: string[]
  query: []
  type: object[]
  txt: string[]
  port: 8009
  fullname: string
  host: string
  interfaceIndex: number
  networkInterface: 'pseudo multicast'
}
