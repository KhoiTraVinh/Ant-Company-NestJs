import { JOB_REF, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { QUEUES } from 'src/constance/variable';
import { SendmailService } from './sendmail.service';

@Processor(QUEUES.SEND_MAIL)
export class AudioProcessor {
  constructor(@Inject(JOB_REF) jobRef: Job, private service: SendmailService) {
    console.log(jobRef);
  }
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.service.send(job.data);
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
