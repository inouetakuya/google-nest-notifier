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

### Use ngrok (optional)

You can use ngrok.

Sign up ngrok and set your token to `.env` so that your tunnels don't time out.

```shell
NODE_ENV=production yarn dev
```

Copy your ngrok url from stdout.

```
Forwarding: https://xxxxxxxx.ngrok.io
-> http://localhost:3000
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world","language":"en"}' https://xxxxxxxx.ngrok.io/notifications
```

### Fix URL with AWS API Gateway (optional)

- Create AWS API Gateway
- Set your AWS API Gateway info to `.env`

```shell
NODE_ENV=production yarn dev
```

Copy your AWS API Gateway url from stdout.

```
HttpProxy: https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
-> https://xxxxxxxx.jp.ngrok.io/notifications
-> http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"deviceName":"rachael","text":"Hello world","language":"en"}' https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
```
