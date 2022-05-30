import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/guard/public.key';
import { SendmailService } from './sendmail.service';

@Controller('sendmail')
export class SendmailController {
  constructor(private service: SendmailService) {}

  @Public()
  @Post('transcode')
  async transcode(@Body('text') text) {
    this.service.add(text);
  }
}
