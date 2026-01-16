const validUser = "Pratigya";
const validPass = "182727";
const secretPin = "332277";

const loginScreen = document.getElementById("loginScreen");
const examScreen = document.getElementById("examScreen");
const submitScreen = document.getElementById("submitScreen");
const historyScreen = document.getElementById("historyScreen");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const studentNameEl = document.getElementById("studentName");
const examTimerEl = document.getElementById("examTimer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const answerBox = document.getElementById("answerBox");
const pinInput = document.getElementById("pin");
const historyData = document.getElementById("historyData");

let questions = [
 {q:"What does HTML stand for?",options:["Hyper Tool Markup Language","Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Markup Language"],type:"mcq"},
 {q:"HTML is a programming language.",options:["True","False"],type:"tf"},
 {q:"What are Heading tags in HTML?",type:"short"},
 {q:"What is an Anchor tag?",type:"short"},
 {q:"What is a Subscript tag?",type:"short"},
 {q:"What is the use of colspan attribute?",type:"short"}
];

let index=0;
let answers={};

// EVENTS
document.getElementById("loginBtn").addEventListener("click",login);
document.getElementById("nextBtn").addEventListener("click",saveNext);
document.getElementById("prevBtn").addEventListener("click",prevQuestion);
document.getElementById("submitBtn").addEventListener("click",submitTest);
document.getElementById("historyBtn").addEventListener("click",checkHistory);

function login(){
 if(usernameInput.value===validUser && passwordInput.value===validPass){
   loginScreen.classList.add("hidden");
   startExam();
 }else alert("Invalid Login");
}

function startExam(){
 examScreen.classList.remove("hidden");
 studentNameEl.textContent=validUser;
 startTimer();
 loadQuestion();
}

function startTimer(){
 let sec=3000;
 setInterval(()=>{
  let m=Math.floor(sec/60);
  let s=sec%60;
  examTimerEl.textContent=`${m}:${s<10?'0'+s:s}`;
  sec--;
  if(sec<0) submitTest();
 },1000);
}

function loadQuestion(){
 const q=questions[index];
 questionEl.textContent=q.q;
 optionsEl.innerHTML="";
 answerBox.classList.add("hidden");
 if(q.type==="short"){
  answerBox.classList.remove("hidden");
  answerBox.value=answers[index]||"";
 }else{
  q.options.forEach(o=>{
   optionsEl.innerHTML+=`<div><input type='radio' name='opt' value='${o}'> ${o}</div>`;
  });
 }
}

function saveAnswer(){
 const q=questions[index];
 if(q.type==="short") answers[index]=answerBox.value;
 else{
  const sel=document.querySelector("input[name='opt']:checked");
  if(sel) answers[index]=sel.value;
 }
}

function saveNext(){
 saveAnswer();
 if(index<questions.length-1){index++;loadQuestion();}
 else{examScreen.classList.add("hidden");submitScreen.classList.remove("hidden");}
}

function prevQuestion(){if(index>0){index--;loadQuestion();}}

function submitTest(){
 localStorage.setItem("examAnswers",JSON.stringify(answers));
 examScreen.classList.add("hidden");
 submitScreen.classList.add("hidden");
 historyScreen.classList.remove("hidden");
}

function checkHistory(){
 if(pinInput.value===secretPin) historyData.textContent=localStorage.getItem("examAnswers");
 else alert("Wrong PIN");
}
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
