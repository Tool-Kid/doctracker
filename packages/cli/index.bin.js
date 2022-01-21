#!/usr/bin/env node
'use strict';

const { LOGGER } = require("@doctracker/core");

const ENTRYPOINT_PATH = `@doctracker/cli/src/index.js`

try {
  LOGGER.log('info', 'Trying to load a local version of DocTracker..');
  require(`${process.cwd()}/node_modules/${ENTRYPOINT_PATH}`);
} catch (e) {
  LOGGER.log('warn', 'No local version of DocTracker detected. Using global version.');
  require(`${ENTRYPOINT_PATH}`);
}
