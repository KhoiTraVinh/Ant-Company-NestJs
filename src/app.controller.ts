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
  @Get()
  async findAll(@Body('text') text: string): Promise<any> {
    const data = await this.appService.getCache(text);
    return data;
  }
  @Public()
  @Post()
  setCache(@Body('text') text: string, @Body('text1') text1: string): any {
    console.log(11111);

    this.appService.setCache(text, text1);
  }
}
