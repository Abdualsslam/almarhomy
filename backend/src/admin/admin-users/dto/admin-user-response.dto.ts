import { ApiProperty } from '@nestjs/swagger';

export class AdminUserItemDto {
  @ApiProperty({ example: '665f1f77bcf86cd799439099' })
  _id!: string;

  @ApiProperty({ example: 'john_doe' })
  username!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'rep' })
  role!: string;

  @ApiProperty({ example: '2026-04-15T10:00:00.000Z' })
  createdAt!: Date;
}

export class AdminUserCreateResponseDto {
  @ApiProperty({ example: '665f1f77bcf86cd799439099' })
  _id!: string;

  @ApiProperty({ example: 'john_doe' })
  username!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'rep' })
  role!: string;

  @ApiProperty({ example: 'x8f2k3m1' })
  tempPassword!: string;
}
