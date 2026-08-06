/* =========================================
   1. CONTROLE DE TEMA (DARK / LIGHT MODE)
========================================= */
const btnTema = document.getElementById("btn-tema");
const iconeTema = document.getElementById("icone-tema");

// O "if" garante que o código só rode se o botão existir, evitando erros que travam a página
if (btnTema && iconeTema) {
  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      iconeTema.textContent = "toggle_off";
      iconeTema.style.color = "#121214";
    } else {
      iconeTema.textContent = "toggle_on";
      iconeTema.style.color = "#e52e2e";
    }
  });
}

/* =========================================
   2. CONTROLE DO MENU LATERAL (SIDEBAR)
========================================= */
const iconeMenu = document.getElementById("icone-menu");
const menuLateral = document.getElementById("menu-lateral");
const btnFechar = document.getElementById("btn-fechar");

if (iconeMenu && menuLateral) {
  iconeMenu.addEventListener("click", () => {
    menuLateral.classList.add("ativo");
  });
}

if (btnFechar && menuLateral) {
  btnFechar.addEventListener("click", () => {
    menuLateral.classList.remove("ativo");
  });
}

// Fecha o menu automaticamente e centraliza a seção ao clicar em qualquer link
const linksMenu = document.querySelectorAll(".menu-conteudo ul li a");
linksMenu.forEach((link) => {
  link.addEventListener("click", (evento) => {
    // 1. Evita que o HTML dê aquele "pulo" padrão para o topo
    evento.preventDefault();

    // 2. Fecha o menu lateral
    if (menuLateral) menuLateral.classList.remove("ativo");

    // 3. Descobre para qual ID o link aponta (ex: "#habilidades")
    const destinoId = link.getAttribute("href");

    // 4. Se for um link interno válido, faz a rolagem centralizada
    if (destinoId && destinoId.startsWith("#")) {
      const secaoDestino = document.querySelector(destinoId);

      if (secaoDestino) {
        secaoDestino.scrollIntoView({
          behavior: "smooth", // Mantém o movimento suave
          block: "center", // Trava o elemento exatamente no MEIO da tela
        });
      }
    }
  });
});

/* =========================================
   3. ANIMAÇÃO DE SCROLL (HABILIDADES E CONTATOS)
========================================= */
document.addEventListener("DOMContentLoaded", function () {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        // Se o elemento entrou na tela, faz a animação acontecer
        if (entrada.isIntersecting) {
          entrada.target.classList.add("mostrar");
        } else {
          // Se o elemento saiu da tela, remove a classe para "resetar" a animação
          entrada.target.classList.remove("mostrar");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  // Procura todos os cartões e contatos
  const elementosParaAnimar = document.querySelectorAll(
    ".habilidade-card, .contato-item, .link-contato",
  );

  // Manda o observador monitorar cada um deles
  if (elementosParaAnimar.length > 0) {
    elementosParaAnimar.forEach((elemento) => {
      observador.observe(elemento);
    });
  }
});
