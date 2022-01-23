import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonEntity {
  @Field((type) => Number)
  id: number;
}
