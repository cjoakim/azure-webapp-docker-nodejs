# azure-webapp-docker-nodejs

A simple node.js/express containerized webservice application


## Running the App Locally

```
docker run -d -p 80:3000 cjoakim/webapp-docker-nodejs:latest 
```

Point your browser to:
```
http://localhost
```

Invoke the one webservice endpoint:
```
curl -v http://localhost/admin/ping
```

Deploy to an Azure Linux/Docker App Service:
```
curl -v https://cjoakim-webapp-docker-nodejs.azurewebsites.net/
curl -v https://cjoakim-webapp-docker-nodejs.azurewebsites.net/admin/ping
```