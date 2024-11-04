# Listener example

Web API for Send notifications to Google Nest

## Setup

```shell
pnpm install
```

```shell
cp .env.example .env
```

## Development

```shell
pnpm dev
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world","language":"en"}' http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"日本語でおk","language":"ja"}' http://localhost:3000/notifications
```

## Testing

```shell
pnpm test
```

## Production

### Start server

```shell
pnpm build
pnpm start
```

### Zero downtime reload

```shell
pnpm reload
```

### Restart server

```shell
pnpm restart
```

### Stop server

```shell
pnpm stop
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
pnpm logs
pnpm logs --lines 50
```

### Use ngrok (optional)

You can use ngrok.

Sign up ngrok and set your token to `.env` so that your tunnels don't time out.

```shell
pnpm start
```

```shell
pnpm logs
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
pnpm start
```

```shell
pnpm logs
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
pnpm deploy:setup
pnpm deploy:only
pnpm deploy:install:pnpm
pnpm deploy:install:google-nest-notifier
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
pnpm deploy:build
pnpm deploy:start
```

### deploy

```shell
pnpm deploy
```

### logs

```shell
pnpm deploy:logs
```
