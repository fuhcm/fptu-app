FROM node:8.12.0 as builder

# Create working directory
RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY . .

# Fetch dependencies, run script optimize images, build
RUN yarn
RUN npm run build

# Copy files to machine
FROM node:8.12.0-alpine

WORKDIR /root/src/app

COPY --from=builder /root/src/app/package.json /root/src/app/package.json
COPY --from=builder /root/src/app/dist /root/src/app/dist

# Expose port
EXPOSE 3000

# Set command
CMD ["npm","run","start"]

# This is docker build command: 
# sudo docker build -t fptu-fe .

# This is docker run command:
# sudo docker run -dit -p 3000:3000 fptu-fe:latest
