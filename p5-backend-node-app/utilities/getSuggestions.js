const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const buildPrompt = (event, activeArrangements, candidates) => {
  const coveredSummary = activeArrangements
    .map((a) => `${a.supplierId.category} — ${a.status}`)
    .join(', ');

  const systemFraming =
    'You are an experienced event producer advising a colleague. ' +
    'The supplier candidates below have already been filtered to categories ' +
    'this event has no coverage for. Your only job is to rank them by ' +
    'booking urgency and explain each in one sentence.';
  const context = `Event Name: ${event.name}
Already covered: ${coveredSummary}
Supplier Candidate List:
${JSON.stringify(candidates)}`;
  const outputInstructions = `

Return only valid JSON using this exact shape:

{
  "recommendations": [
    {
      "supplierId": "abc123",
      "reasoning": "..."
    }
  ]
}

Rules:
- Return only valid JSON in the exact shape above.
- No markdown fences, no preamble, no commentary.
- Return exactly one object per supplier in the candidate list — never add, never omit.
- Rank most urgent first. Judge urgency by how hard the gap is to fill late
  and how central it is to the event.
- reasoning: one sentence, producer-to-producer, not salesy.
- Do not mention or estimate any peso amounts.
`;

  return `${systemFraming}

${context}

${outputInstructions}`;
};

const getSuggestions = async (event, activeArrangements, candidates) => {
  const prompt = buildPrompt(event, activeArrangements, candidates);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    const upstreamError = await response.text();
    console.error(`Gemini error (${response.status}):`, upstreamError);
    throw new Error('AI suggestion service unavailable');
  }
  const data = await response.json();
  try {
    const text = data.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(text);
    return parsed.recommendations;
  } catch (error) {
    console.error('Failed to parse AI response:', error, JSON.stringify(data));
    throw new Error('AI suggestion service unavailable');
  }
};

export default getSuggestions;
