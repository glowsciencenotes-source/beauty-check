/*
====================================================

Diagnosis Engine

Version 5

====================================================
*/

"use strict";

/*====================================================
Create Diagnosis
====================================================*/

function createDiagnosis(){

    const score=createScore();

    const skin=findSkinType(score);

    const ingredients=findIngredients(score);

const result={

    score,

    skin,

    ingredients

};

result.products=

    buildRecommendation(result);

    return{

        score,

        skin,

        ingredients,

        products

    };

}

/*====================================================
Score
====================================================*/

function createScore(){

    const score={

        moisture:50,

        sebum:50,

        sensitive:50,

        pore:50,

        acne:50,

        aging:50

    };

    calculateScores(score);

    normalizeScore(score);

    return score;

}

/*====================================================
Calculate
====================================================*/

function calculateScores(score){

    App.answers.forEach(answerId=>{

        const rule=

            App.diagnosis.answers[answerId];

        if(!rule)return;

        Object.keys(rule).forEach(key=>{

            score[key]+=rule[key];

        });

    });

}

/*====================================================
Normalize
====================================================*/

function normalizeScore(score){

    Object.keys(score).forEach(key=>{

        score[key]=Math.max(

            0,

            Math.min(

                100,

                score[key]

            )

        );

    });

}

/*====================================================
Skin Type
====================================================*/

function findSkinType(score){

    const list=

        App.diagnosis.skinTypes;

    for(const skin of list){

        if(matchCondition(

            skin.condition,

            score

        )){

            return skin;

        }

    }

    return list[0];

}

/*====================================================
Condition
====================================================*/

function matchCondition(condition,score){

    return Object.keys(condition)

    .every(key=>{

        return score[key]>=condition[key];

    });

}

/*====================================================
Ingredients
====================================================*/

function findIngredients(score){

    return App.ingredients.filter(item=>{

        return item.condition.every(key=>{

            return score[key]>=60;

        });

    });

}





/*====================================================
Comment
====================================================*/

function createComment(result){

    let text="";

    if(result.score.moisture<40){

        text+="保湿ケアを強化しましょう。";

    }

    if(result.score.sebum>70){

        text+="皮脂コントロールが重要です。";

    }

    if(result.score.sensitive>70){

        text+="低刺激処方をおすすめします。";

    }

    return text;

}

function createDiagnosis(){

    const score = createScore();

    const skin = findSkinType(score);

    const ingredients = findIngredients(score);

    const result = {

        score,

        skin,

        ingredients

    };

    result.products = buildRecommendation(result);

    result.comment = createComment(result);

    return result;

}