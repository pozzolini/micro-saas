import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Diego Fontes',
    description: 'User full name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'digupaz@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;
}
