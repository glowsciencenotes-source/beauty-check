/*
==================================================
Products Engine Ver3.0
==================================================
*/

/*
商品一覧
products.jsonから読み込まれる
*/

let products=[];

/*
==================================================
JSON読込
==================================================
*/

async function loadProducts(){

    try{

        const response=await fetch("data/products.json");

        products=await response.json();

        return products;

    }

    catch(error){

        console.error("商品読込失敗",error);

        return [];

    }

}

/*
==================================================
ID検索
==================================================
*/

function getProductById(id){

    return products.find(

        product=>product.id===id

    );

}

/*
==================================================
ブランド検索
==================================================
*/

function getProductsByBrand(brand){

    return products.filter(

        product=>

            product.brand===brand

    );

}

/*
==================================================
カテゴリ検索
==================================================
*/

function getProductsByCategory(category){

    return products.filter(

        product=>

            product.category===category

    );

}

/*
==================================================
肌タイプ検索
==================================================
*/

function getProductsBySkinType(type){

    return products.filter(

        product=>

            product.skinTypes.includes(type)

    );

}
/*
==================================================
商品カード生成
==================================================
*/

function createProductCard(product){

    return `

<div class="product-card">

    <div class="product-image">

        <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy">

    </div>

    <div class="product-body">

        <div class="product-brand">

            ${product.brand}

        </div>

        <h3 class="product-name">

            ${product.name}

        </h3>

        <div class="product-category">

            ${product.category}

        </div>

        <div class="product-price">

            ¥${Number(product.price).toLocaleString()}

        </div>

        <p class="product-description">

            ${product.description}

        </p>

        <div class="product-tags">

            ${product.effects.map(effect=>`

                <span class="product-tag">

                    ${effect}

                </span>

            `).join("")}

        </div>

        <div class="product-buttons">

            ${
                product.amazon ?

                `<a href="${product.amazon}"
                    target="_blank"
                    class="shop-button amazon">

                    Amazon

                </a>`

                :

                ""

            }

            ${
                product.rakuten ?

                `<a href="${product.rakuten}"
                    target="_blank"
                    class="shop-button rakuten">

                    楽天

                </a>`

                :

                ""

            }

            ${
                product.yahoo ?

                `<a href="${product.yahoo}"
                    target="_blank"
                    class="shop-button yahoo">

                    Yahoo!

                </a>`

                :

                ""

            }

        </div>

    </div>

</div>

`;

}

/*
==================================================
商品一覧表示
==================================================
*/

function renderProducts(list){

    const area=document.getElementById("productList");

    if(!area) return;

    area.innerHTML=list

        .map(createProductCard)

        .join("");

}
/*
==================================================
おすすめ理由生成
==================================================
*/

function createRecommendReason(product, diagnosis){

    const reasons=[];

    // 必要成分一致
    diagnosis.result.ingredients.forEach(ingredient=>{

        if(product.ingredients.includes(ingredient)){

            reasons.push(`${ingredient}配合`);

        }

    });

    // 肌タイプ一致
    if(product.skinTypes.includes(diagnosis.result.type)){

        reasons.push(`${diagnosis.result.type}向け`);

    }

    // 効果一致
    diagnosis.result.tags.forEach(tag=>{

        if(product.effects.includes(tag)){

            reasons.push(`${tag}ケア`);

        }

    });

    return [...new Set(reasons)];

}

/*
==================================================
マッチ率
==================================================
*/

function calculateMatchPercent(score){

    return Math.max(

        50,

        Math.min(

            99,

            Math.round(score)

        )

    );

}

/*
==================================================
ランキング生成
==================================================
*/

function buildRanking(products){

    const diagnosis=analyzeSkin();

    return products

        .map(product=>{

            const score=

                calculateProductScore(

                    product,

                    diagnosis

                );

            return{

                ...product,

                match:

                    calculateMatchPercent(score),

                reasons:

                    createRecommendReason(

                        product,

                        diagnosis

                    ),

                score

            };

        })

        .sort(

            (a,b)=>

            b.score-a.score

        );

}

/*
==================================================
TOP表示
==================================================
*/

function renderTopProducts(limit=10){

    const ranking=

        buildRanking(products);

    renderProducts(

        ranking.slice(0,limit)

    );

}
/*
==================================================
検索エンジン
==================================================
*/

function searchProducts(options={}){

    return products.filter(product=>{

        // ブランド

        if(

            options.brand &&
            product.brand!==options.brand

        ){

            return false;

        }

        // カテゴリ

        if(

            options.category &&
            product.category!==options.category

        ){

            return false;

        }

        // 肌タイプ

        if(

            options.skinType &&
            !product.skinTypes.includes(options.skinType)

        ){

            return false;

        }

        // 医薬部外品

        if(

            options.quasiDrug===true &&
            !product.quasiDrug

        ){

            return false;

        }

        // 最大価格

        if(

            options.maxPrice &&
            product.price>options.maxPrice

        ){

            return false;

        }

        // 最低価格

        if(

            options.minPrice &&
            product.price<options.minPrice

        ){

            return false;

        }

        return true;

    });

}

/*
==================================================
並び替え
==================================================
*/

function sortProducts(list,sortType="score"){

    const data=[...list];

    switch(sortType){

        case "priceAsc":

            data.sort((a,b)=>a.price-b.price);

            break;

        case "priceDesc":

            data.sort((a,b)=>b.price-a.price);

            break;

        case "brand":

            data.sort((a,b)=>

                a.brand.localeCompare(b.brand)

            );

            break;

        case "name":

            data.sort((a,b)=>

                a.name.localeCompare(b.name)

            );

            break;

        case "match":

            data.sort((a,b)=>

                b.match-a.match

            );

            break;

        default:

            data.sort((a,b)=>

                b.score-a.score

            );

    }

    return data;

}

/*
==================================================
TOP3取得
==================================================
*/

function getBestProducts(){

    return buildRanking(products)

        .slice(0,3);

}

/*
==================================================
TOP10取得
==================================================
*/

function getTopProducts(limit=10){

    return buildRanking(products)

        .slice(0,limit);

}

/*
==================================================
ブランド一覧
==================================================
*/

function getBrands(){

    return [

        ...new Set(

            products.map(p=>p.brand)

        )

    ].sort();

}

/*
==================================================
カテゴリ一覧
==================================================
*/

function getCategories(){

    return [

        ...new Set(

            products.map(p=>p.category)

        )

    ].sort();

}

/*
==================================================
商品数
==================================================
*/

function getProductCount(){

    return products.length;

}

/*
==================================================
初期化
==================================================
*/

async function initializeProducts(){

    await loadProducts();

    console.log(

        `${products.length}件の商品を読み込みました`

    );

}