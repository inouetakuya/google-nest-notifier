import * as ngrok from 'ngrok'

interface NgrokOptions {
  port: number
  authtoken?: string
}

export const ngrokService = {
  connect: ({
    port,
    authtoken,
    region,
  }: {
    port: number
    authtoken?: string
    region?: string
  }): Promise<string> => {
    const ngrokOptions: NgrokOptions = { port }

    if (authtoken && authtoken !== 'PLEASE_SET_YOUR_NGROK_TOKEN') {
      Object.assign(ngrokOptions, { authtoken })
    } else {
      console.warn(
        "Please sign up ngrok and set your token to .env so that your tunnels don't time out",
      )
    }

    if (region) Object.assign(ngrokOptions, { region })

    return ngrok.connect(ngrokOptions)
  },
}
