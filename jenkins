#!/bin/sh
ssh root@gosu.team <<EOF
    cd /home/fptu/fe
    git checkout .
    git pull
    yarn
    yarn build
    pm2 reload www.fptu
    exit
EOF