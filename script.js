const questions=[
    {
        question:"How much do you love me??",
        answers:[
            {text:"100%" ,correct:false},
            {text:"Infinity", correct:true},
            {text:"No" ,correct:false},
            {text:"500%", correct:false},
        ]
    },
    {
        question:"What is your weakness in me??",
        answers:[
            {text:"Eyes" ,correct:false},
            {text:"Lips", correct:true},
            {text:"Cheeks" ,correct:false},
            {text:"Neck", correct:false},
        ]
    },
    {
        question:"What do you thing my weakness in you??",
        answers:[
            {text:"Smile" ,correct:true},
            {text:"Anger", correct:false},
            {text:"Hugs" ,correct:true},
            {text:"Calories", correct:true},
        ]
    },
    {
        question:"Will you marry me??",
        answers:[
            {text:"Already u r my wife", correct:true},
            {text:"No", correct:false},
            {text:"Never..but will think of it" ,correct:false},
            {text:"Now....??", correct:false},
        ]
    }
];

const quesElement=document.getElementById("ques");
const ansElement=document.getElementById("ans-btn");
const nextElement=document.getElementById("next");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextElement.innerHTML="next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    quesElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}
function resetState(){
    nextElement.style.display="none";
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
    }
}
function selectanswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansElement.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextElement.style.display="block";
}

function showScore(){
    resetState();
    quesElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextElement.innerHTML="Play Again";
    nextElement.style.display="block";
}
function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextElement.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextbutton();
    }else{
        startQuiz();
    }
})
startQuiz();