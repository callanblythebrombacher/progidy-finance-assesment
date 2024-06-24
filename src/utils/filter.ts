import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

export class Filter {
  public getFilteredCountryData(
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
        default:
          filteredData = countryData; // Default to returning original data if no valid pickerValue
          break;
      }
    }
    return filteredData;
  }

  private filterByCurrency(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country =>
      country.currencyArray.some(currency =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }

  private filterByAlpha2(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country =>
      country.alpha2.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  private filterByAlpha3(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country =>
      country.alpha3.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }
}
