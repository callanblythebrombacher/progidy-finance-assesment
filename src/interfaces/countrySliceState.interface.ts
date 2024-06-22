import {NormalizedCountryArrayItem} from './normalize.interface.ts';

export interface CountrySliceStateInterface {
  data: null | NormalizedCountryArrayItem[];
  error: null | string;
  pending: boolean;
}
