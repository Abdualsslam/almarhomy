import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CategoryItemDto, CategoryListResponseDto } from './dto/category-response.dto';
import { MessageResponseDto } from '../common/dto/message-response.dto';

@ApiTags('Categories - Admin')
@Controller('admin/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth('JWT-auth')
@ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
@ApiForbiddenResponse({ description: 'Admin role required' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'جلب قائمة جميع الفئات' })
  @ApiResponse({
    status: 200,
    description: 'قائمة الفئات',
    type: CategoryListResponseDto,
  })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'إنشاء فئة جديدة' })
  @ApiResponse({
    status: 201,
    description: 'تم إنشاء الفئة بنجاح',
    type: CategoryItemDto,
  })
  @ApiBadRequestResponse({ description: 'بيانات غير صحيحة' })
  @ApiConflictResponse({ description: 'الفئة موجودة مسبقاً' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'تحديث فئة موجودة' })
  @ApiResponse({
    status: 200,
    description: 'تم تحديث الفئة بنجاح',
    type: CategoryItemDto,
  })
  @ApiNotFoundResponse({ description: 'الفئة غير موجودة' })
  @ApiBadRequestResponse({ description: 'بيانات أو معرفات غير صالحة' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف فئة' })
  @ApiResponse({
    status: 200,
    description: 'تم حذف الفئة بنجاح',
    type: MessageResponseDto,
  })
  @ApiBadRequestResponse({ description: 'لا يمكن حذف فئة لأنها تحتوي على فئات فرعية' })
  @ApiNotFoundResponse({ description: 'الفئة غير موجودة' })
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
