#!/bin/sh
ssh root@gosu.team <<EOF
    cd /home/fptu/fe
    git checkout .
    git pull
    sudo docker build -t fptu-fe .
    docker stop fptu-fe-staging
    docker rm fptu-fe-staging
    docker stop fptu-fe-production
    docker rm fptu-fe-production
    docker run -d --name fptu-fe-staging -p 3001:3001 fptu-fe:latest
    docker run -d --name fptu-fe-production -p 3000:3000 fptu-fe:latest
    exit
EOF
