import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entities/common.entity';

@InputType({ isAbstract: true })
@ObjectType()
export class Cat extends CommonEntity {
  @Field((type) => String)
  name: string;
}
