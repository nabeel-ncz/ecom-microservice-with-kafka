FROM node:alpine

WORKDIR /cart

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4004

CMD ["npm", "start"]