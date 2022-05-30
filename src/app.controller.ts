import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/guard/public.key';
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @CacheTTL(20)
  @Get()
  async findAll(): Promise<any> {
    const data = await this.appService.getCache();
    return data;
  }
  @Public()
  @Post()
  setCache(@Body('text') text: string): any {
    console.log(11111);

    this.appService.setCache(text);
  }
}
