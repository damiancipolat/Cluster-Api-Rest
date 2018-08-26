//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');

//Include config file.
const config    = require('../config/config.json');

//Include custom modules.
const apiEvents  = require('./api-events.js');
const messages   = require('../processor/manager/messages.js');

//Start Express-js
const app    = express();
const server = http.createServer(app);

//Add bodyparser and CORS.
app.use(bodyParser.json());
app.use(apiEvents.CORS);

//Start api-rest server.
const start = async (master)=>{

  //Reverse the parameter name
  app.get('/sum/:n1/:n2',(req,res)=>{
    master.sendToWorker(res,messages.baseMsg('sum',req.params));
  });

  //Reverse the parameter name
  app.get('/reverse/:name',(req,res)=>{
    master.sendToWorker(res,messages.baseMsg('reverse',req.params));
  });

  app.get('*',(req,res)=>{
    res.status(400).json({"error":"bad request"});
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