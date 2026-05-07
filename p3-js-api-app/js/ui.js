const results = document.querySelector("#results-section");
const summary = document.querySelector("#summary");

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
    wrapper.querySelector(".card-name").textContent = `Name: ${rec.name}`;
    wrapper.querySelector(".card-location").textContent =
      `Location: ${rec.location}`;
    wrapper.querySelector(".card-price-range").textContent =
      `Price range: ₱${rec.minPrice.toLocaleString()} – ₱${rec.maxPrice.toLocaleString()}`;
    wrapper.querySelector(".card-services").textContent =
      `Services: ${rec.services.slice(0, 3).join(" • ")}`;
    wrapper.querySelector(".card-reasoning").textContent =
      `Why it's recommended: ${rec.reasoning}`;
    results.appendChild(wrapper);
  });
}

export function renderSummary(summaryText) {
  summary.textContent = summaryText;
}
