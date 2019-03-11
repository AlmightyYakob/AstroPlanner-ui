FROM node:8

WORKDIR /app

COPY package.json ./
COPY src ./src

RUN yarn install
RUN yarn build
