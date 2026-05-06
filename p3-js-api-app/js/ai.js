export function buildPrompt(eventDescription, suppliers) {
  // 1. System framing
  const systemFraming =
    "You are EventMatch AI, a friendly recommender that matches users with the best event suppliers from a curated list.";
  // 2. Context (suppliers)
  const context = `Available suppliers:\n${JSON.stringify(suppliers)}`;
  // 3. User input
  const userInput = `User's event description:\n${eventDescription}`;
  // 4. Output instructions
  const outputInstructions = `

Return only valid JSON using this exact shape:

{
  "summary": "...",
  "recommendations": [
    {
      "supplierId": "abc123",
      "reasoning": "..."
    }
  ]
}

Rules:
- Recommend 3 to 5 suppliers.
- Do not use markdown fences.
- Do not include preamble, commentary, or extra text.
- Use supplierId only, not supplier names.
- Reasoning must be 1 to 2 sentences per match.
- Be friendly, helpful, and not salesy.
- Honor all user constraints: allergies, dietary restrictions, exclusions, event type, guest count, location, and budget.
- If the user already has a supplier category, exclude that category.
- If the user mentions a budget, only recommend suppliers whose minPrice and maxPrice are compatible with that budget.
- Treat any user-mentioned budget as the total event budget unless they specify otherwise (e.g. "200k for the venue alone").
- Recommend a combination of suppliers whose minimum prices together fit within that budget.
- Use each supplier's minPrice as the conservative estimate when checking the sum.
- If no combination fits, return empty recommendations and explain in summary.
- Prioritize covering distinct categories (venue, catering, photography, etc.) over multiple suppliers from the same category.
- Mention the specific constraint respected in each recommendation's reasoning.
- If no good matches exist, return "recommendations": [] and explain why in summary.
- Do not invent suppliers.
- Do not use suppliers outside the provided list.
`;

  // return the combined string
  return `${systemFraming}

${context}

${userInput}

${outputInstructions}`;
}

export async function callAI(prompt) {
  // throw new Error("test");

  // await new Promise(r => setTimeout(r, 1500));

  // // Reasoning for placeholder only, from supplier descriptions
  // // Stub test due to Gemini downtime
  // return {
  //   summary: "Found 4 suppliers across venue, catering, lights, and photography that fit your event.",
  //   recommendations: [
  //     { supplierId: "venue-001", reasoning: "Bright, modern indoor venue with tall windows, greenery-inspired interiors, and a clean elegant atmosphere" },
  //     { supplierId: "catering-004", reasoning: "Best for clients who want a fun, smoky, crowd-pleasing menu that doubles as an experience." },
  //     { supplierId: "lights-002", reasoning: "Focuses on mood and ambient lighting, specializing in warm, romantic atmospheres rather than concert-style production." },
  //     { supplierId: "photo-003", reasoning: "For clients who care equally about both photo and video, and who want a polished, share-ready output." }
  //   ]
  // };

  const response = await fetch("/.netlify/functions/match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) throw new Error("Request failed.");

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  return JSON.parse(text);
} 
