import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Diego Fontes' })
  name: string;

  @ApiProperty({ example: 'digupaz@gmail.com' })
  email: string;
}
