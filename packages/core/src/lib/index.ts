import { NestFactory } from '@nestjs/core';
import { DocTrackerCoreModule } from './doctracker-core.module';

export * from './commands';
export * from './common';
export * from './config';
export * from './domain';
export * from './logger';
export * from './utils';
export * from './doctracker-core.module';

export async function mountApp() {
  return NestFactory.createApplicationContext(DocTrackerCoreModule, {
    logger: false,
  });
}
