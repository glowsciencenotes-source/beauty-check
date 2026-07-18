/*
==================================================

30秒肌診断 Ver2.0
Diagnosis Engine

==================================================
*/

/*
----------------------------------
スコア管理
----------------------------------
*/

const skinScore={

    moisture:0,
    sebum:0,
    sensitive:0,
    pore:0,
    acne:0,
    aging:0

};

/*
----------------------------------
おすすめ成分
----------------------------------
*/

const recommendIngredients=new Set();

/*
----------------------------------
避けたい成分
----------------------------------
*/

const avoidIngredients=new Set();

/*
----------------------------------
回答履歴
----------------------------------
*/

let answerHistory=[];

/*
----------------------------------
初期化
----------------------------------
*/

function resetDiagnosis(){

    skinScore.moisture=0;
    skinScore.sebum=0;
    skinScore.sensitive=0;
    skinScore.pore=0;
    skinScore.acne=0;
    skinScore.aging=0;

    recommendIngredients.clear();

    avoidIngredients.clear();

    answerHistory=[];

}

/*
----------------------------------
回答登録
----------------------------------
*/

function addAnswer(answer){

    answerHistory.push(answer);

    /*
    点数加算
    */

    Object.keys(answer.score).forEach(key=>{

        skinScore[key]+=answer.score[key];

    });

    /*
    おすすめ成分
    */

    if(answer.ingredients){

        answer.ingredients.forEach(i=>{

            recommendIngredients.add(i);

        });

    }

    /*
    避けたい成分
    */

    if(answer.avoid){

        answer.avoid.forEach(i=>{

            avoidIngredients.add(i);

        });

    }

}

/*
----------------------------------
100点換算
----------------------------------
*/

function normalizeScore(){

    const maxScore={

        moisture:60,
        sebum:60,
        sensitive:60,
        pore:60,
        acne:60,
        aging:60

    };

    let result={};

    Object.keys(skinScore).forEach(key=>{

        result[key]=Math.min(

            100,

            Math.round(

                skinScore[key]/maxScore[key]*100

            )

        );

    });

    return result;

}
/*
==================================================
肌タイプ判定エンジン
==================================================
*/

function analyzeSkin(){

    const score = normalizeScore();

    let result={

        type:"",

        description:"",

        ingredients:[],

        avoid:[],

        tags:[]

    };

    /*
    ==========================
    インナードライ
    ==========================
    */

    if(

        score.moisture>=70 &&
        score.sebum>=60

    ){

        result.type="インナードライ肌";

        result.tags.push("乾燥");
        result.tags.push("皮脂");

        result.ingredients.push(

            "セラミド",
            "ヒアルロン酸",
            "ナイアシンアミド"

        );

        result.avoid.push(

            "アルコール",
            "高洗浄力"

        );

    }

    /*
    ==========================
    乾燥肌
    ==========================
    */

    else if(

        score.moisture>=70 &&
        score.sebum<40

    ){

        result.type="乾燥肌";

        result.tags.push("乾燥");

        result.ingredients.push(

            "セラミド",
            "スクワラン",
            "ヒアルロン酸"

        );

        result.avoid.push(

            "エタノール"

        );

    }

    /*
    ==========================
    脂性肌
    ==========================
    */

    else if(

        score.sebum>=70 &&
        score.moisture<60

    ){

        result.type="脂性肌";

        result.tags.push("皮脂");

        result.ingredients.push(

            "ナイアシンアミド",
            "ビタミンC",
            "サリチル酸"

        );

    }

    /*
    ==========================
    混合肌
    ==========================
    */

    else if(

        score.sebum>=50 &&
        score.moisture>=50

    ){

        result.type="混合肌";

        result.tags.push("Tゾーン");

        result.ingredients.push(

            "セラミド",
            "ナイアシンアミド"

        );

    }

    /*
    ==========================
    普通肌
    ==========================
    */

    else{

        result.type="普通肌";

        result.ingredients.push(

            "セラミド"

        );

    }

    /*
    ==========================
    敏感肌判定
    ==========================
    */

    if(score.sensitive>=70){

        result.tags.push("敏感");

        result.ingredients.push(

            "グリチルリチン酸",

            "パンテノール",

            "アラントイン"

        );

        result.avoid.push(

            "香料",

            "メントール",

            "スクラブ"

        );

    }

    /*
    ==========================
    ニキビ判定
    ==========================
    */

    if(score.acne>=70){

        result.tags.push("ニキビ");

        result.ingredients.push(

            "アゼライン酸",

            "サリチル酸",

            "IPMP"

        );

    }

    /*
    ==========================
    毛穴判定
    ==========================
    */

    if(score.pore>=70){

        result.tags.push("毛穴");

        result.ingredients.push(

            "ビタミンC",

            "レチノール"

        );

    }

    /*
    ==========================
    エイジング
    ==========================
    */

    if(score.aging>=70){

        result.tags.push("エイジング");

        result.ingredients.push(

            "レチノール",

            "ナイアシンアミド",

            "ペプチド"

        );

    }

    /*
    重複除去
    */

    result.ingredients=[

        ...new Set(result.ingredients)

    ];

    result.avoid=[

        ...new Set(result.avoid)

    ];

    return{

        score,

        result

    };

}
/*
==================================================
商品スコアリングエンジン
Ver2.0
==================================================
*/

/*
products.jsから読み込まれた

const products=[]

を利用する
*/

function calculateProductScore(product, diagnosis){

    let score=0;

    /*
    ----------------------
    必要成分
    ----------------------
    */

    diagnosis.result.ingredients.forEach(ingredient=>{

        if(product.ingredients.includes(ingredient)){

            score+=20;

        }

    });

    /*
    ----------------------
    避けたい成分
    ----------------------
    */

    diagnosis.result.avoid.forEach(ingredient=>{

        if(product.ingredients.includes(ingredient)){

            score-=30;

        }

    });

    /*
    ----------------------
    肌タイプ一致
    ----------------------
    */

    if(product.skinTypes){

        if(

            product.skinTypes.includes(

                diagnosis.result.type

            )

        ){

            score+=40;

        }

    }

    /*
    ----------------------
    保湿
    ----------------------
    */

    if(

        diagnosis.score.moisture>=70 &&
        product.effects.includes("保湿")

    ){

        score+=15;

    }

    /*
    ----------------------
    敏感
    ----------------------
    */

    if(

        diagnosis.score.sensitive>=70 &&
        product.effects.includes("敏感")

    ){

        score+=15;

    }

    /*
    ----------------------
    毛穴
    ----------------------
    */

    if(

        diagnosis.score.pore>=70 &&
        product.effects.includes("毛穴")

    ){

        score+=15;

    }

    /*
    ----------------------
    ニキビ
    ----------------------
    */

    if(

        diagnosis.score.acne>=70 &&
        product.effects.includes("ニキビ")

    ){

        score+=15;

    }

    /*
    ----------------------
    エイジング
    ----------------------
    */

    if(

        diagnosis.score.aging>=70 &&
        product.effects.includes("エイジング")

    ){

        score+=15;

    }

    /*
    ----------------------
    医薬部外品
    ----------------------
    */

    if(product.quasiDrug){

        score+=5;

    }

    /*
    ----------------------
    成分数
    ----------------------
    */

    score+=Math.min(

        product.ingredients.length,

        15

    );

    return score;

}

/*
==================================================
ランキング作成
==================================================
*/

function recommendProducts(products){

    const diagnosis=analyzeSkin();

    const ranking=products.map(product=>{

        return{

            ...product,

            matchScore:

            calculateProductScore(

                product,

                diagnosis

            )

        };

    });

    ranking.sort(

        (a,b)=>

        b.matchScore-a.matchScore

    );

    return ranking.slice(0,10);

}
/*
==================================================
診断結果生成
==================================================
*/

function createDiagnosisResult(products){

    /*
    肌診断
    */

    const diagnosis=analyzeSkin();

    /*
    商品ランキング
    */

    const ranking=recommendProducts(products);

    /*
    結果
    */

    return{

        skinType:diagnosis.result.type,

        description:diagnosis.result.description,

        score:diagnosis.score,

        tags:diagnosis.result.tags,

        ingredients:diagnosis.result.ingredients,

        avoid:diagnosis.result.avoid,

        products:ranking

    };

}

/*
==================================================
ローカル保存
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
読込
==================================================
*/

function loadDiagnosis(){

    const data=localStorage.getItem(

        "skinDiagnosis"

    );

    if(!data) return null;

    return JSON.parse(data);

}

/*
==================================================
スコア表示用
==================================================
*/

function getScoreItems(result){

    return[

        {

            label:"水分量",

            value:result.score.moisture

        },

        {

            label:"皮脂量",

            value:result.score.sebum

        },

        {

            label:"敏感度",

            value:result.score.sensitive

        },

        {

            label:"毛穴",

            value:result.score.pore

        },

        {

            label:"ニキビ",

            value:result.score.acne

        },

        {

            label:"エイジング",

            value:result.score.aging

        }

    ];

}

/*
==================================================
タグ表示
==================================================
*/

function getTags(result){

    return result.tags.map(tag=>{

        return{

            text:tag

        };

    });

}

/*
==================================================
おすすめ成分表示
==================================================
*/

function getIngredientList(result){

    return result.ingredients.map(item=>{

        return{

            name:item

        };

    });

}

/*
==================================================
おすすめ商品
==================================================
*/

function getTopProducts(result){

    return result.products.slice(0,3);

}