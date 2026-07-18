/* ==========================================
   30秒肌診断
   script.js Part1
========================================== */

const questions = [

{
title:"洗顔後の肌は？",
answers:[
{text:"つっぱる",type:"dry"},
{text:"ベタつく",type:"oily"},
{text:"部分的につっぱる",type:"combination"},
{text:"刺激を感じる",type:"sensitive"},
{text:"特に変化なし",type:"normal"}
]
},

{
title:"日中のテカリは？",
answers:[
{text:"ほぼない",type:"dry"},
{text:"かなりある",type:"oily"},
{text:"Tゾーンだけ",type:"combination"},
{text:"肌荒れしやすい",type:"sensitive"},
{text:"普通",type:"normal"}
]
},

{
title:"毛穴の状態は？",
answers:[
{text:"目立たない",type:"dry"},
{text:"かなり目立つ",type:"oily"},
{text:"鼻だけ目立つ",type:"combination"},
{text:"赤くなりやすい",type:"sensitive"},
{text:"普通",type:"normal"}
]
},

{
title:"化粧崩れは？",
answers:[
{text:"粉っぽくなる",type:"dry"},
{text:"すぐ崩れる",type:"oily"},
{text:"Tゾーンだけ",type:"combination"},
{text:"刺激で崩れる",type:"sensitive"},
{text:"普通",type:"normal"}
]
},

{
title:"肌荒れしやすい？",
answers:[
{text:"乾燥で荒れる",type:"dry"},
{text:"ニキビができる",type:"oily"},
{text:"場所による",type:"combination"},
{text:"かなり敏感",type:"sensitive"},
{text:"ほとんどない",type:"normal"}
]
},

{
title:"普段の肌状態は？",
answers:[
{text:"乾燥",type:"dry"},
{text:"脂っぽい",type:"oily"},
{text:"混在",type:"combination"},
{text:"刺激に弱い",type:"sensitive"},
{text:"安定",type:"normal"}
]
},

{
title:"季節の変わり目は？",
answers:[
{text:"乾燥する",type:"dry"},
{text:"皮脂が増える",type:"oily"},
{text:"部分的に変化",type:"combination"},
{text:"肌荒れする",type:"sensitive"},
{text:"変わらない",type:"normal"}
]
},

{
title:"保湿後は？",
answers:[
{text:"すぐ乾く",type:"dry"},
{text:"ベタつく",type:"oily"},
{text:"場所による",type:"combination"},
{text:"刺激を感じる",type:"sensitive"},
{text:"ちょうどいい",type:"normal"}
]
},

{
title:"メイク後は？",
answers:[
{text:"粉吹きする",type:"dry"},
{text:"テカる",type:"oily"},
{text:"部分的",type:"combination"},
{text:"赤くなる",type:"sensitive"},
{text:"普通",type:"normal"}
]
},

{
title:"今の肌悩みは？",
answers:[
{text:"乾燥",type:"dry"},
{text:"皮脂",type:"oily"},
{text:"両方",type:"combination"},
{text:"刺激",type:"sensitive"},
{text:"特にない",type:"normal"}
]
}

];


/* ==========================================
   State
========================================== */

let currentQuestion = 0;

let answers = [];

let scores = {

dry:0,

oily:0,

combination:0,

sensitive:0,

normal:0

};


/* ==========================================
   DOM
========================================== */

const home=document.getElementById("home");
const quiz=document.getElementById("quiz");
const loading=document.getElementById("loading");
const result=document.getElementById("result");

const startBtn=document.getElementById("startBtn");

const questionTitle=document.getElementById("questionTitle");
const answersDiv=document.getElementById("answers");

const questionCount=document.getElementById("questionCount");
const progressFill=document.getElementById("progressFill");
const progressPercent=document.getElementById("progressPercent");

const nextBtn=document.getElementById("nextBtn");
const prevBtn=document.getElementById("prevBtn");


/* ==========================================
   Start
========================================== */

startBtn.addEventListener("click",()=>{

home.classList.remove("active");

quiz.classList.add("active");

renderQuestion();

});


/* ==========================================
   Render Question
========================================== */

function renderQuestion(){

const q=questions[currentQuestion];

questionTitle.textContent=q.title;

questionCount.textContent=
`Question ${currentQuestion+1} / ${questions.length}`;

const percent=
((currentQuestion+1)/questions.length)*100;

progressPercent.textContent=
Math.round(percent)+"%";

progressFill.style.width=
percent+"%";

answersDiv.innerHTML="";

q.answers.forEach((item,index)=>{

const btn=document.createElement("button");

btn.className="answer";

btn.textContent=item.text;

btn.onclick=()=>selectAnswer(index);

answersDiv.appendChild(btn);

});

}
/* ==========================================
   Answer Select
========================================== */

function selectAnswer(index){

    // 選択状態を解除
    document.querySelectorAll(".answer").forEach(btn=>{
        btn.classList.remove("selected");
    });

    // 選択状態にする
    document
        .querySelectorAll(".answer")[index]
        .classList.add("selected");

    // 回答を保存
    answers[currentQuestion]=index;

    // 0.3秒後に自動で次へ
    setTimeout(() => {

        if(currentQuestion < questions.length - 1){

            currentQuestion++;
            renderQuestion();
            restoreAnswer();

        }else{

            calculateScore();

        }

    },300);

}

/* ==========================================
   Next
========================================== */

nextBtn.addEventListener("click",()=>{

    if(answers[currentQuestion]===undefined){

        alert("回答を選択してください。");

        return;

    }

    currentQuestion++;

    if(currentQuestion>=questions.length){

        calculateScore();

        return;

    }

    renderQuestion();

    restoreAnswer();

});

/* ==========================================
   Previous
========================================== */

prevBtn.addEventListener("click",()=>{

    if(currentQuestion===0){

        return;

    }

    currentQuestion--;

    renderQuestion();

    restoreAnswer();

});

/* ==========================================
   Restore
========================================== */

function restoreAnswer(){

    if(answers[currentQuestion]===undefined){

        return;

    }

    document
        .querySelectorAll(".answer")
        [answers[currentQuestion]]
        .classList.add("selected");

}

/* ==========================================
   Calculate Score
========================================== */

function calculateScore(){

    scores={

        dry:0,
        oily:0,
        combination:0,
        sensitive:0,
        normal:0

    };

    questions.forEach((question,i)=>{

        const answerIndex=answers[i];

        const type=
            question.answers[answerIndex].type;

        scores[type]++;

    });

    home.classList.remove("active");
    quiz.classList.remove("active");

    loading.classList.add("active");

    setTimeout(()=>{

        loading.classList.remove("active");

        result.classList.add("active");

        showResult();

    },2500);

}
/* ==========================================
   Result Data
========================================== */

const skinTypes = {

    dry:{
        title:"乾燥肌",
        description:"水分が不足しやすく、保湿を重視したケアがおすすめです。",
        care:[
            "朝晩しっかり保湿する",
            "セラミド配合化粧品を選ぶ",
            "熱いお湯で洗顔しない"
        ],
        ingredients:[
            "セラミド",
            "ヒアルロン酸",
            "スクワラン",
            "アミノ酸"
        ]
    },

    oily:{
        title:"脂性肌",
        description:"皮脂量が多く、毛穴やテカリ対策が重要です。",
        care:[
            "皮脂を落としすぎない",
            "ビタミンC配合を使う",
            "ノンコメド処方を選ぶ"
        ],
        ingredients:[
            "ビタミンC",
            "ナイアシンアミド",
            "アゼライン酸"
        ]
    },

    combination:{
        title:"混合肌",
        description:"部位ごとに状態が異なるためバランスケアがおすすめです。",
        care:[
            "部分ごとに保湿量を調整",
            "Tゾーンだけ皮脂対策",
            "刺激の少ない化粧品を選ぶ"
        ],
        ingredients:[
            "セラミド",
            "ナイアシンアミド",
            "グリセリン"
        ]
    },

    sensitive:{
        title:"敏感肌",
        description:"刺激を避け、低刺激の保湿ケアがおすすめです。",
        care:[
            "アルコールを避ける",
            "摩擦を減らす",
            "低刺激処方を選ぶ"
        ],
        ingredients:[
            "パンテノール",
            "アラントイン",
            "セラミド"
        ]
    },

    normal:{
        title:"普通肌",
        description:"水分と皮脂のバランスが良い状態です。",
        care:[
            "今のケアを継続",
            "紫外線対策を続ける",
            "十分な保湿"
        ],
        ingredients:[
            "ビタミンC",
            "セラミド",
            "ヒアルロン酸"
        ]
    }

};


/* ==========================================
   Show Result
========================================== */

async function showResult(){

    let resultType="normal";
    let max=0;

    Object.keys(scores).forEach(type=>{

        if(scores[type]>max){

            max=scores[type];
            resultType=type;

        }

    });

    const skin=skinTypes[resultType];
    saveResult(resultType);
    document.getElementById("skinType").textContent=
        "あなたは「"+skin.title+"」です";

    document.getElementById("skinDescription").textContent=
        skin.description;

    const care=document.getElementById("carePoint");

    care.innerHTML="";

    skin.care.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        care.appendChild(li);

    });

    const ingredients=document.getElementById("ingredientList");

    ingredients.innerHTML="";

    skin.ingredients.forEach(item=>{

        const span=document.createElement("span");

        span.textContent=item;

        ingredients.appendChild(span);

    });

    loadProducts(resultType);

}


/* ==========================================
   Load Products
========================================== */

async function loadProducts(type){

    try{

        const response=
            await fetch("data/products.json");

        const products=
            await response.json();

        const list=
            document.getElementById("productList");

        list.innerHTML="";

        products
        .filter(p=>p.skin.includes(type))
        .slice(0,3)
        .forEach(product=>{

            list.innerHTML+=`

            <div class="product-card">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}">

                <div class="product-body">

                    <div class="product-brand">
                        ${product.brand}
                    </div>

                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div class="product-price">
                        ¥${product.price}
                    </div>

                    <div class="product-links">

                        <a
                        class="amazon"
                        href="${product.amazon}"
                        target="_blank">

                        Amazonで見る

                        </a>

                        <a
                        class="rakuten"
                        href="${product.rakuten}"
                        target="_blank">

                        楽天市場で見る

                        </a>

                        <a
                        class="yahoo"
                        href="${product.yahoo}"
                        target="_blank">

                        Yahoo!ショッピング

                        </a>

                    </div>

                </div>

            </div>

            `;

        });

    }

    catch(e){

        console.error(e);

    }

}


/* ==========================================
   Restart
========================================== */

document
.getElementById("restartBtn")
.addEventListener("click",()=>{

    currentQuestion=0;

    answers=[];

    result.classList.remove("active");

    home.classList.add("active");

});


/* ==========================================
   Share
========================================== */

document
.getElementById("shareBtn")
.addEventListener("click",async()=>{

    if(navigator.share){

        await navigator.share({

            title:"30秒肌診断",

            text:"私の肌タイプを診断しました！",

            url:location.href

        });

    }else{

        navigator.clipboard.writeText(location.href);

        alert("URLをコピーしました。");

    }

});
/* ==========================================
   Save Result
========================================== */

function saveResult(type){

    const data = {
        skinType: type,
        date: new Date().toISOString()
    };

    localStorage.setItem(
        "skinCheckResult",
        JSON.stringify(data)
    );

}

/* ==========================================
   Load Result
========================================== */

function loadSavedResult(){

    const data = localStorage.getItem("skinCheckResult");

    if(!data) return null;

    return JSON.parse(data);

}
/* ==========================================
   Save / Load Result
========================================== */

window.addEventListener("load", () => {

    const saved = loadSavedResult();

    if (saved) {
        console.log("前回の診断結果:", saved.skinType);
    }

});