# Transmute Web App Starter Kit

[![Build Status](https://travis-ci.org/transmute-industries/web-app-starter-kit.svg?branch=master)](https://travis-ci.org/transmute-industries/web-app-starter-kit)

This project is under construction. 
There is a lot of extraneous code, which is meant to be used for reference. 


## Dependencies

- Docker
- IPFS

```
$ docker run -i --net=host ipfs/go-ipfs
```

#### make sure to remove node_modules before building docker 

```
$ rm -rf node_modules/
$ docker build -t transmute-web-app-starter-kit-docker .
```

```
$ git clone 
$ cd web-app-starter-kit
$ npm install
$ npm run transmute test
$ npm run ipfs
$ npm run testrpc
$ npm run migrate
$ npm run start
```