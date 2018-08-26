const cluster  = require('cluster');

//Include custom modules.
const Master   = require('./processor/master.js');
const worker   = require('./processor/worker.js');

//Switch between master and worker.
if (cluster.isMaster){

 //Start process.
 Master.run(cluster);

}
else
  worker();