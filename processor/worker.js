const cluster    = require('cluster');
const processObj = require('process');

//Include custom modules.
const lib = require('../lib/lib.js');

//Include commands.
const reverseCommand = require('./commands/reverse.js');
const calcCommand    = require('./commands/calc.js');

//Worker process.
class Worker{

  run(){

    console.log('> worker STARTED',processObj.pid);  
    process.on('message',this.onMasterMsg);

  }

  onMasterMsg(msg){

    let result = null;

    //Depends the message, process it.
    if (msg.type=='reverse')
      result = reverseCommand(msg);

    if (msg.type=='sum')
      result = calcCommand(msg);
    
    //Send to the master process the result.
    process.send(lib.toMaster(msg.id,'response',result));

  }

}

module.exports = new Worker();