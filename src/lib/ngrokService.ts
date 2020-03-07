import * as ngrok from 'ngrok'

interface NgrokOptions {
  port: number
  authtoken?: string
}

const ngrokService = {
  connect: ({
    port,
    authtoken
  }: {
    port: number
    authtoken: string
  }): Promise<string> => {
    const ngrokOptions: NgrokOptions = { port }

    if (authtoken === 'PLEASE_SET_YOUR_NGROK_TOKEN') {
      console.warn(
        "Please sign up ngrok and set your token to .env so that your tunnels don't time out"
      )
    } else if (authtoken) {
      Object.assign(ngrokOptions, { authtoken })
    }

    return ngrok.connect(ngrokOptions)
  }
}

export default ngrokService
