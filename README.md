<<<<<<< HEAD
# 🧩 Resolvedor de Quebra-cabeça Deslizante com Algoritmo A*

> Um solucionador inteligente para o clássico quebra-cabeça de 8 peças usando o algoritmo A* com interface web interativa.

[![Demo](https://img.shields.io/badge/🎮-Demo%20Online-blue?style=for-the-badge)](javascript:void(0))
[![JavaScript](https://img.shields.io/badge/💻-Vanilla%20JS-yellow?style=for-the-badge)](javascript:void(0))

---

## 📖 **Sobre o Projeto**

Este projeto implementa um **resolvedor automático** para o quebra-cabeça deslizante de 8 peças (3x3) utilizando o **Algoritmo A*** com heurística da **Distância de Manhattan**. 

O quebra-cabeça consiste em um tabuleiro 3x3 com 8 peças numeradas (1-8) e um espaço vazio, possui 362.880 configurações possíveis onde o objetivo é organizar as peças em ordem crescente movendo-as para o espaço vazio.

### **Características Principais**

- **Solução Ótima Garantida**: Sempre encontra o menor número de movimentos
- **Performance Eficiente**: Resolução em milissegundos usando heurística inteligente
- **Interface Interativa**: Visualização em tempo real da solução passo-a-passo
- **Algoritmo A***: Implementação didática e bem documentada


### **Conceitos Demonstrados**
- **Inteligência Artificial**: Algoritmos de busca heurística
- **Estruturas de Dados**: Filas de prioridade, grafos de estados
- **Otimização**: Heurísticas admissíveis e consistentes
- **Programação**: Classes, objetos, algoritmos recursivos


---

## 🎯 **Como Funciona**

### **Algoritmo A***
O projeto utiliza o algoritmo A* que combina:
- **g(n)**: Número de movimentos já realizados
- **h(n)**: Heurística da Distância de Manhattan (estimativa de movimentos restantes)
- **f(n) = g(n) + h(n)**: Função de avaliação total

### **Heurística da Distância de Manhattan**
Para cada peça, calcula quantos movimentos mínimos ela precisa para chegar à posição correta:

```
Exemplo: Peça 5 está na posição (2,1) mas deveria estar em (1,1)
Distância Manhattan = |2-1| + |1-1| = 1 movimento
```
A Distância de Manhattan é **admissível** porque:
- ✅ Nunca superestima o número real de movimentos necessários
- ✅ É consistente (propriedade monotônica)
- ✅ Garante que A* encontre a solução ótima
  
### **Estados e Nós**
- **Estado**: Configuração atual do tabuleiro (posição das peças)
- **Nó**: Estado + informações de busca (movimentos feitos, caminho anterior, prioridade)

---

## 🚀 **Como Executar**

### **Opção 1: Execução Local**
1. Baixe os arquivos e execute o `index.html`
2. Abra diretamente em qualquer navegador moderno
3. Não requer instalação ou dependências!

### **Opção 2: Uso Direto**
- Ou acesse online <a href="https://sliding-puzzle-viewer.vercel.app/" target="_blank">aqui</a>


---

## 🏗️ **Arquitetura do Código**

### **Estrutura Principal**

```javascript
📁 Projeto
├── 🎯 Classe Tabuleiro          // Representa estados do puzzle
│   ├── calcularDistanciaManhattan()   // Heurística h(n)
│   ├── obterVizinhos()               // Gera próximos estados
│   └── estaResolvido()               // Verifica solução
│
├── 📊 Classe FilaDePrioridade    // Estrutura de dados para A*
│   ├── adicionar()                   // Insere novo nó
│   └── removerMenor()               // Remove nó com menor f(n)
│
├── 🧠 Classe Solucionador       // Implementa algoritmo A*
│   ├── resolver()                   // Loop principal do A*
│   └── reconstruirCaminho()        // Monta sequência de movimentos
│
└── 🎨 Interface Visual          // Controla a apresentação
    ├── desenharTabuleiro()         // Renderiza estado atual
    └── animarSolucao()            // Mostra solução passo-a-passo
```

### **Fluxo do Algoritmo**

```
graph TD
    A[Estado Inicial] --> B[Adicionar à Fila de Prioridade]
    B --> C[Remover Nó com Menor f(n)]
    C --> D{É a Solução?}
    D -->|Sim| E[Reconstruir Caminho]
    D -->|Não| F[Gerar Estados Vizinhos]
    F --> G[Calcular f(n) para Cada Vizinho]
    G --> H[Adicionar à Fila]
    H --> C
    E --> I[Animar Solução]
```

---

## 🤝 **Contribuições**

Contribuições são bem-vindas! Aqui estão algumas formas de ajudar:

### **Como Contribuir**
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### **Ideias de Melhorias**
- [ ] 📏 Suporte para tabuleiros 4x4 e 5x5
- [ ] 📊 Visualização do algoritmo em tempo real
- [ ] 🎨 Temas personalizáveis para interface
- [ ] 📈 Estatísticas detalhadas de performance
- [ ] 🎵 Efeitos sonoros e animações aprimoradas
- [ ] 📱 App mobile nativo
- [ ] 🔄 Outros algoritmos de busca para comparação



---

## 👨‍💻 **Autor**

**[Saad Amer]**
- 🌐 Website: [meusite.com](https://seusite.com)
- 📧 Email: saadmu139@gmail.com
- 💼 LinkedIn: [linkedin.com/in/saad](https://linkedin.com/in/saad-amer-102482279/)
- 🐙 GitHub: [@saadZ3](https://github.com/saadZ3)

---


## 📊 **Estatísticas do Projeto**

![GitHub stars](https://img.shields.io/github/stars/saadZ3/puzzle-solver-astar?style=social)
![GitHub forks](https://img.shields.io/github/forks/saadZ3/puzzle-solver-astar?style=social)
![GitHub issues](https://img.shields.io/github/issues/saadZ3/puzzle-solver-astar)
![GitHub last commit](https://img.shields.io/github/last-commit/saadZ3/puzzle-solver-astar)

---

<div align="center">

### 🌟 **Se este projeto foi útil, considere dar uma estrela!** ⭐

**[⬆ Voltar ao Topo](#-resolvedor-de-quebra-cabeça-deslizante-com-algoritmo-a)**

</div>
=======
# 🧩 Resolvedor de Quebra-cabeça Deslizante com Algoritmo A*

> Um solucionador inteligente para o clássico quebra-cabeça de 8 peças usando o algoritmo A* com interface web interativa.

[![Demo](https://img.shields.io/badge/🎮-Demo%20Online-blue?style=for-the-badge)](javascript:void(0))
[![JavaScript](https://img.shields.io/badge/💻-Vanilla%20JS-yellow?style=for-the-badge)](javascript:void(0))

---

## 📖 **Sobre o Projeto**

Este projeto implementa um **resolvedor automático** para o quebra-cabeça deslizante de 8 peças (3x3) utilizando o **Algoritmo A*** com heurística da **Distância de Manhattan**. 

O quebra-cabeça consiste em um tabuleiro 3x3 com 8 peças numeradas (1-8) e um espaço vazio, possui 362.880 configurações possíveis onde o objetivo é organizar as peças em ordem crescente movendo-as para o espaço vazio.

### **Características Principais**

- **Solução Ótima Garantida**: Sempre encontra o menor número de movimentos
- **Performance Eficiente**: Resolução em milissegundos usando heurística inteligente
- **Interface Interativa**: Visualização em tempo real da solução passo-a-passo
- **Algoritmo A***: Implementação didática e bem documentada


### **Conceitos Demonstrados**
- **Inteligência Artificial**: Algoritmos de busca heurística
- **Estruturas de Dados**: Filas de prioridade, grafos de estados
- **Otimização**: Heurísticas admissíveis e consistentes
- **Programação**: Classes, objetos, algoritmos recursivos


---

## 🎯 **Como Funciona**

### **Algoritmo A***
O projeto utiliza o algoritmo A* que combina:
- **g(n)**: Número de movimentos já realizados
- **h(n)**: Heurística da Distância de Manhattan (estimativa de movimentos restantes)
- **f(n) = g(n) + h(n)**: Função de avaliação total

### **Heurística da Distância de Manhattan**
Para cada peça, calcula quantos movimentos mínimos ela precisa para chegar à posição correta:

```
Exemplo: Peça 5 está na posição (2,1) mas deveria estar em (1,1)
Distância Manhattan = |2-1| + |1-1| = 1 movimento
```
A Distância de Manhattan é **admissível** porque:
- ✅ Nunca superestima o número real de movimentos necessários
- ✅ É consistente (propriedade monotônica)
- ✅ Garante que A* encontre a solução ótima
  
### **Estados e Nós**
- **Estado**: Configuração atual do tabuleiro (posição das peças)
- **Nó**: Estado + informações de busca (movimentos feitos, caminho anterior, prioridade)

---

## 🚀 **Como Executar**

### **Opção 1: Execução Local**
1. Baixe os arquivos e execute o `index.html`
2. Abra diretamente em qualquer navegador moderno
3. Não requer instalação ou dependências!

### **Opção 2: Uso Direto**
- Ou acesse online <a href="https://sliding-puzzle-viewer.vercel.app/" target="_blank">aqui</a>


---

## 🏗️ **Arquitetura do Código**

### **Estrutura Principal**

```javascript
📁 Projeto
├── 🎯 Classe Tabuleiro          // Representa estados do puzzle
│   ├── calcularDistanciaManhattan()   // Heurística h(n)
│   ├── obterVizinhos()               // Gera próximos estados
│   └── estaResolvido()               // Verifica solução
│
├── 📊 Classe FilaDePrioridade    // Estrutura de dados para A*
│   ├── adicionar()                   // Insere novo nó
│   └── removerMenor()               // Remove nó com menor f(n)
│
├── 🧠 Classe Solucionador       // Implementa algoritmo A*
│   ├── resolver()                   // Loop principal do A*
│   └── reconstruirCaminho()        // Monta sequência de movimentos
│
└── 🎨 Interface Visual          // Controla a apresentação
    ├── desenharTabuleiro()         // Renderiza estado atual
    └── animarSolucao()            // Mostra solução passo-a-passo
```

### **Fluxo do Algoritmo**

```
graph TD
    A[Estado Inicial] --> B[Adicionar à Fila de Prioridade]
    B --> C[Remover Nó com Menor f(n)]
    C --> D{É a Solução?}
    D -->|Sim| E[Reconstruir Caminho]
    D -->|Não| F[Gerar Estados Vizinhos]
    F --> G[Calcular f(n) para Cada Vizinho]
    G --> H[Adicionar à Fila]
    H --> C
    E --> I[Animar Solução]
```

---

## 🤝 **Contribuições**

Contribuições são bem-vindas! Aqui estão algumas formas de ajudar:

### **Como Contribuir**
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### **Ideias de Melhorias**
- [ ] 📏 Suporte para tabuleiros 4x4 e 5x5
- [ ] 📊 Visualização do algoritmo em tempo real
- [ ] 🎨 Temas personalizáveis para interface
- [ ] 📈 Estatísticas detalhadas de performance
- [ ] 🎵 Efeitos sonoros e animações aprimoradas
- [ ] 📱 App mobile nativo
- [ ] 🔄 Outros algoritmos de busca para comparação



---

## 👨‍💻 **Autor**

**[Saad Amer]**
- 🌐 Website: [meusite.com](https://seusite.com)
- 📧 Email: saadmu139@gmail.com
- 💼 LinkedIn: [linkedin.com/in/saad](https://linkedin.com/in/saad-amer-102482279/)
- 🐙 GitHub: [@saadZ3](https://github.com/saadZ3)

---


## 📊 **Estatísticas do Projeto**

![GitHub stars](https://img.shields.io/github/stars/saadZ3/puzzle-solver-astar?style=social)
![GitHub forks](https://img.shields.io/github/forks/saadZ3/puzzle-solver-astar?style=social)
![GitHub issues](https://img.shields.io/github/issues/saadZ3/puzzle-solver-astar)
![GitHub last commit](https://img.shields.io/github/last-commit/saadZ3/puzzle-solver-astar)

---

<div align="center">

### 🌟 **Se este projeto foi útil, considere dar uma estrela!** ⭐

**[⬆ Voltar ao Topo](#-resolvedor-de-quebra-cabeça-deslizante-com-algoritmo-a)**

</div>
>>>>>>> e6abdfc91dc5675ddb010cdd4b8287e3c1617d7f
