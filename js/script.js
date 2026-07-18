const questions=[
{q:'あなたの肌質は？',a:['乾燥','脂性','混合','普通']},
{q:'洗顔後は？',a:['つっぱる','普通','ベタつく','部分的につっぱる']},
{q:'化粧崩れは？',a:['しない','少ない','多い','Tゾーンのみ']},
{q:'毛穴は？',a:['目立たない','少し','目立つ','Tゾーンのみ']},
{q:'刺激に弱い？',a:['はい','少し','いいえ','季節だけ']},
{q:'乾燥する季節',a:['冬','春','夏','秋']},
{q:'テカる場所',a:['なし','Tゾーン','全体','頬']},
{q:'保湿頻度',a:['毎日','時々','少ない','ほぼなし']},
{q:'ニキビ',a:['ない','少し','多い','時々']},
{q:'悩み',a:['乾燥','皮脂','毛穴','赤み']}
];
let current=0;
const title=document.getElementById('questionTitle');
const answers=document.getElementById('answers');
const progress=document.getElementById('progress');
const num=document.getElementById('questionNumber');
document.getElementById('startBtn').onclick=()=>{
document.getElementById('home').classList.remove('active');
document.getElementById('quiz').classList.add('active');
render();
};
function render(){
const q=questions[current];
title.textContent=q.q;
num.textContent=`${current+1} / ${questions.length}`;
progress.style.width=((current+1)/questions.length*100)+'%';
answers.innerHTML='';
q.a.forEach(t=>{
const d=document.createElement('div');
d.className='answer';
d.textContent=t;
d.onclick=()=>d.classList.toggle('selected');
answers.appendChild(d);
});
}
document.getElementById('nextBtn').onclick=()=>{if(current<questions.length-1){current++;render();}};
document.getElementById('prevBtn').onclick=()=>{if(current>0){current--;render();}};



// ===== 第4回追加 =====
const skinTypes=["dry","oily","combination","sensitive","normal"];

function showLoading(){
 document.getElementById("quiz").classList.remove("active");
 document.getElementById("loading").classList.add("active");
 setTimeout(showResult,1500);
}

function showResult(){
 document.getElementById("loading").classList.remove("active");
 document.getElementById("result").classList.add("active");

 document.getElementById("skinType").textContent="乾燥肌タイプ";
 document.getElementById("skinDescription").textContent=
 "水分が不足しやすい肌です。セラミドやヒアルロン酸配合の保湿ケアがおすすめです。";

 document.getElementById("carePoint").innerHTML=`
 <ul>
 <li>セラミド配合化粧水</li>
 <li>ヒアルロン酸美容液</li>
 <li>摩擦を避ける</li>
 </ul>`;

 const list=document.getElementById("productList");
 list.innerHTML=`
 <div class="product-card">
 <h3>キュレル 潤浸保湿化粧水</h3>
 <p>★★★★★</p>
 <a href="#" target="_blank">Amazonで見る</a>
 </div>`;
}

document.getElementById("nextBtn").addEventListener("click",()=>{
 if(current===questions.length-1){
   showLoading();
 }
});

document.getElementById("restartBtn").onclick=()=>{
 location.reload();
};


// ===== 第6回 products.json連携 =====
async function loadProducts(skinType="dry"){
  const res = await fetch("data/products.json");
  const products = await res.json();
  const list = document.getElementById("productList");
  list.innerHTML="";

  products
    .filter(p => p.skin === skinType)
    .forEach(p=>{
      const card=document.createElement("div");
      card.className="product-card";
      card.innerHTML=`
        <h3>${p.brand}</h3>
        <strong>${p.name}</strong>
        <p>¥${p.price}</p>
        <div class="links">
          <a href="${p.amazon}" target="_blank">Amazon</a>
          <a href="${p.rakuten}" target="_blank">楽天</a>
          <a href="${p.yahoo}" target="_blank">Yahoo!</a>
        </div>
      `;
      list.appendChild(card);
    });
}

// showResult() 内のサンプル商品表示を削除し、最後に追加してください。
// loadProducts("dry");
// ※後で診断結果に応じて "dry" を "oily" 等へ変更します。


// ===== 第7回 肌タイプ自動判定 =====

// 回答を保存
let userAnswers = [];

// 第3回の render() 内の回答クリック処理を下記に置き換えてください
// d.onclick = () => {
//   userAnswers[current] = t;
//   document.querySelectorAll('.answer').forEach(el => el.classList.remove('selected'));
//   d.classList.add('selected');
// };

// 第4回の nextBtn イベントを下記に置き換えてください
// document.getElementById("nextBtn").onclick = () => {
//   if(current === questions.length - 1){
//     showLoading();
//   } else {
//     current++;
//     render();
//   }
// };

function analyzeSkinType() {
  let dry = 0;
  let oily = 0;
  let sensitive = 0;
  let combination = 0;

  userAnswers.forEach(a => {
    if (["乾燥", "つっぱる", "冬"].includes(a)) dry++;
    if (["脂性", "ベタつく", "全体", "皮脂"].includes(a)) oily++;
    if (["はい", "赤み"].includes(a)) sensitive++;
    if (["混合", "Tゾーン", "部分的につっぱる"].includes(a)) combination++;
  });

  const scores = {
    dry,
    oily,
    sensitive,
    combination,
    normal: 1
  };

  return Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
}

function getSkinInfo(type) {
  const info = {
    dry: {
      title: "🌿 乾燥肌タイプ",
      description: "水分不足しやすいため、セラミド・ヒアルロン酸で保湿を重視しましょう。",
      care: ["セラミド配合", "ヒアルロン酸", "低刺激ケア"]
    },
    oily: {
      title: "💧 脂性肌タイプ",
      description: "皮脂量が多めです。さっぱり保湿と毛穴ケアがおすすめです。",
      care: ["ビタミンC", "ナイアシンアミド", "皮脂コントロール"]
    },
    sensitive: {
      title: "🍃 敏感肌タイプ",
      description: "刺激を受けやすいため、シンプルな成分構成を選びましょう。",
      care: ["低刺激処方", "セラミド", "アルコールフリー"]
    },
    combination: {
      title: "✨ 混合肌タイプ",
      description: "部位によって状態が異なるため、バランスケアが重要です。",
      care: ["水分補給", "部分ケア", "バランス保湿"]
    },
    normal: {
      title: "🌸 普通肌タイプ",
      description: "バランスの良い状態です。現状維持のケアを続けましょう。",
      care: ["保湿維持", "紫外線対策", "生活習慣ケア"]
    }
  };

  return info[type];
}

// 第4回の showResult() を下記内容に変更してください
// function showResult() {
//   document.getElementById("loading").classList.remove("active");
//   document.getElementById("result").classList.add("active");
//
//   const skinType = analyzeSkinType();
//   const info = getSkinInfo(skinType);
//
//   document.getElementById("skinType").textContent = info.title;
//   document.getElementById("skinDescription").textContent = info.description;
//   document.getElementById("carePoint").innerHTML =
//     "<ul>" + info.care.map(i => `<li>${i}</li>`).join("") + "</ul>";
//
//   loadProducts(skinType);
// }

