import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { Service } from './casl.service';
import { CaslController } from './casl.controller';

@Module({
  providers: [CaslAbilityFactory, Service],
  exports: [CaslAbilityFactory],
  controllers: [CaslController],
})
export class CaslModule {}
