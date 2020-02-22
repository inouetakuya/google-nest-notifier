// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'

export default class GoogleHomeClient {
  constructor(public ip: string, public client = new castv2.Client()) {}

  connect(): Promise<undefined> {
    // コールバック関数の最初の引数がエラーでないため手動で Promise にしている
    // https://yosuke-furukawa.hatenablog.com/entry/2017/05/10/101752
    // https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original
    return new Promise(resolve => {
      this.client.connect(this.ip, () => {
        resolve()
      })
    })
  }
}
