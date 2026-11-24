import { describe, expect, test } from 'vitest';
import { defaultRedirectStatus, redirectStatusCode, toRedirectsFile } from './redirects';

describe('redirects:', () => {
  describe('redirectStatusCode returns valid redirect status:', () => {
    const validStatusCodes = [301, 302, 303, 307, 308];
    validStatusCodes.forEach((statusCode) =>
      test(`${statusCode} returns valid ${statusCode}`, () => {
        expect(redirectStatusCode(statusCode)).toBe(statusCode);
      })
    );
    const invalidStatusCodes = [100, 200, 304, 400, 500, 999];
    invalidStatusCodes.forEach((statusCode) =>
      test(`${statusCode} returns default ${defaultRedirectStatus}`, () => {
        expect(redirectStatusCode(statusCode)).toBe(defaultRedirectStatus);
      })
    );
  });

  describe('toRedirectsFile', () => {
    test('writes a rule with and without trailing slash, in order', () => {
      expect(toRedirectsFile([
        { from: '/old/', to: '/new/', statusCode: '301' },
        { from: '/placeholder/:slug/', to: '/en/:slug/', statusCode: '302' },
        { from: '/wildcard/*', to: '/en/:splat', statusCode: '302' },
      ])).toBe([
        '/old/ /new/ 301',
        '/old /new/ 301',
        '/placeholder/:slug/ /en/:slug/ 302',
        '/placeholder/:slug /en/:slug/ 302',
        '/wildcard/* /en/:splat 302',
        '',
      ].join('\n'));
    });

    test('skips rules with an absolute source', () => {
      expect(toRedirectsFile([
        { from: 'https://example.com/a', to: 'https://example.com/b', statusCode: '302' },
        { from: '/a/', to: 'https://example.com/', statusCode: '302' },
      ])).toBe('/a/ https://example.com/ 302\n/a https://example.com/ 302\n');
    });

    test('falls back to the default status for invalid codes', () => {
      expect(toRedirectsFile([{ from: '/', to: '/nl/', statusCode: '200' }]))
        .toBe(`/ /nl/ ${defaultRedirectStatus}\n`);
    });
  });
});
