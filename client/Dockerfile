FROM node:18 as builder

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.3-alpine as runner

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html