import { Injectable } from '@nestjs/common';
import { GetPostsInput, GetPostsOutput } from './dtos/get-posts.dto';
import { Post } from './entities/post.entitiy';
import { AxiosService } from '../axios/axios.service';
import { AxiosError } from 'axios';

@Injectable()
export class PostsService {
  constructor(private readonly axiosService: AxiosService) {}

  async getAnonymousBoolean(post: Post): Promise<boolean> {
    // console.log(post.id);
    return Promise.resolve(true);
  }

  async getPosts(getPostsInput: GetPostsInput): Promise<GetPostsOutput> {
    try {
      const limit = getPostsInput?.limit ?? 20;
      const { data } = await this.axiosService
        .postClient()
        .get<Post[]>(`posts`);
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
      const error = e as AxiosError;
      console.log(error.response.data);
      return {
        ok: false,
        message: 'not found',
      };
    }
  }
}
