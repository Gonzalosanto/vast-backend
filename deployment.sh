#!/bin/bash

#Deployment script for Backend application with MariaDB client.

docker build -t ravads-requestor-backend-img .

docker stop requestor-backend || true
docker rm requestor-backend || true
docker stop requestor-database || true
docker rm requestor-database || true

docker run -d --name requestor-database -e MYSQL_ROOT_PASSWORD=M4p4c63R0ot -e MYSQL_DATABASE=ravads_requestor -p 3306:3306 mariadb

sleep 10

docker run -p 3000:3000 -d --name requestor-backend --link requestor-database:requestor-database ravads-requestor-backend-img

docker ps