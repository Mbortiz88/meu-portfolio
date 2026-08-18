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

// =========================================
//   EFEITO DE DIGITAÇÃO (MÁQUINA DE ESCREVER)
// =========================================
const elementoOla = document.getElementById("texto-ola");
const elementoNome = document.getElementById("texto-nome");
const elementoCargo = document.getElementById("texto-cargo");

// 1. Salva os textos originais
const textoOla = elementoOla.textContent;
const textoNome = elementoNome.textContent;
const textoCargo = elementoCargo.textContent;

// 2. Limpa o HTML para a animação começar com a tela vazia
elementoOla.innerHTML = "";
elementoNome.innerHTML = "";
elementoCargo.innerHTML = "";

// 3. Função que faz a digitação letra por letra
function digitarTexto(elemento, texto, velocidade, callback) {
  let i = 0;
  // Coloca o cursor piscando no elemento atual
  elemento.classList.add("cursor-ativo");

  const intervalo = setInterval(() => {
    if (i < texto.length) {
      elemento.innerHTML += texto.charAt(i);
      i++;
    } else {
      clearInterval(intervalo);
      // Remove o cursor quando terminar de digitar a palavra
      elemento.classList.remove("cursor-ativo");
      // Chama a próxima ação, se houver
      if (callback) callback();
    }
  }, velocidade);
}

// 4. Inicia a sequência de digitação quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    digitarTexto(elementoOla, textoOla, 100, () => {
      digitarTexto(elementoNome, textoNome, 120, () => {
        // Reduzido para 50ms para que o subtítulo grande seja lido rapidamente
        digitarTexto(elementoCargo, textoCargo, 50, () => {
          elementoCargo.classList.add("cursor-ativo");
        });
      });
    });
  }, 500);
});

// =========================================
// 4. CONFIGURAÇÃO DO FUNDO DE PARTÍCULAS
// =========================================
window.addEventListener("DOMContentLoaded", () => {
  if (typeof tsParticles !== "undefined") {
    tsParticles.load("tsparticles", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#e52e2e" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        links: {
          enable: true,
          color: "#e52e2e",
          distance: 150,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        // MUDANÇA AQUI: Detecta o mouse em qualquer lugar da tela
        detect_on: "window",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: { opacity: 0.8 },
          },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }
});
