import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ example: 'تمت العملية بنجاح' })
  message!: string;
}
