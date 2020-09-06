# TAG: db_server
# FROM node_pre_build
FROM ubuntu
RUN apt-get update
RUN apt-get install curl sudo -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt install nodejs -y

COPY ./files /db_server
WORKDIR /db_server
# RUN npm install
RUN npm install mocha -g

EXPOSE 8000
# ENTRYPOINT ["npm", "run", "start"]