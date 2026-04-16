import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class JobStatusResponseDto {
  @ApiProperty({ example: 'processing' })
  status!: string;

  @ApiProperty({ example: 45 })
  progress!: number;

  @ApiPropertyOptional({ example: '2026-04-15T09:12:00.000Z' })
  startedAt?: Date;

  @ApiPropertyOptional({ example: '2026-04-15T09:12:25.000Z' })
  finishedAt?: Date;
}

export class JobStatusSimpleResponseDto {
  @ApiProperty({ example: 'completed' })
  status!: string;

  @ApiProperty({ example: 100 })
  progress!: number;
}
