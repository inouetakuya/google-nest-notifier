# google-nest-notifier-api

[![CircleCI](https://circleci.com/gh/inouetakuya/google-nest-notifier-api.svg?style=svg)](https://circleci.com/gh/inouetakuya/google-nest-notifier-api)

Web API for Send notifications to Google Nest

## Setup

```shell
npm install
```

```shell
cp .env.example .env
```

- Set your Google Nest IP address to `.env`
- Sign up ngrok and set your token to `.env` so that your tunnels don't time out

## Development

```shell
npm run dev
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"Hello world"}' http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"日本語でおk"}' http://localhost:3000/notifications
```

## Testing

```shell
npm run test
```

## Production

### Start server

```shell
npm run build
npm run start
```

### Zero downtime reload

```shell
npm run reload
```

### Restart server

```shell
npm run restart
```

### Stop server

```shell
npm run stop
```

### Show process list

```shell
npx pm2 list
```

```text
┌─────┬─────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                        │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ google-nest-notifier-api    │ default     │ 0.0.1   │ fork    │ 98063    │ 7s     │ 0    │ online    │ 4.8%     │ 53.6mb   │ pi       │ disabled │
└─────┴─────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

### Show logs

```shell
npx pm2 logs google-nest-notifier-api
npx pm2 logs google-nest-notifier-api --lines 50
```

copy your ngrok url from stdout.

```
Forwarding: https://xxxxxxxx.ngrok.io
-> http://localhost:3000
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"Hello world"}' https://xxxxxxxx.ngrok.io/notifications
```

### Fix URL with AWS API Gateway (optional)

- Create AWS API Gateway
- Set your AWS API Gateway info to `.env`

```shell
npm run build
npm run start
```

```shell
npx pm2 logs google-nest-notifier-api
npx pm2 logs google-nest-notifier-api --lines 50
```

copy your AWS API Gateway url from stdout.

```
HttpProxy: https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
-> https://0812016c.jp.ngrok.io/notifications
-> http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"Hello world"}' https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
```

## Deployment

```shell
npm run deploy
```

### Execute commands

```shell
npx pm2 deploy production exec 'npx pm2 logs'
```

```shell
npx pm2 deploy production exec 'tail log/production.log'
```

## License

See [LICENSE](./LICENSE)
