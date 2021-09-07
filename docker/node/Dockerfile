FROM node:15-alpine

RUN apk --update add --no-cache curl git python alpine-sdk \
  bash autoconf libtool automake

# add bash
RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /opt/nebula-docker-test
COPY package.json .
RUN npm install sodium-native
RUN npm install --quiet
COPY . .
