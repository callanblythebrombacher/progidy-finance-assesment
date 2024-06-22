import {
  CountryDataItem,
  NormalizedCountryArrayItem,
} from '../interfaces/normalize.interface.ts';

export class Normalize {
  public countryData(countryData: CountryDataItem[]) {
    let normalizedCountryArray: [] | NormalizedCountryArrayItem[] = [];
    countryData.forEach(country => {
      const {name, flag, cca2: alpha2, cca3: alpha3, currencies} = country;

      const currencyArray = Object.entries(currencies).map(
        ([currency, {name, symbol}]) => ({
          currency,
          name,
          symbol,
        }),
      );
      normalizedCountryArray = [
        ...normalizedCountryArray,
        {
          name: name.common,
          flag,
          alpha2,
          alpha3,
          currencyArray,
        },
      ];
    });
    return normalizedCountryArray;
  }
}
