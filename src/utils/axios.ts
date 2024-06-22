import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosRequestConfigs} from './axiosRequest.config.ts';
import {AxiosRequestConfigInterface} from '../interfaces/AxiosRequestConfig.interface.ts';

export default class AxiosApi {
  public async initializeApiRequest(
    requestConfig: keyof AxiosRequestConfigInterface,
  ) {
    const config = this.mapRequests(requestConfig);
    return this.AxiosApiRequest(config);
  }
  private mapRequests(
    requestConfig: keyof AxiosRequestConfigInterface,
  ): AxiosRequestConfig {
    return AxiosRequestConfigs[requestConfig];
  }

  private async AxiosApiRequest(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<any, any>> {
    return await axios.request(config);
  }
}
