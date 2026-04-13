const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const steppedElements = Array.from(document.querySelectorAll("[data-step]"));
const steps = [...new Set(steppedElements.map(el => +el.dataset.step))].sort((a, b) => a - b);

let current = 1;

function render() {
  steppedElements.forEach(el => {
    const step = +el.dataset.step;

    if (step <= current) {
      el.classList.add("revealed");
      el.classList.remove("hidden-step");
    } else {
      el.classList.add("hidden-step");
      el.classList.remove("revealed");
    }
  });

  backBtn.disabled = current === 1;
  nextBtn.disabled = current === steps.length;
}

function next() {
  if (current < steps.length) {
    current++;
    render();
  }
}

function back() {
  if (current > 1) {
    current--;
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

  if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    back();
  }
});

render();