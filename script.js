window.onload = function () {

const validUser = "Pratigya";
const validPass = "182727";
const secretPin = "332277";

// DOM
const loginScreen = document.getElementById("loginScreen");
const waitScreen = document.getElementById("waitScreen");
const examScreen = document.getElementById("examScreen");
const submitScreen = document.getElementById("submitScreen");
const historyScreen = document.getElementById("historyScreen");

const username = document.getElementById("username");
const password = document.getElementById("password");
const waitTimer = document.getElementById("waitTimer");
const studentName = document.getElementById("studentName");
const examTimer = document.getElementById("examTimer");
const question = document.getElementById("question");
const options = document.getElementById("options");
const answerBox = document.getElementById("answerBox");
const pin = document.getElementById("pin");
const historyData = document.getElementById("historyData");

// Buttons
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("nextBtn").addEventListener("click", saveNext);
document.getElementById("prevBtn").addEventListener("click", prevQuestion);
document.getElementById("submitBtn").addEventListener("click", submitTest);
document.getElementById("historyBtn").addEventListener("click", checkHistory);

let index = 0;
let answers = {};

let questions = [
  { q: "What does HTML stand for?", options: ["Hyper Tool Markup Language","Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Markup Language"], type: "mcq" },
  { q: "HTML is a programming language.", options: ["True","False"], type: "tf" },
  { q: "What is HTML?", type: "short" }
];

// LOGIN
function login() {
  if (username.value === validUser && password.value === validPass) {
    loginScreen.classList.add("hidden");
    waitScreen.classList.remove("hidden");
    startWait();
  } else {
    alert("Invalid Login");
  }
}

// WAIT TIMER
function startWait() {
  let t = 300;
  waitTimer.innerText = t;
  let i = setInterval(() => {
    t--;
    waitTimer.innerText = t;
    if (t <= 0) {
      clearInterval(i);
      startExam();
    }
  }, 1000);
}

// START EXAM
function startExam() {
  waitScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  studentName.innerText = validUser;
  startExamTimer();
  loadQuestion();
}

// EXAM TIMER
function startExamTimer() {
  let sec = 3000;
  setInterval(() => {
    let m = Math.floor(sec / 60);
    let s = sec % 60;
    examTimer.innerText = `${m}:${s < 10 ? "0" + s : s}`;
    sec--;
    if (sec < 0) submitTest();
  }, 1000);
}

// QUESTIONS
function loadQuestion() {
  let q = questions[index];
  question.innerText = q.q;
  options.innerHTML = "";
  answerBox.classList.add("hidden");

  if (q.type !== "short") {
    q.options.forEach(op => {
      options.innerHTML += `<div><input type="radio" name="opt" value="${op}"> ${op}</div>`;
    });
  } else {
    answerBox.classList.remove("hidden");
  }
}

function saveNext() {
  index++;
  if (index < questions.length) loadQuestion();
  else submitScreen.classList.remove("hidden");
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
  if (pin.value === secretPin) {
    historyData.innerText = localStorage.getItem("examAnswers");
  } else alert("Wrong PIN");
}

};
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
                                                     }    if(s) answers[index]=s.value;
  }
}

function submitTest(){
  localStorage.setItem('examAnswers',JSON.stringify(answers));
  submitScreen.classList.add('hidden');
  historyScreen.classList.remove('hidden');
}

function checkHistory(){
  if(pin.value===secretPin) historyData.innerText=localStorage.getItem('examAnswers');
  else alert('Wrong PIN');
                                }
      
