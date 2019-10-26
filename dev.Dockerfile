FROM node:10.17.0-alpine as builder

RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm","run","serve"]

# This is docker build command: 
# docker build -f dev.Dockerfile -t fptu-app-dev .

# This is docker run command:
# docker run -it -p 3001:3001 -v src:/root/src/app/src fptu-app-dev:latest
