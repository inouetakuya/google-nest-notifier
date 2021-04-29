# google-nest-notifier

Send notifications to Google Nest

## Usage

```ts
import { GoogleNestNotifier } from 'google-nest-notifier'

const googleNestNotifier = new GoogleNestNotifier({
  deviceName: 'Rachael', // You can set deviceName on initialize and/or assign deviceName on notify.
  // or ipAddress: 'xxx.xxx.xxx.xxx',
  language: 'en', // Supported languages: https://cloud.google.com/translate/docs/languages
})

;(async () => {
  const status = await googleNestNotifier.notify('Hello', {
    deviceName: 'Rachael',
    // or ipAddress: 'xxx.xxx.xxx.xxx',
    language: 'en', // supported languages: https://cloud.google.com/translate/docs/languages
  })
  console.log(status)
})()
```
