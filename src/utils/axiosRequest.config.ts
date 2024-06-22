import {AxiosRequestConfigInterface} from '../interfaces/AxiosRequestConfig.interface.ts';

export const AxiosRequestConfigs: AxiosRequestConfigInterface = {
  getCountryData: {
    method: 'GET',
    url: 'https://rest-countries10.p.rapidapi.com/countries',
    headers: {
      'x-rapidapi-key': '8e668d8bc2msh5ddca4aa5b3b4abp1d571ejsnf800fa6f561b',
      'x-rapidapi-host': 'rest-countries10.p.rapidapi.com',
    },
  },
};
