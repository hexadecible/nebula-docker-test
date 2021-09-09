FROM node:15-buster-slim

RUN apt-get update && apt-get install -y \
  git \
  python \
  bash \
  autoconf \
  automake \
  libtool

WORKDIR /opt/nebula-docker-test

COPY package.json .
RUN npm install sodium-native
RUN npm install --quiet
COPY . .

CMD ["npm", "run", "server"]