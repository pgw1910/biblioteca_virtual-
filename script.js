document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  if (track && prev && next) {
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
  }

  const barraBusca = document.getElementById("barraBusca");
  const btnBusca = document.getElementById("btnBusca");
  const livros = document.querySelectorAll("#listaLivros .card");

  function aplicarBusca() {
    const termo = barraBusca.value.toLowerCase().trim();
    livros.forEach(livro => {
      const titulo = livro.querySelector("h3").textContent.toLowerCase();
      const autor = livro.querySelector("p").textContent.toLowerCase();
      livro.style.display = (titulo.includes(termo) || autor.includes(termo) || termo === "")
        ? ""
        : "none";
    });
  }

  if (barraBusca && btnBusca) {
    btnBusca.addEventListener("click", aplicarBusca);
    barraBusca.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        aplicarBusca();
      }
    });
  }

  /*FILTROS*/
  const filtros = document.querySelectorAll(".filtro");
  if (filtros.length) {
    filtros.forEach(filtro => {
      filtro.addEventListener("change", () => {
        let ativos = Array.from(filtros)
          .filter(f => f.checked)
          .map(f => f.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")); // remove acentos

        livros.forEach(livro => {
          const autor = (livro.dataset.autor || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const ano = (livro.dataset.ano || "").toLowerCase();
          if (ativos.length === 0 || ativos.includes(autor) || ativos.includes(ano)) {
            livro.style.display = "";
          } else {
            livro.style.display = "none";
          }
        });
      });
    });
  }

  const darkToggle = document.getElementById("darkModeToggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("ugb-dark", document.body.classList.contains("dark") ? "1" : "0");
    });

    if (localStorage.getItem("ugb-dark") === "1") {
      document.body.classList.add("dark");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("loginMsg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const matricula = document.getElementById("matricula").value.trim();
      const senha = document.getElementById("senha").value.trim();

      if (matricula === "12345" && senha === "123") {
        localStorage.setItem("ugbLogado", "1");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        msg.textContent = "Matrícula ou senha incorretos.";
        msg.style.color = "red";
      }
    });
  }

  /*Log Out*/
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("ugbLogado");
      window.location.href = "login.html";
    });
  }
});
