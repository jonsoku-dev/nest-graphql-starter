import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './entities/post.entitiy';
import { PostsService } from './posts.service';
import { GetPostsInput, GetPostsOutput } from './dtos/get-posts.dto';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query((returns) => GetPostsOutput)
  getPosts(
    @Args('input', { nullable: true }) getPostsInput?: GetPostsInput,
  ): Promise<GetPostsOutput> {
    return this.postsService.getPosts(getPostsInput);
  }

  @ResolveField((returns) => Boolean)
  anonymousBoolean(@Parent() post: Post): Promise<boolean> {
    return this.postsService.getAnonymousBoolean(post);
  }
}
