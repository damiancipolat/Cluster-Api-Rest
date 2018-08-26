//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');
const cluster    = require('cluster');

//Include config file.
const config    = require('../config/config.json');

//Include custom modules.
const apiEvents  = require('./api-events.js');

//Start Express-js
const app    = express();
const server = http.createServer(app);

//Add bodyparser and CORS.
app.use(bodyParser.json());
app.use(apiEvents.CORS);

//Start api-rest server.
const start = async (master)=>{

  app.get('/test',(req,res)=>{

    //sendToWorker(res,);
    //sendMsg(req,res);
    console.log(req.headers,req.body,req.params);
    res.json({"test":123456789});

  });

  try{

    //Start listen mode.
    return await app.listen(config.server.port,config.server.ip,apiEvents.onListen);

  } catch(err){
    return err;
  }

}

//Handle process server.
process.on('SIGTERM', apiEvents.onClose);
process.on('SIGINT',  apiEvents.onClose)
process.on('uncaughtException', apiEvents.onError);

module.exports = start ;