# Listener example

Web API for Send notifications to Google Nest

## Setup

```shell
yarn install
```

```shell
cp .env.example .env
```

## Development

```shell
yarn dev
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world","language":"en"}' http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"日本語でおk","language":"ja"}' http://localhost:3000/notifications
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
┌─────┬─────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                    │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ google-nest-notifier    │ default     │ 0.0.2   │ cluster │ 84050    │ 4s     │ 2    │ online    │ 0%       │ 48.1mb   │ pi       │ disabled │
└─────┴─────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

### Show logs

```shell
yarn logs
yarn logs --lines 50
```

### Use ngrok (optional)

You can use ngrok.

Sign up ngrok and set your token to `.env` so that your tunnels don't time out.

```shell
yarn start
```

```shell
yarn logs
```

Copy your ngrok url from pm2 logs.

```text
Forwarding: https://xxxxxxxx.ngrok-free.app
-> http://localhost:3000
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world","language":"en"}' https://xxxxxxxx.ngrok-free.app/notifications
```

### Fix URL with AWS API Gateway (optional)

- Create AWS API Gateway
- Set your AWS API Gateway info to `.env`

```shell
yarn start
```

```shell
yarn logs
```

Copy your AWS API Gateway url from pm2 logs.

```text
HttpProxy: https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
-> https://xxxxxxxx.ngrok-free.app/notifications
-> http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world","language":"en"}' https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
```

## Deployment

### Setup

```shell
yarn deploy:setup
yarn deploy:only
yarn deploy:install:yarn
yarn deploy:install:google-nest-notifier
```

### Set .env

```shell
cp .env.example .env.production
```

Edit .env.production

```shell
scp .env.production {USER}@{HOST}:/var/www/google-nest-notifier/current/examples/listener/.env
```

```shell
scp .env.production pi@raspberrypi:/var/www/google-nest-notifier/current/examples/listener/.env
```

### Build & Start

```shell
yarn deploy:build
yarn deploy:start
```

### deploy

```shell
yarn deploy
```

### logs

```shell
yarn deploy:logs
```
