const questions = [
  ['洗顔後、何もつけない状態の肌は？',[['全体的につっぱりやすい','dry'],['Tゾーンだけベタつきやすい','combination'],['全体的にベタつきやすい','oily'],['季節で変わる・気にならない','normal']]],
  ['日中の乾燥・カサつきは気になりますか？',[['かなり気になる','dryness'],['頬や口元だけ気になる','dryness'],['あまり気にならない','normal'],['ベタつきの方が気になる','oiliness']]],
  ['今いちばん気になることは？',[['毛穴の目立ち','pores'],['くすんで見えること','dullness'],['日焼けによるシミ・そばかす','spots'],['肌荒れ・ゆらぎ','sensitivity']]],
  ['生理前や季節の変わり目に肌はゆらぎますか？',[['よくゆらぐ','sensitivity'],['ときどきゆらぐ','sensitivity'],['あまりゆらがない','normal'],['皮脂が増えやすい','oiliness']]],
  ['日焼け止めを使う頻度は？',[['ほぼ毎日','uv'],['外出する日だけ','uv'],['レジャーのときだけ','uv'],['あまり使わない','uv']]],
  ['洗顔後の肌感は？',[['つっぱりを感じる','dryness'],['さっぱりして心地よい','normal'],['すぐにテカる','oiliness'],['赤みやヒリつきが出ることがある','sensitivity']]],
  ['睡眠不足の翌日、肌はどうなりやすいですか？',[['カサついて元気がない','dryness'],['くすんで見える','dullness'],['吹き出物が気になる','oiliness'],['特に変わらない','normal']]],
  ['使いたいアイテムの使用感は？',[['しっとり濃密','dryness'],['みずみずしく軽い','normal'],['さらっとベタつかない','oiliness'],['やさしい使い心地を重視','sensitivity']]],
  ['鏡を見て気になるポイントは？',[['頬・小鼻の毛穴','pores'],['透明感のなさ','dullness'],['紫外線ダメージ','spots'],['乾燥によるキメの乱れ','dryness']]],
  ['これから特に意識したいケアは？',[['保湿を丁寧にしたい','dryness'],['皮脂・毛穴を整えたい','pores'],['紫外線対策を続けたい','uv'],['刺激を抑えたケアをしたい','sensitivity']]]
];

const $ = selector => document.querySelector(selector);
let products = [], current = 0, answers = [], result;
const ingredientRoleMap = [
  ['酸化亜鉛', '紫外線から肌を守る'], ['メギゾリル', '紫外線から肌を守る'],
  ['ヒアルロン酸', 'うるおいを保つ'], ['グリセリン', 'うるおいを保つ'], ['スクワラン', 'うるおいを保つ'],
  ['ナイアシンアミド', '肌をすこやかに整える'], ['ビタミンC', '肌をすこやかに整える'], ['アスコルビン酸', '肌をすこやかに整える'],
  ['アラントイン', '肌をすこやかに保つ'], ['グリチルリチン酸', '肌をすこやかに保つ'], ['パンテノール', '保湿・整肌'],
  ['ツボクサ', '肌をすこやかに整える'], ['セラミド', 'うるおいを保つ'], ['マンデル酸', 'なめらかな肌印象を目指すケア']
];
fetch('data/products.json?v=20260718-6').then(r => r.json()).then(data => products = data).catch(() => { $('#startButton').textContent = 'データを読み込めません'; $('#startButton').disabled = true; });
$('#startButton').onclick = () => { $('#startScreen').classList.add('hidden'); $('#quizScreen').classList.remove('hidden'); renderQuestion(); };
$('#backButton').onclick = () => { if (current) { current--; answers.pop(); renderQuestion(); } };
$('#restartButton').onclick = () => location.reload();

function renderQuestion() {
  const [text, choices] = questions[current], percent = (current + 1) * 10;
  $('#progressLabel').textContent = `QUESTION ${current + 1} / 10`;
  $('#progressNumber').textContent = `${percent}%`;
  $('#progressBar').style.width = `${percent}%`;
  $('#questionCategory').textContent = '肌の状態について';
  $('#questionText').textContent = text;
  $('#answers').innerHTML = choices.map(([label, value], i) => `<button class="answer" data-value="${value}"><b>${'ABCD'[i]}</b>${label}</button>`).join('');
  document.querySelectorAll('.answer').forEach(button => button.onclick = () => { answers.push(button.dataset.value); current++; current === questions.length ? showResult() : renderQuestion(); });
  $('#backButton').hidden = current === 0;
}

function showResult() {
  const scores = answers.reduce((sum, key) => (sum[key] = (sum[key] || 0) + 1, sum), {});
  const type = ['dry', 'combination', 'oily', 'normal'].sort((a, b) => (scores[b] || 0) - (scores[a] || 0))[0];
  const labels = { dry: '乾燥が気になりやすい肌', combination: '混合肌傾向の肌', oily: '皮脂が出やすい肌', normal: 'バランスがとれた肌' };
  const descriptions = { dry: 'うるおいを抱え込む保湿ケアを軸に。洗いすぎを避け、肌をやわらげるアイテムを重ねてみましょう。', combination: 'ベタつきやすい部分と乾きやすい部分が混在しやすい傾向です。軽い保湿をベースに、部分ごとに量を調整するのがコツ。', oily: '皮脂が出やすく、毛穴も気になりやすい傾向です。落としすぎず、みずみずしい保湿と紫外線対策を続けましょう。', normal: '比較的バランスのとれた状態です。季節や生活リズムによる変化を見ながら、保湿とUVケアを基本にしましょう。' };
  result = { type, scores, labels };
  $('#quizScreen').classList.add('hidden'); $('#resultScreen').classList.remove('hidden');
  $('#resultTitle').innerHTML = `あなたは<span class="result-type">「${labels[type]}」</span>`;
  $('#resultDescription').textContent = descriptions[type];
  const tips = { dryness: '化粧水の後は、乳液やクリームでうるおいを閉じ込める', pores: '角質ケアは頻度を守り、保湿もセットで行う', oiliness: '皮脂を取りすぎず、軽い保湿を続ける', dullness: '紫外線対策と保湿を毎日の基本にする', spots: '日焼け止めは十分な量をこまめに塗り直す', sensitivity: '新しい製品は少量から。異常を感じたら使用を中止する', uv: '室内でも紫外線が気になる日はUVケアを取り入れる' };
  const concerns = Object.entries(scores).filter(([key]) => !['dry', 'combination', 'oily', 'normal'].includes(key)).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([key]) => key);
  $('#tips').innerHTML = [...new Set([...concerns, 'uv'])].slice(0, 3).map(key => `<span>✓ ${tips[key]}</span>`).join('');
  const recommended = uniqueCategoryRecommendations();
  $('#recommendationList').innerHTML = recommended.map(product => productCard(product, true)).join('');
  renderProducts(); window.scrollTo({ top: 0, behavior: 'smooth' });
}

function rankProducts(list) { return list.map(product => ({ product, score: (product.types.includes(result.type) ? 5 : 0) + product.concerns.reduce((n, concern) => n + (result.scores[concern] || 0), 0) })).sort((a, b) => b.score - a.score).map(item => item.product); }
function uniqueCategoryRecommendations() {
  const bestByCategory = [...new Set(products.map(product => product.category))].map(category => rankProducts(products.filter(product => product.category === category))[0]);
  return rankProducts(bestByCategory).slice(0, 3);
}
function productCard(product, recommended = false) {
  const purchaseLink = product.roomUrl ? `<div class="card-links"><a class="affiliate" href="${product.roomUrl}" target="_blank" rel="noopener sponsored">楽天ROOMで見る →</a></div>` : '';
  const roles = getIngredientRoles(product.ingredients);
  return `<article class="product-card ${recommended ? 'recommended' : ''}"><p class="category card-category">${product.category}</p><p class="brand-name">${product.brand}</p><h4>${product.name}</h4><p class="ingredient-label">主な配合成分</p><p class="ingredients">${product.ingredients}</p><p class="ingredient-label benefit-label">期待される働き</p><p class="ingredient-benefits">${roles}</p>${purchaseLink}</article>`;
}
function getIngredientRoles(ingredients) {
  const roles = ingredientRoleMap.filter(([name]) => ingredients.includes(name)).map(([, role]) => role);
  return [...new Set(roles)].slice(0, 2).join('・') || '保湿や肌をすこやかに整えるためのケア';
}
function renderProducts() { $('#allProductList').innerHTML = rankProducts(products).slice(0, 5).map(product => productCard(product)).join(''); }
$('#shareButton').onclick = async () => { if (!result) return; const message = `30秒 肌チェックの結果は「${result.labels[result.type]}」でした。\n自分に合うスキンケアをチェック`; const copyText = `${message}\n${location.href}`; try { if (navigator.share) await navigator.share({ title: '30秒 肌チェック', text: message, url: location.href }); else { await navigator.clipboard.writeText(copyText); $('#shareButton').textContent = '結果をコピーしました ✓'; setTimeout(() => $('#shareButton').textContent = '結果をシェアする ↗', 2200); } } catch (error) { if (error.name !== 'AbortError') window.prompt('この内容をコピーしてシェアできます', copyText); } };
