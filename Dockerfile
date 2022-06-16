from node:18

ENV API_PORT=3000

RUN mkdir -p /articles/src/app

WORKDIR /articles/src/app

COPY package*.json ./

RUN ["npm", "install"]


COPY . .

RUN ["npm", "run", "build"]

EXPOSE 3000

CMD ["npm", "run", "start"]