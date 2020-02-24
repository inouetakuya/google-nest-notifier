# google-home-notifier-api

[![CircleCI](https://circleci.com/gh/inouetakuya/google-home-notifier-api.svg?style=svg)](https://circleci.com/gh/inouetakuya/google-home-notifier-api)

Web API for Send notifications to Google Home

## Setup

```shell
npm install
```

```shell
cp .env.example .env
```

Please sign up ngrok and set your token to `.env` so that your tunnels don't time out.

## Development

```shell
npm run dev
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type:application/json' -d '{"ipAddress":"192.168.3.18","text":"Hello"}' http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type:application/json' -d '{"ipAddress":"192.168.3.18","text":"日本語でおk"}' http://localhost:3000/notifications
```

## Testing

```shell
npm run test
```

## Production

```shell
npm run build
npm run start
```

## License

See [LICENSE](./LICENSE)
