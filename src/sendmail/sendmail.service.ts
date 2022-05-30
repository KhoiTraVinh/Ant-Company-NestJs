import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUES } from 'src/constance/variable';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendmailService {
  constructor(
    @InjectQueue(QUEUES.SEND_MAIL) private audioQueue: Queue,
    private mailerService: MailerService,
  ) {}

  async stop() {
    await this.audioQueue.pause();
  }

  async start() {
    await this.audioQueue.resume();
  }

  async add(text: string) {
    this.audioQueue.add('transcode', { content: text }, { delay: 3000 });
  }

  send(text: string): void {
    this.mailerService
      .sendMail({
        to: '', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: text, // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {
        console.log(1111);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async name() {
    const job = await this.audioQueue.add(
      'transcode',
      {
        foo: 'bar',
      },
      { delay: 3000 },
    );

    const job2 = await this.audioQueue.add(
      {
        foo: 'bar',
      },
      { lifo: true },
    );
    const job3 = await this.audioQueue.add(
      {
        foo: 'bar',
      },
      { priority: 2 },
    );
  }
}
