import {Filter} from '../filter.ts';
import {NormalizedCountryArrayItem} from '../../interfaces/normalize.interface';

import {describe, expect, beforeEach, it} from '@jest/globals';

describe('Filter class', () => {
  let filter: Filter;
  let countryData: NormalizedCountryArrayItem[];

  beforeEach(() => {
    filter = new Filter();
    countryData = [
      {
        isActive: true,
        name: 'United States',
        flag: '🇺🇸',
        alpha2: 'US',
        alpha3: 'USA',
        currencyArray: [{currency: 'USD', name: 'US Dollar', symbol: '$'}],
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
        name: 'Canada',
        flag: '🇨🇦',
        alpha2: 'CA',
        alpha3: 'CAN',
        currencyArray: [
          {currency: 'CAD', name: 'Canadian Dollar', symbol: 'CA$'},
        ],
      },
    ];
  });

  describe('getFilteredCountryData', () => {
    it('should filter by currency name', () => {
      const result = filter.getFilteredCountryData(1, 'Dollar', countryData);
      expect(result).toEqual([
        countryData[0], // United States
        countryData[2], // Canada
      ]);
    });

    it('should filter by alpha2 code', () => {
      const result = filter.getFilteredCountryData(2, 'GB', countryData);
      expect(result).toEqual([countryData[1]]); // United Kingdom
    });

    it('should filter by alpha3 code', () => {
      const result = filter.getFilteredCountryData(3, 'CAN', countryData);
      expect(result).toEqual([countryData[2]]); // Canada
    });

    it('should return all data if pickerValue is invalid', () => {
      const result = filter.getFilteredCountryData(4, 'invalid', countryData);
      expect(result).toEqual(countryData);
    });

    it('should return empty array if countryData is null', () => {
      const result = filter.getFilteredCountryData(1, 'Dollar', null);
      expect(result).toEqual([]);
    });
  });

  describe('filterByCurrency', () => {
    it('should filter countries by currency name', () => {
      const result = (filter as any).filterByCurrency('Dollar', countryData);
      expect(result).toEqual([
        countryData[0], // United States
        countryData[2], // Canada
      ]);
    });
  });

  describe('filterByAlpha2', () => {
    it('should filter countries by alpha2 code', () => {
      const result = (filter as any).filterByAlpha2('GB', countryData);
      expect(result).toEqual([countryData[1]]); // United Kingdom
    });
  });

  describe('filterByAlpha3', () => {
    it('should filter countries by alpha3 code', () => {
      const result = (filter as any).filterByAlpha3('CAN', countryData);
      expect(result).toEqual([countryData[2]]); // Canada
    });
  });
});
