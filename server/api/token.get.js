
import { serverSupabaseClient , serverSupabaseUser} from "#supabase/server";
export default defineEventHandler(async (event) => {

  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 500,
      title: "No user",
    }); 
  }
  const { data, error } = await client.from("api_tokens").select("*");
  if (error) {
    throw createError({
      statusCode: 500,
      title: "Error getting tokens",
    });
    
  } else {
    setResponseStatus(event,200);
    return {
      body: data,
    };
  }
});
