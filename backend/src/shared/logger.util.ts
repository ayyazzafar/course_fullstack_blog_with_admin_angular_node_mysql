import { createLogger, format, transports } from "winston";


const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf(({
            level, message, timestamp, stack
        })=>{
            return `${timestamp} ${level}: ${message} | ${stack || ''}`
        })
    ),
    transports:[
        new transports.File({filename: 'error.log'}),
        new transports.Console()
        
    ]
})

export default logger;