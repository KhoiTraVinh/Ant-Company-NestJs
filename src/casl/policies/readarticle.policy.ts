import { AppAbility } from '../casl-ability.factory';
import { IPolicyHandler } from '../interface/policyhandler.interface';
import { Action } from '../model/action.enum';
import { Article } from '../model/article.model';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Article);
  }
}
