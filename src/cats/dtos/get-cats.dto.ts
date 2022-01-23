import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Cat } from '../entities/cat.entity';
import { CommonOutput } from '../../common/dtos/output.dto';

@InputType()
export class GetCatsInput extends PartialType(Cat) {}

@ObjectType()
export class GetCatsOutput extends CommonOutput {
  @Field((type) => [Cat])
  result: Cat[];
}
