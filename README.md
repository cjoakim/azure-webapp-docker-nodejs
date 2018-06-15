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