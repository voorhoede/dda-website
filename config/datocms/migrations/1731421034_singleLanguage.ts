import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update environment\'s settings');
  await client.site.update({ locales: ['nl'] });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single-line string field "Label" (`events_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('U4J3tRWdTtmghtvyn6ZWWg', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Label" (`vacancies_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('WiOOdKODTzic6scG7zwA0g', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Label" (`publications_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Z_kIrwRTT_-0umJv2OsgOw', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Title" (`title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('QKCBCOFcTAClHXz_S-PKSQ', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Title" (`events_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('OVA5H2PVQRONXUbDHGzQ8A', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Title" (`vacancies_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('AVZKKbvvSNaITlOyVsTRPA', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Title" (`publications_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Zk3-KDGyRiqxKG9aeLz9AA', {
    default_value: { nl: '' },
  });

  console.log(
    'Update SEO meta tags field "SEO" (`seo`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('FU5kzyaqQLWzk1hjI1keKw', {
    default_value: { nl: null },
  });

  console.log(
    'Update Single-line string field "CTA Label" (`events_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('NkpBY7PWTBimsC8Oy4d54g', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "CTA Label" (`vacancies_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Tm9TNRz7StGjQlG99Z9c4g', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "CTA Label" (`publications_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Nox_4xiZRJ2A7mdITCgdgg', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Subtitle" (`subtitle`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('fzXxG5kJSuSlLboSYgu4Ew', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Become member CTA label" (`become_member_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('DHAso7nAT1GSY8kZuLHXzQ', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Find agency CTA label" (`find_agency_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('FXdVtWIFSJSpnmECnInpXw', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Value" (`value`) in model "\uD83C\uDF10 Translation" (`translation`)',
  );
  await client.fields.update('LFYiXZQGQpyygwi8bCmKUg', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single-line string field "Title" (`title`) in model "\uD83E\uDD37 Not found" (`not_found_page`)',
  );
  await client.fields.update('ZWmvtjvuTECWuQsPfSsv6Q', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83E\uDD37 Not found" (`not_found_page`)',
  );
  await client.fields.update('Zu006Xq0TMCAvV-vyQ_Iiw', {
    default_value: { nl: null },
  });

  console.log(
    'Update Single-line string field "Title" (`title`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('Rh6g_fUbR-63SUfhU_7dPw', {
    default_value: { nl: '' },
  });

  console.log(
    'Update SEO meta tags field "SEO" (`seo`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('NR_O9zrZQmyJx6rL56_DAQ', {
    default_value: { nl: null },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('Q-z1nyMsQtC8Sr6w6J2oGw', {
    default_value: { nl: null },
  });

  console.log(
    'Update Slug field "Slug" (`slug`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('Qjdkt8aORUOQRCZicWpsMA', {
    default_value: { nl: null },
  });

  console.log(
    'Update Single-line string field "Title" (`title`) in model "Internal link" (`internal_link`)',
  );
  await client.fields.update('dSdakG3hSWSGNkm9YOCwGw', {
    default_value: { nl: '' },
  });

  console.log(
    'Update Single link field "Page" (`page`) in model "Internal link" (`internal_link`)',
  );
  await client.fields.update('CdQJtWxySIak3Fs2cPJTEw', {
    default_value: { nl: null },
  });
}
