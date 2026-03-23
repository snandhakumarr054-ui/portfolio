(function () {
  const track = document.getElementById("track");

  function getCardWidth() {
    return window.innerWidth <= 410 ? 220 + 2 : 320 + 16;
  }

  let cardWidth = getCardWidth();
  let index = 1;
  let isAnimating = false;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let hasMoved = false;

  const cards = [...track.children];
  track.appendChild(cards[0].cloneNode(true));
  track.insertBefore(cards[cards.length - 1].cloneNode(true), track.children[0]);

  function setPosition(animate) {
    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
    currentTranslate = -cardWidth * index; // ✅ always sync after every move
  }

  setPosition(false);

  track.addEventListener("transitionend", () => {
    const total = track.children.length;
    if (index === total - 1) { index = 1; setPosition(false); }
    if (index === 0)         { index = total - 2; setPosition(false); }
    isAnimating = false;
  });

  // ── Mouse drag ──────────────────────────────────────────────────
  track.addEventListener("mousedown", (e) => {
    if (isAnimating) return;
    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    track.style.transition = "none";
    track.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 5) hasMoved = true;
    track.style.transform = `translateX(${currentTranslate + diff}px)`;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = "grab";

    if (!hasMoved) {
      setPosition(false);
      return;
    }

    const diff = e.clientX - startX;
    if (diff < -cardWidth / 3)     index++;
    else if (diff > cardWidth / 3) index--;

    isAnimating = true;
    setPosition(true); // ✅ snaps to correct card and syncs currentTranslate
  });

  // ── Touch swipe ─────────────────────────────────────────────────
  let touchStartX = 0;

  track.addEventListener("touchstart", (e) => {
    if (isAnimating) return;
    touchStartX = e.touches[0].clientX;
    track.style.transition = "none";
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (isAnimating) return;
    const diff = e.touches[0].clientX - touchStartX;
    track.style.transform = `translateX(${currentTranslate + diff}px)`;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff < -50)      index++;
    else if (diff > 50)  index--;
    isAnimating = true;
    setPosition(true);
  });

  window.addEventListener("resize", () => {
    cardWidth = getCardWidth();
    setPosition(false);
  });

  // ── Buttons ─────────────────────────────────────────────────────
  window.next = function () {
    if (isAnimating) return;
    isAnimating = true;
    index++;
    setPosition(true);
  };

  window.prev = function () {
    if (isAnimating) return;
    isAnimating = true;
    index--;
    setPosition(true);
  };
})();

// ── Nav highlight ────────────────────────────────────────────────
function ynav(element) {
  document.querySelectorAll(".navp").forEach(link => link.classList.remove("highlight"));
  element.classList.add("highlight");
}

// ── Mobile menu ──────────────────────────────────────────────────
function menu() {
  document.getElementById("navt").classList.toggle("active");
}
