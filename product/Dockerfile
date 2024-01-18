FROM node:alpine
WORKDIR /product
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4002
CMD ["npm", "run", "dev"]