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
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // get all cats
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // create new cat
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    const generatedId = await this.catsService.create(createCatDto);
    return { id: generatedId };
  }

  //find one cat
  @Get(':id')
  async findSingleCat(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findSingleCat(id);
  }

  // update cat infos
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('age') age: number,
    @Body('breed') breed: string,
  ) {
    await this.catsService.updateCat(id, name, age, breed);
    return `${id} is updated`;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.catsService.delete(id);
  }

  /* @Get(':id')
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
  } */
}
