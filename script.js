const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const steppedElements = Array.from(document.querySelectorAll("[data-step]"));

const stepValues = [...new Set(
  steppedElements.map((el) => Number(el.dataset.step))
)].sort((a, b) => a - b);

let currentStep = 1;
const maxStep = stepValues.length;

function render() {
  steppedElements.forEach((el) => {
    const step = Number(el.dataset.step);

    if (step <= currentStep) {
      el.classList.add("revealed");
      el.classList.remove("hidden-step");
    } else {
      el.classList.add("hidden-step");
      el.classList.remove("revealed");
    }
  });

  backBtn.disabled = currentStep === 1;
  nextBtn.disabled = currentStep === maxStep;
}

function next() {
  if (currentStep < maxStep) {
    currentStep += 1;
    render();
  }
}

function back() {
  if (currentStep > 1) {
    currentStep -= 1;
    render();
  }
}

nextBtn.addEventListener("click", next);
backBtn.addEventListener("click", back);

window.addEventListener("keydown", (e) => {
  const active = document.activeElement;
  const tag = active ? active.tagName : "";
  const isTyping =
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    (active && active.isContentEditable);

  if (isTyping) return;

  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") back();
});

render();