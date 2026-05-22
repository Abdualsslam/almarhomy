import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductDocument } from '../database/schemas/product.schema';
import { ImageDocument } from '../database/schemas/image.schema';
import { CategoryDocument } from '../database/schemas/category.schema';

@Injectable()
export class PublicStatsService {
  constructor(
    @InjectModel('Product')
    private productModel: Model<ProductDocument>,
    @InjectModel('Image')
    private imageModel: Model<ImageDocument>,
    @InjectModel('Category')
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async getStats() {
    const totalProducts = await this.productModel.countDocuments().exec();
    const totalCategories = await this.categoryModel.countDocuments().exec();
    const productsWithImages = await this.imageModel
      .distinct('product', { product: { $ne: null } })
      .exec();

    return {
      totalProducts,
      totalCategories,
      productsWithImages: productsWithImages.length,
    };
  }
}