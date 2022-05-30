import { Controller, Get, UseGuards } from '@nestjs/common';
import { Service } from './casl.service';
import { PoliciesGuard } from './guard/policies.guard';
import { CheckPolicies } from './policies/check.policy';
import { ReadArticlePolicyHandler } from './policies/readarticle.policy';

@Controller('casl')
export class CaslController {
  constructor(private caslservice: Service) {}
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new ReadArticlePolicyHandler())
  findAll() {
    return this.caslservice.findAll();
  }
}
