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
      el.classList.remove("hidden-step");
      el.classList.add("revealed");
    } else {
      el.classList.remove("revealed");
      el.classList.add("hidden-step");
    }
  });

  if (backBtn) backBtn.disabled = currentStep === 1;
  if (nextBtn) nextBtn.disabled = currentStep === maxStep;
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

if (nextBtn) nextBtn.addEventListener("click", goNext);
if (backBtn) backBtn.addEventListener("click", goBack);

// Make sure the page itself can receive focus
document.body.setAttribute("tabindex", "0");
document.body.focus();

// Listen at the window level for keyboard input
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