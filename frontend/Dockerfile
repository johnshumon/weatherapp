## Dockerfile for weatherapp frondend

FROM mhart/alpine-node:8.9.4
MAINTAINER abu shumon <johnshumon@gmail.com>

RUN mkdir -p /weatherapp/frondend
WORKDIR /weatherapp/frondend

COPY package.json .
COPY webpack.config.js .
COPY src ./src

RUN npm install 
RUN ls -la

EXPOSE 8000

CMD ["npm", "start"]