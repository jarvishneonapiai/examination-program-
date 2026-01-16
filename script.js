const validUser = "Pratigya";
const validPass = "182727";
const secretPin = "332277";

// DOM elements
const loginScreen = document.getElementById("loginScreen");
const waitScreen = document.getElementById("waitScreen");
const examScreen = document.getElementById("examScreen");
const submitScreen = document.getElementById("submitScreen");
const historyScreen = document.getElementById("historyScreen");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const waitTimerEl = document.getElementById("waitTimer");
const studentNameEl = document.getElementById("studentName");
const examTimerEl = document.getElementById("examTimer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const answerBox = document.getElementById("answerBox");
const pinInput = document.getElementById("pin");
const historyData = document.getElementById("historyData");

let questions = [
  // MCQs
  { q: "What does HTML stand for?", options: ["Hyper Tool Markup Language", "Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language"], type: "mcq" },
  { q: "HTML is mainly used to:", options: ["Design graphics", "Create databases", "Structure a web page and its content", "Perform calculations"], type: "mcq" },
  { q: "Which component is used to design the structure of a website?", options: ["HTML attributes", "HTML tags", "CSS styles", "JavaScript functions"], type: "mcq" },
  { q: "What is the default name of a website’s homepage file?", options: ["home.html", "start.html", "index.html", "main.html"], type: "mcq" },
  { q: "Which HTML tag is used to define a paragraph?", options: ["<h1>", "<p>", "<title>", "<body>"], type: "mcq" },
  { q: "Which declaration tells the browser that the document uses HTML5?", options: ["<html5>", "<meta>", "<!DOCTYPE html>", "<doctype>"], type: "mcq" },

  // True / False
  { q: "HTML is a programming language.", options: ["True", "False"], type: "tf" },
  { q: "HTML tags are used to structure web pages.", options: ["True", "False"], type: "tf" },
  { q: "index.html is the default file name for a website’s homepage.", options: ["True", "False"], type: "tf" },
  { q: "The <head> tag contains metadata.", options: ["True", "False"], type: "tf" },
  { q: "The <body> tag contains all the content rendered by the browser.", options: ["True", "False"], type: "tf" },

  // Short Answer & Practical
  { q: "What is HTML?", type: "short" },
  { q: "What is an HTML tag?", type: "short" },
  { q: "What is the difference between <head> and <body> tags?", type: "short" },
  { q: "What is an HTML element?", type: "short" },
  { q: "What are Heading tags in HTML?", type: "short" },
  { q: "What is an Anchor tag?", type: "short" },
  { q: "What is a Subscript tag?", type: "short" },
  { q: "What is the use of the colspan attribute in HTML?", type: "short" },
  { q: "Write an HTML code to display Hello World.", type: "short" },
  { q: "Write the basic structure of an HTML page.", type: "short" },
  { q: "Write an HTML code to create a paragraph using the <p> tag.", type: "short" }
];

let answers = {};
let index = 0;
let waitInterval = null;
let examInterval = null;

function login() {
  if (usernameInput.value === validUser && passwordInput.value === validPass) {
    loginScreen.classList.add("hidden");
    // Directly start exam (no wait countdown)
    startExam();
  } else {
    alert("Invalid Login Details");
  }
}
}

  }, 1000);
}

function startExam() {
  
  examScreen.classList.remove("hidden");
  studentNameEl.textContent = validUser;
  startExamTimer();
  loadQuestion();
}

function startExamTimer() {
  let seconds = 3000; // 50 minutes
  examTimerEl.textContent = "50:00";
  examInterval = setInterval(() => {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    examTimerEl.textContent = `${m}:${s < 10 ? "0" + s : s}`;
    seconds--;
    if (seconds < 0) {
      clearInterval(examInterval);
      submitTest();
    }
  }, 1000);
}

function loadQuestion() {
  const q = questions[index];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  answerBox.classList.add("hidden");

  if (q.type === "mcq" || q.type === "tf") {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerHTML = `<input type='radio' name='opt' value='${opt}'> ${opt}`;
      optionsEl.appendChild(div);
    });
  } else {
    answerBox.classList.remove("hidden");
    answerBox.value = answers[index] || "";
  }
}

function saveAnswer() {
  const q = questions[index];
  if (q.type === "short") {
    answers[index] = answerBox.value;
  } else {
    const selected = document.querySelector("input[name='opt']:checked");
    if (selected) answers[index] = selected.value;
  }
}

function saveNext() {
  saveAnswer();
  if (index < questions.length - 1) {
    index++;
    loadQuestion();
  } else {
    examScreen.classList.add("hidden");
    submitScreen.classList.remove("hidden");
  }
}

function prevQuestion() {
  if (index > 0) {
    index--;
    loadQuestion();
  }
}

function submitTest() {
  localStorage.setItem("examAnswers", JSON.stringify(answers));
  examScreen.classList.add("hidden");
  submitScreen.classList.add("hidden");
  historyScreen.classList.remove("hidden");
}

function checkHistory() {
  if (pinInput.value === secretPin) {
    historyData.textContent = localStorage.getItem("examAnswers");
  } else {
    alert("Wrong PIN");
  }
}
