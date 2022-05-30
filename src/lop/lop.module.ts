import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LopController } from './lop.controller';
import { Lop, LopSchema } from './schema/lop.schema';
import { LopService } from './lop.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lop.name, schema: LopSchema }])],
  controllers: [LopController],
  providers: [LopService],
})
export class LopModule {}
