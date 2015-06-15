#FreelanceApp
===========================

We created this app as a school project. It's our first time that we used [AngularJS](https://angularjs.org/), [MongoDB](https://www.mongodb.org/) and [Sails](http://sailsjs.org/#!/).

##Installation Manual Sails Backend
==================================

* Open your terminal
* Change the directory to "backend" folder from our app
* Run
```
npm install
```
* Install and start MongoDB:
```
npm install sails-mongo 
mongod --config /usr/local/etc/mongod.conf
```
* Create database and databaseuser:
```
use freelancetool
db.createUser({user: "backend", pwd: "backend1234", roles:[{role: "readWrite", db: "freelancetool"}]})
```
* Open new terminal tab and start the API:
```
node app.js
```
