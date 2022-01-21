import { createLogger, addColors, format, transports } from 'winston';

export enum LogLevel {
  Error = 0,
  Warn = 1,
  Info = 2,
  Debug = 3,
}

export type LogLevels = 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVELS = {
  error: LogLevel.Error,
  warn: LogLevel.Warn,
  info: LogLevel.Info,
  debug: LogLevel.Debug,
};

const LOGGER_COLORS = {
  error: 'red',
  info: 'blue',
  warn: 'yellow',
};

addColors(LOGGER_COLORS);

const LOG_FORMAT = format.combine(
  format.label({ label: 'DocTracker', message: true }),
  format.colorize({ all: true }),
  format.printf((info) => `${info.level}: ${info.message}`)
);

const LOGGER_TRANSPORTS = [new transports.Console()];

export const WINSTON_LOGGER = createLogger({
  levels: LOG_LEVELS,
  format: LOG_FORMAT,
  transports: LOGGER_TRANSPORTS,
});
