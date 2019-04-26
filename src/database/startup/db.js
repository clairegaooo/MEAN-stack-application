const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

winston.add(new winston.transports.File({filename:'../log/logfile.log'}));
module.exports = function(){
  mongoose.connect(config.get('db.conn_str'),{useNewUrlParser:true})
    .then(()=>{
      winston.log('info',"Database connected!")
    })
    .catch((err)=>{
      winston.log("error", err.message);
    });
};
