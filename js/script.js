/*
==================================================
30秒肌診断
Main Script
Version 3.0
==================================================
*/

/*
----------------------------------
状態管理
----------------------------------
*/

let questions = [];
let products = [];

let currentQuestion = 0;
let answers = [];

let diagnosisResult = null;

/*
----------------------------------
画面取得
----------------------------------
*/

const screens = {

    home: document.getElementById("home"),

    quiz: document.getElementById("quiz"),

    loading: document.getElementById("loading"),

    result: document.getElementById("result")

};

/*
----------------------------------
ボタン
----------------------------------
*/

const startBtn = document.getElementById("startBtn");

const prevBtn = document.getElementById("prevBtn");

const restartBtn = document.getElementById("restartBtn");

const shareBtn = document.getElementById("shareBtn");

/*
----------------------------------
初期化
----------------------------------
*/

window.addEventListener(

    "DOMContentLoaded",

    initializeApp

);

async function initializeApp(){

    await loadQuestions();

    await loadProducts();

    bindEvents();

}

/*
----------------------------------
イベント
----------------------------------
*/

function bindEvents(){

    startBtn.addEventListener(

        "click",

        startQuiz

    );

    prevBtn.addEventListener(

        "click",

        previousQuestion

    );

    restartBtn.addEventListener(

        "click",

        restartQuiz

    );

    shareBtn.addEventListener(

        "click",

        shareResult

    );

}
/*
==================================================
画面管理
==================================================
*/

function hideAllScreens(){

    Object.values(screens).forEach(screen=>{

        if(screen){

            screen.classList.remove("active");

        }

    });

}

function showScreen(name){

    hideAllScreens();

    if(screens[name]){

        screens[name].classList.add("active");

    }

}

/*
==================================================
診断開始
==================================================
*/

function startQuiz(){

    currentQuestion=0;

    answers=[];

    showScreen("quiz");

    renderQuestion();

}

/*
==================================================
ローディング
==================================================
*/

function showLoading(){

    showScreen("loading");

}

/*
==================================================
結果画面
==================================================
*/

function showResultScreen(){

    showScreen("result");

}

/*
==================================================
ホームへ戻る
==================================================
*/

function showHome(){

    showScreen("home");

}
/*
==================================================
質問表示
==================================================
*/

function renderQuestion(){

    const question = questions[currentQuestion];

    if(!question){

        finishQuiz();

        return;

    }

    /*
    ----------------------
    進捗
    ----------------------
    */

    updateProgress();

    /*
    ----------------------
    タイトル
    ----------------------
    */

    document.getElementById(

        "questionTitle"

    ).textContent = question.title;

    /*
    ----------------------
    回答生成
    ----------------------
    */

    renderAnswers(question);

}

/*
==================================================
回答生成
==================================================
*/

function renderAnswers(question){

    const area = document.getElementById(

        "answers"

    );

    area.innerHTML = "";

    question.answers.forEach(

        (answer,index)=>{

            const button =

                document.createElement(

                    "button"

                );

            button.className="answer-button";

            button.innerHTML=`

<div class="answer-text">

${answer.text}

</div>

`;

            button.onclick=()=>{

                selectAnswer(

                    index

                );

            };

            area.appendChild(

                button

            );

        }

    );

}
/*
==================================================
進捗バー
==================================================
*/

function updateProgress(){

    const total = questions.length;

    const current = currentQuestion + 1;

    const percent = Math.round(

        current / total * 100

    );

    /*
    ----------------------
    問題番号
    ----------------------
    */

    document.getElementById(

        "questionCount"

    ).textContent =

        `Question ${current} / ${total}`;

    /*
    ----------------------
    パーセント
    ----------------------
    */

    document.getElementById(

        "progressPercent"

    ).textContent =

        `${percent}%`;

    /*
    ----------------------
    バー
    ----------------------
    */

    document.getElementById(

        "progressFill"

    ).style.width =

        `${percent}%`;

}

/*
==================================================
回答集計
==================================================
*/

function analyzeAnswers(){

    const score={

        moisture:0,

        sebum:0,

        sensitive:0,

        pore:0,

        acne:0,

        aging:0

    };

    answers.forEach(answer=>{

        if(!answer)return;

        const data=answer.answer.score;

        if(!data)return;

        Object.keys(data).forEach(key=>{

            score[key]+=data[key];

        });

    });

    return score;

}

/*
==================================================
商品採点
==================================================
*/

function calculateProductScore(product, score){

    let total = 0;

    total += product.score.moisture * score.moisture;
    total += product.score.sebum * score.sebum;
    total += product.score.sensitive * score.sensitive;
    total += product.score.pore * score.pore;
    total += product.score.acne * score.acne;
    total += product.score.aging * score.aging;

    return total;

}
/*
==================================================
結果表示
==================================================
*/

function renderResult(){

    renderSkinType();

    renderCare();

    renderIngredients();

    renderProducts();

}
/*
==================================================
結果表示
==================================================
*/

function renderResult(){

    renderSkinType();

    renderCare();

    renderIngredients();

    renderProducts();

}
/*
==================================================
診断レポート
==================================================
*/

function renderReport(){

    renderSkinType();

    renderRanking();

    renderScoreTable();

    renderIngredients();

    renderAvoidIngredients();

    renderCare();

    renderAIComment();

    renderProducts();

}
/*
==================================================
診断結果保存
==================================================
*/

function saveDiagnosis(result){

    localStorage.setItem(

        "skinDiagnosis",

        JSON.stringify(result)

    );

}
/*
==================================================
前回結果取得
==================================================
*/

function loadDiagnosisResult(){

    const data=

        localStorage.getItem(

            "skinDiagnosis"

        );

    if(!data)return;

    diagnosisResult=

        JSON.parse(data);

}
loadDiagnosisResult();
/*
==================================================
再診断
==================================================
*/

function restartQuiz(){

    answers=[];

    currentQuestion=0;

    diagnosisResult=null;

    showHome();

}

/*
==================================================
お気に入り
==================================================
*/

function addFavorite(id){

    let list=

        JSON.parse(

            localStorage.getItem(

                "favorite"

            )||"[]"

        );

    if(

        !list.includes(id)

    ){

        list.push(id);

    }

    localStorage.setItem(

        "favorite",

        JSON.stringify(list)

    );

}
function getFavorite(){

    return JSON.parse(

        localStorage.getItem(

            "favorite"

        )||"[]"

    );

}
async function loadProducts(){

    try{

        const res=

            await fetch(

                "data/products.json"

            );

        products=

            await res.json();

    }

    catch(error){

        alert(

            "商品データの読み込みに失敗しました"

        );

    }

}
window.addEventListener(

    "beforeunload",

    ()=>{

        saveDiagnosis(

            diagnosisResult

        );

    }

);