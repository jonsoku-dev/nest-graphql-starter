import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { USER_KEY, USER_TOKEN } from '../common/common.constant';
import { GqlContext } from '../app.module';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext =
      GqlExecutionContext.create(context).getContext<GqlContext>();
    const userToken = gqlContext?.userToken;
    const userKey = gqlContext?.userKey;

    if (userToken && userKey) {
      // TODO
      return true;
    }

    return false;
  }
}
