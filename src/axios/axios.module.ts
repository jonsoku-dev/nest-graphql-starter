import { DynamicModule, Global, Module } from '@nestjs/common';
import { AxiosModuleOptions } from './axios.interface';
import { CONFIG_OPTIONS } from '../common/common.constant';
import { AxiosService } from './axios.service';

@Global()
@Module({})
export class AxiosModule {
  static forRoot(options: AxiosModuleOptions): DynamicModule {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        AxiosService,
      ],
      exports: [AxiosService],
    };
  }
}
