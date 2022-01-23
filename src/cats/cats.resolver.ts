import { Query, Resolver } from '@nestjs/graphql';
import { Cat } from './entities/cat.entity';
import { GetCatsOutput } from './dtos/get-cats.dto';
import { CatsService } from './cats.service';

@Resolver((of) => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}
  @Query((returns) => GetCatsOutput)
  getCats(): GetCatsOutput {
    return this.catsService.getCats();
  }
}
