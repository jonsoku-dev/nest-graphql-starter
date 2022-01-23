import { Injectable } from '@nestjs/common';
import { GetCatsOutput } from './dtos/get-cats.dto';

@Injectable()
export class CatsService {
  getCats(): GetCatsOutput {
    return {
      ok: true,
      message: 'success',
      result: [{ id: 1, name: '고양이1' }],
    };
  }
}
