import {
  CountryDataItem,
  NormalizedCountryArrayItem,
} from '../interfaces/normalize.interface';
import {TableRows} from '../interfaces/molecules.interfaces.ts';

export class Normalize {
  /**
   * Normalize raw country data into a standardized format
   * @param countryData - Array of raw CountryDataItem objects
   * @returns Array of NormalizedCountryArrayItem objects
   */
  public getCountryData(
    countryData: CountryDataItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData
      .map(country => {
        const {name, flag, cca2: alpha2, cca3: alpha3, currencies} = country;

        // Map currencies object into an array of { currency, name, symbol }
        const currencyArray = Object.entries(currencies).map(
          ([currency, {name, symbol}]) => ({
            currency,
            name,
            symbol,
          }),
        );

        // Return normalized country object
        return {
          isActive: true,
          name: name.common,
          flag,
          alpha2,
          alpha3,
          currencyArray,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort by country name
  }

  /**
   * Get list of search options based on picker value
   * @param pickerValue - Value determining the search list type (1: Currency, 2: Alpha2, 3: Alpha3)
   * @param countryData - Array of NormalizedCountryArrayItem objects
   * @returns Array of string options for search
   */
  public getSearchList(
    pickerValue: number,
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    switch (pickerValue) {
      case 1:
        return this.getCurrencySearchList(countryData);
      case 2:
        return this.getAlpha2SearchList(countryData);
      case 3:
        return this.getAlpha3SearchList(countryData);
      default:
        return [];
    }
  }

  /**
   * Get unique list of currency names from country data
   * @param countryData - Array of NormalizedCountryArrayItem objects
   * @returns Array of unique currency names
   */
  private getCurrencySearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    const currencySearchList = countryData.flatMap(country =>
      country.currencyArray.map(currency => currency.name),
    );
    return [...new Set(currencySearchList)]; // Return unique currency names
  }

  /**
   * Get list of alpha2 codes from country data
   * @param countryData - Array of NormalizedCountryArrayItem objects
   * @returns Array of alpha2 codes
   */
  private getAlpha2SearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    return countryData.map(country => country.alpha2);
  }

  /**
   * Get list of alpha3 codes from country data
   * @param countryData - Array of NormalizedCountryArrayItem objects
   * @returns Array of alpha3 codes
   */
  private getAlpha3SearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    return countryData.map(country => country.alpha3);
  }

  /**
   * Generate table row configuration from normalized country data
   * @param countryData - Array of NormalizedCountryArrayItem objects
   * @returns Array of TableRows representing each country row in the table
   */
  public getRowConfig(countryData: NormalizedCountryArrayItem[]): TableRows {
    let result: TableRows = [];
    countryData.forEach(country => {
      const currencyString = country.currencyArray
        .map(currency => currency.currency)
        .join(', ');

      // Add each country as a swipeable row to the table configuration
      result = [
        ...result,
        {
          isSwipeable: true,
          data: [
            {item: country.name, isNumeric: false},
            {item: country.flag, isNumeric: true},
            {item: currencyString, isNumeric: true},
          ],
          isActive: country.isActive,
        },
      ];
    });
    return result;
  }
}
