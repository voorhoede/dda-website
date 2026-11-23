import { describe, expect, it } from 'vitest';
import { getSearchParams } from './use-search-params';

const initialParams = { zoek: '', provincie: '', page: '1' };

describe('getSearchParams', () => {
  it('uses initial values for known keys missing from the URL', () => {
    expect(getSearchParams('', initialParams, true)).toEqual(initialParams);
  });

  it('prefers URL values over initial values', () => {
    expect(getSearchParams('?zoek=abc&page=2', initialParams, true)).toEqual({
      zoek: 'abc',
      provincie: '',
      page: '2',
    });
  });

  it('ignores unknown URL params so the query key matches the server', () => {
    expect(
      getSearchParams('?utm_source=x&zoek=abc', initialParams, true),
    ).toEqual({ zoek: 'abc', provincie: '', page: '1' });
  });

  it('omits missing keys without defaults', () => {
    expect(getSearchParams('?zoek=abc&foo=bar', initialParams)).toEqual({
      zoek: 'abc',
    });
  });
});
