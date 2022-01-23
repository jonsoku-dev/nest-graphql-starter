import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports: [],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
