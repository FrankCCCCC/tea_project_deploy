# TAG: tea_app
# FROM node_react_nginx_pre_build
FROM nginx
RUN apt-get update
RUN apt-get install curl sudo -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt install nodejs -y
RUN npm install react-scripts -g

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ./files /tea_app
WORKDIR /tea_app
# RUN npm install
RUN npm run build

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]