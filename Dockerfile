FROM node:latest
MAINTAINER Chris Joakim

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# Install app dependencies
COPY . /app

RUN npm install

EXPOSE 80
CMD [ "node", "bin/www.js" ]



# Docker commands:
# docker build -t cjoakim/webapp-docker-nodejs . 
# docker run -d -p 3000:3000 cjoakim/webapp-docker-nodejs:latest
# docker run -d -p 80:3000 cjoakim/webapp-docker-nodejs:latest
# docker run -e MONGODB_URI=$MONGODB_AZURE_URI -d -p 80:3000 cjoakim/webapp-docker-nodejs:latest 
# docker ps
# docker stop -t 2 86b125ed43e5  (where 86b125ed43e5 is the CONTAINER ID from 'docker ps')
# docker push cjoakim/webapp-docker-nodejs:latest
# docker info cjoakim/webapp-docker-nodejs:latest  ?? no longer valid ??
