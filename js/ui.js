/*
====================================================

UI Controller

====================================================
*/

"use strict";

/*====================================================
Render Result
====================================================*/

function renderResult(){

    renderSkinType();

    renderCarePoints();

    renderIngredients();

    renderProducts();

}

/*====================================================
Skin Type
====================================================*/

function renderSkinType(){

    document.getElementById(

        "skinType"

    ).textContent=

        App.result.skin.name;

    document.getElementById(

        "skinDescription"

    ).textContent=

        App.result.skin.description;

}

/*====================================================
Care Point
====================================================*/

function renderCarePoints(){

    const list=

        document.getElementById(

            "carePoint"

        );

    list.innerHTML="";

    App.result.skin.care.forEach(item=>{

        const li=

            document.createElement("li");

        li.textContent=item;

        list.appendChild(li);

    });

}

/*====================================================
Ingredients
====================================================*/

function renderIngredients(){

    const area=

        document.getElementById(

            "ingredientList"

        );

    area.innerHTML="";

    App.result.ingredients.forEach(item=>{

        const span=

            document.createElement("span");

        span.className="ingredient";

        span.textContent=item.name;

        area.appendChild(span);

    });

}

/*====================================================
Products
====================================================*/

function renderProducts(){

    const area=

        document.getElementById(

            "productList"

        );

    area.innerHTML="";

    App.result.products.forEach(product=>{

        area.appendChild(

            createProductCard(product)

        );

    });

}

/*====================================================
Card
====================================================*/

function createProductCard(product){

    const card=

        document.createElement("div");

    card.className="product-card";

    card.innerHTML=`

<div class="product-image">

<img src="${product.image}"

alt="${product.name}">

</div>

<div class="product-info">

<div class="product-brand">

${product.brand}

</div>

<div class="product-name">

${product.name}

</div>

<div class="product-description">

${product.description}

</div>

<div class="product-tags">

${createTagHTML(product)}

</div>

<div class="product-price">

¥${product.price.toLocaleString()}

</div>

<button
class="product-button">

詳しく見る

</button>

</div>

`;

    return card;

}

/*====================================================
Tag
====================================================*/

function createTagHTML(product){

    return product.ingredients

    .map(id=>{

        const ingredient=

        App.ingredients.find(

            item=>item.id===id

        );

        if(!ingredient)return "";

        return`

<span class="product-tag">

${ingredient.name}

</span>

`;

    }).join("");

}

/*====================================================
Loading
====================================================*/

function showLoading(){

    showScreen("loading");

}

function hideLoading(){

    showScreen("quiz");

}

/*====================================================
Error
====================================================*/

function showError(message){

    alert(message);

}