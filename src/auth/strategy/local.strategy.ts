import { Injectable, Request, UnauthorizedException } from "@nestjs/common";
import { ContextIdFactory, ModuleRef } from "@nestjs/core";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()

export class LocalStategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService, private moduleRef: ModuleRef){
        super({
            //passReqToCallback: true,
           // usernameField: 'john',
           // passwordField: 'changeme'
        });
    }

    async validate(username: string, password: string, request: Request): Promise<any>{
        //const contextId = ContextIdFactory.getByRequest(request);
        //const authService = await this.moduleRef.resolve(AuthService, contextId);
        const user = await this.authService.validateUser(username, password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}