FROM node:latest
WORKDIR /thrive/server
COPY package.json /thrive/server
RUN npm install

COPY . /thrive/server
CMD ["npm", "start"]