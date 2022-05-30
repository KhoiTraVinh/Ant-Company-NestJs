import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuand } from 'src/auth/guard/jwt-auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserDto } from './dto/UserDto';
import { ForbiddenException } from './exceptions/forbidden.exception';
import { Public } from 'src/auth/guard/public.key';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { JoiValidationPipe } from './validations/joivalidation.pipe';
import { ValidationPipe } from './validations/validation.pipe';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Post()
  @UseGuards(JwtAuthGuand)
  @Roles(Role.Admin)
  async create(@Body(new ValidationPipe()) userDto: UserDto): Promise<User> {
    try {
      const data = await this.service.create(
        userDto.name,
        userDto.age,
        userDto.lop,
      );
      return data;
    } catch (e) {
      return e;
    }
  }

  @Public()
  //@UseFilters(HttpExceptionFilter)
  //@UsePipes(new JoiValidationPipe(schema))
  @Get(':id')
  async findAll(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<any> {
    throw new ForbiddenException();
    /*
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'this is a custom',
      },
      HttpStatus.FORBIDDEN,
    );
    */
    return await this.service.findAll();
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: any,
    @Body('age') age: number,
    @Body('lop') idlop: string,
  ) {
    try {
      const data = await this.service.Update(id, name, age, idlop);
      return data;
    } catch (e) {
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
    } catch (e) {
      return e;
    }
  }
}
