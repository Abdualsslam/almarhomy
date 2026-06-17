import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicStatsController } from './public-stats.controller';
import { PublicStatsService } from './public-stats.service';
import { ProductSchema } from '../database/schemas/product.schema';
import { ImageSchema } from '../database/schemas/image.schema';
import { CategorySchema } from '../database/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Image', schema: ImageSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  controllers: [PublicStatsController],
  providers: [PublicStatsService],
})
export class PublicModule {}