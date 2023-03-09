FROM node:18 as builder

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /app .

COPY . .

EXPOSE 4000

ENTRYPOINT [ "npm", "run", "start" ]