import type { APIRoute } from "astro";
console.log('feedbackID');

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
    const message = formData.get('message')?.toString();
    const user = formData.get('name') + ' (' + formData.get('email') + ')'?.toString();

    if (!message || !user) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }
  
    if (!params.id) {
      return new Response("Cannot find friend", {
        status: 404,
      });
    }
  
    // Redireciona para uma página de sucesso ou mostra uma mensagem
    return redirect("/feedback-sucesso");
  }