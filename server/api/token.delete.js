import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
const { id } = await readBody(event);
  const client = await serverSupabaseClient(event);
  
  const { data, error } = await client
    .from("api_tokens")
    .delete()
    .eq("id", id);
  if (error) {
    throw createError({
        statusCode: 500,
        title: "Error deleting token",
    });
    
  } else {
     setResponseStatus(event,200);
     return "Token Deleted"
  }
});
