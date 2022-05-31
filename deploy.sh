#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
# git checkout -b main
git add -A
git commit -m 'finish Tracker'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
#git push -f https://github.com/kikmiao1995/vue3-demo.git main:gh-pages # https
git push -f git@github.com:kikimiao1995/vue3-demo.git main:gh-pages # ssh

cd -