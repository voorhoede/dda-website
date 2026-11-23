import { describe, it, expect } from 'vitest';
import {
  EDGE_CACHE_MARKER_HEADER,
  getCacheKey,
  isCacheableRequest,
  isCacheableResponse,
} from './edge-cache';
import { setCacheControl } from './cache-control';

const context = { isPreview: false, previewCookieName: 'HEAD_START_PREVIEW' };
const req = (url: string, init?: RequestInit) => new Request(url, init);

describe('isCacheableRequest', () => {
  it('accepts GET page requests', () => {
    expect(isCacheableRequest(req('https://dda.nl/events/'), context)).toBe(true);
  });

  it('rejects non-GET requests', () => {
    expect(isCacheableRequest(req('https://dda.nl/', { method: 'POST' }), context)).toBe(false);
  });

  it.each(['/api/form', '/_actions/submit/', '/_astro/a.js'])('rejects %s', (path) => {
    expect(isCacheableRequest(req(`https://dda.nl${path}`), context)).toBe(false);
  });

  it('rejects preview deployments', () => {
    expect(isCacheableRequest(req('https://dda.nl/'), { ...context, isPreview: true })).toBe(false);
  });

  it('rejects requests with the preview cookie', () => {
    const request = req('https://dda.nl/', { headers: { cookie: 'a=b; HEAD_START_PREVIEW=hash' } });
    expect(isCacheableRequest(request, context)).toBe(false);
  });

  it('ignores other cookies', () => {
    const request = req('https://dda.nl/', { headers: { cookie: 'a=b; NOT_HEAD_START_PREVIEW=1' } });
    expect(isCacheableRequest(request, context)).toBe(true);
  });
});

describe('isCacheableResponse', () => {
  const html = (init: ResponseInit = {}) =>
    new Response('<html></html>', {
      ...init,
      headers: { 'Content-Type': 'text/html', [EDGE_CACHE_MARKER_HEADER]: '1', ...init.headers },
    });

  it('accepts opted-in 200 HTML', () => {
    expect(isCacheableResponse(html())).toBe(true);
  });

  it('rejects non-200', () => {
    expect(isCacheableResponse(html({ status: 404 }))).toBe(false);
  });

  it('rejects responses that did not opt in', () => {
    expect(isCacheableResponse(new Response('x', { headers: { 'Content-Type': 'text/html' } }))).toBe(false);
  });

  it('rejects responses with Set-Cookie', () => {
    expect(isCacheableResponse(html({ headers: { 'Set-Cookie': 'a=b' } }))).toBe(false);
  });

  it('rejects non-HTML', () => {
    expect(isCacheableResponse(html({ headers: { 'Content-Type': 'application/json' } }))).toBe(false);
  });

  it('accepts what setCacheControl marks', () => {
    const init = { headers: new Headers({ 'Content-Type': 'text/html' }) };
    setCacheControl(init);
    expect(isCacheableResponse(new Response('x', init))).toBe(true);
  });
});

describe('getCacheKey', () => {
  it('includes host and query string', () => {
    expect(getCacheKey(req('https://dda.nl/a/?q=1')).url).not.toBe(getCacheKey(req('https://dda.nl/a/?q=2')).url);
    expect(getCacheKey(req('https://dda.nl/a/')).url).not.toBe(getCacheKey(req('https://other.nl/a/')).url);
  });

  it('is stable for identical requests', () => {
    expect(getCacheKey(req('https://dda.nl/a/?q=1')).url).toBe(getCacheKey(req('https://dda.nl/a/?q=1')).url);
  });

  it('never shares entries between the main and AI stages domain', () => {
    const main = getCacheKey(req('https://dda.nl/vacatures/'));
    const ai = getCacheKey(req('https://dda.nl/vacatures/', { headers: { 'x-is-ai-internship-domain': 'true' } }));
    expect(main.url).not.toBe(ai.url);
  });
});
