FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY ./src ./src

RUN npm run build
RUN rm -r ./src
RUN npm prune --production

EXPOSE 8080

CMD [ "npm", "start" ]
