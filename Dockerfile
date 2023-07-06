FROM node:14-alpine

WORKDIR /redikawest/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]