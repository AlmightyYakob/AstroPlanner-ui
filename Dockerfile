FROM node:10-alpine

WORKDIR /app

COPY package.json ./
COPY serve.js ./
COPY public ./public
COPY src ./src

RUN yarn install
RUN yarn build

EXPOSE 8001

RUN npm install -g express
CMD ["node", "serve.js"]


