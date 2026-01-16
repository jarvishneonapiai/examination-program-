
const validUser = "Pratigya";
const validPass = "182727";
const secretPin = "332277";

let questions = [
 // MCQs
 {q:"What does HTML stand for?", options:["Hyper Tool Markup Language","Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Markup Language"], type:"mcq"},
 {q:"HTML is mainly used to:", options:["Design graphics","Create databases","Structure a web page and its content","Perform calculations"], type:"mcq"},
 {q:"Which component is used to design the structure of a website?", options:["HTML attributes","HTML tags","CSS styles","JavaScript functions"], type:"mcq"},
 {q:"What is the default name of a website’s homepage file?", options:["home.html","start.html","index.html","main.html"], type:"mcq"},
 {q:"Which HTML tag is used to define a paragraph?", options:["<h1>","<p>","<title>","<body>"], type:"mcq"},
 {q:"Which declaration tells the browser that the document uses HTML5?", options:["<html5>","<meta>","<!DOCTYPE html>","<doctype>"], type:"mcq"},

 // True / False
 {q:"HTML is a programming language.", options:["True","False"], type:"tf"},
 {q:"HTML tags are used to structure web pages.", options:["True","False"], type:"tf"},
 {q:"index.html is the default file name for a website’s homepage.", options:["True","False"], type:"tf"},
 {q:"The <head> tag contains metadata.", options:["True","False"], type:"tf"},
 {q:"The <body> tag contains all the content rendered by the browser.", options:["True","False"], type:"tf"},

 // Short Answer
 {q:"What is HTML?", type:"short"},
 {q:"What is an HTML tag?", type:"short"},
 {q:"What is the difference between <head> and <body> tags?", type:"short"},
 {q:"What is an HTML element?", type:"short"},
 {q:"What are Heading tags in HTML?", type:"short"},
 {q:"What is an Anchor tag?", type:"short"},
 {q:"What is a Subscript tag?", type:"short"},
 {q:"What is the use of the colspan attribute in HTML?", type:"short"},

 // Practical
 {q:"Write an HTML code to display Hello World.", type:"short"},
 {q:"Write the basic structure of an HTML page.", type:"short"},
 {q:"Write an HTML code to create a paragraph using the <p> tag.", type:"short"}
];

let answers = {};
let index = 0;

function login(){
  if(username.value===validUser && password.value===validPass){
    loginScreen.classList.add('hidden');
    waitScreen.classList.remove('hidden');
    startWait();
  } else alert('Invalid Login');
}

function startWait(){
  let t=300;
  let i=setInterval(()=>{
    waitTimer.innerText=--t;
    if(t<=0){clearInterval(i);startExam();}
  },1000);
}

function startExam(){
  waitScreen.classList.add('hidden');
  examScreen.classList.remove('hidden');
  studentName.innerText=validUser;
  startExamTimer();
  loadQuestion();
}

function startExamTimer(){
  let sec=3000;
  setInterval(()=>{
    let m=Math.floor(sec/60);
    let s=sec%60;
    examTimer.innerText=`${m}:${s<10?'0'+s:s}`;
    sec--;
    if(sec<=0) submitTest();
  },1000);
}

function loadQuestion(){
  let q=questions[index];
  question.innerText=q.q;
  options.innerHTML="";
  answerBox.classList.add('hidden');

  if(q.type!=="short"){
    q.options.forEach(op=>{
      options.innerHTML+=`<div class='option'><input type='radio' name='opt' value='${op}'> ${op}</div>`;
    });
  } else {
    answerBox.classList.remove('hidden');
    answerBox.value=answers[index]||"";
  }
}

function saveNext(){
  saveAnswer();
  if(index<questions.length-1){index++;loadQuestion();}
  else{examScreen.classList.add('hidden');submitScreen.classList.remove('hidden');}
}

function prevQuestion(){
  if(index>0){index--;loadQuestion();}
}

function saveAnswer(){
  let q=questions[index];
  if(q.type==="short") answers[index]=answerBox.value;
  else{
    let s=document.querySelector('input[name=opt]:checked');
    if(s) answers[index]=s.value;
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
      
