const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
 
const SAFE_MESSAGES = {
  RATE_LIMIT: "We're getting a lot of requests right now. Please try again in a minute.",
  SERVICE_BUSY: "Our matching service is temporarily busy. Please try again shortly.",
  UPSTREAM_ERROR: "Something went wrong on our end. Please try again.",
};
 
export default async (request, context) => {
  try {
    if (request.method !== "POST")
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    if (!process.env.GEMINI_API_KEY)
      return Response.json(
        { error: "API key not configured" },
        { status: 500 },
      );
 
    const { prompt } = await request.json();
    if (typeof prompt !== "string" || !prompt.trim())
      return Response.json({ error: "Bad request" }, { status: 400 });
 
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
 
    console.log("Gemini response status:", response.status);
 
    if (!response.ok) {
      
      const upstreamError = await response.text();
      console.error(`Gemini error (${response.status}):`, upstreamError);
 
      
      let safeMessage;
      let returnStatus;
      if (response.status === 429) {
        safeMessage = SAFE_MESSAGES.RATE_LIMIT;
        returnStatus = 429;
      } else if (response.status === 503) {
        safeMessage = SAFE_MESSAGES.SERVICE_BUSY;
        returnStatus = 503;
      } else {
        safeMessage = SAFE_MESSAGES.UPSTREAM_ERROR;
        returnStatus = 500;
      }
 
      return Response.json({ error: safeMessage }, { status: returnStatus });
    }
 
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    
    console.error("Function error:", error);
    return Response.json(
      { error: SAFE_MESSAGES.UPSTREAM_ERROR },
      { status: 500 },
    );
  }
};