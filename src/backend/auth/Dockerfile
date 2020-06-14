FROM node:14-alpine

WORKDIR /app
COPY package*.json /app/
COPY src /app/src
COPY webpack.config.js tsconfig.json /app/

RUN npm install

ENV NODE_ENV production
RUN npm run build

# czyszczenie
RUN npm prune
RUN rm -rf src webpack.config.js tsconfig.json

CMD ["npm", "run", "server-auth"]