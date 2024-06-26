import {Normalize} from '../normalize';
import {
  CountryDataItem,
  NormalizedCountryArrayItem,
} from '../../interfaces/normalize.interface';
import {TableRows} from '../../interfaces/molecules.interfaces.ts';
import {beforeEach, describe, it, expect} from '@jest/globals';

describe('Normalize class', () => {
  let normalize: Normalize;

  beforeEach(() => {
    normalize = new Normalize();
  });

  const countryData: CountryDataItem[] = [
    {
      name: {common: 'United States'},
      flag: '🇺🇸',
      cca2: 'US',
      cca3: 'USA',
      currencies: {
        USD: {name: 'US Dollar', symbol: '$'},
      },
    },
    {
      name: {common: 'United Kingdom'},
      flag: '🇬🇧',
      cca2: 'GB',
      cca3: 'GBR',
      currencies: {
        GBP: {name: 'British Pound', symbol: '£'},
      },
    },
    {
      name: {common: 'Canada'},
      flag: '🇨🇦',
      cca2: 'CA',
      cca3: 'CAN',
      currencies: {
        CAD: {name: 'Canadian Dollar', symbol: 'CA$'},
      },
    },
  ];

  const normalizedCountryData: NormalizedCountryArrayItem[] = [
    {
      isActive: true,
      name: 'Canada',
      flag: '🇨🇦',
      alpha2: 'CA',
      alpha3: 'CAN',
      currencyArray: [
        {currency: 'CAD', name: 'Canadian Dollar', symbol: 'CA$'},
      ],
    },
    {
      isActive: true,
      name: 'United Kingdom',
      flag: '🇬🇧',
      alpha2: 'GB',
      alpha3: 'GBR',
      currencyArray: [{currency: 'GBP', name: 'British Pound', symbol: '£'}],
    },
    {
      isActive: true,
      name: 'United States',
      flag: '🇺🇸',
      alpha2: 'US',
      alpha3: 'USA',
      currencyArray: [{currency: 'USD', name: 'US Dollar', symbol: '$'}],
    },
  ];

  describe('getCountryData', () => {
    it('should normalize raw country data into a standardized format', () => {
      const result = normalize.getCountryData(countryData);
      expect(result).toEqual(normalizedCountryData);
    });
  });

  describe('getSearchList', () => {
    it('should return a list of unique currency names when pickerValue is 1', () => {
      const result = normalize.getSearchList(1, normalizedCountryData);
      expect(result).toEqual(['Canadian Dollar', 'British Pound', 'US Dollar']);
    });

    it('should return a list of alpha2 codes when pickerValue is 2', () => {
      const result = normalize.getSearchList(2, normalizedCountryData);
      expect(result).toEqual(['CA', 'GB', 'US']);
    });

    it('should return a list of alpha3 codes when pickerValue is 3', () => {
      const result = normalize.getSearchList(3, normalizedCountryData);
      expect(result).toEqual(['CAN', 'GBR', 'USA']);
    });

    it('should return an empty array for invalid pickerValue', () => {
      const result = normalize.getSearchList(4, normalizedCountryData);
      expect(result).toEqual([]);
    });
  });

  describe('getRowConfig', () => {
    it('should generate table row configuration from normalized country data', () => {
      const expectedRowConfig: TableRows = [
        {
          isSwipeable: true,
          data: [
            {item: 'Canada', isNumeric: false},
            {item: '🇨🇦', isNumeric: true},
            {item: 'CAD', isNumeric: true},
          ],
          isActive: true,
        },
        {
          isSwipeable: true,
          data: [
            {item: 'United Kingdom', isNumeric: false},
            {item: '🇬🇧', isNumeric: true},
            {item: 'GBP', isNumeric: true},
          ],
          isActive: true,
        },
        {
          isSwipeable: true,
          data: [
            {item: 'United States', isNumeric: false},
            {item: '🇺🇸', isNumeric: true},
            {item: 'USD', isNumeric: true},
          ],
          isActive: true,
        },
      ];

      const result = normalize.getRowConfig(normalizedCountryData);
      expect(result).toEqual(expectedRowConfig);
    });
  });
});
