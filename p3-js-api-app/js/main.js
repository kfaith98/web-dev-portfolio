const matchButton = document.getElementById("match-button");
const eventDescription = document.getElementById("event-description");

matchButton.addEventListener("click", () => {
  const userInput = eventDescription.value.trim();
  console.log("User input:", userInput);
  // We'll wire this up to the AI on Day 3
});
