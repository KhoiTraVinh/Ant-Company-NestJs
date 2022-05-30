import {
  BullModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: 'localhost',
        port: 6379,
      },
    };
  }
}
