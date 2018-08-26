const cluster    = require('cluster');
const processObj = require('process');
const lib 	     = require('../lib/lib.js');

const onMasterMsg = (msg)=>{

  console.log('Received msj from master',msg);

  if (msg.type=='boostrap'){
  	console.log('recibi');
  }

  if (msg.type=='test'){
  	console.log('recibi');
  }

  let payload = lib.getRandomInt(0,100);

  process.send(lib.toMaster(msg.id,'response',payload));

}

const worker = ()=>{

  console.log('> worker STARTED',processObj.pid);  
  process.on('message',onMasterMsg);

}



module.exports = worker;