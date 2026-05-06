import { loadSuppliers } from "./suppliers.js";
import { buildPrompt, callAI } from "./ai.js";

const matchButton = document.getElementById("match-button");
const eventDescription = document.getElementById("event-description");
const resultsPre = document.getElementById("results-pre");

const suppliers = await loadSuppliers();

matchButton.addEventListener("click", async () => {
  const userInput = eventDescription.value.trim();
  const prompt = buildPrompt(userInput, suppliers);

  resultsPre.textContent = "Thinking...";

  try {
    const result = await callAI(prompt);
    const enrichedRecs = result.recommendations.map((rec) => {
      const supplier = suppliers.find(s => s.id === rec.supplierId);
      return { ...supplier, reasoning: rec.reasoning} 
    });

    resultsPre.textContent = JSON.stringify(enrichedRecs, null, 2);
  } catch (error) {
    console.error(error);
    resultsPre.textContent = "Something went wrong. Please try again.";
  }
});
