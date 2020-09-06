#!/bin/bash
# Please copy this file under a folder directly
echo "Executing install.sh"

# Create Folder "tea_files"
mkdir tea_files

cd tea_files

# Install Curl
apt-get update -y

apt install curl sudo gcc g++ make -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt install nodejs -y

# Install Postgresql
sudo apt update -y

sudo apt install postgresql postgresql-contrib -y

# Install Docker
sudo apt-get remove docker docker-engine docker.io containerd runc -y

sudo apt-get update -y

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable" -y

sudo apt-get update -y

sudo apt-get install docker-ce docker-ce-cli containerd.io -y

sudo groupadd docker

sudo usermod -aG  docker $USER

newgrp docker

sudo docker run hello-world

# Install Docker-Compose

sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# Install NGINX

sudo apt-get install nginx

# Install Jenkins

sudo apt-get install openjdk-8-jdk

wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -

echo "deb https://pkg.jenkins.io/debian-stable binary/"  >> /etc/apt/sources.list

sudo apt-get update -y

sudo apt-get install jenkins -y

# Clone Repository
git clone https://github.com/FrankCCCCC/tea_project.git

cd tea_project/server

npm install

cd ../tea_app

npm install

# Set up database
sudo service postgresql start

sudo -u postgres psql --command '\password tea_psql'


# Test Installation
curl --version

node --version

npm --version

docker --version

docker-compose --version

psql --version