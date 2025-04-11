function mostrarCategoria(id) {
  const secoes = document.querySelectorAll(".categoria");
  const novaSecao = document.getElementById(id);
  let secaoAtual = null;

  secoes.forEach(sec => {
    if (sec.classList.contains("ativa")) {
      secaoAtual = sec;
    }
  });

  if (secaoAtual === novaSecao) return;

  if (secaoAtual) {
    secaoAtual.classList.remove("fade-in");
    secaoAtual.classList.add("fade-out");

    setTimeout(() => {
      secaoAtual.classList.remove("ativa", "fade-out");
      secaoAtual.style.display = "none";

      novaSecao.style.display = "block";
      novaSecao.classList.add("ativa", "fade-in");
    }, 500);
  } else {
    novaSecao.style.display = "block";
    novaSecao.classList.add("ativa", "fade-in");
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function avaliarRobo() {
  const carinho = document.getElementById("carinho").checked;
  const biscoito = document.getElementById("biscoito").checked;
  const resposta = document.getElementById("resposta-robo");
  const robo = document.getElementById("robo");
  const brinquedo = document.getElementById("brinquedo");
  const emoji = document.getElementById("emoji");

  // Reset
  robo.classList.remove("andando", "voltando");
  brinquedo.classList.remove("pegou");
  emoji.textContent = "";

  if (carinho || biscoito) {
    resposta.textContent = "🤖 Pegando o brinquedo! ";
    setTimeout(() => {
      robo.classList.add("andando");

      if (carinho) emoji.textContent = "❤️";
      else if (biscoito) emoji.textContent = "🍪";
    }, 100);

    // Pega o brinquedo
    setTimeout(() => {
      brinquedo.classList.add("pegou");
    }, 1100);

    // Volta ao início
    setTimeout(() => {
      robo.classList.remove("andando");
      robo.classList.add("voltando");
    }, 1800);

  } else {
    resposta.textContent = "🤖 Robô: Zzz... Estou dormindo...";
    emoji.textContent = "💤";
  }
}


