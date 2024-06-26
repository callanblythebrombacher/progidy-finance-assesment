import {renderHook} from '@testing-library/react-native';
import useNormalizeData from '../useNormalizeData.ts';
import {Normalize} from '../../utils/normalize.ts'; // Adjust path based on your project structure
import {
  CountryDataItem,
  NormalizedCountryArrayItem,
} from '../../interfaces/normalize.interface.ts';
import {describe, it, jest, expect} from '@jest/globals'; // Adjust path based on your project structure

describe('useNormalizeData hook', () => {
  it('should set up pickerList based on pickerValue and countryData', () => {
    const pickerValue = 1;
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
    const setSearchQuery = jest.fn();

    // Transform raw country data into NormalizedCountryArrayItem
    const normalizeInstance = new Normalize();
    const normalizedCountryData: NormalizedCountryArrayItem[] =
      normalizeInstance.getCountryData(countryData);

    const getSearchListMock = jest
      .spyOn(normalizeInstance, 'getSearchList')
      .mockReturnValue(['USD', 'GBP', 'CAD']);

    // Render the hook with mocked data
    const {result} = renderHook(() =>
      useNormalizeData(pickerValue, normalizedCountryData, setSearchQuery),
    );

    // Assert pickerList contains expected items with listTitle and onPress properties
    expect(result.current.pickerList).toEqual([
      {listTitle: 'USD', onPress: expect.any(Function)},
      {listTitle: 'GBP', onPress: expect.any(Function)},
      {listTitle: 'CAD', onPress: expect.any(Function)},
    ]);

    // Optional: Verify the method was called with expected arguments
    expect(getSearchListMock).toHaveBeenCalledWith(
      pickerValue,
      normalizedCountryData,
    );
  });

  it('should set up rowData based on countryData', () => {
    const pickerValue = 1;
    const countryData: CountryDataItem[] = [
      {
        name: {common: 'United States'},
        flag: '🇺🇸',
        cca2: 'US',
        cca3: 'USA',
        currencies: {USD: {name: 'US Dollar', symbol: '$'}},
      },
      {
        name: {common: 'United Kingdom'},
        flag: '🇬🇧',
        cca2: 'GB',
        cca3: 'GBR',
        currencies: {GBP: {name: 'British Pound', symbol: '£'}},
      },
      {
        name: {common: 'Canada'},
        flag: '🇨🇦',
        cca2: 'CA',
        cca3: 'CAN',
        currencies: {CAD: {name: 'Canadian Dollar', symbol: 'CA$'}},
      },
    ];
    const setSearchQuery = jest.fn();

    // Transform raw country data into NormalizedCountryArrayItem
    const normalizeInstance = new Normalize();
    const normalizedCountryData: NormalizedCountryArrayItem[] =
      normalizeInstance.getCountryData(countryData);

    const getRowConfigMock = jest
      .spyOn(normalizeInstance, 'getRowConfig')
      .mockReturnValue([
        {
          isSwipeable: true,
          data: [
            {item: 'United States', isNumeric: false},
            {item: '🇺🇸', isNumeric: true},
            {item: 'US Dollar', isNumeric: true},
          ],
          isActive: true,
        },
        {
          isSwipeable: true,
          data: [
            {item: 'United Kingdom', isNumeric: false},
            {item: '🇬🇧', isNumeric: true},
            {item: 'British Pound', isNumeric: true},
          ],
          isActive: false,
        },
        {
          isSwipeable: true,
          data: [
            {item: 'Canada', isNumeric: false},
            {item: '🇨🇦', isNumeric: true},
            {item: 'Canadian Dollar', isNumeric: true},
          ],
          isActive: true,
        },
      ]);

    // Render the hook with mocked data
    const {result} = renderHook(() =>
      useNormalizeData(pickerValue, normalizedCountryData, setSearchQuery),
    );

    // Assert rowData matches expected structure and values
    expect(result.current.rowData).toEqual([
      {
        isSwipeable: true,
        data: [
          {item: 'United States', isNumeric: false},
          {item: '🇺🇸', isNumeric: true},
          {item: 'US Dollar', isNumeric: true},
        ],
        isActive: true,
      },
      {
        isSwipeable: true,
        data: [
          {item: 'United Kingdom', isNumeric: false},
          {item: '🇬🇧', isNumeric: true},
          {item: 'British Pound', isNumeric: true},
        ],
        isActive: false,
      },
      {
        isSwipeable: true,
        data: [
          {item: 'Canada', isNumeric: false},
          {item: '🇨🇦', isNumeric: true},
          {item: 'Canadian Dollar', isNumeric: true},
        ],
        isActive: true,
      },
    ]);

    // Optional: Verify the method was called with expected arguments
    expect(getRowConfigMock).toHaveBeenCalledWith(normalizedCountryData);
  });
});
