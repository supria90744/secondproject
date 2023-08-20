const questions=[
    {
        question:"Which attribute is used to provide a unique name to HTMl element??",
        answers:[
            {text:"class" ,correct:false},
            {text:"id", correct:true},
            {text:"type" ,correct:false},
            {text:"None of the above", correct:false},
        ]
    },
    {
        question:"How to set a font for a whole page?",
        answers:[
            {text:"targetfont" ,correct:false},
            {text:"defaultfont", correct:true},
            {text:"font" ,correct:false},
            {text:"None of the above", correct:false},
        ]
    },
    {
        question:"How are quotations defined in HTML??",
        answers:[
            {text:"blockquote" ,correct:true},
            {text:"quote", correct:false},
            {text:"block" ,correct:false},
            {text:"None of the above", correct:false},
        ]
    },
    {
        question:"What does the alpha value of RGBA represent?",
        answers:[
            {text:"Opacity value of color", correct:true},
            {text:"The shade of a color", correct:false},
            {text:"Both" ,correct:false},
            {text:"None of the above", correct:false},
        ]
    },
    {
        question:"What are those objects called which ae used for storing data on client provied by the HTML local storage?",
        answers:[
            {text:"Windows.localStorage", correct:false},
            {text:"Windows.sessionStorage", correct:false},
            {text:"Both" ,correct:true},
            {text:"None of the above", correct:false},
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