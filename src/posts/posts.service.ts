import { Injectable } from '@nestjs/common';
import { GetPostsInput, GetPostsOutput } from './dtos/get-posts.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Post } from './entities/post.entitiy';

@Injectable()
export class PostsService {
  constructor(private readonly configService: ConfigService) {}

  async getAnonymousBoolean(post: Post): Promise<boolean> {
    console.log(post.id);
    return Promise.resolve(true);
  }

  async getPosts(getPostsInput: GetPostsInput): Promise<GetPostsOutput> {
    try {
      console.log(typeof getPostsInput?.cursor);
      const limit = getPostsInput?.limit ?? 20;
      const TEST_API_URI = this.configService.get<string>('TEST_API_URI');
      const { data } = await axios.get<Post[]>(`${TEST_API_URI}/posts`);
      const foundIndex = getPostsInput?.cursor
        ? data.findIndex((post) => post.id === getPostsInput.cursor)
        : 0;
      const returnData = data.slice(foundIndex, foundIndex + limit);
      return {
        ok: true,
        message: 'success',
        edges: returnData.map((data) => ({
          cursor: data.id,
          node: data,
        })),
        totalCount: data.length,
        hasNextPage: !!data[foundIndex + limit + 1],
        nodes: returnData,
      };
    } catch (e) {
      return {
        ok: false,
        message: 'not found',
      };
    }
  }
}
