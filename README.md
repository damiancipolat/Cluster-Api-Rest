# Cluster-Api-Rest
In this project, I create a base Api Rest template using Nodejs & expressjs, but including the cluster module feature. So this nodejs process create other "children" process using fork, to solve and process each request.

### Configuration:
Go to ./config/config.json
```sh
{
  "server":{
    "ip"   : "127.0.0.1", // Ip addres to bind socket
    "port" : 9080         // Port  
  },
  "workers" : {
    "number"    : 4,       // Define the number of child process      
    "planifier" : "random" // Define planification alghoritm only random available.
  }
}
```

### Install:
Follow this steps.
```sh
 $ npm install
 $ npm start
```

### Scaffolding:
This is the directory structure

```sh
/api
  - api.js        (Expressjs server, modify from line 24 to add new routes) 
  - api-events.js (Auxiliary module, don'y modif)
/config
  - config.json   (Configuration file)
/lib
  - lib.js        (Library file, do'nt modify)
/processor
  /manager
   - helper      (Auxiliary functions)
   - messages.js (IPC messages functions)
   - manager.js  (Function with process planification alghoritms)
  /commands
    - calc.js    (Command file to process /sum/ url)
    - reverse.js (Command file to process /reverse/ url)
  - master.js    (Main process function, do'nt touch)
  - worker.js    (File to manage each api request, continuation to api.js)
```

### Test:
Examples, to try the apirest.

http://127.0.0.1:9080/reverse/damian

http://127.0.0.1:9080/sum/2/6

### To Do:
- Parallel processing: Include the bind of process to each cpu using taskset command.
- Improve the communication method: make a more transparent way to handle the communication.
