import Winston from 'winston'
import {WinstonConfiguaration} from "../config";
import {DateTime} from "../utils";

class LoggerService {
    /**
     * @remarks
     *  Prints a detailed warning message with its corresponding attributes
     *  _Warn logs are usually exported to this file_: {@link https://github.com/Mhmdhammoud/mr-green-main/blob/master/logs/info.log}
     * @param className - The name of the class that generated the log
     * @param functionName - The email of the recipient
     * @param logMessage - The text to be sent
     * @param userIp - The user's IP Address
     * @param data - The text to be sent
     * @remarks
     * @returns void
     */
    info(className: string, functionName: string, logMessage: string, userIp: string, data: Object = {}) {
        Winston.createLogger(WinstonConfiguaration).info({
            date: DateTime.millisecondsToYMD(new Date().getTime()),
            timestamp: new Date().getTime(),
            className: className,
            functionName: functionName,
            logMessage: logMessage,
            userIp: userIp,
            data,
        });
    }

    /**
     * @remarks
     *  Prints a detailed warning message with its corresponding attributes
     *  _Warn logs are usually exported to this file_: {@link https://github.com/Mhmdhammoud/mr-green-main/blob/master/logs/warn.log}
     * @param className - The name of the class that generated the log
     * @param functionName - The email of the recipient
     * @param logMessage - The text to be sent
     * @param userIp - The user's IP Address
     * @param data - The text to be sent
     * @remarks
     * @returns void
     */
    warn(className: string, functionName: string, logMessage: string, userIp: string, data: Object = {}) {
        Winston.createLogger(WinstonConfiguaration).warn({
            date: DateTime.millisecondsToYMD(new Date().getTime()),
            timestamp: new Date().getTime(),
            className: className,
            functionName: functionName,
            logMessage: logMessage,
            userIp: userIp,
            data,
        });
    }

    /**
     * @remarks
     *  Prints a detailed warning message with its corresponding attributes
     *  _Warn logs are usually exported to this file_: {@link https://github.com/Mhmdhammoud/mr-green-main/blob/master/logs/error.log}
     * @param className - The name of the class that generated the log
     * @param functionName - The email of the recipient
     * @param logMessage - The text to be sent
     * @param userIp - The user's IP Address
     * @param data - The text to be sent
     * @remarks
     * @returns void
     */
    error(className: string, functionName: string, logMessage: string, userIp: string, data: Object = {}) {
        Winston.createLogger(WinstonConfiguaration).error({
            date: DateTime.millisecondsToYMD(new Date().getTime()),
            timestamp: new Date().getTime(),
            className: className,
            functionName: functionName,
            logMessage: logMessage,
            userIp: userIp,
            data,
        });
    }
}

const Logger = new LoggerService()
export default Logger
