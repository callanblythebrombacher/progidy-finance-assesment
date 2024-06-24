import {
  CountryDataItem,
  NormalizedCountryArrayItem,
} from '../interfaces/normalize.interface';
import {TableRows} from '../components/interfaces/molecules.interfaces';

export class Normalize {
  public getCountryData(
    countryData: CountryDataItem[],
  ): NormalizedCountryArrayItem[] {
    return countryData
      .map(country => {
        const {name, flag, cca2: alpha2, cca3: alpha3, currencies} = country;

        const currencyArray = Object.entries(currencies).map(
          ([currency, {name, symbol}]) => ({
            currency,
            name,
            symbol,
          }),
        );

        return {
          isActive: true,
          name: name.common,
          flag,
          alpha2,
          alpha3,
          currencyArray,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

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

  private getCurrencySearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    const currencySearchList = countryData.flatMap(country =>
      country.currencyArray.map(currency => currency.name),
    );
    return [...new Set(currencySearchList)];
  }

  private getAlpha2SearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    return countryData.map(country => country.alpha2);
  }

  private getAlpha3SearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    return countryData.map(country => country.alpha3);
  }

  public getRowConfig(countryData: NormalizedCountryArrayItem[]): TableRows {
    let result: TableRows = [];
    countryData.forEach(country => {
      if (country.isActive) {
        const currencyString = country.currencyArray
          .map(currency => currency.currency)
          .join(', ');

        result = [
          ...result,
          {
            isSwipeable: true,
            data: [
              {item: country.name, isNumeric: false},
              {item: country.flag, isNumeric: true},
              {item: currencyString, isNumeric: true},
            ],
          },
        ];
      }
    });
    return result;
  }
}
