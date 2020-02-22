// @ts-ignore TS7016: Could not find a declaration file for module 'castv2-client'
import castv2 from 'castv2-client'

interface Media {
  contentId: string
  contentType: string // contentType: 'video/mp3'
  streamType: string // streamType: 'BUFFERED'
}

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async notify({ speechUrl }: { speechUrl: string }): Promise<any> {
    await this.connect()
    const player = await this.launch()

    const media: Media = {
      contentId: speechUrl,
      contentType: 'video/mp3',
      streamType: 'BUFFERED'
    }

    const status = await this.loadMedia({ player, media })
    this.close()

    return status
  }

  // util.promisify() を使う書き方はモックの作成と削除が難しかったので手動で Promise にしている
  //
  // launch(): Promise<castv2.DefaultMediaReceiver> {
  //   const promisifiedLaunch = util
  //     .promisify(this.client.launch)
  //     .bind(this.client)
  //
  //   return promisifiedLaunch(castv2.DefaultMediaReceiver)
  // }

  launch(): Promise<castv2.DefaultMediaReceiver> {
    return new Promise((resolve, reject) => {
      this.client.launch(
        castv2.DefaultMediaReceiver,
        (error: Error, player: castv2.DefaultMediaReceiver) => {
          if (error) return reject(error)
          resolve(player)
        }
      )
    })
  }

  // util.promisify() を使う書き方はモックの作成と削除が難しかったので手動で Promise にしている
  //
  // loadMedia({
  //   player,
  //   media
  // }: {
  //   player: castv2.DefaultMediaReceiver
  //   media: Media
  // }): Promise<unknown> {
  //   const promisifiedLoad = util.promisify(player.load).bind(player)
  //   return promisifiedLoad(media, { autoplay: true })
  // }

  loadMedia({
    player,
    media
  }: {
    player: castv2.DefaultMediaReceiver
    media: Media
  }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      player.load(
        media,
        { autoplay: true },
        (error: Error, status: unknown) => {
          if (error) reject(error)
          resolve(status)
        }
      )
    })
  }

  close(): void {
    this.client.close()
  }
}
