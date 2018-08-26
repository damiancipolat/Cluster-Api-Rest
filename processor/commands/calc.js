const calc = (msg)=>{

  let n1 = parseInt(msg.payload.n1);
  let n2 = parseInt(msg.payload.n2);

  return  n1+n2;

}

module.exports = calc;