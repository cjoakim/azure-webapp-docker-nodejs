# azure-webapp-docker-nodejs

A simple node.js/express containerized webservice application


## Build and Run the App Locally

Check your node.js environment:
```
$ node --version
v8.11.3

$ npm --version
6.1.0
```

Pull the code and install the node.js libraries:
```
$ git clone git@github.com:cjoakim/azure-webapp-docker-nodejs.git
cd azure-webapp-docker-nodejs

npm install
```

Build the Docker image:
```
docker build -t cjoakim/webapp-docker-nodejs .
...
Successfully built 7812c2c8279c
Successfully tagged cjoakim/webapp-docker-nodejs:latest
```

Run the Web App:
```
docker run -d -e PORT=8080 -p 8080:8080 cjoakim/webapp-docker-nodejs:latest
```

Point your browser to:
```
http://localhost:8080/
```

Invoke the one webservice endpoint:
```
curl -v http://localhost:8080/admin/ping
```

## Push Image to DockerHub

```
$ docker push cjoakim/webapp-docker-nodejs:latest

The push refers to repository [docker.io/cjoakim/webapp-docker-nodejs]
69b432bca877: Pushed
4c187451de7b: Pushed
95c5e03ac0d6: Layer already exists
9781a4b557c7: Layer already exists
9ceb65bfc1c5: Layer already exists
0b3c2dee153a: Layer already exists
9ba7f6deb379: Layer already exists
f3693db46abb: Layer already exists
bb6d734b467e: Layer already exists
5f349fdc9028: Layer already exists
2c833f307fd8: Layer already exists
latest: digest: sha256:c634aa7ae5da495a0a795b2eb80866e94a97e9637a4fcb5cae60743e3572207a size: 2632
```


Deploy to an Azure Linux/Docker App Service:
```
curl -v https://cjoakim-webapp-docker-nodejs.azurewebsites.net/
curl -v https://cjoakim-webapp-docker-nodejs.azurewebsites.net/admin/ping
```

## Push Image to Azure Container Registry

```
$ az acr login --name cjoakimacr --resource-group cjoakim-containers --username cjoakimacr
Password:
Login Succeeded

$ docker push cjoakimacr.azurecr.io/webapp-docker-nodejs:latest
```

## Azure Container Instance

Create and deploy a CI with the Azure CLI:
```
az container create --resource-group cjoakim-containers --name webapp-docker-nodejs --image cjoakimacr.azurecr.io/webapp-docker-nodejs:latest --cpu 1 --memory 1 --registry-username cjoakimacr --registry-password $AZURE_CONTAINER_REGISTRY_USER_PASS --dns-name-label webapp-docker-nodejs --ports 80 -e 'PORT=80'

{
  "containers": [
    {
      "command": null,
      "environmentVariables": [
        {
          "name": "PORT",
          "secureValue": null,
          "value": "80"
        }
      ],
      "image": "cjoakimacr.azurecr.io/webapp-docker-nodejs:latest",
      "instanceView": {
        "currentState": {
          "detailStatus": "",
          "exitCode": null,
          "finishTime": null,
          "startTime": "2018-07-07T16:58:43+00:00",
          "state": "Running"
        },
        "events": [
          {
            "count": 1,
            "firstTimestamp": "2018-07-07T16:57:48+00:00",
            "lastTimestamp": "2018-07-07T16:57:48+00:00",
            "message": "pulling image \"cjoakimacr.azurecr.io/webapp-docker-nodejs:latest\"",
            "name": "Pulling",
            "type": "Normal"
          },
          {
            "count": 1,
            "firstTimestamp": "2018-07-07T16:58:43+00:00",
            "lastTimestamp": "2018-07-07T16:58:43+00:00",
            "message": "Successfully pulled image \"cjoakimacr.azurecr.io/webapp-docker-nodejs:latest\"",
            "name": "Pulled",
            "type": "Normal"
          },
          {
            "count": 1,
            "firstTimestamp": "2018-07-07T16:58:43+00:00",
            "lastTimestamp": "2018-07-07T16:58:43+00:00",
            "message": "Created container with id 90a34bff15ad9f2de6e575080bd8fa2aa8b050003aa40559588f3caeafca207c",
            "name": "Created",
            "type": "Normal"
          },
          {
            "count": 1,
            "firstTimestamp": "2018-07-07T16:58:43+00:00",
            "lastTimestamp": "2018-07-07T16:58:43+00:00",
            "message": "Started container with id 90a34bff15ad9f2de6e575080bd8fa2aa8b050003aa40559588f3caeafca207c",
            "name": "Started",
            "type": "Normal"
          }
        ],
        "previousState": null,
        "restartCount": 0
      },
      "livenessProbe": null,
      "name": "webapp-docker-nodejs",
      "ports": [
        {
          "port": 80,
          "protocol": "TCP"
        }
      ],
      "readinessProbe": null,
      "resources": {
        "limits": null,
        "requests": {
          "cpu": 1.0,
          "memoryInGb": 1.0
        }
      },
      "volumeMounts": null
    }
  ],
  "diagnostics": null,
  "id": "/subscriptions/xxxxxxxxxxxxx/resourceGroups/cjoakim-containers/providers/Microsoft.ContainerInstance/containerGroups/webapp-docker-nodejs",
  "imageRegistryCredentials": [
    {
      "password": null,
      "server": "cjoakimacr.azurecr.io",
      "username": "cjoakimacr"
    }
  ],
  "instanceView": {
    "events": [],
    "state": "Running"
  },
  "ipAddress": {
    "dnsNameLabel": "webapp-docker-nodejs",
    "fqdn": "webapp-docker-nodejs.eastus.azurecontainer.io",
    "ip": "40.114.76.14",
    "ports": [
      {
        "port": 80,
        "protocol": "TCP"
      }
    ]
  },
  "location": "eastus",
  "name": "webapp-docker-nodejs",
  "osType": "Linux",
  "provisioningState": "Succeeded",
  "resourceGroup": "cjoakim-containers",
  "restartPolicy": "Always",
  "tags": {},
  "type": "Microsoft.ContainerInstance/containerGroups",
  "volumes": null
}
```

Visit with your browser: http://webapp-docker-nodejs.eastus.azurecontainer.io/
