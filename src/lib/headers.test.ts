import { describe, it, expect, vi } from 'vitest';
import { applyHeaderRules } from './headers';

// Mock the raw import for testing
vi.mock('../../public/_headers?raw', () => ({
  default: `# Headers configuration file for Cloudflare Pages
/*
  Referrer-Policy: no-referrer-when-downgrade
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/movies/:title
  x-movie-name: You are watching ":title"
`,
}));

describe('Header parsing and application', () => {
  it('should apply global headers to all pages', () => {
    const mockResponse = new Response('test', {
      headers: new Headers(),
    });

    applyHeaderRules('https://example.com/some-page', mockResponse);

    expect(mockResponse.headers.get('Referrer-Policy')).toBe(
      'no-referrer-when-downgrade',
    );
    expect(mockResponse.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(mockResponse.headers.get('X-Frame-Options')).toBe('SAMEORIGIN');
  });

  it('should apply cache headers to astro assets', () => {
    const mockResponse = new Response('test', {
      headers: new Headers(),
    });

    applyHeaderRules('https://example.com/_astro/chunk-123.js', mockResponse);

    expect(mockResponse.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000, immutable',
    );
  });

  it('should apply cache headers to font assets', () => {
    const mockResponse = new Response('test', {
      headers: new Headers(),
    });

    applyHeaderRules('https://example.com/fonts/arial.woff2', mockResponse);

    expect(mockResponse.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000, immutable',
    );
  });

  it('should support placeholder substitution', () => {
    const mockResponse = new Response('test', {
      headers: new Headers(),
    });

    applyHeaderRules('https://example.com/movies/inception', mockResponse);

    expect(mockResponse.headers.get('x-movie-name')).toBe(
      'You are watching "inception"',
    );
  });

  it('should combine headers from multiple matching rules', () => {
    const mockResponse = new Response('test', {
      headers: new Headers(),
    });

    applyHeaderRules('https://example.com/_astro/styles.css', mockResponse);

    // Should have both global headers and cache headers
    expect(mockResponse.headers.get('Referrer-Policy')).toBe(
      'no-referrer-when-downgrade',
    );
    expect(mockResponse.headers.get('Cache-Control')).toBe(
      'public, max-age=31536000, immutable',
    );
  });
});
