FROM node:10.15.3-alpine as builder

RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

COPY . .

RUN npm ci

EXPOSE 3000

ENTRYPOINT ["npm","run","dev"]

# This is docker build command: 
# docker build -f dev.Dockerfile -t fptu-fe-dev .

# This is docker run command:
# docker run -it -p 3001:3001 -v /Users/tuhuynh/Desktop/Gosu/fptu-fe/src:/root/src/app/src fptu-fe-dev:latest
