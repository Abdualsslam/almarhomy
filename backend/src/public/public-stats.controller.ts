import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublicStatsService } from './public-stats.service';

@ApiTags('Public - Site Stats')
@Controller('public/site-stats')
export class PublicStatsController {
  constructor(private readonly statsService: PublicStatsService) {}

  @Get()
  @ApiOperation({ summary: 'إحصائيات عامة للموقع' })
  @ApiResponse({
    status: 200,
    description: 'إحصائيات عامة غير حساسة',
  })
  async getStats() {
    return this.statsService.getStats();
  }
}