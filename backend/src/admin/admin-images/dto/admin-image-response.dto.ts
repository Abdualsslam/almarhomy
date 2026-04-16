import { ApiProperty } from '@nestjs/swagger';

export class AdminImageItemDto {
  @ApiProperty({ example: '665f1f77bcf86cd799439099' })
  _id!: string;

  @ApiProperty({ example: 'iPhone 14' })
  model!: string;

  @ApiProperty({ example: 'Accessories' })
  category!: string;

  @ApiProperty({ example: 'Lightning Cable' })
  productName!: string;

  @ApiProperty({ example: 'https://bucket.s3.region.amazonaws.com/originals/file.jpg' })
  originalUrl!: string;

  @ApiProperty({ example: 'https://bucket.s3.region.amazonaws.com/watermarked/file.png' })
  watermarkedUrl!: string;

  @ApiProperty({ example: 'processing' })
  status!: string;

  @ApiProperty({ example: 50 })
  progress!: number;
}

export class AdminImageListResponseDto {
  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 4 })
  totalPages!: number;

  @ApiProperty({ example: 80 })
  totalItems!: number;

  @ApiProperty({ type: [AdminImageItemDto] })
  items!: AdminImageItemDto[];
}
