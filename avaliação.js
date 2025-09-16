document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".rating span");
    const output = document.getElementById("rating-value");
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("click", () => {
            selectedRating = star.getAttribute("data-star");
            stars.forEach(s => s.classList.remove("selected"));
            star.classList.add("selected");
            let prev = star.nextElementSibling;
            while (prev) {
                prev.classList.add("selected");
                prev = prev.nextElementSibling;
            }
            output.textContent = `Você avaliou este livro com ${selectedRating} estrela(s).`;
        });
    });
});
