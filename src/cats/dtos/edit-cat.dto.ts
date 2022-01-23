import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CommonOutput } from '../../common/dtos/output.dto';
import { Cat } from '../entities/cat.entity';

@InputType()
export class EditCatInput extends PartialType(PickType(Cat, ['name'])) {
  @Field((type) => Number)
  catId: number;
}

@ObjectType()
export class EditCatOutput extends CommonOutput {}
