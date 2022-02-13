ARG NODEJS_VERSION=latest
FROM node:$NODEJS_VERSION as app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

RUN echo "NODE_ENV => $NODE_ENV"

WORKDIR /usr/app
COPY package*.json ./

RUN npm install && npx prisma generate

COPY . .

RUN chown -R node: /usr/app
USER node

EXPOSE 8080
CMD ["npm", "run", "dev"]
