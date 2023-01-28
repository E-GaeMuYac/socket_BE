#!/bin/bash
cd /home/ubuntu/socket_BE
pm2 stop src/server.js 2> /dev/null || true
pm2 delete src/server.js 2> /dev/null || true