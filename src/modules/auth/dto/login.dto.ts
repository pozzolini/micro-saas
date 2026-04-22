import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'digupaz@gmail.com',
    description: 'User email adress',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'User Password',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
