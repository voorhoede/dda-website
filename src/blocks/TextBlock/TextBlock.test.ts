import { renderToFragment } from '@lib/renderer';
import { describe, expect, test } from 'vitest';
import TextBlock, { type Props } from './TextBlock.astro';

describe('TextBlock Component', () => {
  test('renders a paragraph with the correct text content', async () => {
    const fragment = await renderToFragment<Props>(TextBlock, {
      props: {
        block: {
          __typename: 'TextBlockRecord',
          text: {
            blocks: [],
            value: {
              schema: 'dast',
              document: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'span',
                        value: 'This is a test paragraph',
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    });

    expect(fragment.querySelector('p')?.textContent).toBe(
      'This is a test paragraph',
    );
  });
});
