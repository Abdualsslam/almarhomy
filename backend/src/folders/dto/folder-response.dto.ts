import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FolderBreadcrumbDto {
  @ApiPropertyOptional({ example: null })
  id!: string | null;

  @ApiProperty({ example: 'الملفات' })
  name!: string;
}

export class FolderContentsResponseDto {
  @ApiProperty({ type: [Object] })
  folders!: Record<string, unknown>[];

  @ApiProperty({ type: [Object] })
  images!: Record<string, unknown>[];

  @ApiProperty({ type: [FolderBreadcrumbDto] })
  breadcrumbs!: FolderBreadcrumbDto[];
}
