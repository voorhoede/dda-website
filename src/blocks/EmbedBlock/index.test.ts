import { describe, expect, test } from 'vitest';
import { sanatizeHtml } from './index';

describe('sanatizeHtml', () => {
  test('removes deprecated iframe attributes and hidden overflow from style', () => {
    const html = '<iframe allow="foo" frameborder="0" scrolling="no" style="width: 100%; overflow: hidden;"></iframe>';
    const sanitizedHtml = sanatizeHtml(html);

    expect(sanitizedHtml).not.toContain('allow=');
    expect(sanitizedHtml).not.toContain('frameborder=');
    expect(sanitizedHtml).not.toContain('scrolling=');
    expect(sanitizedHtml).not.toContain('overflow: hidden');
    expect(sanitizedHtml).toContain('style="width: 100%;"');
  });

  test('removes empty style attribute after sanitization', () => {
    const html = '<iframe style="overflow-y: hidden;"></iframe>';
    const sanitizedHtml = sanatizeHtml(html);

    expect(sanitizedHtml).not.toContain('style=');
  });
});
