#!/bin/sh
ssh root@gosu.team <<EOF
    cd /home/fptu/fe
    git checkout .
    git pull
    sudo docker build -t fptu-fe .
    docker stop fptu-fe
    docker rm fptu-fe
    docker run -d --name fptu-fe -p 3000:3000 fptu-fe:latest
    exit
EOF
