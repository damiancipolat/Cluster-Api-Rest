//Include process manager.
const Manager   =  require('./manager/manager.js');
const apiServer =  require('../api/api.js');
const messeger  =  require('./manager/messages.js');

//Include config.
const config =  require('../config/config.json');

//Master process class.
class Master{

  constructor(cluster){

    //Create administrative structures.
    this.workerIds     = [];
    this.messageBuffer = [];
    this.cluster       = cluster;

  }

  //Main process function.
  run(){

    //Create first the workers.
    this.createWorkers();

    //Create the api-rest.  
    apiServer(this)
      .then((app)  => console.log('Api - rest ok'))
      .catch((err) => console.log(err));

  }

  //Send message to one worker, its called from the api.
  sendToWorker(res,msg){

    //Get the object that select the worker.
    let manage = new Manager(config.workers.planifier,this.workerIds);

    //Get the process id.
    let pId = manage.planify();

    //Create message to send a worker.
    let msg = messeger.toWorker(pId,msg.type,msg.payload);    

    //Add the msg to the buffer.
    this.messageBuffer[msg.id] = {
      origin : msg,
      reply  : null,
      client : res
    };

    //Send message to the cluster.
    this.cluster.workers[pId].send(msg);

    return msg;

  }

  //Create the workers.
  createWorkers(){

    for (let i = 0; i <= config.workers.number-1; i++)
      this.cluster.fork();

    for (const id in this.cluster.workers){    
    
      //Register worker in worker list.
      this.workerIds.push(id);

      //Define handler.
      this.cluster.workers[id].on('message',this.onWorkerMsg);
    
    }

  }

  //When receive a msg from the workers.
  onWorkerMsg(msg){

    if ((msg.replyTo!=null)&&(this.messageBuffer[msg.replyTo]!=undefined)){

      //Store the reply in the buffer.
      this.messageBuffer[msg.replyTo].reply = msg;

      //Send the response to the client.
      this.messageBuffer[msg.replyTo].client.json({response:msg.payload});

    }

  }

}

module.exports = Master;