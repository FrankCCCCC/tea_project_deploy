#!/bin/bash

node ./server/static_server/files/static.js
node ./server/db_server/files/index.js

cd ../tea_app
npm run start