import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LopModule } from './lop/lop.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CaslModule } from './casl/casl.module';
import { JwtAuthGuand } from './auth/guard/jwt-auth.guard';
import { BullModule } from '@nestjs/bull';
import { SendmailController } from './sendmail/sendmail.controller';
import { SendmailModule } from './sendmail/sendmail.module';
import { BullConfigService } from './config/bullconfigservice';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: '',
          pass: '',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        adapter: new PugAdapter({}),
        options: {
          strict: true,
        },
      },
    }),
    CacheModule.register({
      redis: {
        host: 'localhost',
        port: 6380,
      },
    }),
    UserModule,
    LopModule,
    AuthModule,
    UsersModule,
    CaslModule,
    SendmailModule,
  ],

  controllers: [AppController, SendmailController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuand,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
