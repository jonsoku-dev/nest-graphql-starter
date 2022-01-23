import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { USER_KEY, USER_TOKEN } from './common/common.constant';
import { PostsModule } from './posts/posts.module';

export interface GqlContext {
  userToken?: string;
  userKey?: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? '.env.development' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        TEST_API_URI: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true,
      context: ({ req, connection }): GqlContext => {
        return {
          userKey: req ? req.headers[USER_KEY] : connection.context[USER_KEY],
          userToken: req
            ? req.headers[USER_TOKEN]
            : connection.context[USER_TOKEN],
        };
      },
    }),
    CatsModule,
    CommonModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
