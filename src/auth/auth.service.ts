import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UsersService } from 'src/users/users.service';
import { bcrypt } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private userService: UserService){}

    async validateUser(username: String, pass: String): Promise<any>{       
        const user = await this.usersService.findOne(username);
        if(user && user.password === pass){
            const { password, ...result} = user;            
            return result;
        }
        return null;
    }

    async login(user: Users){
        return{
            access_token: this.jwtService.sign(user),
        };
    }
    async validateUser2(username: String, pass: String):Promise<any>{
        const passs = bcrypt.hash(pass, 8, function(err, hash) {
            return hash;
        });
        const user = await this.userService.findOne(username, passs);
        
        if(user){
            const { password, ...result} = user;
            return result;
        }
        return null;
    }
    
}
