## Dockerfile for weatherapp backend

FROM mhart/alpine-node:8.9.4
MAINTAINER abu shumon <johnshumon@gmail.com>

RUN mkdir -p /weatherapp/backend
WORKDIR /weatherapp/backend

COPY package.json .
COPY src ./src

RUN npm install 
RUN ls -la

EXPOSE 9000

CMD ["npm", "start"]