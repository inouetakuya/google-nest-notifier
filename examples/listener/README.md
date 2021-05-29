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
