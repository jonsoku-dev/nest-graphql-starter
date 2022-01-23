import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constant';
import { AxiosModuleOptions } from './axios.interface';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: AxiosModuleOptions,
  ) {}

  postClient(): AxiosInstance {
    return axios.create({
      baseURL: this.options.postUri,
      timeout: 1000,
      headers: {
        Accept: 'application/json',
        //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
      },
    });
  }
}
