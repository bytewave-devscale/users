FROM node:20

WORKDIR /app/user

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]