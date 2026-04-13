const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const steps = Array.from({ length: 30 }, (_, i) =>
  document.getElementById(`step-${i + 1}`)
).filter(Boolean);

let currentStep = 1;
const maxStep = steps.length;

function render() {
  steps.forEach((el, index) => {
    if (index < currentStep) {
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
    currentStep++;
    render();
  }
}

function back() {
  if (currentStep > 1) {
    currentStep--;
    render();
  }
}

nextBtn.addEventListener("click", next);
backBtn.addEventListener("click", back);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") back();
});

render();