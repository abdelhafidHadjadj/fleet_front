FROM node:18-alpine as builder

WORKDIR /front_app

COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine as express_server

WORKDIR /app

COPY --from=builder /front_app/build /app/build

COPY --from=builder /front_app/server.js /app/server.js

COPY --from=builder /front_app/package.json /app/package.json
RUN npm install express

EXPOSE 8000
CMD [ "node", "server.js" ]