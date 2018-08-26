# Cluster-Api-Rest
In this project, I create a base Api Rest template using Nodejs & expressjs, but including the cluster module feature. So this nodejs process create other "children" process using fork, to solve and process each request.

### Configuration:
Go to ./config/config.json
```json
{
  "server":{
    "ip"   : "127.0.0.1",
    "port" : 9080
  },
  "workers" : {
    "number"    : 4,
    "planifier" : "random"
  }
}
```

### Install:
```sh
 $ npm install
 $ npm start
```
