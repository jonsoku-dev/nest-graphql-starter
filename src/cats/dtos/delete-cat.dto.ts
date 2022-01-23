import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from '../../common/dtos/output.dto';

@InputType()
export class DeleteCatInput {
  @Field((type) => Number)
  catId: number;
}

@ObjectType()
export class DeleteCatOutput extends CommonOutput {}
