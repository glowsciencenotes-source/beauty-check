/*
==========================================
30秒肌診断 Ver2.0
Question Data
==========================================
*/

const questions = [

{

id:1,

question:"洗顔後の肌状態は？",

description:"洗顔後5〜10分くらいで感じる状態を選んでください",

answers:[

{
text:"つっぱる・乾燥する",
score:{
moisture:10,
sensitive:5,
aging:3
}
},

{
text:"少し乾燥する",
score:{
moisture:6,
aging:2
}
},

{
text:"特に変わらない",
score:{
moisture:3
}
},

{
text:"少しベタつく",
score:{
sebum:5,
pore:2
}
},

{
text:"かなりベタつく",
score:{
sebum:10,
pore:5,
acne:4
}
}

]

},

{

id:2,

question:"午後になると肌は？",

description:"日中の状態を選んでください",

answers:[

{
text:"乾燥する",
score:{
moisture:8,
aging:3
}
},

{
text:"普通",

score:{
}
},

{
text:"Tゾーンだけテカる",

score:{
sebum:5,
pore:4
}

},

{

text:"顔全体がテカる",

score:{
sebum:10,
pore:6,
acne:5
}

},

{

text:"赤みが出る",

score:{
sensitive:10
}

}

]

},

{

id:3,

question:"毛穴について",

description:"一番近いものを選んでください",

answers:[

{

text:"気にならない",

score:{}

},

{

text:"鼻だけ",

score:{
pore:5
}

},

{

text:"頬も気になる",

score:{
pore:8
}

},

{

text:"黒ずみが多い",

score:{
pore:10,
acne:3
}

},

{

text:"開きが気になる",

score:{
pore:9,
sebum:4
}

}

]

},

{

id:4,

question:"肌荒れしやすい？",

description:"普段の状態",

answers:[

{

text:"ほとんどしない",

score:{}

},

{

text:"乾燥すると荒れる",

score:{
moisture:8,
sensitive:5
}

},

{

text:"季節で荒れる",

score:{
sensitive:6
}

},

{

text:"刺激で赤くなる",

score:{
sensitive:10
}

},

{

text:"ニキビができる",

score:{
acne:10,
sebum:4
}

}

]

},

{

id:5,

question:"一番気になる悩みは？",

description:""

,

answers:[

{

text:"乾燥",

score:{
moisture:10,
aging:4
}

},

{

text:"毛穴",

score:{
pore:10
}

},

{

text:"ニキビ",

score:{
acne:10
}

},

{

text:"敏感",

score:{
sensitive:10
}

},

{

text:"シワ・ハリ",

score:{
aging:10
}

}

]

}

/*
Q6〜Q10はPart2で追加
*/

];
,

{
id:6,

question:"普段の肌質に一番近いのは？",

description:"全体的な印象で選んでください",

answers:[

{
text:"乾燥しやすい",

score:{
moisture:10,
aging:4
}
},

{
text:"普通",

score:{
}
},

{
text:"Tゾーンだけ脂っぽい",

score:{
sebum:5,
pore:4
}
},

{
text:"全体的に脂っぽい",

score:{
sebum:10,
pore:5,
acne:4
}
},

{
text:"刺激を受けやすい",

score:{
sensitive:10
}
}

]

},

{

id:7,

question:"季節による肌変化は？",

description:"もっとも近いものを選択してください",

answers:[

{
text:"冬だけ乾燥する",

score:{
moisture:8,
aging:3
}
},

{
text:"一年中乾燥する",

score:{
moisture:10,
aging:5
}
},

{
text:"夏だけベタつく",

score:{
sebum:6,
pore:3
}
},

{
text:"一年中ベタつく",

score:{
sebum:10,
pore:5,
acne:3
}
},

{
text:"季節で肌荒れする",

score:{
sensitive:8
}
}

]

},

{

id:8,

question:"普段使う化粧品は？",

description:"使用感で選んでください",

answers:[

{
text:"高保湿タイプ",

score:{
moisture:8
}
},

{
text:"さっぱりタイプ",

score:{
sebum:4
}
},

{
text:"敏感肌用",

score:{
sensitive:8
}
},

{
text:"ニキビケア",

score:{
acne:8
}
},

{
text:"エイジングケア",

score:{
aging:8
}
}

]

},

{

id:9,

question:"現在もっとも改善したいことは？",

description:"優先順位が高いもの",

answers:[

{
text:"乾燥改善",

score:{
moisture:10
}
},

{
text:"毛穴改善",

score:{
pore:10
}
},

{
text:"ニキビ改善",

score:{
acne:10
}
},

{
text:"敏感肌改善",

score:{
sensitive:10
}
},

{
text:"ハリ・シワ改善",

score:{
aging:10
}
}

]

},

{

id:10,

question:"理想の肌は？",

description:"あなたが目指したい肌を選んでください",

answers:[

{
text:"しっとり潤う肌",

score:{
moisture:6,
aging:3
}
},

{
text:"テカらない肌",

score:{
sebum:6,
pore:3
}
},

{
text:"毛穴レスな肌",

score:{
pore:8
}
},

{
text:"肌荒れしない肌",

score:{
sensitive:8,
acne:4
}
},

{
text:"ハリ・ツヤのある肌",

score:{
aging:8,
moisture:3
}
}

]

}

];