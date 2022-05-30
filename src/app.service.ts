import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CaslAbilityFactory } from './casl/casl-ability.factory';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async getCache(): Promise<any> {
    console.log(3333333);

    const value = await this.cacheManager.get('key');
    console.log(value);

    return value;
  }

  async setCache(text: string): Promise<any> {
    console.log(text);

    await this.cacheManager.set('key', text);
  }
}
