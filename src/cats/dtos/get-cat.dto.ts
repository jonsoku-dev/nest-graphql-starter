import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Cat } from '../entities/cat.entity';
import { CommonOutput } from '../../common/dtos/output.dto';

@InputType()
export class GetCatInput {
  @Field((type) => Number)
  catId: number;
}

@ObjectType()
export class GetCatOutput extends CommonOutput {
  @Field((type) => Cat, { nullable: true })
  result?: Cat;
}
