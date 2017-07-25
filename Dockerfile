# https://ipfs.io/blog/1-run-ipfs-on-docker/
# https://capgemini.github.io/blockchain/ethereum-docker-compose/

# docker run -i --net=host ipfs/go-ipfs

FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install 
RUN npm run testrpc 

EXPOSE 3000

CMD [ "npm", "run", "start" ]