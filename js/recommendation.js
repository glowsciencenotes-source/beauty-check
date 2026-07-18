/*
====================================================

Recommendation Engine

====================================================
*/

"use strict";

/*====================================================
Recommend
====================================================*/

function recommendProducts(result){

    return App.products

        .map(product=>{

            return{

                ...product,

                score:calculateRecommendationScore(

                    product,

                    result

                )

            };

        })

        .sort((a,b)=>b.score-a.score)

        .slice(0,3);

}

/*====================================================
Score
====================================================
*/

function calculateRecommendationScore(

    product,

    result

){

    let score=0;

    score+=ingredientScore(

        product,

        result

    );

    score+=skinTypeScore(

        product,

        result

    );

    score+=concernScore(

        product,

        result

    );

    score+=priceScore(product);

    score+=reviewScore(product);

    return score;

}

/*====================================================
Ingredient
====================================================
*/

function ingredientScore(

    product,

    result

){

    let point=0;

    result.ingredients.forEach(

        ingredient=>{

            if(

                product.ingredients.includes(

                    ingredient.id

                )

            ){

                point+=30;

            }

        }

    );

    return point;

}

/*====================================================
Skin Type
====================================================
*/

function skinTypeScore(

    product,

    result

){

    if(

        product.skinTypes.includes(

            result.skin.id

        )

    ){

        return 40;

    }

    return 0;

}

/*====================================================
Concern
====================================================
*/

function concernScore(

    product,

    result

){

    let point=0;

    product.target.forEach(target=>{

        point+=

            result.score[target]||0;

    });

    return point/5;

}

/*====================================================
Price
====================================================
*/

function priceScore(product){

    if(product.price<1500){

        return 20;

    }

    if(product.price<3000){

        return 15;

    }

    if(product.price<5000){

        return 10;

    }

    return 5;

}

/*====================================================
Review
====================================================
*/

function reviewScore(product){

    return product.rating*4;

}

/*====================================================
Reason
====================================================
*/

function createReason(

    product,

    result

){

    const reasons=[];

    if(

        product.skinTypes.includes(

            result.skin.id

        )

    ){

        reasons.push(

            "肌タイプに適しています"

        );

    }

    product.ingredients.forEach(id=>{

        const ingredient=

        App.ingredients.find(

            item=>item.id===id

        );

        if(ingredient){

            reasons.push(

                ingredient.name+

                "配合"

            );

        }

    });

    return reasons.slice(0,3);

}

/*====================================================
Final
====================================================
*/

function buildRecommendation(result){

    return recommendProducts(result)

    .map(product=>{

        return{

            ...product,

            reason:createReason(

                product,

                result

            )

        };

    });

}

