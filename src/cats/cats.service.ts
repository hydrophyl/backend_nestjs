import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Meo') private readonly catModel: Model<CatDocument>,
  ) {}

  //string as output because we need the generated id
  async create(createCatDto: CreateCatDto): Promise<String> {
    const newCat = new this.catModel(createCatDto);
    const resp = await newCat.save();
    return resp._id;
  }

  //breed is not required in Cat Type (breed?: string) so when no breed here is fine
  async findAll(): Promise<Cat[]> {
    const cats = await this.catModel.find().exec();
    return cats.map((cat) => ({
      id: cat._id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    }));
  }

  //return optional characters of object
  async findSingleCat(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id);
    if (!cat) {
      throw new NotFoundException('Could not find the cat');
    }
    return { id: cat._id, name: cat.name, age: cat.age, breed: cat.breed };
  }

  async updateCat(id: string, name: string, age: number, breed: string) {
    const updatedCat = await this.catModel.findById(id);
    if (!updatedCat) {
      throw new NotFoundException('Could not find the cat');
    }
    if (name) {
      updatedCat.name = name;
    }
    if (age) {
      updatedCat.age = age;
    }
    if (breed) {
      updatedCat.breed = breed;
    }
    updatedCat.save();
  }

  async delete(id: string) {
    const res = await this.catModel.deleteOne({ _id: id }).exec();
    if (res.n === 0) {
      throw new NotFoundException('Could not find the cat');
    }
    return 'Deleted';
  }
}
