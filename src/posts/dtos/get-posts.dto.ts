import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entitiy';
import { Paginated } from '../../common/dtos/pagination.dto';

@InputType()
export class GetPostsInput {
  @Field((type) => Number, { nullable: true })
  cursor?: Post['id'];

  @Field((type) => Number, { nullable: true })
  limit?: number;
}

@ObjectType()
export class GetPostsOutput extends Paginated(Post) {}
