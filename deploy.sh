ssh root@5.247.181.39 <<EOF
    cd /home/fuhcm/fptu-app
    git checkout .
    git pull origin develop
    npm run build
    pm2 reload frontend
    exit
EOF
