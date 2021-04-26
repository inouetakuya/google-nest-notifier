export type MulticastDnsResponse = {
  addresses: string[]
  query: []
  type: Record<string, any>[]
  txt: string[]
  port: number
  fullname: string
  host: string
  interfaceIndex: number
  networkInterface: 'pseudo multicast'
}
