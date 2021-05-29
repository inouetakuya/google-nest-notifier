export type MulticastDnsResponse = {
  addresses: string[]
  query: []
  type: {
    name: string
    protocol: string
    subtypes: string[]
    description: string | undefined
  }[]
  txt: string[]
  port: number
  fullname: string
  host: string
  interfaceIndex: number
  networkInterface: 'pseudo multicast'
}
