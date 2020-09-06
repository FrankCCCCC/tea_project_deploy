#!/bin/bash

# Build Node image
docker build ./node_pre_build -t node_pre_build

# Build Node, React and, Nginx image
docker build ./node_react_nginx_pre_build -t node_react_nginx_pre_build
