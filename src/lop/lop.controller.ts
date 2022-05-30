import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LopDto } from './dto/lop.dto';
import { LopService } from './lop.service';

@Controller('lop')
export class LopController {
  constructor(private service: LopService) {}

  @Get()
  async getAll() {
    try {
      const data = await this.service.getAll();
      return data;
    } catch (e) {
      return e;
    }
  }

  @Post()
  async create(@Body() lopdto: LopDto) {
    try {
      const data = await this.service.create(lopdto.name);
      return data;
    } catch (e) {
      return e;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() name: string) {
    try {
      const data = await this.service.update(id, name);
      return data;
    } catch (e) {
      return e;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const data = await this.service.delete(id);
      return data;
    } catch (e) {
      return e;
    }
  }
}
