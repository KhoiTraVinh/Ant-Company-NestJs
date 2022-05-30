import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUES } from 'src/constance/variable';
import { AudioProcessor } from './processor';
import { SendmailController } from './sendmail.controller';
import { SendmailService } from './sendmail.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SEND_MAIL,
    }),
  ],
  controllers: [SendmailController],
  providers: [SendmailService, AudioProcessor],
  exports: [SendmailService],
})
export class SendmailModule {}
