const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

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
      const err = await response.json();
      const status = response.status;
      const msg =
        status === 429
          ? "Rate limit reached. Please wait a moment and try again."
          : err.error?.message || `Request failed (${status})`;
      throw new Error(msg);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
};
