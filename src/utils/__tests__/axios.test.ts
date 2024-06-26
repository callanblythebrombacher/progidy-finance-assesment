import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import AxiosApi from '../axios';
import {AxiosRequestConfigs} from '../axiosRequest.config';
import {AxiosRequestConfigInterface} from '../../interfaces/AxiosRequestConfig.interface.ts';

import {jest, describe, beforeEach, it, expect} from '@jest/globals';
// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosApi class', () => {
  let axiosApi: AxiosApi;

  beforeEach(() => {
    axiosApi = new AxiosApi();
  });

  describe('initializeApiRequest', () => {
    it('should make an API request based on request configuration key', async () => {
      const requestConfigKey: keyof AxiosRequestConfigInterface = 'getUser'; // Example key
      const config: AxiosRequestConfig = {
        url: 'https://example.com/user',
        method: 'GET',
      };
      const mockResponse: AxiosResponse = {
        data: {id: 1, name: 'John Doe'},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      // Set up AxiosRequestConfigs mock
      (AxiosRequestConfigs as any)[requestConfigKey] = config;

      // Set up mocked Axios request
      mockedAxios.request.mockResolvedValue(mockResponse);

      const result = await axiosApi.initializeApiRequest(requestConfigKey);

      // Assertions
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.request).toHaveBeenCalledWith(config);
    });
  });

  describe('mapRequests', () => {
    it('should map request configuration key to AxiosRequestConfig', () => {
      const requestConfigKey: keyof AxiosRequestConfigInterface = 'getUser'; // Example key
      const config: AxiosRequestConfig = {
        url: 'https://example.com/user',
        method: 'GET',
      };

      // Set up AxiosRequestConfigs mock
      (AxiosRequestConfigs as any)[requestConfigKey] = config;

      const result = (axiosApi as any).mapRequests(requestConfigKey);

      // Assertions
      expect(result).toEqual(config);
    });
  });

  describe('AxiosApiRequest', () => {
    it('should make an API request using provided AxiosRequestConfig', async () => {
      const config: AxiosRequestConfig = {
        url: 'https://example.com/user',
        method: 'GET',
      };
      const mockResponse: AxiosResponse = {
        data: {id: 1, name: 'John Doe'},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      // Set up mocked Axios request
      mockedAxios.request.mockResolvedValue(mockResponse);

      const result = await (axiosApi as any).AxiosApiRequest(config);

      // Assertions
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.request).toHaveBeenCalledWith(config);
    });
  });
});
