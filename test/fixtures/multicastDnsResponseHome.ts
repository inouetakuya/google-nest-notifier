import MulticastDnsResponse from '~/types/MulticastDnsResponse'

const multicastDnsResponseHome: MulticastDnsResponse = {
  addresses: ['192.168.3.8'],
  query: [],
  type: [
    {
      name: 'googlecast',
      protocol: 'tcp',
      subtypes: [],
      description: 'Google Chromecast',
    },
  ],
  txt: [
    'id=a802e6b35e868b0b39bb4e982e295b6e',
    'cd=56F5FAC17D465D66D7C44ED3A362DB2D',
    'rm=06164204C154D682',
    've=05',
    'md=Google Home',
    'ic=/setup/icon.png',
    'fn=Rachael',
    'ca=198660',
    'st=0',
    'bs=FA8FCA31CF46',
    'nf=1',
    'rs=',
  ],
  port: 8009,
  fullname:
    'Google-Home-a802e6b35e868b0b39bb4e982e295b6e._googlecast._tcp.local',
  host: 'a802e6b3-5e86-8b0b-39bb-4e982e295b6e.local',
  interfaceIndex: 3,
  networkInterface: 'pseudo multicast',
}

export default multicastDnsResponseHome
