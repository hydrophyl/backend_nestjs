import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return `${createCatDto.name} is created`;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    this.catsService.delete(id);
    return `This cat with id:${id} is deleted`;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('age') age: number,
    @Body('breed') breed: string,
  ) {
    this.catsService.update(id, name, age, breed);
    return `${id} is updated`;
  }
}
