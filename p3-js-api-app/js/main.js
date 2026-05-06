import { loadSuppliers } from './suppliers.js';
import { buildPrompt } from './ai.js';
import { callAI } from './ai.js';

const matchButton = document.getElementById("match-button");
const eventDescription = document.getElementById("event-description");

matchButton.addEventListener("click", () => {
  const userInput = eventDescription.value.trim();
  console.log("User input:", userInput);
  // We'll wire this up to the AI on Day 3
});

const suppliers = await loadSuppliers();
const prompt = buildPrompt("100-person corporate gala in BGC, premium experience, no budget concerns", suppliers);
const result = await callAI(prompt);
console.log(result);