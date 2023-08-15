# syntax=docker/dockerfile:1

FROM node:20-slim

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500

CMD ["node" , "server.js"]
