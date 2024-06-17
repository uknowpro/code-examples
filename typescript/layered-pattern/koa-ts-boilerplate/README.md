# Koa Typescript boilerplate 
- on three tier layered architecture

## Requirements

| Type                  | Version              |
|:---------------------|:-----------------|
| `OS`                 | Linux(Ubuntu 22.04) |
| `Docker`             | 24.0.5 |
| `Docker-compose`     | 1.29.2 |
| `Python`             | 3.10.12
| `Node.js`            | 20.8.0 (LTS) |
| `NPM`            | 10.1.0 |
| `YARN`            | 1.22.19 |

## Run on local
```
$ yarn install
$ yarn start:local
```

## Run on docker
```
$ docker-compose -f infra/local.docker-compose.yaml up -d --build
```

### Migration
```
$ docker exec layered_koa_server /bin/sh -c "yarn run migration:up"
```
