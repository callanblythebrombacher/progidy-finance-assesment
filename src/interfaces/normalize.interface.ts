export interface Currency {
  name: string;
  symbol: string;
}
export interface CountryDataItem {
  name: {
    common: string;
  };
  flag: string;
  cca2: string;
  cca3: string;
  currencies: {
    [currencyCode: string]: Currency;
  };
}

export interface NormalizedCurrencyArrayItem extends Currency {
  currency: string;
}

export interface NormalizedCountryArrayItem {
  name: string;
  flag: string;
  alpha2: string;
  alpha3: string;
  currencyArray: NormalizedCurrencyArrayItem[];
}
