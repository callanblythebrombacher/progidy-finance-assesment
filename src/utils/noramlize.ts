import {
  CountryDataItem,
  NormalizedCountryArrayItem,
} from '../interfaces/normalize.interface.ts';
import {TableRows} from '../components/interfaces/molecules.interfaces.ts';

export class Normalize {
  public getCountryData(countryData: CountryDataItem[]) {
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

    return normalizedCountryArray.sort((a, b) => {
      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  getSearchList(
    pickerValue: number,
    countryData: NormalizedCountryArrayItem[],
  ) {
    let searchList: string[] = [];
    switch (pickerValue) {
      case 1:
        searchList = this.getCurrencySearchList(countryData);
        break;
      case 2:
        searchList = this.getAlpha2SearchList(countryData);
        break;
      case 3:
        searchList = this.getAlpha3SearchList(countryData);
        break;
    }
    return searchList;
  }

  private getCurrencySearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    let currencySearchList: string[] = [];

    countryData.forEach(country =>
      country.currencyArray.forEach(
        currency =>
          (currencySearchList = [...currencySearchList, currency.name]),
      ),
    );

    return [...new Set(currencySearchList)];
  }

  private getAlpha2SearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    let alpha2SearchList: string[] = [];

    countryData.forEach(
      country => (alpha2SearchList = [...alpha2SearchList, country.alpha2]),
    );
    return alpha2SearchList;
  }

  private getAlpha3SearchList(
    countryData: NormalizedCountryArrayItem[],
  ): string[] {
    let alpha3SearchList: string[] = [];

    countryData.forEach(
      country => (alpha3SearchList = [...alpha3SearchList, country.alpha3]),
    );
    return alpha3SearchList;
  }

  getRowConfig(countryData: NormalizedCountryArrayItem[]): TableRows {
    return countryData.map(country => {
      const currencyString = country.currencyArray
        .map(currency => currency.currency)
        .join(', ');

      return {
        isSwipeable: true,
        data: [
          {
            item: country.name,
            isNumeric: false,
          },
          {
            item: country.flag,
            isNumeric: true,
          },
          {
            item: currencyString,
            isNumeric: true,
          },
        ],
      };
    });
  }
}
