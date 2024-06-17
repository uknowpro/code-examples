FROM node:20.9.0-alpine
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# Set timezone to KST
ENV TZ="Asia/Seoul"

# Set working directory
RUN rm -rf /home/node/app
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install packages
COPY yarn.lock *.json ./
RUN yarn install --frozen-lockfile

# Set user
RUN chown -R node:node /home/node/app
USER node

# Bundle app source
COPY --chown=node:node . .

ENV LISTEN_PORT=3000
EXPOSE 3000

CMD [ "yarn", "start" ]
