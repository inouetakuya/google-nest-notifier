import * as ngrok from 'ngrok'

interface NgrokOptions {
  port: number
  authtoken?: string
}

interface MockedNgrok {
  connect(): Promise<string>
}

export default class NgrokClient {
  public options: NgrokOptions = { port: 0 }

  constructor(port: number, public client: typeof ngrok | MockedNgrok = ngrok) {
    this.options.port = port
    this.setOptions()
  }

  connect(): Promise<string> {
    return this.client.connect(this.options)
  }

  private setOptions(): void {
    if (process.env.NGROK_TOKEN === 'PLEASE_SET_YOUR_NGROK_TOKEN') {
      console.warn(
        "Please sign up ngrok and set your token to .env so that your tunnels don't time out"
      )
    } else if (process.env.NGROK_TOKEN) {
      this.options.authtoken = process.env.NGROK_TOKEN
    }
  }
}
