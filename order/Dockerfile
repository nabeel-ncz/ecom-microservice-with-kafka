FROM node:alpine
WORKDIR /order
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4004
CMD ["npm", "run", "dev"]