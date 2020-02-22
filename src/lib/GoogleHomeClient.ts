// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'

export default class GoogleHomeClient {
  constructor(public ip: string, public castv2Client = new castv2.Client()) {}
}
