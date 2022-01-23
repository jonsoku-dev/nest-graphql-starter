import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cat } from './entities/cat.entity';
import { GetCatsOutput } from './dtos/get-cats.dto';
import { CatsService } from './cats.service';
import { GetCatInput, GetCatOutput } from './dtos/get-cat.dto';
import { CreateCatInput, CreateCatOutput } from './dtos/create-cat.dto';
import { EditCatInput, EditCatOutput } from './dtos/edit-cat.dto';
import { DeleteCatInput, DeleteCatOutput } from './dtos/delete-cat.dto';

@Resolver((of) => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}
  @Query((returns) => GetCatsOutput)
  getCats(): Promise<GetCatsOutput> {
    return this.catsService.getCats();
  }

  @Query((returns) => GetCatOutput)
  getCat(@Args('input') getCatInput: GetCatInput): Promise<GetCatOutput> {
    return this.catsService.getCat(getCatInput);
  }

  @Mutation((returns) => CreateCatOutput)
  createCat(
    @Args('input') createCatInput: CreateCatInput,
  ): Promise<CreateCatOutput> {
    return this.catsService.createCat(createCatInput);
  }

  @Mutation((returns) => EditCatOutput)
  editCat(@Args('input') editCatInput: EditCatInput): Promise<EditCatOutput> {
    return this.catsService.editCat(editCatInput);
  }

  @Mutation((returns) => DeleteCatOutput)
  deleteCat(
    @Args('input') deleteCatInput: DeleteCatInput,
  ): Promise<DeleteCatOutput> {
    return this.catsService.deleteCat(deleteCatInput);
  }
}
