import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuand } from 'src/auth/guard/jwt-auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserDto } from './dto/UserDto';

@Controller('user')
export class UserController {
    constructor(private service: UserService) { }
    @Post()
    @UseGuards(JwtAuthGuand)
    @Roles(Role.Admin)
    async create(@Body() userDto: UserDto): Promise<User> {
        try {
            const data = await this.service.create(userDto.name, userDto.age, userDto.lop);
            return data;
        }
        catch (e) {
            return e;
        }
    }

    @Get()
    async findAll(): Promise<any> {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'this is a custom',
            
        }, HttpStatus.FORBIDDEN);
        return await this.service.findAll();
    }

    @Put(':id')
    async update(
            @Param('id') id: string,
            @Body('name') name: String,
            @Body('age') age: Number,
            @Body('age') idlop: String
        ) {
        try {
            const data = await this.service.Update(id, name, age, idlop);
            return data;
        }
        catch (e) {
            return e;
        }

    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        console.log(2);
        try {
            const data = await this.service.Delete(id);
            console.log(data);
            return data;
        }
        catch (e) {
            return e;
        }
    }
}
