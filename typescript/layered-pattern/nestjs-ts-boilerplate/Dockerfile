FROM node:20.9.0-alpine

# Set timezone to KST
ENV TZ="Asia/Seoul"

# Set working directory
RUN rm -rf /home/node/app
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install packages
COPY yarn.lock *.json ./
COPY .env ./
RUN yarn install --production --frozen-lockfile

# Set user
RUN chown -R node:node /home/node/app
USER node

# Bundle app source
COPY --chown=node:node . .

ENV LISTEN_PORT=5000
EXPOSE 5000

CMD [ "yarn", "start" ]
