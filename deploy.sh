#!/bin/bash
rm -rf build
yarn build
pm2 reload www.fptu