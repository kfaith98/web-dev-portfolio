const results = document.querySelector("#results-section");
const summary = document.querySelector("#summary");
const samplePromptsContainer = document.querySelector("#sample-prompts");

export function renderCards(enrichedRecs) {
  //   console.log("renderCards called with", enrichedRecs.length, "recs");
  results.replaceChildren();

  if (enrichedRecs.length === 0) return;

  enrichedRecs.forEach((rec) => {
    const wrapper = document.createElement("article");
    wrapper.innerHTML = `
    <h3 class="card-name"></h3>
    <h4 class="card-location"></h4>
    <h4 class="card-price-range"></h4>
    <p class="card-services"></p>
    <p class="card-reasoning"></p>
    `;
    wrapper.querySelector(".card-name").textContent = rec.name;
    wrapper.querySelector(".card-location").textContent = rec.location;
    wrapper.querySelector(".card-price-range").textContent =
      `₱${rec.minPrice.toLocaleString()} – ₱${rec.maxPrice.toLocaleString()}`;
    wrapper.querySelector(".card-services").textContent =
      `${rec.services.slice(0, 3).join(" • ")}`;
    wrapper.querySelector(".card-reasoning").textContent = rec.reasoning;
    results.appendChild(wrapper);
  });
}

export function renderSummary(summaryText) {
  summary.textContent = summaryText;
}

export function renderSamplePrompts(prompts, textarea) {
  prompts.forEach((item) => {
    const samplePromptBtn = document.createElement("button");
    samplePromptBtn.textContent = item.label;
    samplePromptBtn.classList.add("sample-button");
    samplePromptBtn.addEventListener("click", () => {
      textarea.value = item.prompt;
    });

    samplePromptsContainer.appendChild(samplePromptBtn);
  });
}

export function startLoadingMessages() {
  const messages = [
    "Reading your event…",
    "Looking through suppliers…",
    "Matching to your needs…",
    "Drafting recommendations…",
  ];
  let index = 0;

  renderSummary(messages[0]);
  index = (index + 1) % messages.length;

  const intervalId = setInterval(() => {
    renderSummary(messages[index]);
    index = (index + 1) % messages.length;
  }, 2000);

  return () => clearInterval(intervalId);
}
