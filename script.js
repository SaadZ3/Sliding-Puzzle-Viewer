// ============================================
// PARTE 1: ESTRUTURA BÁSICA DO TABULEIRO
// ============================================

// Representa o estado do tabuleiro 3x3
class Tabuleiro {
   constructor(pecas) {
      this.pecas = this.copiar(pecas);
      this.tamanho = 3; // tabuleiro 3x3
   }

   // Copia o array para não modificar o original
   copiar(pecas) {
      return pecas.map((linha) => [...linha]);
   }

   // Calcula quantos movimentos mínimos cada peça precisa para chegar no lugar certo
   // Isso é a "heurística" do algoritmo A* - ajuda a escolher o melhor caminho
   calcularDistanciaManhattan() {
      let distanciaTotal = 0;

      for (let linha = 0; linha < 3; linha++) {
         for (let coluna = 0; coluna < 3; coluna++) {
            const valor = this.pecas[linha][coluna];

            // O espaço vazio (0) não conta
            if (valor !== 0) {
               // Onde esta peça DEVERIA estar?
               const linhaCorreta = Math.floor((valor - 1) / 3);
               const colunaCorreta = (valor - 1) % 3;

               // Soma a distância horizontal + vertical
               distanciaTotal +=
                  Math.abs(linha - linhaCorreta) +
                  Math.abs(coluna - colunaCorreta);
            }
         }
      }
      return distanciaTotal;
   }

   // Verifica se o puzzle está resolvido
   estaResolvido() {
      return this.calcularDistanciaManhattan() === 0;
   }

   // Encontra onde está o espaço vazio (0)
   encontrarEspacoVazio() {
      for (let linha = 0; linha < 3; linha++) {
         for (let coluna = 0; coluna < 3; coluna++) {
            if (this.pecas[linha][coluna] === 0) {
               return { linha, coluna };
            }
         }
      }
   }

   // Gera todos os movimentos possíveis a partir do estado atual
   obterVizinhos() {
      const vizinhos = [];
      const vazio = this.encontrarEspacoVazio();

      // Movimentos possíveis: cima, baixo, esquerda, direita
      const movimentos = [
         { linha: -1, coluna: 0 }, // cima
         { linha: 1, coluna: 0 }, // baixo
         { linha: 0, coluna: -1 }, // esquerda
         { linha: 0, coluna: 1 }, // direita
      ];

      for (const movimento of movimentos) {
         const novaLinha = vazio.linha + movimento.linha;
         const novaColuna = vazio.coluna + movimento.coluna;

         // Verifica se o movimento é válido (dentro do tabuleiro)
         if (
            novaLinha >= 0 &&
            novaLinha < 3 &&
            novaColuna >= 0 &&
            novaColuna < 3
         ) {
            // Cria um novo tabuleiro com o movimento feito
            const novasPecas = this.copiar(this.pecas);

            // Troca a peça com o espaço vazio
            novasPecas[vazio.linha][vazio.coluna] =
               novasPecas[novaLinha][novaColuna];
            novasPecas[novaLinha][novaColuna] = 0;

            vizinhos.push(new Tabuleiro(novasPecas));
         }
      }

      return vizinhos;
   }

   // Compara se dois tabuleiros são iguais
   igual(outroTabuleiro) {
      for (let linha = 0; linha < 3; linha++) {
         for (let coluna = 0; coluna < 3; coluna++) {
            if (
               this.pecas[linha][coluna] !== outroTabuleiro.pecas[linha][coluna]
            ) {
               return false;
            }
         }
      }
      return true;
   }
}

// ============================================
// PARTE 2: FILA DE PRIORIDADE SIMPLES
// ============================================

// Uma fila onde sempre tiramos o item com menor prioridade
class FilaDePrioridade {
   constructor() {
      this.itens = [];
   }

   // Adiciona um item na fila
   adicionar(item) {
      this.itens.push(item);
   }

   // Remove e retorna o item com menor prioridade
   removerMenor() {
      if (this.itens.length === 0) return null;

      // Encontra o item com menor prioridade
      let indiceMenor = 0;
      for (let i = 1; i < this.itens.length; i++) {
         if (this.itens[i].prioridade < this.itens[indiceMenor].prioridade) {
            indiceMenor = i;
         }
      }

      // Remove e retorna o item
      return this.itens.splice(indiceMenor, 1)[0];
   }

   estaVazia() {
      return this.itens.length === 0;
   }
}

// ============================================
// PARTE 3: ALGORITMO A* (O SOLUCIONADOR)
// ============================================

class Solucionador {
   constructor(tabuleiroInicial) {
      this.solucao = null;
      this.movimentos = -1;
      this.temSolucao = false;

      this.resolver(tabuleiroInicial);
   }

   resolver(tabuleiroInicial) {
      // Se já está resolvido, não precisa fazer nada
      if (tabuleiroInicial.estaResolvido()) {
         this.temSolucao = true;
         this.movimentos = 0;
         this.solucao = [tabuleiroInicial];
         return;
      }

      const fila = new FilaDePrioridade();
      const visitados = new Set();

      // Nó inicial
      const noInicial = {
         tabuleiro: tabuleiroInicial,
         movimentosFeitos: 0,
         anterior: null,
         prioridade: tabuleiroInicial.calcularDistanciaManhattan() + 0,
      };

      fila.adicionar(noInicial);

      // Loop principal do A*
      while (!fila.estaVazia()) {
         const noAtual = fila.removerMenor();

         // Criar uma chave única para este estado do tabuleiro
         const chave = noAtual.tabuleiro.pecas.flat().join(",");

         // Se já visitamos este estado, pula
         if (visitados.has(chave)) continue;
         visitados.add(chave);

         // Encontrou a solução!
         if (noAtual.tabuleiro.estaResolvido()) {
            this.temSolucao = true;
            this.movimentos = noAtual.movimentosFeitos;
            this.solucao = this.reconstruirCaminho(noAtual);
            return;
         }

         // Explora os vizinhos (próximos movimentos possíveis)
         const vizinhos = noAtual.tabuleiro.obterVizinhos();

         for (const vizinho of vizinhos) {
            // Evita voltar para o estado anterior (otimização)
            if (noAtual.anterior && vizinho.igual(noAtual.anterior.tabuleiro)) {
               continue;
            }

            const novoNo = {
               tabuleiro: vizinho,
               movimentosFeitos: noAtual.movimentosFeitos + 1,
               anterior: noAtual,
               prioridade:
                  vizinho.calcularDistanciaManhattan() +
                  (noAtual.movimentosFeitos + 1),
            };

            fila.adicionar(novoNo);
         }
      }
   }

   // Reconstrói o caminho da solução seguindo os nós anteriores
   reconstruirCaminho(noFinal) {
      const caminho = [];
      let noAtual = noFinal;

      while (noAtual !== null) {
         caminho.unshift(noAtual.tabuleiro);
         noAtual = noAtual.anterior;
      }

      return caminho;
   }
}

// ============================================
// PARTE 4: INTERFACE VISUAL
// ============================================

const elementoTabuleiro = document.getElementById("puzzle-board");
const botaoEmbaralhar = document.getElementById("shuffle-btn");
const botaoResolver = document.getElementById("solve-btn");
const status = document.getElementById("status");

let tabuleiroAtual = null;

// Desenha o tabuleiro na tela
function desenharTabuleiro(tabuleiro) {
   elementoTabuleiro.innerHTML = "";

   for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 3; coluna++) {
         const valor = tabuleiro.pecas[linha][coluna];
         const peca = document.createElement("div");
         peca.className = "tile";

         if (valor === 0) {
            peca.className += " tile-empty";
         } else {
            peca.textContent = valor;
         }

         elementoTabuleiro.appendChild(peca);
      }
   }
}

// Cria um tabuleiro embaralhado (mas que tem solução)
function criarTabuleiroEmbaralhado() {
   // Começa com o tabuleiro resolvido
   let tabuleiro = new Tabuleiro([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
   ]);

   // Faz 100 movimentos aleatórios válidos para embaralhar
   for (let i = 0; i < 100; i++) {
      const vizinhos = tabuleiro.obterVizinhos();
      const indiceAleatorio = Math.floor(Math.random() * vizinhos.length);
      tabuleiro = vizinhos[indiceAleatorio];
   }

   return tabuleiro;
}

// Anima a solução passo a passo
function animarSolucao(caminho) {
   let passo = 0;

   const intervalo = setInterval(() => {
      if (passo < caminho.length) {
         desenharTabuleiro(caminho[passo]);
         status.textContent = `Resolvendo... Passo ${passo + 1} de ${
            caminho.length
         }`;
         passo++;
      } else {
         clearInterval(intervalo);
         status.textContent = `✅ Resolvido em ${
            caminho.length - 1
         } movimentos!`;
         botaoEmbaralhar.disabled = false;
      }
   }, 350); // Meio segundo entre cada passo
}

// ============================================
// EVENTOS DOS BOTÕES
// ============================================

botaoEmbaralhar.addEventListener("click", () => {
   tabuleiroAtual = criarTabuleiroEmbaralhado();
   desenharTabuleiro(tabuleiroAtual);
   status.textContent = `Tabuleiro embaralhado! Clique em "Resolver" para ver a mágica acontecer.`;
   botaoResolver.disabled = false;
});

botaoResolver.addEventListener("click", () => {
   if (!tabuleiroAtual) return;

   botaoEmbaralhar.disabled = true;
   botaoResolver.disabled = true;
   status.textContent = "🤔 Pensando... O algoritmo A* está trabalhando!";

   // Usa setTimeout para não travar a interface
   setTimeout(() => {
      const solucionador = new Solucionador(tabuleiroAtual);

      if (solucionador.temSolucao) {
         status.textContent = `🎉 Encontrei a solução em ${solucionador.movimentos} movimentos!`;
         animarSolucao(solucionador.solucao);
      } else {
         status.textContent = "❌ Este puzzle não tem solução!";
         botaoEmbaralhar.disabled = false;
      }
   }, 100);
});

// Inicialização
function iniciar() {
   const tabuleiroInicial = new Tabuleiro([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
   ]);

   desenharTabuleiro(tabuleiroInicial);
   status.textContent = 'Clique em "Embaralhar" para começar!';
}

iniciar();
