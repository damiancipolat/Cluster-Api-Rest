# Cluster-Api-Rest
In this project, I create a base Api Rest template using Nodejs & expressjs, but including the cluster module feature. So this nodejs process create other "children" process using fork, to solve and process each request.

### Configuration:
Go to ./config/config.json
```json
{
  "server":{
    "ip"   : "127.0.0.1", --> Ip addres to bind socket
    "port" : 9080         --> Port  
  },
  "workers" : {
    "number"    : 4,       --> Define the number of child process      
    "planifier" : "random" --> Define planification alghoritm only random available.
  }
}
```

### Install:
```sh
 $ npm install
 $ npm start
```
