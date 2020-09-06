FROM nginx

# RUN apt-get update
# RUN apt-get install curl sudo iputils-ping net-tools -y

RUN rm /etc/nginx/conf.d/default.conf
# COPY index.html /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80