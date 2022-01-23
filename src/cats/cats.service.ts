import { Injectable } from '@nestjs/common';
import { GetCatsOutput } from './dtos/get-cats.dto';
import { Cat } from './entities/cat.entity';
import { GetCatInput, GetCatOutput } from './dtos/get-cat.dto';
import { CreateCatInput, CreateCatOutput } from './dtos/create-cat.dto';
import { EditCatInput, EditCatOutput } from './dtos/edit-cat.dto';
import { DeleteCatInput, DeleteCatOutput } from './dtos/delete-cat.dto';

let cats: Cat[] = [
  { id: 1, name: '고양이1' },
  { id: 2, name: '고양이2' },
];

@Injectable()
export class CatsService {
  getCats(): Promise<GetCatsOutput> {
    return Promise.resolve({
      ok: true,
      message: 'success',
      result: cats,
    });
  }
  async getCat(getCatInput: GetCatInput): Promise<GetCatOutput> {
    try {
      const foundCat = await this.findCatById(getCatInput.catId);
      if (!foundCat) {
        return {
          ok: false,
          message: 'not found',
        };
      }
      return {
        ok: true,
        message: 'success',
        result: foundCat,
      };
    } catch (e) {
      return {
        ok: false,
        message: 'not found',
      };
    }
  }
  createCat(createCatInput: CreateCatInput): Promise<CreateCatOutput> {
    cats.push({
      id: cats[cats.length - 1].id + 1,
      name: createCatInput.name,
    });
    return Promise.resolve({
      ok: true,
      message: 'success',
    });
  }
  async editCat(editCatInput: EditCatInput): Promise<EditCatOutput> {
    try {
      const foundCat = await this.findCatById(editCatInput.catId);
      if (!foundCat) {
        return {
          ok: false,
          message: 'not found',
        };
      }
      cats = cats.map((cat) =>
        cat.id === editCatInput.catId
          ? { ...cat, name: editCatInput.name }
          : cat,
      );
      return {
        ok: true,
        message: 'success',
      };
    } catch (e) {
      return {
        ok: false,
        message: 'not found',
      };
    }
  }

  async deleteCat(deleteCatInput: DeleteCatInput): Promise<DeleteCatOutput> {
    try {
      const foundCat = await this.findCatById(deleteCatInput.catId);
      if (!foundCat) {
        return {
          ok: false,
          message: 'not found',
        };
      }
      cats = cats.filter((cat) => cat.id !== deleteCatInput.catId);
      return {
        ok: true,
        message: 'success',
      };
    } catch (e) {
      return {
        ok: false,
        message: 'not found',
      };
    }
  }

  private findCatById(targetId: number): Promise<Cat> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundCat = cats.find((cat) => cat.id === targetId);
        if (!foundCat) {
          reject(Error('not found'));
        }
        resolve(foundCat);
      }, 300);
    });
  }
}
