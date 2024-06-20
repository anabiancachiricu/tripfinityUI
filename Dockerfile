FROM node:18.19

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./
COPY angular.json ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./
COPY tsconfig.spec.json ./
COPY src/app ./
COPY src/assets ./
# COPY src/environments/environment.prod.ts ./
# COPY src/environments/environment.ts ./

RUN npm install -g @angular/cli

RUN npm install

COPY ./ .
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]