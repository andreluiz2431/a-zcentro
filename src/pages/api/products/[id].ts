import type { APIRoute } from "astro";
import axios from 'axios';
export const GET: APIRoute = async ({ redirect }) => {
  try {
    const response = await axios.get(
      `https://bling.com.br/Api/v3/produtos/json/`,
      {
        params: {
          apikey: import.meta.env.BLING_API_KEY,
        },
      }
    );

    return {
      body: JSON.stringify(response.data),
      status: 200,
    };
  } catch (error) {
    return {
      body: JSON.stringify({ error: 'Erro ao buscar produtos do Bling' }),
      status: 500,
    };
  }
}
