import type { APIRoute } from 'astro';
import { ActionError, actions } from 'astro:actions';

export const POST = (async ({ callAction, request }) => {
  const { error } = await callAction(
    actions.aiInternships.submitApplication,
    await request.formData(),
  );

  if (error) {
    return Response.json(
      { error: error.message },
      { status: ActionError.codeToStatus(error.code) },
    );
  }

  return new Response(null, { status: 204 });
}) satisfies APIRoute;
