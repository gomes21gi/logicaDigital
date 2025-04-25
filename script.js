// =============================================
// ============ OBSERVERS DE INTERSEÇÃO ========
// =============================================

/**
 * Configura observadores de interseção para animações
 */
function setupIntersectionObservers() {
  const animateOnIntersect = (elements, className, threshold = 0.3) => {
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    elements.forEach((element) => observer.observe(element));
  };

  // Observar elementos que precisam da classe 'mostrar'
  animateOnIntersect(document.querySelectorAll('.conteudo-logica, .robo-secao'), 'mostrar');
}

// =============================================
// ============ CONTROLE DE CATEGORIAS =========
// =============================================

/**
 * Mostra uma categoria e esconde as outras com transição suave
 * @param {string} id - ID da seção a ser mostrada
 */
function mostrarCategoria(id) {
  const secoes = document.querySelectorAll('.categoria');
  const novaSecao = document.getElementById(id);
  
  if (!novaSecao) return;

  // Encontra a seção ativa atual
  const secaoAtual = document.querySelector('.categoria.ativa');

  // Se já está na seção solicitada, não faz nada
  if (secaoAtual === novaSecao) return;

  // Função para finalizar a transição
  const finalizarTransicao = () => {
    if (secaoAtual) {
      secaoAtual.classList.remove('ativa', 'fade-out');
      secaoAtual.style.display = 'none';
    }

    novaSecao.style.display = 'block';
    novaSecao.classList.add('ativa', 'fade-in');
    
    // Rolagem suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inicia a transição
  if (secaoAtual) {
    secaoAtual.classList.remove('fade-in');
    secaoAtual.classList.add('fade-out');
    setTimeout(finalizarTransicao, 500);
  } else {
    finalizarTransicao();
  }
}

// =============================================
// ============ ANIMAÇÃO DO ROBÔ ===============
// =============================================

/**
 * Controla a animação do robô preguiçoso
 */
function setupRoboAnimacao() {
  const robo = document.getElementById('robo');
  const brinquedo = document.getElementById('brinquedo');
  const emoji = document.getElementById('emoji');
  const resposta = document.getElementById('resposta-robo');
  const btnPedir = document.querySelector('.controle button');

  if (!robo || !brinquedo || !emoji || !resposta || !btnPedir) return;

  btnPedir.addEventListener('click', avaliarRobo);

  function avaliarRobo() {
    const carinho = document.getElementById('carinho').checked;
    const biscoito = document.getElementById('biscoito').checked;

    // Resetar animações
    robo.classList.remove('andando', 'voltando');
    brinquedo.classList.remove('pegou');
    emoji.textContent = '';

    if (carinho || biscoito) {
      resposta.textContent = '🤖 Pegando o brinquedo! ';
      
      // Configurar emoji baseado na ação
      emoji.textContent = carinho ? '❤️' : '🍪';

      // Sequência de animações
      setTimeout(() => robo.classList.add('andando'), 100);
      setTimeout(() => brinquedo.classList.add('pegou'), 1100);
      setTimeout(() => {
        robo.classList.remove('andando');
        robo.classList.add('voltando');
      }, 1800);
    } else {
      resposta.textContent = '🤖 Robô: Zzz... Estou dormindo...';
      emoji.textContent = '💤';
    }
  }
}

// =============================================
// ============ PORTA LÓGICA ==================
// =============================================

/**
 * Configura a porta lógica de acesso
 */
function setupPortaLogica() {
  const btnVerificar = document.querySelector('.porta-logica-container button');
  
  if (!btnVerificar) return;

  btnVerificar.addEventListener('click', verificarAcesso);

  function verificarAcesso() {
    const senha = document.getElementById('senha').checked;
    const digital = document.getElementById('digital').checked;
    const imagem = document.getElementById('portaImagem');
    const mensagem = document.getElementById('mensagemAcesso');

    // Efeito de fade
    imagem.style.opacity = 0;

    setTimeout(() => {
      if (senha && digital) {
        imagem.src = './images/porta_aberta.png';
        mensagem.textContent = '✅ Acesso concedido! Porta aberta.';
        mensagem.style.color = 'green';
      } else {
        imagem.src = './images/porta_fechada.png';
        mensagem.textContent = '❌ Acesso negado. Ambas as condições precisam estar ativadas.';
        mensagem.style.color = 'red';
      }

      imagem.style.opacity = 1;
    }, 300);
  }
}

// =============================================
// ============ PORTAS MÁGICAS =================
// =============================================

/**
 * Configura as portas lógicas mágicas (AND, OR, NOT)
 */
function setupPortasMagicas() {
  const btnAND = document.querySelector('button[onclick*="AND"]');
  const btnOR = document.querySelector('button[onclick*="OR"]');
  const btnNOT = document.querySelector('button[onclick*="NOT"]');

  if (!btnAND || !btnOR || !btnNOT) return;

  // Substitui os handlers inline por event listeners
  btnAND.addEventListener('click', () => calcular('AND'));
  btnOR.addEventListener('click', () => calcular('OR'));
  btnNOT.addEventListener('click', () => calcular('NOT'));

  function calcular(tipo) {
    const a = parseInt(document.getElementById('inputA').value);
    const b = parseInt(document.getElementById('inputB').value);
    const resultado = document.getElementById('resultado');
    const emoji = document.getElementById('emoji');
    let saida, mensagem;

    switch (tipo) {
      case 'AND':
        saida = a && b;
        mensagem = `Cofre Lógico: ${a} AND ${b} = ${saida}\n${saida === 1 ? 'Cofre aberto! ' : 'Cofre trancado! '}`;
        emoji.textContent = saida === 1 ? '🔓' : '🔒';
        break;
      case 'OR':
        saida = a || b;
        mensagem = `Lanterna: ${a} OR ${b} = ${saida}\n${saida === 1 ? 'Luz acesa! ' : 'Tudo escuro... '}`;
        emoji.textContent = saida === 1 ? '💡' : '🌑';
        break;
      case 'NOT':
        saida = a === 1 ? 0 : 1;
        mensagem = `Reverse Card: NOT ${a} = ${saida}\nInverteu tudo! 🔄`;
        emoji.textContent = '🔄';
        break;
      default:
        return;
    }

    resultado.textContent = mensagem;
  }
}

// =============================================
// ============ DARK THEME =====================
// =============================================

/**
 * Configura o toggle do dark theme
 */
function setupDarkTheme() {
  const trilho = document.getElementById('trilho');
  const body = document.body;

  if (!trilho) return;

  // Verifica preferência do usuário no localStorage
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    body.classList.add('dark');
    trilho.classList.add('dark');
  }

  trilho.addEventListener('click', () => {
    body.classList.toggle('dark');
    trilho.classList.toggle('dark');
    
    // Salva preferência
    localStorage.setItem('darkMode', body.classList.contains('dark'));
  });
}

// =============================================
// ============ DINOSSAURO ====================
// =============================================

/**
 * Configura as animações do dinossauro
 */
const dino = document.querySelector('.dinossauro');
const botaoA = document.getElementById('botaoA');
const botaoB = document.getElementById('botaoB');

// Função para o dinossauro correr
botaoA.addEventListener('click', () => {
  if (!dino.classList.contains('correndo')) {
    dino.classList.add('correndo');
    setTimeout(() => {
      dino.classList.remove('correndo');
    }, 2000); // Tempo da animação de corrida
  }
});

// Função para o dinossauro pular
botaoB.addEventListener('click', () => {
  if (!dino.classList.contains('pulando')) {
    dino.classList.add('pulando');
    setTimeout(() => {
      dino.classList.remove('pulando');
    }, 600); // Tempo do pulo
  }
});


// =============================================
// ============ LÂMPADA LÓGICA =================
// =============================================

/**
 * Configura a lâmpada lógica (AND)
 */
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


  interrup1.addEventListener('change', atualizarLampada);
  interrup2.addEventListener('change', atualizarLampada);
}

// =============================================
// ============ INICIALIZAÇÃO ==================
// =============================================

/**
 * Inicializa todos os componentes quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObservers();
  setupRoboAnimacao();
  setupPortaLogica();
  setupPortasMagicas();
  setupDarkTheme();
  setupDinossauro();
  setupLampada();
  
  // Mostra a seção inicial por padrão
  mostrarCategoria('inicio');
});
