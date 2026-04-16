import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryItemDto {
  @ApiProperty({ example: '665f1f77bcf86cd799439099' })
  _id!: string;

  @ApiProperty({ example: 'Accessories' })
  name!: string;

  @ApiPropertyOptional({ example: 'All accessory items' })
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/cat.jpg' })
  image?: string;

  @ApiProperty({ example: 25 })
  itemsCount!: number;
}

export class CategoryListResponseDto {
  @ApiProperty({ type: [CategoryItemDto] })
  items!: CategoryItemDto[];
}
