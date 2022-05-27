import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LopModule } from './lop/lop.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';

import { CaslModule } from './casl/casl.module';
import { JwtAuthGuand } from './auth/guard/jwt-auth.guard';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }), UserModule, LopModule, AuthModule, UsersModule, CaslModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuand,
  },],
})
export class AppModule { }
