import { LOGGER } from '@doctracker/core';
import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';

export async function mountCli() {
  process.on('uncaughtException', (error) => {
    LOGGER.log('error', `❌ ${error.message}`);
  });
  const cli = await CommandFactory.run(CliModule);
  return cli;
}

mountCli();
