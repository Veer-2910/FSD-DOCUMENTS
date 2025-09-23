const counterDisplay = document.getElementById("counter");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");

let count = 0;

// Load saved counter from backend
async function fetchCount() {
  try {
    const res = await fetch("/api/counter");
    const data = await res.json();
    count = data.value;
    updateDisplay();
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function updateDisplay() {
  counterDisplay.textContent = count;
}

async function updateBackend() {
  try {
    await fetch("/api/counter/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: count }),
    });
  } catch (err) {
    console.error("Update error:", err);
  }
}

increaseBtn.addEventListener("click", async () => {
  count++;
  updateDisplay();
  await updateBackend();
});

decreaseBtn.addEventListener("click", async () => {
  count = Math.max(0, count - 1);
  updateDisplay();
  await updateBackend();
});

resetBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/counter/reset", {
      method: "POST",
    });
    const data = await res.json();
    count = data.value;
    updateDisplay();
  } catch (err) {
    console.error("Reset failed:", err);
  }
});

// Load on start
fetchCount();
