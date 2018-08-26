const cluster  = require('cluster');

//Include custom modules.
const Master   = require('./processor/master.js');
const worker   = require('./processor/worker.js');

//Switch between master and worker.
if (cluster.isMaster){

 //Create master class.
 let core = new Master(cluster);

 //Start process.
 core.run();

}
else
  worker();