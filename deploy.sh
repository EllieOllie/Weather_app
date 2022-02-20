#!/usr/bin/env sh

st -env

npm run build

cd dist

git init
git add -addgit commit -m "new deploy"
git push -f git@github.com:EllieOllie/Weather_app.git main:gh-pages

cd -
