import MulticastDnsResponse from '~/types/MulticastDnsResponse'

const multicastDnsResponseNestHub: MulticastDnsResponse = {
  addresses: ['192.168.3.7'],
  query: [],
  type: [
    {
      name: 'googlecast',
      protocol: 'tcp',
      subtypes: [],
      description: 'Google Chromecast'
    }
  ],
  txt: [
    'id=9478e699c2b82c1943b7861e07d3b895',
    'cd=3189648CC37E6D31B6506A83C9C234A9',
    'rm=4DA95ED63061353D',
    've=05',
    'md=Google Nest Hub',
    'ic=/setup/icon.png',
    'fn=Joi',
    'ca=233477',
    'st=0',
    'bs=FA8FCA7A9F0F',
    'nf=1',
    'rs='
  ],
  port: 8009,
  fullname:
    'Google-Nest-Hub-9478e699c2b82c1943b7861e07d3b895._googlecast._tcp.local',
  host: '9478e699-c2b8-2c19-43b7-861e07d3b895.local',
  interfaceIndex: 3,
  networkInterface: 'pseudo multicast'
}

export default multicastDnsResponseNestHub
