import * as ngrok from 'ngrok'

interface NgrokOptions {
  port: number
  authtoken?: string
}

const ngrokService = {
  connect: ({
    port,
    authtoken,
    region
  }: {
    port: number
    authtoken: string
    region?: string
  }): Promise<string> => {
    const ngrokOptions: NgrokOptions = { port }

    if (authtoken === 'PLEASE_SET_YOUR_NGROK_TOKEN') {
      console.warn(
        "Please sign up ngrok and set your token to .env so that your tunnels don't time out"
      )
    } else if (authtoken) {
      Object.assign(ngrokOptions, { authtoken })
    }

    if (region) Object.assign(ngrokOptions, { region })

    return ngrok.connect(ngrokOptions)
  }
}

export default ngrokService
