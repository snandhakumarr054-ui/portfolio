const mediaQuery = window.matchMedia("(max-width:410px)");
if (mediaQuery.matches) {
   const track = document.getElementById("track");
const gap = 2;
const cardWidth = 220 + gap;

let index = 1;
let isAnimating = false;

const cards = [...track.children];
track.appendChild(cards[0].cloneNode(true));
track.insertBefore(cards[cards.length - 1].cloneNode(true), cards[0]);

track.style.transform = `translateX(${-cardWidth * index}px)`;

function next() {
  if (isAnimating) return;
  isAnimating = true;
  index++;
  move();
}

function prev() {
  if (isAnimating) return;
  isAnimating = true;
  index--;
  move();
}

function move() {
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(${-cardWidth * index}px)`;
}

track.addEventListener("transitionend", () => {
  const total = track.children.length;

  if (index === total - 1) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  if (index === 0) {
    track.style.transition = "none";
    index = total - 2;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  isAnimating = false;
});

let isDragging = false;
let startX = 0;
let currentTranslate = -cardWidth * index;

track.addEventListener("mousedown", (e) => {
  if (isAnimating) return;
  isDragging = true;
  startX = e.clientX;
  track.style.transition = "none";
  track.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  track.style.transform = `translateX(${currentTranslate + diff}px)`;
});

window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  track.style.cursor = "grab";

  const diff = e.clientX - startX;

  if (diff < -cardWidth / 3) index++;
  else if (diff > cardWidth / 3) index--;

  currentTranslate = -cardWidth * index;
  isAnimating = true;
  move();
});
} else {
  const track = document.getElementById("track");
const gap = 16;
const cardWidth = 320 + gap;

let index = 1;
let isAnimating = false;

const cards = [...track.children];
track.appendChild(cards[0].cloneNode(true));
track.insertBefore(cards[cards.length - 1].cloneNode(true), cards[0]);

track.style.transform = `translateX(${-cardWidth * index}px)`;

function next() {
  if (isAnimating) return;
  isAnimating = true;
  index++;
  move();
}

function prev() {
  if (isAnimating) return;
  isAnimating = true;
  index--;
  move();
}

function move() {
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(${-cardWidth * index}px)`;
}

track.addEventListener("transitionend", () => {
  const total = track.children.length;

  if (index === total - 1) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  if (index === 0) {
    track.style.transition = "none";
    index = total - 2;
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  isAnimating = false;
});

let isDragging = false;
let startX = 0;
let currentTranslate = -cardWidth * index;

track.addEventListener("mousedown", (e) => {
  if (isAnimating) return;
  isDragging = true;
  startX = e.clientX;
  track.style.transition = "none";
  track.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  track.style.transform = `translateX(${currentTranslate + diff}px)`;
});

window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  track.style.cursor = "grab";

  const diff = e.clientX - startX;

  if (diff < -cardWidth / 3) index++;
  else if (diff > cardWidth / 3) index--;

  currentTranslate = -cardWidth * index;
  isAnimating = true;
  move();
});

}


function ynav(element) {

  let links = document.querySelectorAll(".navp");
  links.forEach(link => link.classList.remove("highlight"));
  element.classList.add("highlight");
}

function menu(){
  document.getElementById("navt").classList.toggle("active")
}




