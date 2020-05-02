export default interface MulticastDnsResponse {
  addresses: string[]
  query: []
  type: object[]
  txt: string[]
  port: number
  fullname: string
  host: string
  interfaceIndex: number
  networkInterface: 'pseudo multicast'
}
