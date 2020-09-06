#!/bin/bash

cd server
node static.js
node index.js

cd ../tea_app
npm run start