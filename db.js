const dotenv = require('dotenv')
dotenv.config()
const mongodb = require('mongodb')

// eslint-disable-next-line max-len
mongodb.connect(process.env.connectionstring, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
    if (err){
        console.log('database could not connect!')
    }
  // This anonymous function auto runs and mutates the variable "db", upon connection
  module.exports = client.db()
  const app = require('./app')
  app.listen(process.env.port);// only upon connection should you listen to this port
  console.log(`Listening on port ${process.env.port}`);
});