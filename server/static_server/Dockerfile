# # TAG: db_server
# FROM ubuntu
# RUN apt-get update
# # RUN apt-get install curl sudo iputils-ping net-tools -y
# RUN apt-get install curl sudo -y
# RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
# RUN sudo apt install nodejs -y

# COPY ./files /static_server
# WORKDIR /static_server
# RUN npm install
# RUN npm install mocha -g

# EXPOSE 5000
# ENTRYPOINT ["npm", "run", "start"]

# TAG: db_server
FROM nginx
# RUN sed -i '/jessie-updates/d' /etc/apt/sources.list  # Now archived
RUN apt-get update
RUN apt-get install curl sudo -y

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ./files/public /static_server/public
WORKDIR /static_server

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
