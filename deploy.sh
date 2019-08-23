#!/bin/bash

tar czf dsc.tar.gz config middleware models modules public routes views index.js package.json .env

scp dsc.tar.gz nhas.me:~

rm dsc.tar.gz

ssh nhas.me << 'ENDSSH'

rm -rf dsc

mkdir dsc

tar xf dsc.tar.gz -C dsc

cd dsc
npm i
pm2 restart dsc
rm ../dsc.tar.gz
pm2 logs dsc
exit
ENDSSH