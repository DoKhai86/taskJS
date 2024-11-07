const questions = [
  {
    question: "Đỗ Khải năm nay bao nhiêu tuổi?",
    answers: [
      { text: "15 tuổi", correct: false },
      { text: "19 tuổi", correct: true },
      { text: "17 tuổi", correct: false },
      { text: "20 tuổi", correct: false },
    ],
  },
  {
    question: "Đỗ Khải sợ con gì nhất?",
    answers: [
      { text: "Rắn", correct: false },
      { text: "Lợn", correct: false },
      { text: "Mèo", correct: false },
      { text: "Cóc", correct: true },
    ],
  },
  {
    question: "Đỗ Khải thích ăn trái cây gì nhất?",
    answers: [
      { text: "Dưa hấu", correct: true },
      { text: "Sầu riêng", correct: false },
      { text: "Ổi", correct: false },
      { text: "Mít", correct: false },
    ],
  },
  {
    question: "Gia đình nhà Đỗ Khải có bao nhiêu thành viên?",
    answers: [
      { text: "5 thành viên", correct: false },
      { text: "6 thành viên", correct: true },
      { text: "4 thành viên", correct: false },
      { text: "3 thành viên", correct: false },
    ],
  },
];

// function

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

const resetState = () => {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
};

const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

const handleNextQuestion = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

const showScore = () => {
  resetState();
  questionElement.innerHTML = `Đạt ${score}/${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextQuestion();
  } else {
    startQuiz();
  }
});

startQuiz();
