import { settings } from '../config/env';
import pino from 'pino';

const testLogger = pino({
  enabled: false,
});

const prodLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: false,
    },
  },
  level: 'warn',
});

const devLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level: 'debug',
});

const getLogger = (options: object): pino.Logger<string> => {
  if (settings.nodeEnv == 'test') {
    return testLogger.child({ ...options });
  } else if (settings.nodeEnv == 'production') {
    return prodLogger.child({ ...options });
  } else {
    return devLogger.child({ ...options });
  }
};

export default getLogger;
