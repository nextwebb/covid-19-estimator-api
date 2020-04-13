const dotenv = require('dotenv')
dotenv.config()
const mongodb = require('mongodb')

// eslint-disable-next-line max-len
mongodb.connect(process.env.CONNECTIONSTRING, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
    if (err){
        console.log('database could not connect!')
    } else{
        // This anonymous function auto runs and mutates the variable "db", upon connection
  module.exports = client
  const app = require('./app')
  app.listen(process.env.PORT);// only upon connection should you listen to this port
  console.log(`Listening on port ${process.env.PORT}`);
    } 
  
});