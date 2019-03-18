FROM node:10.15.0 as builder

# Create working directory
RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY . .

# Fetch dependencies, run script optimize images, build
RUN npm ci
RUN npm run build

# Copy files to machine
FROM node:10.15.0-alpine

WORKDIR /root/src/app

COPY --from=builder /root/src/app/package.json /root/src/app/package.json
COPY --from=builder /root/src/app/dist /root/src/app/dist

EXPOSE 3000

# Set command
ENTRYPOINT ["npm","run"]

# This is docker build command: 
# docker build -t fptu-fe .

# This is docker run command:
# docker run -d --name fptu-fe -p 3001:3000 fptu-fe:latest start:prod
