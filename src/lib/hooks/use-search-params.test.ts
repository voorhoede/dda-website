import { describe, expect, it } from 'vitest';
import { mergeSearchParams } from './use-search-params';

describe('mergeSearchParams', () => {
  const current = { zoek: 'abc', provincie: '', page: '2' };

  it('sets changed values and keeps the others', () => {
    expect(mergeSearchParams(current, { provincie: 'utrecht' })).toEqual({
      zoek: 'abc',
      provincie: 'utrecht',
      page: '2',
    });
  });

  it('removes params that are set to an empty value', () => {
    expect(mergeSearchParams(current, { zoek: '', page: undefined })).toEqual({
      provincie: '',
    });
  });

  it('does not change the current state', () => {
    mergeSearchParams(current, { zoek: 'xyz' });
    expect(current).toEqual({ zoek: 'abc', provincie: '', page: '2' });
  });
});
