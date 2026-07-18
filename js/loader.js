/*
====================================================

Data Loader

====================================================
*/

"use strict";

/*====================================================
Fetch Helper
====================================================*/

async function fetchJson(url){

    const response = await fetch(url);

    if(!response.ok){

        throw new Error(

            `読み込み失敗：${url}`

        );

    }

    return await response.json();

}

/*====================================================
Questions
====================================================*/

async function loadQuestions(){

    App.questions =

        await fetchJson(

            "data/questions.json"

        );

}

/*====================================================
Products
====================================================*/

async function loadProducts(){

    App.products =

        await fetchJson(

            "data/products.json"

        );

}

/*====================================================
Diagnosis
====================================================*/

async function loadDiagnosis(){

    App.diagnosis =

        await fetchJson(

            "data/diagnosis.json"

        );

}
/*====================================================
Ingredients
====================================================*/

async function loadIngredients(){

    App.ingredients =

        await fetchJson(

            "data/ingredients.json"

        );

}

/*====================================================
Reload
====================================================*/

async function reloadData(){

    await Promise.all([

        loadQuestions(),

        loadProducts(),

        loadDiagnosis(),

        loadIngredients()

    ]);

}

/*====================================================
Loading
====================================================*/

function showLoading(){

    showScreen("loading");

}

/*====================================================
Hide Loading
====================================================*/

function hideLoading(){

    showScreen("home");

}
/*====================================================
Error
====================================================*/

function showLoadError(error){

    console.error(error);

    document.body.innerHTML=`

<div style="

padding:80px;

text-align:center;

font-family:sans-serif;

">

<h2>

データの読み込みに失敗しました

</h2>

<p>

ページを再読み込みしてください。

</p>

</div>

`;

}



