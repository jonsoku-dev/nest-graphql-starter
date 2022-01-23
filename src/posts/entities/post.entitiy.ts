import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entities/common.entity';

@InputType({ isAbstract: true })
@ObjectType()
export class Post extends CommonEntity {
  @Field((type) => Number)
  userId: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  body: string;
}
