import MulticastDnsResponse from '~/types/MulticastDnsResponse'

const multicastDnsResponseRpc: MulticastDnsResponse = {
  addresses: ['192.168.3.6'],
  query: [],
  type: [
    {
      name: 'googlerpc',
      protocol: 'tcp',
      subtypes: [],
      description: undefined
    }
  ],
  txt: ['cd=56F5FAC17D465D66D7C44ED3A362DB2D'],
  port: 8012,
  fullname: 'googlerpc-1._googlerpc._tcp.local',
  host: 'a802e6b3-5e86-8b0b-39bb-4e982e295b6e.local',
  interfaceIndex: 3,
  networkInterface: 'pseudo multicast'
}

export default multicastDnsResponseRpc
