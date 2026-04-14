import type { APIRoute } from 'astro';

export const POST = (async ({ request }) => {
  const formData = await request.formData();
  const data = {
    id: formData.get('id'),
    toEmail: formData.get('to-email'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    track: formData.get('track'),
    institution: formData.get('institution'),
    linkedin: formData.get('linkedin'),
    portfolio: formData.get('portfolio')
  };
  
  console.log(JSON.stringify(data, null, 2));
  
  return new Response(
    JSON.stringify({
      message: 'This was a POST!',
    }),
  );
}) satisfies APIRoute;
