// Comentario: Aquí se debería realizar una llamada a la API para obtener 30 preguntas y almacenarlas en 'questions'.
// Ejemplo de cómo se podría hacer la llamada a la API (suponiendo que la API devuelve un array de preguntas en JSON):
/*
fetch('URL_DE_LA_API')
    .then(response => response.json())
    .then(data => {
        questions = data;
        selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
        startQuiz(); // Iniciar el cuestionario después de cargar las preguntas
    })
    .catch(error => console.error('Error al obtener las preguntas:', error));
*/

//lo de arriba le pregunte al chatgpt JAJAJAJ

// Lista de preguntas con opciones y respuestas
let questions = [
    {
        text: "¿Cuál es la capital de Francia?",
        options: ["París", "Madrid", "Berlín", "Roma"],
        answer: "París"
    },
    {
        text: "¿Cuál es el planeta más grande del sistema solar?",
        options: ["Júpiter", "Saturno", "Marte", "Venus"],
        answer: "Júpiter"
    },
    {
        text: "¿Cuál es la fórmula química del agua?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        answer: "H2O"
    },
    {
        text: "¿En qué año llegó el hombre a la Luna?",
        options: ["1969", "1959", "1979", "1989"],
        answer: "1969"
    },
    {
        text: "¿Cuál es el idioma oficial de Brasil?",
        options: ["Portugués", "Español", "Inglés", "Francés"],
        answer: "Portugués"
    },
    {
        text: "¿Cuál es el animal terrestre más rápido?",
        options: ["Guepardo", "León", "Tigre", "Elefante"],
        answer: "Guepardo"
    },
    {
        text: "¿Cuál es el río más largo del mundo?",
        options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
        answer: "Amazonas"
    },
    {
        text: "¿Qué instrumento mide los terremotos?",
        options: ["Sismógrafo", "Barómetro", "Anemómetro", "Termómetro"],
        answer: "Sismógrafo"
    },
    {
        text: "¿Cuál es el país más grande del mundo?",
        options: ["Rusia", "Canadá", "China", "Estados Unidos"],
        answer: "Rusia"
    },
    {
        text: "¿Cuál es el océano más grande del mundo?",
        options: ["Pacífico", "Atlántico", "Índico", "Ártico"],
        answer: "Pacífico"
    },
    // Añade aquí más preguntas hasta tener al menos 30
];

// Seleccionar aleatoriamente 10 preguntas
let selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);

let currentQuestionIndex = 0;
let score = 0;
let timer;
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');
const startContainer = document.getElementById('start-container');
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

function startQuiz() {
    startContainer.classList.add('d-none');
    quizContainer.classList.remove('d-none');
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = selectedQuestions[currentQuestionIndex];
    questionEl.innerText = question.text;

    // Barajar las opciones
    const shuffledOptions = question.options.sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn', 'btn-light', 'btn-block', 'mb-2');
        button.addEventListener('click', selectAnswer);
        optionsEl.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add('d-none');
    nextBtn.disabled = true;
    while (optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
    clearInterval(timer);
    timerEl.innerText = 'Tiempo: 15s';
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.innerText === selectedQuestions[currentQuestionIndex].answer;
    setStatusClass(document.body, correct);
    Array.from(optionsEl.children).forEach(button => {
        setStatusClass(button, button.innerText === selectedQuestions[currentQuestionIndex].answer);
    });

    if (correct) {
        score++;
    }

    nextBtn.classList.remove('d-none');
    nextBtn.disabled = false;

    clearInterval(timer);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function showResult() {
    quizContainer.classList.add('d-none');
    resultContainer.classList.remove('d-none');
    scoreEl.innerText = `Puntuación: ${score}`;
    if (score >= 8) {
        messageEl.innerText = '¡Excelente trabajo!';
    } else if (score >= 5) {
        messageEl.innerText = '¡Buen intento!';
    } else if (score >= 1) {
        messageEl.innerText = 'Sigue practicando.';
    } else {
        messageEl.innerText = 'Inténtalo de nuevo.';
    }
}

function startTimer() {
    let timeLeft = 15;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Tiempo: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    alert('¡Tiempo agotado! Debes repetir el examen.');
    window.location.href = 'index.html'; // Redirige al inicio del examen
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartBtn.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    resultContainer.classList.add('d-none');
    startContainer.classList.remove('d-none');
});

startBtn.addEventListener('click', () => {
    startQuiz();
});
