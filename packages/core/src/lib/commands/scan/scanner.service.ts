import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GitScanOptions } from '../../domain';
import { ScanCommand, ScanCommandOptions } from './command';

@Injectable()
export class ScannerService {
  constructor(private readonly bus: CommandBus) {}

  async scan(git: GitScanOptions, options: ScanCommandOptions) {
    const command = new ScanCommand(git, options);
    return await this.bus.execute<ScanCommand, void>(command);
  }
}
