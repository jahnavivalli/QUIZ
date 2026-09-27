/* =========================================
   QUIZ DATA
========================================= */

const questions = [

  /* -----------------------------------------
     SURVEY QUESTION 1
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
     ARCHETYPE QUESTION 1
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
     SURVEY QUESTION 2
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
     ARCHETYPE QUESTION 2
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
     SURVEY QUESTION 3
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
     ARCHETYPE QUESTION 3
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
     SURVEY QUESTION 4
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
     ARCHETYPE QUESTION 4
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
   RESULT PHRASES
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

  document.getElementById("intro").classList.add("hidden");

  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();

}


/* =========================================
   SHOW QUESTION
========================================= */

function showQuestion() {

  const question = questions[currentQuestion];

  const questionText =
    document.getElementById("question-text");

  const optionsContainer =
    document.getElementById("answer-options");

  const progressBar =
    document.getElementById("progress-bar");


  questionText.textContent = question.question;

  optionsContainer.innerHTML = "";


  question.options.forEach((option, index) => {

    const button =
      document.createElement("button");

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

    optionsContainer.appendChild(button);

  });


  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;

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

  /*
    Archetype questions are at positions:
    1, 3, 5, 7
  */


  if (questionIndex === 1) {

    switch (answerIndex) {

      case 0:
        archetypeScores.spender += 2;
        archetypeScores.impulse += 2;
        break;

      case 1:
        archetypeScores.impulse += 1;
        break;

      case 2:
        archetypeScores.budgeter += 2;
        break;

      case 3:
        archetypeScores.saver += 2;
        archetypeScores.budgeter += 1;
        break;

      case 4:
        archetypeScores.saver += 1;
        break;

    }

  }


  if (questionIndex === 3) {

    switch (answerIndex) {

      case 0:
        archetypeScores.spender += 2;
        archetypeScores.impulse += 1;
        break;

      case 1:
        archetypeScores.budgeter += 2;
        break;

      case 2:
        archetypeScores.saver += 2;
        break;

      case 3:
        archetypeScores.budgeter += 3;
        break;

      case 4:
        archetypeScores.mystery += 3;
        break;

    }

  }


  if (questionIndex === 5) {

    switch (answerIndex) {

      case 0:
        archetypeScores.social += 3;
        archetypeScores.spender += 1;
        break;

      case 1:
        archetypeScores.budgeter += 2;
        break;

      case 2:
        archetypeScores.saver += 2;
        break;

      case 3:
        archetypeScores.saver += 2;
        break;

      case 4:
        archetypeScores.budgeter += 1;
        archetypeScores.social += 1;
        break;

    }

  }


  if (questionIndex === 7) {

    switch (answerIndex) {

      case 0:
        archetypeScores.spender += 3;
        break;

      case 1:
        archetypeScores.impulse += 3;
        break;

      case 2:
        archetypeScores.saver += 3;
        break;

      case 3:
        archetypeScores.impulse += 1;
        archetypeScores.spender += 1;
        break;

      case 4:
        archetypeScores.mystery += 3;
        break;

    }

  }

}


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {

  const matchData =
    calculateMatch();

  const archetype =
    calculateArchetype();


  document.getElementById("quiz")
    .classList.add("hidden");

  document.getElementById("results")
    .classList.remove("hidden");


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


  /*
    Q1:
    Food / eating out = 16 / 17
  */

  const q1 = userAnswers[0];

  if (
    q1 &&
    q1.answerText === "Food"
  ) {

    matched++;

  }


  /*
    Q2:
    40–60% and More than 60% are tied
    at 7 / 17 each.
  */

  const q2 = userAnswers[2];

  if (
    q2 &&
    (
      q2.answerText === "40–60%" ||
      q2.answerText === "More than 60%"
    )
  ) {

    matched++;

  }


  /*
    Q3:
    Rarely = 35.3%
  */

  const q3 = userAnswers[4];

  if (
    q3 &&
    q3.answerText === "Rarely"
  ) {

    matched++;

  }


  /*
    Q4:
    Food / eating out AND Save it
    are tied at 35.3%.
  */

  const q4 = userAnswers[6];

  if (
    q4 &&
    (
      q4.answerText === "Food / eating out" ||
      q4.answerText === "Save it"
    )
  ) {

    matched++;

  }


  const percentage =
    Math.round((matched / 4) * 100);


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


  Object.entries(archetypeScores).forEach(
    ([type, score]) => {

      if (score > highestScore) {

        highestScore = score;

        winningType = type;

      }

    }
  );


  return winningType;

}


/* =========================================
   DISPLAY ARCHETYPE
========================================= */

function displayArchetype(type) {

  const result =
    archetypes[type];


  document.getElementById("result-archetype")
    .textContent = result.title;


  document.getElementById("result-quote")
    .textContent = result.quote;


  document.getElementById("result-source")
    .textContent = result.source;

}


/* =========================================
   DISPLAY MATCH
========================================= */

function displayMatch(matchData) {

  document.getElementById("match-percentage")
    .textContent = `${matchData.percentage}%`;


  document.getElementById("match-description")
    .textContent =
      `${matchData.matched} out of ${matchData.total} survey questions matched the most common response.`;

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

  const container =
    document.getElementById(
      "comparison-table-container"
    );


  const rows = [

    {
      question:
        "What do you spend most of your money on?",

      answer:
        getUserAnswer(0),

      common:
        "Food / eating out — 16 / 17",

      match:
        getUserAnswer(0) === "Food"
    },


    {
      question:
        "What percentage goes toward your main expense?",

      answer:
        getUserAnswer(2),

      common:
        "40–60% OR more than 60% — 7 / 17 each",

      match:
        (
          getUserAnswer(2) === "40–60%" ||
          getUserAnswer(2) === "More than 60%"
        )
    },


    {
      question:
        "How often do you make impulse purchases?",

      answer:
        getUserAnswer(4),

      common:
        "Rarely — 35.3%",

      match:
        getUserAnswer(4) === "Rarely"
    },


    {
      question:
        "What would you do with ₹1,000?",

      answer:
        getUserAnswer(6),

      common:
        "Food / eating out OR save it — 35.3% each",

      match:
        (
          getUserAnswer(6) === "Food / eating out" ||
          getUserAnswer(6) === "Save it"
        )
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

        <td>
          ${row.question}
        </td>

        <td>
          ${row.answer}
        </td>

        <td>
          ${row.common}
        </td>

        <td class="${row.match ? "match-cell" : ""}">
          ${row.match ? "✓" : "—"}
        </td>

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

  document.getElementById("results")
    .classList.add("hidden");

  document.getElementById("data")
    .classList.remove("hidden");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}
