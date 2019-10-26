FROM node:10.17.0 as builder

RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:10.17.0-alpine

WORKDIR /root/src/app

COPY --from=builder /root/src/app/dist /root/src/app/dist

EXPOSE 3000

ENTRYPOINT ["node","./dist/server/server.js"]

# This is docker build command: 
# docker build -t fptu-app .

# This is docker run command:
# docker run -d --name fptu-app -p 3001:3000 fptu-app:latest
