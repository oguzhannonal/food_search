import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const origin = getRequestHeader(event, "origin") || "*";

  // Handle preflight OPTIONS request
  if (getMethod(event) === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    };
  }

  // Set CORS headers for all responses
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  });

  // Extract query parameters
  const { token, foodName } = getQuery(event);

  // Validate input
  if (!foodName) {
    throw createError({
      statusCode: 400,
      message: "Food name is required",
    });
  }

  try {
    // Initialize Supabase client
    const client = await serverSupabaseClient(event);

    // Check for user or valid token
    let user = null;
    try {
      user = await serverSupabaseUser(event);
    } catch (e) {
      console.log("User authentication error:", e);
    }

    // Validate token
    const { data: tokens, error: api_tokens_error } = await client
      .from("api_tokens")
      .select("*")
      .eq("token", token)
      .single();

    if (api_tokens_error && !user) {
      throw createError({
        statusCode: 403,
        message: "Invalid token or unauthorized access",
      });
    }

    // Perform food search
    const { data, error } = await client
      .from("food")
      .select("FoodName,FoodNameEn,Food_Id")
      .ilike("FoodName", `%${foodName}%`);

    // Handle potential errors
    if (error) {
      throw createError({
        statusCode: 500,
        message: "Failed to retrieve food data",
        details: error.message,
      });
    }

    // Return successful response
    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    // Centralized error handling
    console.error("API Search Error:", error);

    // Check if it's a known error created by createError
    if (error.statusCode) {
      throw error;
    }

    // Generic server error for unexpected issues
    throw createError({
      statusCode: 500,
      message: "Unexpected server error",
      details: error.message,
    });
  }
});
