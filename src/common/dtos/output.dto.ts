import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonOutput {
  @Field((returns) => Boolean)
  ok: boolean;

  @Field((returns) => String, { nullable: true })
  message?: string;
}
