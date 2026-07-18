/*
====================================================

Utility Functions

====================================================
*/

"use strict";

/*====================================================
Escape HTML
====================================================*/

function escapeHTML(text){

    const div=document.createElement("div");

    div.textContent=text;

    return div.innerHTML;

}

/*====================================================
Format Price
====================================================*/

function formatPrice(price){

    return "¥"+Number(price).toLocaleString("ja-JP");

}

/*====================================================
Date
====================================================*/

function formatDate(date=new Date()){

    return date.toLocaleDateString(

        "ja-JP"

    );

}
/*====================================================
UUID
====================================================*/

function uuid(){

    return crypto.randomUUID();

}

/*====================================================
Random
====================================================*/

function random(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}


/*====================================================
Shuffle
====================================================*/

function shuffle(array){

    const copy=[...array];

    for(

        let i=copy.length-1;

        i>0;

        i--

    ){

        const j=Math.floor(

            Math.random()*(i+1)

        );

        [copy[i],copy[j]]

        =[copy[j],copy[i]];

    }

    return copy;

}

/*====================================================
Sleep
====================================================*/

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/*====================================================
Debounce
====================================================*/

function debounce(fn,delay=300){

    let timer;

    return(...args)=>{

        clearTimeout(timer);

        timer=setTimeout(()=>{

            fn(...args);

        },delay);

    };

}

/*====================================================
Throttle
====================================================*/

function throttle(fn,wait=300){

    let waiting=false;

    return(...args)=>{

        if(waiting)return;

        fn(...args);

        waiting=true;

        setTimeout(()=>{

            waiting=false;

        },wait);

    };

}

/*====================================================
Query
====================================================*/

function getQuery(name){

    const params=

        new URLSearchParams(

            window.location.search

        );

    return params.get(name);

}

/*====================================================
Null
====================================================*/

function isEmpty(value){

    return(

        value===null||

        value===undefined||

        value===""

    );

}

/*====================================================
Clone
====================================================*/

function clone(data){

    return structuredClone(data);

}

/*====================================================
Fetch JSON
====================================================*/

async function fetchJSON(url){

    const response=

        await fetch(url);

    if(!response.ok){

        throw new Error(url);

    }

    return await response.json();

}

/*====================================================
Log
====================================================*/

function log(...args){

    console.log(

        "[SkinCheck]",

        ...args

    );

}

