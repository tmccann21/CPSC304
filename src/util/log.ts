import getenv from './getenv';

const LOG_LEVEL = getenv('LOG_LEVEL', false, 'INFO');
const SHOW_ERROR = LOG_LEVEL !== 'NONE';
const SHOW_WARN = SHOW_ERROR && LOG_LEVEL !== 'ERROR';
const SHOW_INFO = SHOW_WARN && LOG_LEVEL !== 'WARN';

export interface I_LOGGER {
  error: (message: {} | string) => void;
  warn: (message: {} | string) => void;
  info: (message: {} | string) => void;
};

const error = (message: {} | string) => {
  if (SHOW_ERROR) {
    console.log(`ERROR [${ new Date().toISOString() }]: ${message}`);
  }
}

const warn = (message: {} | string) => {
  if (SHOW_WARN) {
    console.log(`WARNING [${ new Date().toISOString() }]: ${message}`);
  }
}

const info = (message: {} | string) => {
  if (SHOW_INFO) {
    console.log(`INFO [${ new Date().toISOString() }]: ${message}`);
  }
}

const log: I_LOGGER = {
  error: error,
  warn: warn,
  info: info,
}

export default log;