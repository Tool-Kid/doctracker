import { Global, Module } from '@nestjs/common';
import { DomainModule } from '../domain';
import { LoggerModule } from '../logger';

@Global()
@Module({
  imports: [LoggerModule, DomainModule],
})
export class CommonModule {}
