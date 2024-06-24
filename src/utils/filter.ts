import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

export class Filter {
  /**
   * Filter country data based on picker value and search query
   * @param pickerValue - Value determining the filter criteria (1: Currency, 2: Alpha2, 3: Alpha3)
   * @param searchQuery - Query string used for filtering
   * @param countryData - Array of normalized country data to filter
   * @returns Filtered array of NormalizedCountryArrayItem
   */
  public getFilteredCountryData(
    pickerValue: number,
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[] | null,
  ): NormalizedCountryArrayItem[] {
    let filteredData: NormalizedCountryArrayItem[] = [];

    // Ensure countryData is not null
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

  /**
   * Filter country data by currency name
   * @param searchQuery - Query string for filtering by currency name
   * @param countryData - Array of normalized country data to filter
   * @returns Filtered array of NormalizedCountryArrayItem
   */
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

  /**
   * Filter country data by alpha2 code
   * @param searchQuery - Query string for filtering by alpha2 code
   * @param countryData - Array of normalized country data to filter
   * @returns Filtered array of NormalizedCountryArrayItem
   */
  private filterByAlpha2(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country =>
      country.alpha2.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  /**
   * Filter country data by alpha3 code
   * @param searchQuery - Query string for filtering by alpha3 code
   * @param countryData - Array of normalized country data to filter
   * @returns Filtered array of NormalizedCountryArrayItem
   */
  private filterByAlpha3(
    searchQuery: string,
    countryData: NormalizedCountryArrayItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData.filter(country =>
      country.alpha3.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }
}
