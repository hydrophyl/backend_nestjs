import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id): Cat {
    const cat = this.findCat(id)[0];
    return { ...cat };
  }

  delete(id: string) {
    this.cats = this.cats.filter((cat) => cat.id !== id);
  }

  update(id: string, name: string, age: number, breed: string) {
    const [cat, catIndex] = this.findCat(id);
    const updatedCat = { ...cat };
    if (name) {
      updatedCat.name = name;
    }
    if (age) {
      updatedCat.age = age;
    }
    if (breed) {
      updatedCat.breed = breed;
    }
    this.cats[catIndex] = updatedCat;
  }

  private findCat(id: string): [Cat, number] {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    const cat = this.cats[catIndex];
    if (!cat) {
      throw new NotFoundException('Could not find the cat');
    }
    return [cat, catIndex];
  }
}
