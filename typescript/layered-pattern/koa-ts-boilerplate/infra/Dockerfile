FROM node:20.8.0-alpine

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

ENV PORT=3000
EXPOSE 3000

CMD [ "yarn", "start" ]