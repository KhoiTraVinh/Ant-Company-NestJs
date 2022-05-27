import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsNotEmpty()
  lop: String
}