import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CaslAbilityFactory } from './casl/casl-ability.factory';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache(text: string): Promise<any> {
    console.log(3333333);

    const value = await this.cacheManager.get(text);
    console.log(value);

    return value;
  }

  async setCache(text: string, text1: string): Promise<any> {
    console.log(text);

    await this.cacheManager.set(text, text1);
  }
}
