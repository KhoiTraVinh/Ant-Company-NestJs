import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants'; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    let users : any;
    const data = context.switchToHttp().getRequest();
    const { user } = context.switchToHttp().getRequest();
    console.log(user);    
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}