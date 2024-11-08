import { renderToFragment } from '@lib/renderer';
import { describe, expect, test } from 'vitest';
import EmbedBlock, { type Props } from './EmbedBlock.astro';

describe('EmbedBlock', () => {
  test('renders a Flickr embed block correctly', async () => {
    const fragment = await renderToFragment<Props>(EmbedBlock, {
      props: {
        block: {
          id: '123',
          url: 'https://www.flickr.com/photos/danielcheong/50416691972',
          data: {
            provider_name: 'Flickr',
            url: 'https://live.staticflickr.com/65535/50416691972_d17d04862f_b.jpg',
            type: 'photo',
            flickr_type: 'photo',
            title: 'Fantasy Island',
            author_name: 'DanielKHC',
            author_url: 'https://www.flickr.com/photos/danielcheong/',
            width: 1024,
            height: 683,
            web_page: 'https://www.flickr.com/photos/danielcheong/50416691972/',
            thumbnail_url: 'https://live.staticflickr.com/65535/50416691972_d17d04862f_q.jpg',
            thumbnail_width: 150,
            thumbnail_height: 150,
            web_page_short_url: 'https://flic.kr/p/2jP9J2S',
            license: 'All Rights Reserved',
            license_id: 0,
            html: '<a data-flickr-embed="true" href="https://www.flickr.com/photos/danielcheong/50416691972/" title="Fantasy Island by DanielKHC, on Flickr"><img src="https://live.staticflickr.com/65535/50416691972_d17d04862f_b.jpg" width="1024" height="683" alt="Fantasy Island"></a><script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>',
            version: 1,
            cache_age: 3600,
            provider_url: 'https://www.flickr.com/',
          },
        },
      },
    });

    expect(fragment.querySelector('default-embed')).toBeTruthy();
    expect(fragment.querySelector('[data-provider="Flickr"]')).toBeTruthy();
  });

  test('renders a CodePen embed block correctly', async () => {
    const fragment = await renderToFragment<Props>(EmbedBlock, {
      props: {
        block: {
          id: '123',
          url: 'https://codepen.io/mattdesl/pen/epQNqN',
          data: {
            provider_name: 'CodePen',
            url: 'https://codepen.io/mattdesl/pen/epQNqN',
            success: true,
            type: 'rich',
            version: '1.0',
            provider_url: 'https://codepen.io',
            title: 'Junk Pile - #codevember',
            author_name: 'Matt DesLauriers',
            author_url: 'https://codepen.io/mattdesl',
            height: '300',
            width: '800',
            thumbnail_width: '384',
            thumbnail_height: '225',
            thumbnail_url: 'https://shots.codepen.io/username/pen/epQNqN-512.jpg?version=1447132171',
            html: '<iframe id="cp_embed_epQNqN" src="https://codepen.io/mattdesl/embed/preview/epQNqN?default-tabs=js%2Cresult&amp;height=300&amp;host=https%3A%2F%2Fcodepen.io&amp;slug-hash=epQNqN" title="Junk Pile - #codevember" scrolling="no" frameborder="0" height="300" allowtransparency="true" class="cp_embed_iframe" style="width: 100%; overflow: hidden;"></iframe>'
          },
        },
      },
    });

    expect(fragment.querySelector('default-embed')).toBeTruthy();
    expect(fragment.querySelector('[data-provider="CodePen"]')).toBeTruthy();
  });
});
