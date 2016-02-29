#!/bin/bash
cd /tmp/epub/server/
npm install

#install nodemon on (part of the package.json)
#install mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
#sudo apt-get install -y mongodb-org=3.2.3 mongodb-org-server=3.2.3 mongodb-org-shell=3.2.3 mongodb-org-mongos=3.2.3 mongodb-org-tools=3.2.3
sudo service mongod start

ln -s /usr/bin/nodejs /usr/bin/node
npm start


cd /tmp/epub/client
npm install
bower install --allow-root


