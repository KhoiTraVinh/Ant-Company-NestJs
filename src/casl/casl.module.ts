import { Module } from '@nestjs/common';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CaslAbilityFactory } from './casl-ability.factory';
import { Service } from './.service';

@Module({
    providers: [CaslAbilityFactory, Service],
    exports: [CaslAbilityFactory]
})
export class CaslModule {}
