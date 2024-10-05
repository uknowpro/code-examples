# local only base image because alpine not support dns caching on os level
# node depends on os level dns caching
FROM node:20.9.0-alpine

# Install dependencies
WORKDIR /usr/src/app
COPY ./dist/apps/backend/package*.json ./
RUN npm install --only=production
# RUN npm install @mikro-orm/seeder@6.1.3

# Copy built backend application files
COPY ./dist/ ./dist/
COPY ./apps/backend ./apps/backend

# Generate static swagger json
# RUN isGenSwagger=true node dist/apps/backend/main.js

# Run the application under "node" user by default
RUN chown -R node:node .
USER node
EXPOSE 3000

CMD ["node", "./dist/apps/backend/main.js"]
