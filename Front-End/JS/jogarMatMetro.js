const questions = [
  {
    pergunta: "Qual é o resultado de 235 + 487?",
    opcoes: ["702","768","823","722"],
    resposta: 3,
    nivel: "fácil"
  },
  {
    pergunta: "Se você tem 150 maçãs e compra mais 75, quantas maçãs você tem agora?",
    opcoes: ["225","250","275","300"],
    resposta: 0,
    nivel: "fácil"
  },
  {
    pergunta: "Quanto é 800 - 456?",
    opcoes: ["444","451","344","340"],
    resposta: 2,
    nivel: "fácil"
  },
  {
    pergunta: "Se você tinha 200 reais e gastou 75, quanto dinheiro resta?",
    opcoes: ["125","150","175","200"],
    resposta: 0,
    nivel: "fácil"
  },
  {
    pergunta: "Qual é o produto de 12 e 15?",
    opcoes: ["225","150","180","200"],
    resposta: 2,
    nivel: "fácil"
  },
  {
    pergunta: "Se uma caixa contém 8 chocolates e você compra 5 caixas, quantos chocolates você tem?",
    opcoes: ["20","40","30","50"],
    resposta: 1,
    nivel: "fácil"
  },
  {
    pergunta: "Quanto é 144 dividido por 12?",
    opcoes: ["14","16","15","12"],
    resposta: 3,
    nivel: "fácil"
  },
  {
    pergunta: "Se você tem 50 balas e quer dividir igualmente entre 5 amigos, quantas balas cada amigo receberá?",
    opcoes: ["8","10","15","9"],
    resposta: 1,
    nivel: "fácil"
  },
  {
    pergunta: "Se 3 kg de arroz custam 18 reais, quanto custam 5 kg?",
    opcoes: ["30","25","27","40"],
    resposta: 0,
    nivel: "médio"
  },
  {
    pergunta: "Se um carro percorre 240 km com 20 litros de gasolina, quantos litros são necessários para percorrer 360 km?",
    opcoes: ["25","30","27","40"],
    resposta: 1,
    nivel: "médio"
  },
  {
    pergunta: "Maria tem 120 figurinhas e dá 45 para seu amigo. Quantas figurinhas ela ainda tem?",
    opcoes: ["25","50","75","100"],
    resposta: 2,
    nivel: "fácil"
  },
  {
    pergunta: "João comprou 3 camisetas por 30 reais cada. Se ele paga com uma nota de 100 reais, quanto dinheiro ele receberá de troco?",
    opcoes: ["70","50","25","10"],
    resposta: 3,
    nivel: "fácil"
  },
  {
    pergunta: "Se 4 maçãs custam 10 reais, quanto custam 10 maçãs?",
    opcoes: ["25","30","45","50"],
    resposta: 0,
    nivel: "fácil"
  },
  {
    pergunta: "Um atleta corre 5 km em 25 minutos. Quanto tempo ele levará para correr 15 km na mesma velocidade?",
    opcoes: ["50 minutos","75 minutos","90 minutos","100 minutos"],
    resposta: 1,
    nivel: "médio"
  },
  {
    pergunta: "Se um produto custa 200 reais e está com 20% de desconto, qual é o preço com desconto?",
    opcoes: ["130","150","160","170"],
    resposta: 2,
    nivel: "fácil"
  }
];

// Função para embaralhar o array de questões
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
}

// Embaralha as questões e seleciona as 5 primeiras
shuffleArray(questions);
const selectedQuestions = questions.slice(0, 5);

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('result-container').style.display = 'none';

  const questionElement = document.getElementById('question');
  const options = document.getElementsByClassName('option');
  
  questionElement.textContent = selectedQuestions[currentQuestion].pergunta;
  for (let i = 0; i < options.length; i++) {
      options[i].textContent = selectedQuestions[currentQuestion].opcoes[i];
  }
  
  // document.getElementById('score').textContent = `Pontuação: ${score}`;
  document.getElementById('next-btn').style.display = 'none';
}

function checkAnswer(selectedOption) {
  const correctAnswer = selectedQuestions[currentQuestion].resposta;
  if (selectedOption === correctAnswer) {
      alert('Correto!');
      score++;
  } else {
      alert('Errado!');
  }
  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < selectedQuestions.length) {
      loadQuestion();
  } else {
      showResults();
  }
}

function showResults() {
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('final-score').textContent = `Sua pontuação final é: ${score} de ${selectedQuestions.length}`;

  // Calculando as porcentagens
  const correctPercentage = (score / selectedQuestions.length) * 100;
  const incorrectPercentage = 100 - correctPercentage;

  // Criando o gráfico de setores
  const ctx = document.getElementById('result-chart').getContext('2d');
  // Se o gráfico já existir, destruímos ele antes de criar um novo
  
  if (window.chart) {
    window.chart.destroy();
  }

  window.chart = new Chart(ctx, {
      type: 'pie', // Tipo de gráfico
      data: {
          labels: ['Acertos', 'Erros'],
          datasets: [{
              data: [correctPercentage, incorrectPercentage],
              backgroundColor: ['#4caf50', '#f44336'], // Cores para acertos e erros
              borderColor: ['#ffffff', '#ffffff'],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
                      }
                  }
              }
          }
      }
  });
}

function restartQuiz() {
  // Embaralha novamente e reinicia as variáveis
  shuffleArray(questions);
  selectedQuestions.length = 0;  // Limpa o array de questões selecionadas
  selectedQuestions.push(...questions.slice(0, 5));  // Adiciona novas 5 questões
  currentQuestion = 0;
  score = 0;
  // Esconde o gráfico e a tela de resultados ao reiniciar o quiz
  document.getElementById('result-container').style.display = 'none';
  loadQuestion();
  // Limpa o gráfico anterior
  if (window.chart) {
    window.chart.destroy(); // Destrói o gráfico atual para renovar
  }
}

// Carrega a primeira questão ao abrir a página
window.onload = loadQuestion;
