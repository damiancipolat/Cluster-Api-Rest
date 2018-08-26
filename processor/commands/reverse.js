const calc = (msg)=>{

  return  msg.payload.name.split("").reverse().join("");
  
}

module.exports = calc;