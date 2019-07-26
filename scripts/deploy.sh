#!/bin/bash

echo "Building..."
rm -rf dist
npm run build
echo "Done build, uploading..."
zip -r dist dist
scp dist.zip root@35.227.163.70:/home/webapp/dist.zip
ssh root@35.227.163.70 <<EOF
    cd /home/webapp
    rm -rf dist
    unzip dist.zip
    rm -rf dist.zip
    pm2 stop server
    pm2 delete server
    pm2 start ./dist/server/server.js
    exit
EOF
rm -rf dist.zip
echo "Done deploy!"
