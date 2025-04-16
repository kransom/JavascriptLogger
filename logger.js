/*************************

 Logger

 Examples:
 const logger = new Logger(LOGLEVEL.DEBUG); // Set initial log level
 logger.info("User created successfully");
 logger.warn("Low memory", { trace: true });
 logger.error({ error: "Server crashed", code: 500 });
 logger.debug({ session: "abc123", status: "expired" }, { trace: true });

 logger.setLevel(LOGLEVEL.INFO);
 logger.setLevel(1);
 logger.setTrace(true);
 logger.setTrace(false);

********************************/

// Log level enum
const LOGLEVEL = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    OFF: 5,
};

//default trace flag
const LOGLEVELTRACE = false;

class Logger {
    constructor(level = LOGLEVEL.INFO, traceLevel = LOGLEVELTRACE) {
        this.level = level;
        this.traceLevel = traceLevel;
    }

    debug(message, ...args) {
        this.log(LOGLEVEL.DEBUG, message, ...args);
    }

    info(message, ...args) {
        this.log(LOGLEVEL.INFO, message, ...args);
    }

    warn(message, ...args) {
        this.log(LOGLEVEL.WARN, message, ...args);
    }

    error(message, ...args) {
        this.log(LOGLEVEL.ERROR, message, ...args);
    }

    log(logLevel, message, ...args) {
        if (logLevel >= this.level) {
            let logFn;
            switch (logLevel) {
                case LOGLEVEL.TRACE:
                    logFn = console.log;
                    break;
                case LOGLEVEL.DEBUG:
                    logFn = console.debug;
                    break;
                case LOGLEVEL.INFO:
                    logFn = console.info;
                    break;
                case LOGLEVEL.WARN:
                    logFn = console.warn;
                    break;
                case LOGLEVEL.ERROR:
                    logFn = console.error;
                    break;
                default:
                    logFn = console.log;
            }

            const levelLabel = `[${Object.keys(LOGLEVEL).find(key => LOGLEVEL[key] === logLevel)}]`;

            // Extract trace option from args (if any)
            let trace = false;
            args = args.filter(arg => {
                if (arg && typeof arg === 'object' && arg.trace === true) {
                    trace = true;
                    return false; // remove this arg from the list
                }
                return true;
            });

            const isPrimitive = (val) =>
                typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean';

            const location = this.getCallerLocation();
            const locationfix = `${location ? ' ' + location : ''}`;

            if (isPrimitive(message)) {
                if (trace || this.traceLevel) {
                    console.group(`${levelLabel} ${message} ${locationfix}`);
                    logFn(`${levelLabel} ${message} ${locationfix}`, ...args);
                    console.trace();
                    console.groupEnd();
                } else {
                    logFn(`${levelLabel} ${message} ${locationfix}`, ...args);
                }
            } else {
                console.group(`${levelLabel} ${locationfix}`);
                logFn(message, ...args);
                if (trace || this.traceLevel) console.trace();
                console.groupEnd();
            }

        }
    }

    getCallerLocation() {
        const stack = new Error().stack;
        if (!stack) return '';

        const lines = stack.split('\n');

        // Find the first line that doesn't reference this Logger class
        for (let i = 2; i < lines.length; i++) {
            const line = lines[i];
            if (!line.includes('Logger.') && !line.includes('at new Logger')) {
                const match = line.match(/\(?(.+:\d+:\d+)\)?$/);
                if (match) {
                    return match[1]; // e.g. "/path/to/file.js:42:17"
                }
            }
        }

        return '';
    }

    setLevel(level) {
        this.level = level;
    }

    setTrace(traceLevel) {
        this.traceLevel = traceLevel;
    }
}
