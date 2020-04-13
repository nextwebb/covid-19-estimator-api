const dotenv = require('dotenv')
dotenv.config()
const winston = require('winston');
require('winston-mongodb');
// setup logger

const {createLogger, transports,format} = require('winston');
    require('winston-mongodb');

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'info',
            db: process.env.connectionstring,
            options: {
                useUnifiedTopology: true
            },
            collection: 'logs',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;