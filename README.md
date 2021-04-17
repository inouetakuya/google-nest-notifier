# google-nest-notifier

[![CircleCI](https://circleci.com/gh/inouetakuya/google-nest-notifier.svg?style=svg)](https://circleci.com/gh/inouetakuya/google-nest-notifier)

Web API for Send notifications to Google Nest

## Setup

```shell
yarn install
```

```shell
cp .env.example .env
```

- Set your Google Nest IP address to `.env`
- Sign up ngrok and set your token to `.env` so that your tunnels don't time out

## Development

```shell
yarn dev
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world"}' http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"日本語でおk"}' http://localhost:3000/notifications
```

## Testing

```shell
yarn test
```

## Production

### Start server

```shell
yarn build
yarn start
```

### Zero downtime reload

```shell
yarn reload
```

### Restart server

```shell
yarn restart
```

### Stop server

```shell
yarn stop
```

### Show process list

```shell
npx pm2 list
```

```text
┌─────┬─────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                        │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ google-nest-notifier    │ default     │ 0.0.1   │ fork    │ 98063    │ 7s     │ 0    │ online    │ 4.8%     │ 53.6mb   │ pi       │ disabled │
└─────┴─────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

### Show logs

```shell
npx pm2 logs google-nest-notifier
npx pm2 logs google-nest-notifier --lines 50
```

copy your ngrok url from stdout.

```
Forwarding: https://xxxxxxxx.ngrok.io
-> http://localhost:3000
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world"}' https://xxxxxxxx.ngrok.io/notifications
```

### Fix URL with AWS API Gateway (optional)

- Create AWS API Gateway
- Set your AWS API Gateway info to `.env`

```shell
yarn build
yarn start
```

```shell
npx pm2 logs google-nest-notifier
npx pm2 logs google-nest-notifier --lines 50
```

copy your AWS API Gateway url from stdout.

```
HttpProxy: https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
-> https://0812016c.jp.ngrok.io/notifications
-> http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world"}' https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
```

## Deployment

### setup

```shell
yarn deploy:setup
```

### deploy

```shell
yarn deploy
```

### Execute commands

```shell
npx pm2 deploy production exec 'npx pm2 list'
```

```shell
npx pm2 deploy production exec 'npx pm2 logs'
```

```shell
npx pm2 deploy production exec 'tail log/production.log'
```

## License

See [LICENSE](./LICENSE)
