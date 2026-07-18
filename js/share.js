/*
====================================================

Share Controller

====================================================
*/

"use strict";

/*====================================================
Share
====================================================*/

async function shareResult(){

    const text=createShareText();

    const url=window.location.href;

    if(

        navigator.share

    ){

        try{

            await navigator.share({

                title:"30秒肌診断",

                text,

                url

            });

            return;

        }

        catch(error){

            console.log(error);

        }

    }

    openTwitter(text,url);

}

/*====================================================
Share Text
====================================================*/

function createShareText(){

    return `

30秒肌診断

診断結果：

${App.result.skin.name}

おすすめ成分

${App.result.ingredients

.slice(0,3)

.map(item=>item.name)

.join("・")}

#肌診断

`;

}
/*====================================================
Twitter
====================================================*/

function openTwitter(

    text,

    url

){

    const share=

`https://twitter.com/intent/tweet?text=${

encodeURIComponent(text)

}&url=${

encodeURIComponent(url)

}`;

    window.open(

        share,

        "_blank"

    );

}

/*====================================================
LINE
====================================================*/

function shareLINE(){

    const url=

encodeURIComponent(

window.location.href

);

    window.open(

`https://social-plugins.line.me/lineit/share?url=${url}`,

"_blank"

);

}

/*====================================================
Copy
====================================================*/

async function copyURL(){

    try{

        await navigator.clipboard.writeText(

            window.location.href

        );

        alert("URLをコピーしました。");

    }

    catch(error){

        alert("コピーできませんでした。");

    }

}

/*====================================================
Copy Result
====================================================*/

async function copyResult(){

    try{

        await navigator.clipboard.writeText(

            createShareText()

        );

        alert("診断結果をコピーしました。");

    }

    catch(error){

        alert("コピーできませんでした。");

    }

}

<div class="share-buttons">

<button id="shareBtn">

共有

</button>

<button id="copyBtn">

URLコピー

</button>

<button id="lineBtn">

LINE

</button>

</div>


document

.getElementById("copyBtn")

.addEventListener(

"click",

copyURL

);

document

.getElementById("lineBtn")

.addEventListener(

"click",

shareLINE

);

