FROM node:15-buster-slim

WORKDIR /opt/nebula-docker-test

COPY package.json .

RUN apt-get update && apt-get install -y \
  git \
  python \
  bash \
  autoconf \
  automake \
  libtool \
  npm install sodium-native \
  npm install --quiet

COPY . .

CMD ["node", "index.js"]
