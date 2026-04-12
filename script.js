const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const steps = Array.from({ length: 30 }, (_, i) =>
  document.getElementById(`step-${i + 1}`)
).filter(Boolean);

let currentStep = 1;
const maxStep = steps.length;

function render() {
  steps.forEach((element, index) => {
    if (index < currentStep) {
      element.classList.remove("hidden-step");
      element.classList.add("revealed");
    } else {
      element.classList.remove("revealed");
      element.classList.add("hidden-step");
    }
  });

  backBtn.disabled = currentStep === 1;
  nextBtn.disabled = currentStep === maxStep;
}

function goNext() {
  if (currentStep < maxStep) {
    currentStep += 1;
    render();
  }
}

function goBack() {
  if (currentStep > 1) {
    currentStep -= 1;
    render();
  }
}

nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);

window.addEventListener("keydown", (event) => {
  const active = document.activeElement;
  const tag = active ? active.tagName : "";
  const isTyping =
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    (active && active.isContentEditable);

  if (isTyping) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    goBack();
  }
});

render();