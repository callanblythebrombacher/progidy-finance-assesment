import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosRequestConfigs} from './axiosRequest.config.ts'; // Import Axios request configurations
import {AxiosRequestConfigInterface} from '../interfaces/AxiosRequestConfig.interface.ts'; // Import Axios request config interface

export default class AxiosApi {
  // Method to initialize API request based on request configuration key
  public async initializeApiRequest(
    requestConfig: keyof AxiosRequestConfigInterface, // Accepts keyof AxiosRequestConfigInterface as parameter
  ): Promise<AxiosResponse<any, any>> {
    // Returns a Promise of AxiosResponse
    const config = this.mapRequests(requestConfig); // Map requestConfig key to AxiosRequestConfig
    return this.AxiosApiRequest(config); // Make API request using mapped config
  }

  // Method to map request configuration key to AxiosRequestConfig
  private mapRequests(
    requestConfig: keyof AxiosRequestConfigInterface,
  ): AxiosRequestConfig {
    return AxiosRequestConfigs[requestConfig]; // Retrieve and return AxiosRequestConfig from AxiosRequestConfigs
  }

  // Method to make API request using provided AxiosRequestConfig
  private async AxiosApiRequest(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<any, any>> {
    // Returns a Promise of AxiosResponse
    return await axios.request(config); // Use Axios to make the API request and return the response
  }
}
