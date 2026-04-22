import { ApiProperty } from '@nestjs/swagger';

export class Organization {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Acme Inc' })
  name: string;

  @ApiProperty({ example: 'acme-inc' })
  slug: string;
}
