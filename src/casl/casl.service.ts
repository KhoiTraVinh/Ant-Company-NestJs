import { Injectable } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { Action } from './model/action.enum';
import { Article } from './model/article.model';
import { Users } from './model/users.model';

@Injectable()
export class Service {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {
    const user = new Users();
    user.isAdmin = false;
    const ability = this.caslAbilityFactory.createForUser(user);
    ability.can(Action.Read, Article);
    ability.can(Action.Delete, Article);
    ability.can(Action.Create, Article);
    const user1 = new Users();
    user1.id = 1;

    const article = new Article();
    article.authorId = user1.id;

    const ability1 = this.caslAbilityFactory.createForUser(user1);
    ability1.can(Action.Update, article); // true

    article.authorId = 2;
    ability1.can(Action.Update, article);
  }
  findAll() {
    return;
  }
}
