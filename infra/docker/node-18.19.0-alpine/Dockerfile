# local only base image because alpine not support dns caching on os level
# node depends on os level dns caching
FROM node:18.19.0-alpine AS build

# Install dependencies
WORKDIR /build
COPY ./package*.json ./
COPY ./.npmrc ./
RUN npm install
COPY ./nx.json ./
COPY ./tsconfig.*.json ./
COPY ./apps/service-app ./apps/service-app
COPY ./libs ./libs
RUN npx nx build service-app

FROM node:18.19.0-alpine
WORKDIR /usr/src/app

RUN apk add --no-cache curl

COPY --from=build /build/dist/apps/service-app/package*.json ./
COPY --from=build /build/apps/service-app/swagger.json ./apps/service-app/swagger.json
RUN npm install --only=production
RUN npm install -g ts-node
RUN npm install tsconfig-paths
RUN npm install @mikro-orm/cli@6.1.3

COPY --from=build /build/dist/ ./dist/
COPY --from=build /build/apps/service-app/migrations/ ./apps/service-app/migrations/
COPY --from=build /build/apps/service-app/migrations-cms/ ./apps/service-app/migrations-cms/
COPY --from=build /build/apps/service-app/tsconfig*.json ./apps/service-app/
COPY --from=build /build/tsconfig.*.json ./
# TODO: 전체소스코드 용량이 2mb이하라 전체 추가하였음. 추후에 entity 파일만 가져오도록 수정 필요
COPY --from=build /build/apps/service-app/src/ ./apps/service-app/src/
COPY --from=build /build/libs ./libs

# Generate static swagger json
# RUN NODE_ENV=development swaggerDoc=true node dist/apps/service-app/main.js

# Run the application under "node" user by default
RUN chown -R node:node .
USER node
EXPOSE 3000

# TODO: tx 에러 해결 후 DEBUG=knex:tx 제거 예정
ENV DEBUG knex:tx

CMD ["node", "./dist/apps/service-app/main.js"]
