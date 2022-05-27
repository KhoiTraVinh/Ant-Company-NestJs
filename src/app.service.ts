import { Injectable } from '@nestjs/common';
import { CaslAbilityFactory } from './casl/casl-ability.factory';

@Injectable()
export class AppService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}
  getHello(): string {
    return 'Hello World!';
  }

}
