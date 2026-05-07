import { loadSuppliers } from "./suppliers.js";
import { buildPrompt, callAI } from "./ai.js";
import { renderCards, renderSummary } from "./ui.js";

const matchButton = document.getElementById("match-button");
const eventDescription = document.getElementById("event-description");

const suppliers = await loadSuppliers();

matchButton.addEventListener("click", async () => {
  const userInput = eventDescription.value.trim();
  const prompt = buildPrompt(userInput, suppliers);

  renderSummary("Thinking…");
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
    renderSummary("Something went wrong, please try again.");
  }
});
