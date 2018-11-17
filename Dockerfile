FROM node:8.12.0 as builder

# Create working directory
RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY . .

# Fetch dependencies, run script
RUN npm install
RUN npm run build

# Copy files to machine

FROM node:8.12.0-alpine

WORKDIR /root/src/app

COPY --from=builder /root/src/app/package.json /root/src/app/package.json
COPY --from=builder /root/src/app/build /root/src/app/build
COPY --from=builder /root/src/app/node_modules /root/src/app/node_modules

# Set command
CMD ["npm","run","start"]

# Expose port
EXPOSE 3000

# This is docker build command: 
# sudo docker build -t cfapp-fe" .

# This is docker run command:
# sudo docker run -dit -p 3000:3000 cfapp-fe:latest