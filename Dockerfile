#This image uses NodeJS 18
FROM node:18

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

#Internal port
EXPOSE 3000

CMD [ "npm", "run", "start" ]