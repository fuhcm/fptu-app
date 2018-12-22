#!/bin/sh    
cd /home/fptu/fe
git pull
yarn
yarn build
pm2 reload www.fptu
exit