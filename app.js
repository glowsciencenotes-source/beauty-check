/*
====================================================

30秒肌診断
App Controller

====================================================
*/

"use strict";

/*====================================================
Global State
====================================================*/

const App={

    questions:[],

    products:[],

    diagnosis:{},

    ingredients:{},

    answers:[],

    currentQuestion:0,

    result:null

};

/*====================================================
DOM
====================================================*/

const UI={

    screens:document.querySelectorAll(".screen"),

    home:document.getElementById("home"),

    quiz:document.getElementById("quiz"),

    loading:document.getElementById("loading"),

    result:document.getElementById("result"),

    startBtn:document.getElementById("startBtn"),

    prevBtn:document.getElementById("prevBtn"),

    restartBtn:document.getElementById("restartBtn"),

    shareBtn:document.getElementById("shareBtn")

};

/*====================================================
Initialize
====================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeApp

);

async function initializeApp(){

    try{

        showLoading();

        await loadAllData();

        hideLoading();

        bindEvents();

        showScreen("home");

    }
    catch(error){

        showLoadError(error);

    }

} 
/*====================================================
Load
====================================================*/

async function loadAllData(){

    await Promise.all([

        loadQuestions(),

        loadProducts(),

        loadDiagnosis(),

        loadIngredients()

    ]);

}

/*====================================================
Events
====================================================*/

function bindEvents(){

    UI.startBtn.addEventListener(

        "click",

        startQuiz

    );

    UI.prevBtn.addEventListener(

        "click",

        previousQuestion

    );

    UI.restartBtn.addEventListener(

        "click",

        restartQuiz

    );

    UI.shareBtn.addEventListener(

        "click",

        shareResult

    );

}

/*====================================================
Screen
====================================================*/

function showScreen(name){

    UI.screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    document

    .getElementById(name)

    .classList.add("active");

}

/*====================================================
Reset
====================================================*/

function resetDiagnosis(){

    App.answers=[];

    App.currentQuestion=0;

    App.result=null;

}

/*====================================================
Restart
====================================================*/

function restartQuiz(){

    resetDiagnosis();

    showScreen("home");

}

/*====================================================
Debug
====================================================*/

window.App=App;

