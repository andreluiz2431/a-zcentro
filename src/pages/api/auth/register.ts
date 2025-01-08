import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  /* Get form data */
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const type = 'cliente';
  const cpf_cnpj = formData.get("cpf_cnpj")?.toString();
  const data_criacao = new Date(); // Use Date object instead of timestamp.

  if (!email || !password || !name || !type || !cpf_cnpj) {
    return new Response("Missing form data", { status: 400 });
  }

  try {
    // Create user and get user ID (uid)
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    const uid = userRecord.uid; // Get the UID of the created user

    /* Create user in Firestore */
    const db = getFirestore(app);
    const UsuariosRef = db.collection("Usuarios");
    
    // Use uid as the document ID
    await UsuariosRef.doc(uid).set({
      nome: name,
      tipo: type,
      data_criacao: data_criacao,
      cpf_cnpj: cpf_cnpj
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Something went wrong", { status: 500 });
  }

  return redirect("/signin");
};
