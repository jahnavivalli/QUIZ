/* =========================================
   QUIZ DATA
========================================= */

const questions = [

  /* -----------------------------------------
     SURVEY QUESTION 1 (Index 0)
  ----------------------------------------- */
  {
    type: "survey",
    question: "What do you spend most of your money on?",
    options: [
      "Food",
      "Entertainment",
      "Personal care",
      "Shopping",
      "Transport",
      "Academics"
    ]
  },

  /* -----------------------------------------
     ARCHETYPE QUESTION 1 (Index 1)
  ----------------------------------------- */
  {
    type: "archetype",
    question: "You see something you really want, but you weren't planning to buy it. What do you do?",
    options: [
      "Buy it",
      "Add it to my cart",
      "Wait and think about it",
      "Check my balance first",
      "Forget about it"
    ]
  },

  /* -----------------------------------------
     SURVEY QUESTION 2 (Index 2)
  ----------------------------------------- */
  {
    type: "survey",
    question: "Approximately what percentage of your spending goes toward your main expense?",
    options: [
      "Less than 20%",
      "20–40%",
      "40–60%",
      "More than 60%"
    ]
  },

  /* -----------------------------------------
     ARCHETYPE QUESTION 2 (Index 3)
  ----------------------------------------- */
  {
    type: "archetype",
    question: "When you get your monthly or weekly money, what do you usually do?",
    options: [
      "Spend it as I go",
      "Have a rough idea of what I'll spend",
      "Set some aside first",
      "Track all my purchases",
      "Somehow the money just disappears"
    ]
  },

  /* -----------------------------------------
     SURVEY QUESTION 3 (Index 4)
  ----------------------------------------- */
  {
    type: "survey",
    question: "How often do you make impulse purchases?",
    options: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Very often"
    ]
  },

  /* -----------------------------------------
     ARCHETYPE QUESTION 3 (Index 5)
  ----------------------------------------- */
  {
    type: "archetype",
    question: "You and your friends are going out, but the plan is getting expensive. You...",
    options: [
      "Still go",
      "Suggest somewhere cheaper",
      "Go but spend very little",
      "Drop out",
      "Convince everyone to do something else"
    ]
  },

  /* -----------------------------------------
     SURVEY QUESTION 4 (Index 6)
  ----------------------------------------- */
  {
    type: "survey",
    question: "If you suddenly received ₹1,000, what would you most likely spend it on?",
    options: [
      "Food / eating out",
      "Save it",
      "Shopping",
      "Entertainment",
      "Other"
    ]
  },

  /* -----------------------------------------
     ARCHETYPE QUESTION 4 (Index 7)
  ----------------------------------------- */
  {
    type: "archetype",
    question: "Which sentence sounds most like you?",
    options: [
      "Money is meant to be spent.",
      "I deserve a little treat.",
      "I'll save what's left.",
      "I should probably stop spending.",
      "I have no idea where my money went."
    ]
  }

];


/* =========================================
   STATE
========================================= */

let currentQuestion = 0;
let userAnswers = [];

let archetypeScores = {
  saver: 0,
  impulse: 0,
  budgeter: 0,
  social: 0,
  spender: 0,
  mystery: 0
};


/* =========================================
   RESULT ARCHETYPES
========================================= */

const archetypes = {
  saver: {
    title: "THE SAVER",
    quote: "“A penny saved is a penny earned.”",
    source: "— Benjamin Franklin"
  },
  budgeter: {
    title: "THE BUDGETER",
    quote: "“Failing to plan is planning to fail.”",
    source: ""
  },
  social: {
    title: "THE SOCIAL SPENDER",
    quote: "“The more, the merrier.”",
    source: ""
  },
  mystery: {
    title: "THE MONEY MYSTERY",
    quote: "“Where Is My Mind?”",
    source: "— Pixies"
  },
  impulse: {
    title: "THE IMPULSE SPENDER",
    quote: "“Oops!... I did it again.”",
    source: "— Britney Spears"
  },
  spender: {
    title: "THE SPENDER",
    quote: "“Money, money, money, must be funny, in a rich man's world.”",
    source: "— ABBA"
  }
};


/* =========================================
   START QUIZ
========================================= */

function startQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  archetypeScores = {
    saver: 0,
    impulse: 0,
    budgeter: 0,
    social: 0,
    spender: 0,
    mystery: 0
  };

  const introEl = document.getElementById("intro");
  const quizEl = document.getElementById("quiz");

  if (introEl) introEl.classList.add("hidden");
  if (quizEl) quizEl.classList.remove("hidden");

  showQuestion();
}


/* =========================================
   SHOW QUESTION
========================================= */

function showQuestion() {
  const question = questions[currentQuestion];
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("answer-options");
  const progressBar = document.getElementById("progress-bar");

  if (questionText) questionText.textContent = question.question;
  if (optionsContainer) optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.innerHTML = `
      <span class="answer-number">
        ${String(index + 1).padStart(2, "0")}
      </span>
      <span class="answer-text">
        ${option}
      </span>
    `;

    button.onclick = () => {
      selectAnswer(index);
    };

    if (optionsContainer) optionsContainer.appendChild(button);
  });

  if (progressBar) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
}


/* =========================================
   SELECT ANSWER
========================================= */

function selectAnswer(index) {
  const question = questions[currentQuestion];

  userAnswers[currentQuestion] = {
    questionType: question.type,
    answerIndex: index,
    answerText: question.options[index]
  };

  if (question.type === "archetype") {
    scoreArchetype(currentQuestion, index);
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}


/* =========================================
   ARCHETYPE SCORING
========================================= */

function scoreArchetype(questionIndex, answerIndex) {
  // Question Index 1: Impulse response
  if (questionIndex === 1) {
    switch (answerIndex) {
      case 0: // Buy it
        archetypeScores.spender += 2;
        archetypeScores.impulse += 2;
        break;
      case 1: // Add it to my cart
        archetypeScores.impulse += 1;
        break;
      case 2: // Wait and think about it
        archetypeScores.budgeter += 2;
        break;
      case 3: // Check my balance first
        archetypeScores.saver += 2;
        archetypeScores.budgeter += 1;
        break;
      case 4: // Forget about it
        archetypeScores.saver += 1;
        break;
    }
  }

  // Question Index 3: Routine/Management response
  if (questionIndex === 3) {
    switch (answerIndex) {
      case 0: // Spend it as I go
        archetypeScores.spender += 2;
        archetypeScores.impulse += 1;
        break;
      case 1: // Have a rough idea of what I'll spend
        archetypeScores.budgeter += 1;
        break;
      case 2: // Set some aside first
        archetypeScores.saver += 2;
        archetypeScores.budgeter += 1;
        break;
      case 3: // Track all my purchases
        archetypeScores.budgeter += 3;
        break;
      case 4: // Somehow the money just disappears
        archetypeScores.mystery += 3;
        break;
    }
  }

  // Question Index 5: Social/Peer group response
  if (questionIndex === 5) {
    switch (answerIndex) {
      case 0: // Still go
        archetypeScores.social += 3;
        archetypeScores.spender += 1;
        break;
      case 1: // Suggest somewhere cheaper
        archetypeScores.budgeter += 2;
        break;
      case 2: // Go but spend very little
        archetypeScores.saver += 2;
        break;
      case 3: // Drop out
        archetypeScores.saver += 2;
        break;
      case 4: // Convince everyone to do something else
        archetypeScores.budgeter += 1;
        archetypeScores.social += 1;
        break;
    }
  }

  // Question Index 7: Self-identity phrase
  if (questionIndex === 7) {
    switch (answerIndex) {
      case 0: // Money is meant to be spent.
        archetypeScores.spender += 3;
        break;
      case 1: // I deserve a little treat.
        archetypeScores.impulse += 3;
        break;
      case 2: // I'll save what's left.
        archetypeScores.saver += 3;
        break;
      case 3: // I should probably stop spending.
        archetypeScores.impulse += 1;
        archetypeScores.spender += 1;
        break;
      case 4: // I have no idea where my money went.
        archetypeScores.mystery += 3;
        break;
    }
  }
}


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {
  const matchData = calculateMatch();
  const archetype = calculateArchetype();

  const quizEl = document.getElementById("quiz");
  const resultsEl = document.getElementById("results");

  if (quizEl) quizEl.classList.add("hidden");
  if (resultsEl) resultsEl.classList.remove("hidden");

  displayArchetype(archetype);
  displayMatch(matchData);
  createComparisonTable(matchData);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================
   CALCULATE MU MATCH
========================================= */

function calculateMatch() {
  let matched = 0;

  // Survey Q1 (Index 0)
  const q1 = userAnswers[0];
  if (q1 && q1.answerText === "Food") {
    matched++;
  }

  // Survey Q2 (Index 2)
  const q2 = userAnswers[2];
  if (q2 && (q2.answerText === "40–60%" || q2.answerText === "More than 60%")) {
    matched++;
  }

  // Survey Q3 (Index 4)
  const q3 = userAnswers[4];
  if (q3 && q3.answerText === "Rarely") {
    matched++;
  }

  // Survey Q4 (Index 6)
  const q4 = userAnswers[6];
  if (q4 && (q4.answerText === "Food / eating out" || q4.answerText === "Save it")) {
    matched++;
  }

  const percentage = Math.round((matched / 4) * 100);

  return {
    matched,
    total: 4,
    percentage
  };
}


/* =========================================
   CALCULATE ARCHETYPE
========================================= */

function calculateArchetype() {
  let highestScore = -1;
  let winningType = "mystery";

  Object.entries(archetypeScores).forEach(([type, score]) => {
    if (score > highestScore) {
      highestScore = score;
      winningType = type;
    }
  });

  return winningType;
}


/* =========================================
   DISPLAY ARCHETYPE
========================================= */

function displayArchetype(type) {
  const result = archetypes[type] || archetypes["mystery"];

  const archetypeEl = document.getElementById("result-archetype");
  const quoteEl = document.getElementById("result-quote");
  const sourceEl = document.getElementById("result-source");

  if (archetypeEl) archetypeEl.textContent = result.title;
  if (quoteEl) quoteEl.textContent = result.quote;
  if (sourceEl) sourceEl.textContent = result.source;
}


/* =========================================
   DISPLAY MATCH
========================================= */

function displayMatch(matchData) {
  const matchPercentEl = document.getElementById("match-percentage");
  const matchDescEl = document.getElementById("match-description");

  if (matchPercentEl) matchPercentEl.textContent = `${matchData.percentage}%`;
  if (matchDescEl) {
    matchDescEl.textContent = `${matchData.matched} out of ${matchData.total} survey questions matched the most common response.`;
  }
}


/* =========================================
   GET USER ANSWER
========================================= */

function getUserAnswer(index) {
  if (!userAnswers[index]) {
    return "—";
  }
  return userAnswers[index].answerText;
}


/* =========================================
   COMPARISON TABLE
========================================= */

function createComparisonTable(matchData) {
  const container = document.getElementById("comparison-table-container");
  if (!container) return;

  const rows = [
    {
      question: "What do you spend most of your money on?",
      answer: getUserAnswer(0),
      common: "Food / eating out — 16 / 17",
      match: getUserAnswer(0) === "Food"
    },
    {
      question: "What percentage goes toward your main expense?",
      answer: getUserAnswer(2),
      common: "40–60% OR more than 60% — 7 / 17 each",
      match: getUserAnswer(2) === "40–60%" || getUserAnswer(2) === "More than 60%"
    },
    {
      question: "How often do you make impulse purchases?",
      answer: getUserAnswer(4),
      common: "Rarely — 35.3%",
      match: getUserAnswer(4) === "Rarely"
    },
    {
      question: "What would you do with ₹1,000?",
      answer: getUserAnswer(6),
      common: "Food / eating out OR save it — 35.3% each",
      match: getUserAnswer(6) === "Food / eating out" || getUserAnswer(6) === "Save it"
    }
  ];

  let tableHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>SURVEY QUESTION</th>
          <th>YOUR ANSWER</th>
          <th>MOST COMMON RESPONSE</th>
          <th>MATCH</th>
        </tr>
      </thead>
      <tbody>
  `;

  rows.forEach(row => {
    tableHTML += `
      <tr>
        <td>${row.question}</td>
        <td>${row.answer}</td>
        <td>${row.common}</td>
        <td class="${row.match ? "match-cell" : ""}">${row.match ? "✓" : "—"}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}


/* =========================================
   SHOW DATA
========================================= */

function showData() {
  const resultsEl = document.getElementById("results");
  const dataEl = document.getElementById("data");

  if (resultsEl) resultsEl.classList.add("hidden");
  if (dataEl) dataEl.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
