FROM node:11
WORKDIR /usr/src/app
COPY package* ./
RUN npm install --production
COPY . . 
EXPOSE 3002
CMD [ "npm", "run", "prod" ]