FROM node:latest
MAINTAINER Chris Joakim

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

RUN npm install

# Bundle app source
# COPY .  /usr/src/app

EXPOSE 80
CMD [ "node", "bin/www" ]



# Docker commands:
# docker build -t cjoakim/webapp-docker-nodejs . 
# docker run -d -e PORT=8080 -p 8080:8080 cjoakim/webapp-docker-nodejs:latest
# docker run -e MONGODB_URI=$MONGODB_AZURE_URI -d -p 80:3000 cjoakim/webapp-docker-nodejs:latest 
# docker ps
# docker stop -t 2 86b125ed43e5  (where 86b125ed43e5 is the CONTAINER ID from 'docker ps')
# docker push cjoakim/webapp-docker-nodejs:latest
#
# docker tag cjoakim/webapp-docker-nodejs:latest cjoakimacr.azurecr.io/webapp-docker-nodejs:latest
# docker push cjoakimacr.azurecr.io/webapp-docker-nodejs:latest
#
# az acr login --name cjoakimacr
# az acr repository list --name cjoakimacr --output table
#