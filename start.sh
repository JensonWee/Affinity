#!/bin/bash
cd Desktop/A*
systemctl start docker
sleep 10
docker-compose up --build