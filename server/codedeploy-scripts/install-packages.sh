#!/bin/bash
cd /tmp/epub/server/
npm install

cd /tmp/epub/client
npm install
bower install
grunt
