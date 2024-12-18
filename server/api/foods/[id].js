import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { getQuery } from "h3";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  let user = null;
  try {
    user = await serverSupabaseUser(event);
  } catch (e) {
    console.log(e);
  }
  const id = getRouterParam(event, "id");

  const { token } = getQuery(event);

  const { data: api_tokens, error: api_tokens_error } = await client
    .from("api_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (api_tokens_error && !user) {
    throw createError({
      statusCode: 500,
      title: "No user and no token",
    });
  }
  if (id) {
    const { data, error } = await client
      .from("food")
      .select("*")
      .eq("Food_Id", id)
      .single();

    if (error) {
      throw createError({
        statusCode: 500,
        title: "Error getting food",
      });
    } else {
      setResponseStatus(event,200);
      return {
        body: data,
      };
    }
  }
});
