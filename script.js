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

// --porta em variaveis --
function verificarAcesso() {
  const senha = document.getElementById('senha').checked;
  const digital = document.getElementById('digital').checked;
  const imagem = document.getElementById('portaImagem');
  const mensagem = document.getElementById('mensagemAcesso');

  // Começa com fade-out
  imagem.style.opacity = 0;

  // Aguarda 300ms para mudar a imagem e aplicar o fade-in
  setTimeout(() => {
    if (senha && digital) {
      imagem.src = "./images/porta_aberta.png";
      mensagem.textContent = "✅ Acesso concedido! Porta aberta.";
      mensagem.style.color = "green";
    } else {
      imagem.src = "./images/porta_fechada.png";
      mensagem.textContent = "❌ Acesso negado. Ambas as condições precisam estar ativadas.";
      mensagem.style.color = "red";
    }

    imagem.style.opacity = 1;
  }, 300);
}

// portas mágicas
// const somClick = new Audio("som/click.mp3");
// const somSucesso = new Audio("som/sucesso.mp3");
// const somErro = new Audio("som/erro.mp3");

function calcular(tipo) {
  let a = parseInt(document.getElementById("inputA").value);
  let b = parseInt(document.getElementById("inputB").value);
  let resultado = document.getElementById("resultado");
  let emoji = document.getElementById("emoji");
  let saida;

  if (tipo === "AND") {
    saida = a && b;
    resultado.innerText = `Cofre Lógico: ${a} AND ${b} = ${saida}\n${saida === 1 ? "Cofre aberto! " : "Cofre trancado! "}`;
    emoji.textContent = saida === 1;
  } else if (tipo === "OR") {
    saida = a || b;
    resultado.innerText = `Lanterna: ${a} OR ${b} = ${saida}\n${saida === 1 ? "Luz acesa! " : "Tudo escuro... "}`;
    emoji.textContent = saida === 1;
  } else if (tipo === "NOT") {
    saida = a === 1 ? 0 : 1;
    resultado.innerText = `Reverse Card: NOT ${a} = ${saida}\nInverteu tudo! 🔄`;
    emoji.textContent = "🔄";
  }

}

let trilho = document.getElementById("trilho");
//let btn = document.getElementById("btn");
let body = document.querySelector("body");

trilho.addEventListener("click", () => {  
trilho.classList.toggle("dark");
body.classList.toggle("dark");
});

// Função para o dinossauro pular
const dino = document.querySelector('.dinossauro');
const botaoA = document.getElementById('botaoA');
const botaoB = document.getElementById('botaoB');

// Função para o dinossauro correr
botaoA.addEventListener('click', () => {
  dino.classList.add('correndo');
  setTimeout(() => {
    dino.classList.remove('correndo');
  }, 2000); // Tempo da animação de corrida
});

// Função para o dinossauro pular
botaoB.addEventListener('click', () => {
  if (!dino.classList.contains('pulando')) {
    dino.classList.add('pulando');
    setTimeout(() => {
      dino.classList.remove('pulando');
    }, 500); // Tempo do pulo
  }
});

function autenticar() {
  // Coletando os dados inseridos pelo usuário
  const username = document.getElementById('auth-username').value;
  const password = document.getElementById('auth-password').value;
  const digital = document.getElementById('auth-digital').value;

  // Validando os dados (simulação simples)
  if (username === 'admin' && password === 'senha123' && digital === '123456') {
    document.getElementById('auth-message').textContent = 'Acesso concedido! Conteúdo liberado.';
    document.getElementById('auth-message').style.color = 'green';
  } else {
    document.getElementById('auth-message').textContent = 'Acesso negado! Dados incorretos.';
    document.getElementById('auth-message').style.color = 'red';
  }
}

function atualizarLampada() {
  const i1 = document.getElementById("interrup1").checked;
  const i2 = document.getElementById("interrup2").checked;
  const lampada = document.getElementById("lampada");

  if (i1 && i2) {
    lampada.src = "images/lampadaAcessa.png";
    lampada.classList.add("acesa");
  } else {
    lampada.src = "images/lampadaApagada.png";
    lampada.classList.remove("acesa");
  }
}



