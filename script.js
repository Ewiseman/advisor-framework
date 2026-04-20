const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const steppedElements = Array.from(document.querySelectorAll("[data-step]"));
const steps = [...new Set(steppedElements.map((el) => Number(el.dataset.step)))].sort(
  (a, b) => a - b
);

let current = 0;
const minStep = 0;
const maxStep = steps[steps.length - 1] ?? 1;

function render() {
  steppedElements.forEach((el) => {
    const step = Number(el.dataset.step);

    if (step <= current) {
      el.classList.add("revealed");
      el.classList.remove("hidden-step");
    } else {
      el.classList.add("hidden-step");
      el.classList.remove("revealed");
    }
  });

  if (backBtn) backBtn.disabled = current <= minStep;
  if (nextBtn) nextBtn.disabled = current >= maxStep;
}

function next() {
  if (current < maxStep) {
    current += 1;
    render();
  }
}

function back() {
  if (current > minStep) {
    current -= 1;
    render();
  }
}

if (nextBtn) {
  nextBtn.addEventListener("click", next);
}

if (backBtn) {
  backBtn.addEventListener("click", back);
}

const assetAllocationBox = document.getElementById("assetAllocationBox");
const assetModalOverlay = document.getElementById("assetModalOverlay");
const assetModalClose = document.getElementById("assetModalClose");

function openAssetModal() {
  if (!assetModalOverlay) return;
  assetModalOverlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeAssetModal() {
  if (!assetModalOverlay) return;
  assetModalOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

if (assetAllocationBox) {
  assetAllocationBox.addEventListener("click", openAssetModal);
}

if (assetModalClose) {
  assetModalClose.addEventListener("click", closeAssetModal);
}

if (assetModalOverlay) {
  assetModalOverlay.addEventListener("click", (e) => {
    if (e.target === assetModalOverlay) {
      closeAssetModal();
    }
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && assetModalOverlay && !assetModalOverlay.classList.contains("hidden")) {
    closeAssetModal();
  }
});

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