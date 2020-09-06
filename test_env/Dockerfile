# TAG: test_env
FROM ubuntu
RUN apt-get update
RUN apt-get install curl sudo nginx git -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt install nodejs -y

# VOLUME "../../" "/tea_project"
# COPY "../../tea_project" "/tea_project"
RUN git clone https://github.com/FrankCCCCC/tea_project.git
WORKDIR /tea_project
RUN npm install mocha -g

EXPOSE 3000
EXPOSE 5000
EXPOSE 8000
ENTRYPOINT ["node", "-v"]