FROM node:22 AS build

WORKDIR /

COPY . .

RUN npm install

RUN npm run build

# stage: production
FROM node:22.6.0-alpine3.19

WORKDIR /apps/replies

COPY --from=build ./dist .

COPY ./.env ./.env

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 8000

# start
CMD ["npm", "run", "start"]