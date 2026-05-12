import { loadSuppliers } from "./suppliers.js";
import { buildPrompt, callAI } from "./ai.js";
import {
  renderCards,
  renderSummary,
  renderSamplePrompts,
  startLoadingMessages,
} from "./ui.js";

const samplePrompts = [
  {
    label: "Corporate gala in BGC",
    prompt:
      "We're organizing a 100-person corporate gala in BGC for a fintech company. We want a premium experience with elegant styling, formal catering, professional hosting, strong lights and sounds, and a modern indoor venue. Budget is flexible and we want the event to feel high-end and polished.",
  },
  {
    label: "Tagaytay wedding under ₱200k",
    prompt:
      "We're planning a 50-person outdoor wedding in Tagaytay next month with a total budget of 200,000 pesos. We also need to avoid flowers completely due to severe allergies.",
  },
];

const matchButton = document.getElementById("match-button");
const eventDescription = document.getElementById("event-description");

renderSamplePrompts(samplePrompts, eventDescription);

const suppliers = await loadSuppliers();

matchButton.addEventListener("click", async () => {
  const userInput = eventDescription.value.trim();
  const prompt = buildPrompt(userInput, suppliers);

  matchButton.disabled = true;
  matchButton.textContent = "Finding suppliers…";
  const stopLoading = startLoadingMessages();
  renderCards([]);

  try {
    const result = await callAI(prompt);
    const enrichedRecs = result.recommendations.map((rec) => {
      const supplier = suppliers.find((s) => s.id === rec.supplierId);
      return { ...supplier, reasoning: rec.reasoning };
    });

    renderCards(enrichedRecs);
    renderSummary(result.summary);
  } catch (error) {
    renderCards([]);
    console.error(error);
    renderSummary(error.message || "Something went wrong, please try again.");
  } finally {
    stopLoading();
    matchButton.disabled = false;
    matchButton.textContent = "Find Suppliers";
  }
});
