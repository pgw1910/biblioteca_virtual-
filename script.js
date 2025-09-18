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

  const filtros = document.querySelectorAll(".filtro");
  if (filtros.length) {
    filtros.forEach(filtro => {
      filtro.addEventListener("change", () => {
        let ativos = Array.from(filtros)
          .filter(f => f.checked)
          .map(f => f.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

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

// Base de dados dos livros
const livrosData = {
  "crime-castigo": {
    titulo: "Crime e Castigo",
    autor: "Fiódor Dostoiévski",
    ano: "1866",
    resumo: "Um jovem estudante comete um assassinato para provar uma teoria, mas é atormentado pela culpa e pela paranoia que se seguem.",
    capa: "Crime e Castigo.webp",
    isbn: "9788526000016"
  },
  "memorias-subsolo": {
    titulo: "Memórias do Subsolo",
    autor: "Fiódor Dostoiévski",
    ano: "1864",
    resumo: "m homem amargo e isolado da sociedade destila seus pensamentos contraditórios e ressentimentos em um monólogo que ataca as fundações do racionalismo.",
    capa: "Memória do Subsolo.webp",
    isbn: "9788526000024"
  },
  "o-mito-de-sisifo": {
    titulo: "O Mito de Sísifo",
    autor: "Albert Camus",
    ano: "1942",
    resumo: "Um ensaio filosófico que explora a condição do absurdo da existência humana, usando o mito grego de Sísifo como metáfora para encontrar sentido na luta sem esperança.",
    capa: "O Mito de Sísfio.jpg",
    isbn: "9788526000035"
  },
  "o-silmarillion": {
    titulo: "O Silmarillion",
    autor: "J.R.R. Tolkien",
    ano: "1977",
    resumo: "A criação e a história mitológica da Terra-média, detalhando as origens do mundo, dos deuses, dos elfos e a guerra pelas joias sagradas conhecidas como Silmarils.",
    capa: "O Silmarillion.jpg",
    isbn: "9788526000046"
  },
  "o-senhor-dos-aneis": {
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    ano: "1954",
    resumo: "Uma épica jornada de um pequeno hobbit para destruir um anel de poder e salvar a Terra-média da escuridão crescente do Senhor do Escuro, Sauron.",
    capa: "O Senhor dos Anéis.webp",
    isbn: "9788526000057"
  }    
};


if (document.getElementById("detalhesLivro")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (livrosData[id]) {
    const livro = livrosData[id];
    document.getElementById("detalhesLivro").innerHTML = `
      <div class="detalhes-card">
        <img src="${livro.capa}" alt="${livro.titulo}">
        <h2>${livro.titulo}</h2>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
        <p><strong>ISBN:</strong> ${livro.isbn}</p>
        <p><strong>Resumo:</strong> ${livro.resumo}</p>
        <button>Reservar</button>
         <section class="avaliacao">
      <h3>Avalie este livro:</h3>
      <div class="rating">
        <span data-star="5">★</span>
        <span data-star="4">★</span>
        <span data-star="3">★</span>
        <span data-star="2">★</span>
        <span data-star="1">★</span>
      </div>
      <p id="rating-value">Clique nas estrelas para avaliar.</p>
    </section>
      </div>
    `;
  } else {
    document.getElementById("detalhesLivro").innerHTML = `<p>Livro não encontrado.</p>`;
  }
}
// Login e Logout

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

