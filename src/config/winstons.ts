import winston from 'winston'

const loggerConfiguration = {
    transports: [
        new (winston.transports.File)({
            level: "warn",
            filename: "logs/warn.log",
            format: winston.format.combine(winston.format.json()),
        }),
        new (winston.transports.File)({
            level: "error",
            filename: "logs/error.log",
            format: winston.format.combine(winston.format.json()),
        }),
        new (winston.transports.File)({
            level: "info",
            filename: "logs/all.log",
            format: winston.format.combine(winston.format.json()),
        })
    ],
};

export default loggerConfiguration
