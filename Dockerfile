FROM node:16-alpine

COPY ./graphql /app

WORKDIR /app

CMD npm install && npm start