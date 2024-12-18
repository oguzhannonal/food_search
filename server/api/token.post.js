
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const {name} = await readBody(event);
  const client = await serverSupabaseClient(event);
  const token = crypto.randomUUID();

  const { error } = await client.from("api_tokens").insert({
    name,
    token
  });
  if (error) {
    throw createError({
      statusCode: 500,
      title: "Error creating token",
    });
  }else{
    setResponseStatus(event,200);
    return {
      body: {
        token
      },
    };
  }
});
