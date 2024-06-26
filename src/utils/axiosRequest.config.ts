import {AxiosRequestConfigInterface} from '../interfaces/AxiosRequestConfig.interface.ts';

export const AxiosRequestConfigs: AxiosRequestConfigInterface = {
  getCountryData: {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://restcountries.com/v3.1/all?fields=name,currencies,cca2,cca3,flag',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};
