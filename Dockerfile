FROM node:16.19.1-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=torretimbo

EXPOSE 3000

CMD [ "npm", "run", "dev" ]