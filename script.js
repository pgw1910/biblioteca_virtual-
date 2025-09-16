const track = document.querySelector(".carousel-track");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let index = 0;

next.addEventListener("click", () => {
  index++;
  if (index > 2) index = 0;
  track.style.transform = `translateX(${-index * 220}px)`;
});

prev.addEventListener("click", () => {
  index--;
  if (index < 0) index = 2;
  track.style.transform = `translateX(${-index * 220}px)`;
});
