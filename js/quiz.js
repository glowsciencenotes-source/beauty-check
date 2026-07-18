/*
====================================================

Quiz Controller

====================================================
*/

"use strict";

/*====================================================
Start Quiz
====================================================*/

function startQuiz(){

    App.answers=[];

    App.currentQuestion=0;

    showScreen("quiz");

    renderQuestion();

}

/*====================================================
Render Question
====================================================*/

function renderQuestion(){

    const question=

        App.questions[App.currentQuestion];

    if(!question)return;

    document.getElementById(

        "questionTitle"

    ).textContent=

        question.question;

    renderAnswers(question);

    updateProgress();

    updateNavigation();

}

/*====================================================
Answers
====================================================*/

function renderAnswers(question){

    const area=

        document.getElementById(

            "answers"

        );

    area.innerHTML="";

    question.answers.forEach(

        answer=>{

            const button=

                document.createElement(

                    "button"

                );

            button.className=

                "answer-button";

            button.textContent=

                answer.text;

            button.onclick=()=>{

                selectAnswer(

                    answer.id

                );

            };

            area.appendChild(button);

        }

    );

}
/*====================================================
Select
====================================================*/

function selectAnswer(answerId){

    App.answers[

        App.currentQuestion

    ]=answerId;

    nextQuestion();

}

/*====================================================
Next
====================================================*/

function nextQuestion(){

    if(

        App.currentQuestion<

        App.questions.length-1

    ){

        App.currentQuestion++;

        renderQuestion();

        return;

    }

    finishQuiz();

}

/*====================================================
Previous
====================================================*/

function previousQuestion(){

    if(

        App.currentQuestion===0

    )return;

    App.currentQuestion--;

    renderQuestion();

}

/*====================================================
Navigation
====================================================*/

function updateNavigation(){

    UI.prevBtn.style.display=

        App.currentQuestion===0

        ?"none"

        :"inline-flex";

}


/*====================================================
Progress
====================================================*/

function updateProgress(){

    const total=

        App.questions.length;

    const current=

        App.currentQuestion+1;

    const percent=

        current/total*100;

    document.getElementById(

        "questionCount"

    ).textContent=

        `Question ${current} / ${total}`;

    document.getElementById(

        "progressPercent"

    ).textContent=

        `${Math.round(percent)}%`;

    document.getElementById(

        "progressFill"

    ).style.width=

        percent+"%";

}
/*====================================================
Finish
====================================================*/

function finishQuiz(){

    showLoading();

    setTimeout(()=>{

        App.result=

            createDiagnosis();

        renderResult();

        showScreen("result");

    },1500);

}

/*====================================================
Answer
====================================================*/

function getAnswer(questionId){

    return App.answers[questionId];

}


