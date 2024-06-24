import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface.ts';

export class Filter {
  getFilteredCountryData(
    pickerValue: number,
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[] | null,
  ): NormalizedCountryArrayItem[] {
    let filteredData: NormalizedCountryArrayItem[] = [];
    if (countryData !== null) {
      switch (pickerValue) {
        case 1:
          filteredData = this.filterByCurrency(searchQuery, countryData);
          break;
        case 2:
          filteredData = this.filterByAlpha2(searchQuery, countryData);
          break;
        case 3:
          filteredData = this.filterByAlpha3(searchQuery, countryData);
          break;
      }
    }
    return filteredData;
  }

  private filterByCurrency(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country => {
      const matchArray: boolean[] = country.currencyArray.map(
        currency => currency.currency === searchQuery,
      );
      return matchArray.includes(true);
    });
  }

  private filterByAlpha2(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country => country.alpha2.includes(searchQuery));
  }

  private filterByAlpha3(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country => country.alpha3.includes(searchQuery));
  }
}
