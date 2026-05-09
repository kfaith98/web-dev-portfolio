export function buildPrompt(eventDescription, suppliers) {
  const systemFraming =
    "You are EventMatch AI, a friendly recommender that matches users with the best event suppliers from a curated list.";
  const context = `Available suppliers:\n${JSON.stringify(suppliers)}`;
  const userInput = `User's event description:\n${eventDescription}`;
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
- Sum the minimum prices of all suppliers you plan to recommend. If this sum exceeds the user's total budget, return an empty recommendations array and explain why in the summary.
- If no combination fits, return empty recommendations and explain in summary.
- Prioritize covering distinct categories (venue, catering, photography, etc.) over multiple suppliers from the same category.
- Mention the specific constraint respected in each recommendation's reasoning.
- If no good matches exist, return "recommendations": [] and explain why in summary.
- Do not invent suppliers.
- Do not use suppliers outside the provided list.
`;

  return `${systemFraming}

${context}

${userInput}

${outputInstructions}`;
}

export async function callAI(prompt) {
  // throw new Error("test");

  // await new Promise((r) => setTimeout(r, 1500));
  await new Promise((resolve) => setTimeout(resolve, 8000));

  // Stub for callAI — returns same shape as live Gemini response.
  return {
    summary:
      "Here are five premium suppliers in BGC and Metro Manila well-suited for a polished, high-end corporate gala for 100 guests. Each has been selected for their experience with formal events and ability to deliver an elevated, photo-forward experience.",
    // "While we've noted your preference for no flowers due to allergies, the primary challenge is finding an outdoor wedding venue in Tagaytay that leaves enough budget for other essential services like catering, photography, and styling for a 50-person event. The most suitable venue alone has a minimum price of 180,000 pesos, which leaves insufficient funds to cover additional suppliers within your 200,000 pesos total budget. We recommend reviewing your budget or considering alternative locations if you wish to proceed with an outdoor setting.",
    recommendations: [
      {
        supplierId: "venue-005",
        reasoning:
          "Sky Deck 33 is an ideal choice for a corporate gala in BGC, offering a luxury rooftop setting with panoramic city views and a sleek, modern indoor interior for 100 guests.",
      },
      {
        supplierId: "catering-003",
        reasoning:
          "Maison Blanc Fine Dining specializes in plated, high-end international and modern Filipino menus, perfect for a formal corporate gala of your size that demands a polished dining experience.",
      },
      {
        supplierId: "lights-004",
        reasoning:
          "Aurora Lighting Design provides custom lighting concepts, architectural uplighting, and premium sound systems to create a cinematic and high-end atmosphere for your corporate event in BGC.",
      },
      {
        supplierId: "styling-002",
        reasoning:
          "Konsept Co. offers full event design, custom set construction, and themed installations, ensuring an elegant and fully designed environment for a premium corporate gala with 100 attendees.",
      },
      {
        supplierId: "ent-003",
        reasoning:
          "Riot Squad Live Band brings high-energy performances and can provide an MC, ensuring professional hosting and engaging entertainment for your corporate gala with a large crowd.",
      },
    ],
  };

  // const response = await fetch("/.netlify/functions/match", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ prompt }),
  // });

  // if (!response.ok) throw new Error("Request failed.");

  // const data = await response.json();
  // const text = data.candidates[0].content.parts[0].text;
  // return JSON.parse(text);
}
