/* 反应链 v2 · 2D 桌面版引擎 */
const MATERIALS = [
  ["HCl",3],["NaOH",2],["MnO2",2],["Fe",1],["浓硫酸",2],["水",3],
  ["Br2",1],["浓硝酸",1],["H2",2],["O2",3],["N2",1],["S",1],
  ["Na",1],["CaCO3",1],["Ca(OH)2",1],["H2O2",2],["FeS",1],["Na2CO3",1],["NaHCO3",1],
  ["乙烯",2],["苯",1],["乙醇",2],["乙酸",2],["水杨酸",1],["己二酸",1],
  ["己二胺",1],["硝基苯",1],["油脂",1],["淀粉",1],["对苯二甲酸",1],["乙二醇",1]
];
const OPS = [
  ["加热",3],["催化剂",3],["引发剂",2],["光照",1],["通电",1],["点燃",2],
  ["暴沸",1],["通风橱",1],["论文发表",1],["同行评审",1]
];
const BENCH_CARDS = ["HCl","NaOH","MnO2","Fe","浓硫酸","水"];
const OBJECTIVES = ["乙酸乙酯","阿司匹林","尼龙66","聚乙烯","苯胺","PET","肥皂","葡萄糖","漂白粉","苯磺酸","硝酸铵"];

const ATTACKS = {
  "氯气":  {dmg:4, status:"poison",  text:"剧毒"},
  "SO2":  {dmg:3, status:"choke",   text:"窒息"},
  "NO2":  {dmg:4, status:"poison",  text:"毒雾"},
  "H2S":  {dmg:3, status:"poison",  text:"恶臭"},
  "HCl气体":{dmg:3, status:"corrode", text:"酸雾"},
  "NH3":  {dmg:2, status:"choke",   text:"刺激"},
  "H2SO4":{dmg:4, status:"corrode", text:"强腐蚀"},
  "Br2":  {dmg:3, status:"corrode", text:"腐蚀"},
  "硝化甘油":{dmg:6, status:"", text:"爆炸 · 不可吸收", noDefense:true},
  "TNT":    {dmg:7, status:"", text:"爆炸 · 不可吸收", noDefense:true},
  "苦味酸": {dmg:6, status:"", text:"爆炸 · 不可吸收", noDefense:true},
  "硝化纤维":{dmg:6, status:"", text:"爆炸 · 不可吸收", noDefense:true},
  "溴甲烷": {dmg:3, status:"poison", text:"剧毒"},
  "甲醛":   {dmg:2, status:"poison", text:"刺激"},
  "丙烯腈": {dmg:3, status:"poison", text:"剧毒"},
  "四氯化碳":{dmg:2, status:"poison", text:"麻醉"},
  "氯仿":   {dmg:2, status:"poison", text:"麻醉"},
  "乙醚":   {dmg:2, status:"choke", text:"麻醉"}
};

const RECIPES = [
  {id:"cl2",   name:"制氯气",     mat:{MnO2:1,HCl:1},              cond:{加热:1},            out:"氯气",      tags:["chlorination"]},
  {id:"h2o2",  name:"过氧化氢分解",mat:{H2O2:1},                   cond:{催化剂:1},           out:"O2",       tags:["oxidation"]},
  {id:"elec",  name:"电解水",     mat:{水:1},                      cond:{通电:1},             out:"H2",       tags:["electrolysis"]},
  {id:"hcl",   name:"氢气燃烧",   mat:{H2:1,Cl2:1},                cond:{光照:1},             out:"HCl气体"},
  {id:"nacl",  name:"钠与氯气",   mat:{Na:1,Cl2:1},                cond:{},                  out:"NaCl",     tags:["metal"]},
  {id:"naoh",  name:"钠与水",     mat:{Na:1,水:1},                 cond:{},                  out:"NaOH",     tags:["metal"]},
  {id:"cao",   name:"煅烧石灰石", mat:{CaCO3:1},                   cond:{加热:1},             out:"CaO"},
  {id:"caoh",  name:"生石灰消化", mat:{CaO:1,水:1},                cond:{},                  out:"Ca(OH)2"},
  {id:"bleach",name:"制漂白粉",   mat:{"Ca(OH)2":1,Cl2:1},         cond:{},                  out:"漂白粉",   obj:true, tags:["chlorination"]},
  {id:"hno3dec",name:"浓硝酸分解",mat:{浓硝酸:1},                  cond:{加热:1},             out:"NO2",      tags:["oxidation"]},
  {id:"so2",   name:"硫燃烧",     mat:{S:1,O2:1},                  cond:{点燃:1},             out:"SO2",      tags:["oxidation"]},
  {id:"so3",   name:"二氧化硫氧化",mat:{SO2:1,O2:1},               cond:{催化剂:1,加热:1},     out:"SO3",      tags:["oxidation"]},
  {id:"h2so4", name:"三氧化硫水化",mat:{SO3:1,水:1},               cond:{},                  out:"H2SO4"},
  {id:"nh3",   name:"合成氨",     mat:{N2:1,H2:1},                 cond:{催化剂:1,加热:1},     out:"NH3"},
  {id:"no",    name:"氨的催化氧化",mat:{NH3:1,O2:1},               cond:{催化剂:1,加热:1},     out:"NO",       tags:["oxidation"]},
  {id:"no2",   name:"一氧化氮氧化",mat:{NO:1,O2:1},                cond:{},                  out:"NO2",      tags:["oxidation"]},
  {id:"hno3",  name:"二氧化氮水化",mat:{NO2:1,水:1},               cond:{},                  out:"HNO3"},
  {id:"h2s",   name:"硫化亚铁制硫化氢",mat:{FeS:1,HCl:1},          cond:{},                  out:"H2S"},
  {id:"hclo",  name:"氯气水解",   mat:{Cl2:1,水:1},                cond:{},                  out:"HClO"},
  {id:"hclo2", name:"次氯酸分解", mat:{HClO:1},                    cond:{光照:1},             out:"HCl气体", tags:["oxidation"]},
  {id:"na2co3",name:"碳酸钠酸化", mat:{Na2CO3:1,HCl:1},            cond:{},                  out:"CO2"},
  {id:"nahco3",name:"碳酸氢钠酸化",mat:{NaHCO3:1,HCl:1},           cond:{},                  out:"CO2"},
  {id:"hyd",   name:"乙烯水化",   mat:{乙烯:1,水:1,浓硫酸:1},      cond:{},                  out:"乙醇"},
  {id:"dehy",  name:"乙醇脱水",   mat:{乙醇:1,浓硫酸:1},           cond:{加热:1},             out:"乙烯"},
  {id:"ox1",   name:"乙醇氧化",   mat:{乙醇:1},                    cond:{催化剂:1,加热:1},     out:"乙醛",     tags:["oxidation"]},
  {id:"ox2",   name:"乙醛氧化",   mat:{乙醛:1},                    cond:{催化剂:1},           out:"乙酸",     tags:["oxidation"]},
  {id:"ester", name:"酯化",       mat:{乙酸:1,乙醇:1,浓硫酸:1},    cond:{},                  out:"乙酸乙酯", obj:true, tags:["ester"]},
  {id:"asp",   name:"阿司匹林",   mat:{水杨酸:1,乙酸:1,浓硫酸:1},  cond:{},                  out:"阿司匹林", obj:true, tags:["ester","aromatic"]},
  {id:"nylon", name:"尼龙 66",    mat:{己二酸:1,己二胺:1},         cond:{加热:1},             out:"尼龙66",   obj:true, tags:["polymer","nitrogen"]},
  {id:"pe",    name:"聚乙烯",     mat:{乙烯:1},                    cond:{引发剂:1},           out:"聚乙烯",   obj:true, tags:["polymer"]},
  {id:"anil",  name:"苯胺",       mat:{硝基苯:1,Fe:1,HCl:1},       cond:{},                  out:"苯胺",     obj:true, tags:["nitrogen","metal"]},
  {id:"nitro", name:"硝基苯",     mat:{苯:1,HNO3:1,浓硫酸:1},       cond:{加热:1},             out:"硝基苯",   tags:["aromatic","nitrogen"]},
  {id:"brph",  name:"溴苯",       mat:{苯:1,Br2:1,Fe:1},           cond:{},                  out:"溴苯",     tags:["aromatic","metal"]},
  {id:"phenol",name:"苯酚",       mat:{溴苯:1,NaOH:1},             cond:{加热:1},             out:"苯酚",     obj:true, tags:["aromatic"]},
  {id:"cleth", name:"氯乙烷",     mat:{乙烯:1,HCl:1},              cond:{},                  out:"氯乙烷"},
  {id:"pet",   name:"PET",        mat:{对苯二甲酸:1,乙二醇:1},     cond:{加热:1},             out:"PET",      obj:true, tags:["polymer","ester"]},
  {id:"soap",  name:"皂化",       mat:{油脂:1,NaOH:1},             cond:{加热:1},             out:"肥皂",     obj:true, tags:["ester"]},
  {id:"glu",   name:"淀粉水解",   mat:{淀粉:1,水:1},               cond:{催化剂:1,加热:1},     out:"葡萄糖",   obj:true},
  {id:"phbr",  name:"苯酚溴代",   mat:{苯酚:1,Br2:1},              cond:{},                  out:"三溴苯酚", obj:true, tags:["aromatic"]},
  {id:"bsa",   name:"苯磺化",     mat:{苯:1,H2SO4:1},              cond:{加热:1},             out:"苯磺酸",   obj:true, tags:["aromatic"]},
  {id:"nh4no3",name:"硝酸铵",     mat:{NH3:1,HNO3:1},              cond:{},                  out:"硝酸铵",   obj:true, tags:["nitrogen"]}
];

const CHEMISTS = {
  "舍勒":     {desc:"氯气伤害 +1（每局 1 次）", key:"scheele",   sprite:"scheele"},
  "拉瓦锡":   {desc:"氧化反应免费并抽 1",        key:"lavoisier", sprite:"lavoisier"},
  "戴维":     {desc:"首次电解/金属免费并抽 1",   key:"davy",      sprite:"davy"},
  "凯库勒":   {desc:"首次芳香免费并抽 1",        key:"kekule",    sprite:"kekule"},
  "门捷列夫": {desc:"检索费用 1 点",              key:"mendeleev", sprite:"mendeleev"},
  "卡罗瑟斯": {desc:"聚合免费并抽 1",             key:"carothers", sprite:"carothers"},
  "霍夫曼":   {desc:"首次含氮免费；仅一次抽 1",   key:"hofmann",   sprite:"hofmann"},
  "居里夫人": {desc:"对中毒目标伤害 +1",          key:"curie",     sprite:"curie"},
  "贝特洛":   {desc:"首次酯化免费并抽 1",        key:"berthelot", sprite:"berthelot"},
  "珀金":     {desc:"每回合首次合成抽 1 张",     key:"perkin",    sprite:"perkin"},
  "伍德沃德": {desc:"课题 -1 费、伤害 +2",       key:"woodward",  sprite:"woodward"},
  "诺贝尔":   {desc:"攻击伤害 +1（每局 1 次）",   key:"nobel",     sprite:"nobel"}
};

const FORMULAS = {
  "水":"H₂O","HCl":"HCl","NaOH":"NaOH","MnO2":"MnO₂","Fe":"Fe","浓硫酸":"H₂SO₄","Br2":"Br₂",
  "浓硝酸":"HNO₃","H2":"H₂","O2":"O₂","N2":"N₂","S":"S","Na":"Na","CaCO3":"CaCO₃",
  "Ca(OH)2":"Ca(OH)₂","H2O2":"H₂O₂","FeS":"FeS","Na2CO3":"Na₂CO₃","NaHCO3":"NaHCO₃",
  "氯气":"Cl₂","SO2":"SO₂","SO3":"SO₃","NH3":"NH₃","NO":"NO","NO2":"NO₂","H2S":"H₂S",
  "H2SO4":"H₂SO₄","HNO3":"HNO₃","HClO":"HClO","HCl气体":"HCl↑","CaO":"CaO","CO2":"CO₂",
  "NaCl":"NaCl","乙烯":"C₂H₄","苯":"C₆H₆","乙醇":"C₂H₅OH","乙酸":"CH₃COOH","乙醛":"CH₃CHO",
  "乙酸乙酯":"CH₃COOC₂H₅","阿司匹林":"C₉H₈O₄","尼龙66":"[C₁₂H₂₂N₂O₂]ₙ","聚乙烯":"[C₂H₄]ₙ",
  "苯胺":"C₆H₅NH₂","硝基苯":"C₆H₅NO₂","溴苯":"C₆H₅Br","苯酚":"C₆H₅OH","氯乙烷":"C₂H₅Cl",
  "PET":"[C₁₀H₈O₄]ₙ","肥皂":"RCOONa","葡萄糖":"C₆H₁₂O₆","三溴苯酚":"C₆H₂Br₃OH",
  "苯磺酸":"C₆H₅SO₃H","硝酸铵":"NH₄NO₃","漂白粉":"Ca(ClO)₂","油脂":"甘油三酯","淀粉":"(C₆H₁₀O₅)ₙ",
  "水杨酸":"C₇H₆O₃","己二酸":"C₆H₁₀O₄","己二胺":"C₆H₁₆N₂","对苯二甲酸":"C₈H₆O₄","乙二醇":"C₂H₆O₂",
  "亚硫酸钙":"CaSO₃","硝酸钠":"NaNO₃","硫化钠":"Na₂S","氯化钙":"CaCl₂","氯化铵":"NH₄Cl",
  "硫酸铵":"(NH₄)₂SO₄","硫酸钠":"Na₂SO₄","硫酸钙":"CaSO₄","溴化钠":"NaBr"
};

const EVENT_DESC = {
  "暴沸":"对手随机弃 1 张",
  "通风橱":"清除自身全部中毒",
  "论文发表":"抽 2 张物质牌",
  "同行评审":"对手下次课题宣告无效"
};

const RULES = { hp:30, claimDamage:8, benchStock:3, benchRefill:1, takesPerTurn:2, attackCost:1 };
const DIFFICULTY = {
  easy:   { hp:42, claimDamage:10, benchStock:3, benchRefill:2, takesPerTurn:3, firstHpBonus:0, attackCost:1 },
  normal: { hp:40, claimDamage:10, benchStock:3, benchRefill:1, takesPerTurn:2, attackCost:1, firstHpBonus:0 },
  hard:   { hp:38, claimDamage:10, benchStock:2, benchRefill:1, takesPerTurn:2, attackCost:1, firstHpBonus:0 }
};

const CANON = {
  "HCl":"盐酸", "NaOH":"氢氧化钠", "MnO2":"二氧化锰", "Fe":"铁", "Br2":"溴",
  "H2":"氢气", "O2":"氧气", "NH3":"氨", "CO2":"二氧化碳", "Na":"钠",
  "Ca(OH)2":"氢氧化钙", "H2O2":"过氧化氢", "Na2CO3":"碳酸钠", "NaHCO3":"碳酸氢钠",
  "Cl2":"氯气", "NaCl":"氯化钠", "KMnO4":"高锰酸钾", "K2Cr2O7":"重铬酸钾",
  "I2":"碘", "Na2SO3":"亚硫酸钠", "Zn":"锌", "Cu":"铜", "Al":"铝",
  "FeCl3":"氯化铁", "Cu(OH)2":"新制氢氧化铜", "Ag(NH3)2OH":"银氨溶液",
  "PET":"聚对苯二甲酸乙二醇酯", "尼龙66":"尼龙 66", "HCl气体":"氯化氢"
};
const canon = n => CANON[n] || n;

function applyCanon(){
  MATERIALS.forEach(x=>x[0]=canon(x[0]));
  OPS.forEach(x=>x[0]=canon(x[0]));
  for(let i=0;i<BENCH_CARDS.length;i++) BENCH_CARDS[i]=canon(BENCH_CARDS[i]);
  for(let i=0;i<OBJECTIVES.length;i++) OBJECTIVES[i]=canon(OBJECTIVES[i]);
  RECIPES.forEach(r=>{
    const m={}; Object.entries(r.mat).forEach(([k,v])=>{ const n=canon(k); m[n]=(m[n]||0)+v; });
    r.mat=m;
    const c={}; Object.entries(r.cond).forEach(([k,v])=>{ const n=canon(k); c[n]=(c[n]||0)+v; });
    r.cond=c;
    r.out=canon(r.out);
  });
  Object.keys(ATTACKS).forEach(k=>{ if(CANON[k]){ ATTACKS[CANON[k]]=ATTACKS[k]; delete ATTACKS[k]; } });
  Object.keys(FORMULAS).forEach(k=>{ if(CANON[k] && !FORMULAS[CANON[k]]) FORMULAS[CANON[k]]=FORMULAS[k]; });
}
applyCanon();
const BASE_MATERIALS = MATERIALS.map(x=>x.slice());
const BASE_OPS = OPS.map(x=>x.slice());
if(window.EXTRA_MATERIALS) MATERIALS.push(...window.EXTRA_MATERIALS);
if(window.EXTRA_OPS) OPS.push(...window.EXTRA_OPS);
if(window.EXTRA_RECIPES) RECIPES.push(...window.EXTRA_RECIPES);
if(window.ALL_CARDS){
  window.ALL_CARDS.forEach(c=>{ if(c.formula && !FORMULAS[c.name]) FORMULAS[c.name] = c.formula; });
}
applyCanon();

/* 每局牌组：核心物质 + 15 张扩展物质 + 全部扩展条件/事件 */
function buildDeck(){
  const mat = [], op = [];
  BASE_MATERIALS.forEach(([c,n])=>{ for(let i=0;i<n;i++) mat.push(c); });
  BASE_OPS.forEach(([c,n])=>{ for(let i=0;i<n;i++) op.push(c); });
  shuffle((window.EXTRA_MATERIALS||[]).map(x=>canon(x[0]))).slice(0,15).forEach(c=>mat.push(c));
  (window.EXTRA_OPS||[]).forEach(x=>op.push(canon(x[0])));
  ["氯气","氯气"].forEach(c=>mat.push(c));
  return {mat, op};
}

const $ = id => document.getElementById(id);
const shuffle = a => { for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const count = (hand,c) => hand.filter(x=>x===c).length;
const isCond = c => OPS.some(([n])=>n===c);
const isEvent = c => EVENT_DESC[c] !== undefined;
const isProduct = c => RECIPES.some(r=>r.out===c) || c === "氯气";
const chemKey = p => CHEMISTS[p.chemist].key;

function scheeleBonus(p, product){
  if(chemKey(p)!=="scheele" || product!=="氯气") return 0;
  if((p.scheeleUsed||0) >= 1) return 0;
  return 1;
}
function nobelBonus(p){
  if(chemKey(p)!=="nobel" || p.nobelUsed) return 0;
  return 1;
}
function curieBonus(p){
  if(chemKey(p)!=="curie" || (p.curieUsed||0) >= 1) return 0;
  return 1;
}
function freeTagDraw(p, rec){
  const k = chemKey(p), t = rec.tags || [];
  if((k==="kekule" && t.includes("aromatic")) ||
     (k==="berthelot" && t.includes("ester")) ||
     (k==="hofmann" && t.includes("nitrogen") && !p.hofmannUsed) ||
     (k==="davy" && (t.includes("metal") || t.includes("electrolysis")))){
    drawCard(p, "mat");
    if(k==="hofmann") p.hofmannUsed = true;
    log(`${p.chemist}：免费反应后抽 1 张。`, "sys");
  }
}

function researchCost(p){
  return chemKey(p)==="woodward" ? 0 : 2;
}
const spriteOf = p => CHEMISTS[p.chemist].sprite;

let G = null, dragCard = null;
let NET = null, MY_SIDE = 0;

function newPlayer(name, chemist, second, deck){
  const mat = [...deck.mat], op = [...deck.op];
  shuffle(mat); shuffle(op);
  const p = {
    name, chemist, hp:RULES.hp, poison:0, takes:0,
    hand:[], matDeck:mat, opDeck:op, discard:[],
    ap:3, chain:0, attacked:false, searched:false, freeTagUsed:false,
    benchUsed:{}, review:false, seen:new Set(), claims:0, choke:false, bonusAp:0, shield:0, defended:false, researchUsed:false, apDebt:0, nobelUsed:false, chainRewardTurn:-1,
    privateShelf: (window.EXTRA_MATERIALS || []).map(x=>canon(x[0])).filter((v,i,a)=>a.indexOf(v)===i).sort(()=>Math.random()-0.5).slice(0,2)
  };
  for(let i=0;i<4;i++) drawCard(p,"mat");
  drawCard(p,"op");
  if(!second && RULES.firstCards){ for(let i=0;i<RULES.firstCards;i++) drawCard(p,"mat"); }
  /* 后手额外牌关闭，用于先后手平衡测试 */
  return p;
}

function drawCard(p, pile){
  if(pile === "mat"){
    if(!p.matDeck.length){
      const back = p.discard.filter(c=>!isCond(c) && !isEvent(c));
      if(back.length){ p.matDeck = shuffle(back); p.discard = p.discard.filter(c=>isCond(c)||isEvent(c)); }
      else return null;
    }
    const c = p.matDeck.pop(); p.hand.push(c); return c;
  }
  if(!p.opDeck.length){
    const back = p.discard.filter(c=>isCond(c)||isEvent(c));
    if(back.length){ p.opDeck = shuffle(back); p.discard = p.discard.filter(c=>!isCond(c)&&!isEvent(c)); }
    else return null;
  }
  const c = p.opDeck.pop(); p.hand.push(c); return c;
}

function drawMat(p, n){
  for(let i=0;i<n;i++){
    if(!p.matDeck.length){
      const back = p.discard.filter(c=>!isCond(c) && !isEvent(c));
      if(back.length){ p.matDeck = shuffle(back); p.discard = p.discard.filter(c=>isCond(c)||isEvent(c)); }
      else { endByDeck(); return; }
    }
    p.hand.push(p.matDeck.pop());
  }
}

function drawOp(p, n){
  for(let i=0;i<n;i++){
    if(!p.opDeck.length){
      const back = p.discard.filter(c=>isCond(c)||isEvent(c));
      if(back.length){ p.opDeck = shuffle(back); p.discard = p.discard.filter(c=>!isCond(c)&&!isEvent(c)); }
      else return;
    }
    p.hand.push(p.opDeck.pop());
  }
}

function log(text, cls){
  const el = document.createElement("p");
  if(cls) el.className = cls;
  el.textContent = text;
  $("log").prepend(el);
  while($("log").children.length > 8) $("log").lastChild.remove();
}

function startGame(){
  const mode = "ai";
  const diff = $("diff") ? $("diff").value : "normal";
  const hb = $("hintBtn"); if(hb) hb.style.display = diff === "easy" ? "" : "none";
  Object.assign(RULES, DIFFICULTY[diff] || DIFFICULTY.normal);
  const c0 = $("c0").value, c1 = $("c1").value;
  const pname = (($("pname") && $("pname").value) || "").trim().slice(0,12) || "化学家";
  const deck = buildDeck();
  G = {
    players:[ newPlayer("你", c0, false, deck), newPlayer("对手", c1, true, deck) ],
    bench:{}, objectives: (()=>{
      const easy = ["聚乙烯","肥皂","乙酸乙酯","葡萄糖"];
      const pick = easy[Math.floor(Math.random()*easy.length)];
      const rest = shuffle(OBJECTIVES.filter(x=>x!==pick)).slice(0,3);
      return shuffle([pick,...rest]).map(name=>({name, claimed:false}));
    })(),
    turn:0, over:false, winner:null, claimedThisTurn:false, sel:{}, difficulty:diff,
    playerName:pname, resultSaved:false,
    humanSide:0, lastAttackSide:null, paused:false, firstStrike:true, stats:{attacks:0, objCrafted:0, blocks:0}
  };
  BENCH_CARDS.forEach(c=>G.bench[c]={stock:RULES.benchStock});
  if(RULES.firstHpBonus) G.players[0].hp += RULES.firstHpBonus;
  G.players[1].hp += diff === "hard" ? 1 : 2;
  $("log").innerHTML = "";
  $("setup").classList.add("hidden");
  $("menu").classList.add("hidden");
  $("rankPanel").classList.add("hidden");
  $("gameover").classList.add("hidden");
  log("对局开始。双方第一回合 3 点活化能；后手获得额外生命补偿。", "sys");
  startTurn();
  if(window.SFX) SFX.enterGame();
}

function startTurn(){
  if(G.over) return;
  const p = G.players[G.turn % 2];
  G.claimedThisTurn = false;
  const firstAp = (G.turn === 0) ? (RULES.firstAp == null ? 3 : RULES.firstAp) : 3;
  p.ap = firstAp + (p.hp <= 10 ? 1 : 0);
  if(G.turn === 1 && RULES.secondAp) p.ap += RULES.secondAp;
  if(p.bonusAp){ p.ap += p.bonusAp; p.bonusAp = 0; log(`${p.name} 的课题余势：活化能 +1。`, "sys"); }
  if(p.apDebt){ p.ap = Math.max(0, p.ap - p.apDebt); log(`${p.name} 防御代价：活化能 -${p.apDebt}。`, "sys"); p.apDebt = 0; }
  p.chain = 0; p.attacked = false; p.searched = false; p.freeTagUsed = false;
  p.shield = 0; p.defended = false;
  p.benchUsed = {}; p.takes = 0; G.sel = {};
  log(`—— 第 ${Math.floor(G.turn/2)+1} 回合 · ${p.name} ——`, "turn");
  if(p.poison > 0){
    p.hp -= p.poison;
    log(`${p.name} 中毒 ${p.poison} 层，损失 ${p.poison} 点生命。`);
    if(checkWin()) return;
  }
  if(p.choke){
    p.ap = Math.max(0, p.ap - 1); p.choke = false;
    log(`${p.name} 窒息，本回合活化能 -1。`, "sys");
  }
  const room = Math.max(0, 7 - p.hand.length);
  drawMat(p, Math.min(2, room));
  if(G.over) return;
  drawOp(p, Math.min(1, Math.max(0, 7 - p.hand.length)));
  BENCH_CARDS.forEach(c=>{ if(G.bench[c].stock < RULES.benchStock) G.bench[c].stock++; });
  render();
  if(isAITurn()) setTimeout(aiTurn, 700);
}

function discardWorst(p){
  const dm = demandMap();
  let worst = 0, ws = 1e9;
  p.hand.forEach((c,i)=>{
    let s = 0;
    if(isActiveObj(c)) s = 100;
    else if(ATTACKS[c]) s = 80;
    else if(dm.has(c)) s = 50;
    else if(isCond(c)) s = 30;
    if(count(p.hand,c) > 1) s -= 15;
    if(s < ws){ ws = s; worst = i; }
  });
  const c = p.hand.splice(worst,1)[0];
  p.discard.push(c);
  return c;
}

function nextTurn(){
  G.turn++;
  if(G.turn >= 60){ endByRound(); return; }
  startTurn();
}

function endTurn(){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("endTurn", {}); return; }
  const p = G.players[G.turn % 2];
  if(p.hand.length > 7 && (G.turn % 2) === G.humanSide){
    openDiscard(p);
    return;
  }
  while(p.hand.length > 7){
    const c = discardWorst(p);
    log(`${p.name} 手牌超限，弃掉 ${c}。`, "sys");
  }
  nextTurn();
}

function openDiscard(p){
  G.discardMode = {need:p.hand.length - 7, sel:[]};
  refreshDiscard();
  $("discard").classList.remove("hidden");
}

function refreshDiscard(){
  if(!G || !G.discardMode) return;
  const p = G.players[0];
  const d = G.discardMode;
  $("discardInfo").textContent = `手牌 ${p.hand.length} 张，上限 7 张。请选择 ${d.need} 张弃掉（已选 ${d.sel.length} 张）`;
  $("discardCards").innerHTML = p.hand.map((c,i)=>{
    const picked = d.sel.includes(i) ? " picked" : "";
    return `<div class="dcard${picked}" onclick="toggleDiscard(${i})">${cardHTML(c,{draggable:false})}</div>`;
  }).join("");
  $("discardConfirm").disabled = d.sel.length !== d.need;
}

function toggleDiscard(i){
  if(!G || !G.discardMode) return;
  const d = G.discardMode;
  const at = d.sel.indexOf(i);
  if(at >= 0) d.sel.splice(at,1);
  else if(d.sel.length < d.need) d.sel.push(i);
  refreshDiscard();
}

function confirmDiscard(){
  if(!G || !G.discardMode) return;
  const p = G.players[0];
  const d = G.discardMode;
  if(d.sel.length !== d.need) return;
  const idx = [...d.sel].sort((a,b)=>b-a);
  const gone = [];
  idx.forEach(i=>{ const c = p.hand.splice(i,1)[0]; p.discard.push(c); gone.push(c); });
  log(`${p.name} 弃掉 ${gone.join("、")}。`, "sys");
  G.discardMode = null;
  $("discard").classList.add("hidden");
  nextTurn();
}

function checkWin(){
  const a = G.players[0], b = G.players[1];
  // 前 10 回合为实验安全期，避免开局被课题/连击直接打死
  if(G.turn < 20){
    let saved = false;
    for(const p of [a,b]){
      if(p.hp <= 0){ p.hp = 5; saved = true; log(`${p.name} 触发实验安全期，生命保留 5 点（前 10 回合）。`, "sys"); }
    }
    if(saved) return false;
  }
  if(a.hp <= 0 || b.hp <= 0){
    G.over = true;
    G.winner = a.hp <= 0 ? b : a;
    const loser = a.hp <= 0 ? a : b;
    showGameOver(`${G.winner.name} 获胜`, loser.name === "你" ? "你的生命值归零。" : `${loser.name}的生命值归零。`);
    return true;
  }
  return false;
}

function endByDeck(){
  if(G.over) return;
  G.over = true;
  const a = G.players[0], b = G.players[1];
  G.winner = a.hp >= b.hp ? a : b;
  showGameOver(`${G.winner.name} 获胜`, a.hp === b.hp ? "双方生命相同，先手方获胜。" : "牌库耗尽，比较剩余生命。");
}

function endByRound(){
  if(G.over) return;
  G.over = true;
  const a = G.players[0], b = G.players[1];
  G.winner = a.hp >= b.hp ? a : b;
  showGameOver(`${G.winner.name} 获胜`, a.hp === b.hp ? "达到 30 回合上限，双方生命相同，先手方获胜。" : "达到 30 回合上限，比较剩余生命。");
}

function showSetup(){
  $("menu").classList.add("hidden");
  $("rankPanel").classList.add("hidden");
  if($("onlinePanel")) $("onlinePanel").classList.add("hidden");
  if($("rulesPanel")) $("rulesPanel").classList.add("hidden");
  $("setup").classList.remove("hidden");
}

function showRules(){
  ["menu","setup","rankPanel","onlinePanel"].forEach(id=>{ const el=$(id); if(el) el.classList.add("hidden"); });
  $("rulesPanel").classList.remove("hidden");
}

function showMenu(){
  $("setup").classList.add("hidden");
  $("rankPanel").classList.add("hidden");
  if($("onlinePanel")) $("onlinePanel").classList.add("hidden");
  if($("rulesPanel")) $("rulesPanel").classList.add("hidden");
  $("gameover").classList.add("hidden");
  $("menu").classList.remove("hidden");
}

function showRank(){
  $("menu").classList.add("hidden");
  $("setup").classList.add("hidden");
  $("rankPanel").classList.remove("hidden");
  if(typeof netFetchLeaderboard === "function") netFetchLeaderboard();
  renderLeaderboard();
}

function showGameOver(title, text){
  $("goTitle").textContent = title;
  $("goText").textContent = text;
  $("gameover").classList.remove("hidden");
  if(window.SFX) SFX[title.includes("你") ? "win" : "lose"]();
  if(NET && NET.active){
    if(NET.role === "host" && !NET.resultSent){
      netSendState();
      netReportResult();
    }
  } else if(G && G.winner && G.winner.name === "你" && !G.resultSaved){
    G.resultSaved = true;
    recordWin();
  }
  render();
}

const LB_KEY = "fanyinglian_leaderboard_v1";

function loadLeaderboard(){
  try{
    const raw = localStorage.getItem(LB_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  }catch(e){ return []; }
}

function saveLeaderboard(arr){
  try{ localStorage.setItem(LB_KEY, JSON.stringify(arr.slice(0,50))); }catch(e){}
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

function recordWin(){
  if(!G) return;
  const name = (G.playerName || "化学家").trim().slice(0,12) || "化学家";
  const turns = Math.floor(G.turn/2) + 1;
  const arr = loadLeaderboard();
  let e = arr.find(x=>x.name === name);
  if(!e){ e = {name, wins:0, bestTurns:999, lastTurns:turns, difficulty:G.difficulty, date:""}; arr.push(e); }
  e.wins += 1;
  e.points = (e.points || 0) + ({easy:0, normal:6, hard:10}[G.difficulty] || 0);
  e.bestTurns = Math.min(e.bestTurns === undefined ? 999 : e.bestTurns, turns);
  e.lastTurns = turns;
  e.difficulty = G.difficulty;
  e.date = new Date().toISOString().slice(0,10);
  saveLeaderboard(arr);
  renderLeaderboard();
}

function renderLeaderboard(){
  const box = $("rankList");
  if(!box) return;
  if(NET && NET.leaderboard){
    const arr = NET.leaderboard.slice(0,10);
    if(!arr.length){ box.innerHTML = '<div class="rank-empty">服务器还没有记录。</div>'; return; }
    box.innerHTML = arr.map((e,i)=>`<div class="rank-row">
        <span class="rank-no">${i+1}</span>
        <b class="rank-name">${escapeHtml(e.name)}</b>
        <span class="rank-wins">${e.rating || 1000} 分</span>
        <span class="rank-best">${e.wins||0} 胜 / ${e.losses||0} 负</span>
      </div>`).join("");
    return;
  }
  const arr = loadLeaderboard()
    .sort((a,b)=> ((b.points||0) - (a.points||0)) || (b.wins - a.wins) || ((a.bestTurns||999) - (b.bestTurns||999)))
    .slice(0,5);
  if(!arr.length){
    box.innerHTML = '<div class="rank-empty">还没有记录，赢一局就会出现在这里。</div>';
    return;
  }
  box.innerHTML = arr.map((e,i)=>`<div class="rank-row">
      <span class="rank-no">${i+1}</span>
      <b class="rank-name">${escapeHtml(e.name)}</b>
      <span class="rank-wins">${e.points || 0} 分</span>
      <span class="rank-best">最快 ${e.bestTurns} 回合</span>
    </div>`).join("");
}

function reactionCost(p, rec){
  if(!p.freeTagUsed){
    const k = chemKey(p);
    if(k==="kekule" && rec.tags && rec.tags.includes("aromatic")) return 0;
    if(k==="hofmann" && rec.tags && rec.tags.includes("nitrogen")) return 0;
    if(k==="davy" && rec.tags && (rec.tags.includes("metal")||rec.tags.includes("electrolysis"))) return 0;
    if(k==="berthelot" && rec.tags && rec.tags.includes("ester")) return 0;
    if(k==="lavoisier" && rec.tags && rec.tags.includes("oxidation")) return 0;
    if(k==="carothers" && rec.tags && rec.tags.includes("polymer")) return 0;
  }
  return 1;
}

function recipeNeed(rec){
  const n = {};
  Object.entries(rec.mat).forEach(([k,v])=>n[k]=(n[k]||0)+v);
  Object.entries(rec.cond).forEach(([k,v])=>n[k]=(n[k]||0)+v);
  return n;
}

function planRecipe(p, rec){
  const need = recipeNeed(rec);
  const fromBench = [];
  const missing = [];
  let benchCount = 0;
  for(const [card,n] of Object.entries(need)){
    const needMore = n - count(p.hand, card);
    if(needMore <= 0) continue;
    const slot = G.bench[card];
    if(slot && slot.stock >= needMore && !p.benchUsed[card]
       && p.takes + benchCount + needMore <= RULES.takesPerTurn){
      benchCount += needMore;
      fromBench.push([card, needMore]);
    } else missing.push(card);
  }
  return {ok:missing.length===0, missing, fromBench, need, cost:reactionCost(p, rec)};
}

function finishReaction(p, rec){
  p.hand.push(rec.out);
  if(chemKey(p)==="carothers" && rec.tags && rec.tags.includes("polymer")){
    drawCard(p, "mat");
    log(`卡罗瑟斯：聚合反应后抽 1 张。`, "sys");
  }
  if(chemKey(p)==="perkin" && p.perkinTurn !== G.turn){
    p.seen.add(rec.out);
    p.perkinTurn = G.turn;
    drawCard(p, "mat");
    log(`珀金：本回合首次合成 ${rec.out}，抽 1 张。`, "sys");
  }
  p.chain++;
  if(p.chain >= 2 && p.chainRewardTurn !== G.turn){
    p.chainRewardTurn = G.turn;
    const before = p.hand.length;
    drawOp(p, 1);
    if(p.hand.length > before) log("链式合成：抽到 1 张条件/事件牌。", "sys");
  }
  if(chemKey(p)==="lavoisier" && rec.tags && rec.tags.includes("oxidation")){
    drawCard(p, "mat");
    log("拉瓦锡：氧化反应后抽 1 张。", "sys");
  }
  if(window.SFX) SFX.synth();
}

function consume(p, need, useBench){
  for(const [card,n] of Object.entries(need)){
    let left = n;
    for(let i=p.hand.length-1;i>=0 && left>0;i--){
      if(p.hand[i]===card){ p.hand.splice(i,1); left--; }
    }
    if(left > 0 && useBench){
      G.bench[card].stock -= left;
      p.benchUsed[card] = true;
      p.takes += left;
    }
  }
}

function doRecipe(rec){
  const p = G.players[G.turn % 2];
  if(G.over) return;
  const plan = planRecipe(p, rec);
  if(!plan.ok || p.ap < plan.cost) return;
  consume(p, plan.need, true);
  p.ap -= plan.cost;
  if(plan.cost === 0) p.freeTagUsed = true;
  finishReaction(p, rec);
  if(plan.cost === 0) freeTagDraw(p, rec);
  if(rec.obj) G.stats.objCrafted++;
  log(`${p.name} 合成「${rec.name}」→ ${rec.out}（链长 ${p.chain}）。`);
  showFormula(rec);
  render();
  synthPose();
}

function findRecipeByNeed(need){
  return RECIPES.find(r=>{
    const n = recipeNeed(r);
    const keys = new Set([...Object.keys(n), ...Object.keys(need)]);
    for(const k of keys) if((n[k]||0) !== (need[k]||0)) return false;
    return true;
  });
}

function addCard(c){
  if(!G || G.over || isAITurn()) return;
  const p = G.players[G.turn % 2];
  const have = count(p.hand, c);
  const cur = G.sel[c] || 0;
  if(cur >= have) return;
  G.sel[c] = cur + 1;
  render();
}

function toggleCard(c){
  if(!G || G.over || isAITurn()) return;
  const p = G.players[G.turn % 2];
  const have = count(p.hand, c);
  const cur = G.sel[c] || 0;
  if(cur >= have){ if(cur > 0) G.sel[c] = cur - 1; }
  else G.sel[c] = cur + 1;
  if(G.sel[c] === 0) delete G.sel[c];
  render();
}

function clearSel(){ if(G) G.sel = {}; render(); }

function react(){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("react", {sel:{...G.sel}}); return; }
  if(!G || G.over || isAITurn()) return;
  const p = G.players[G.turn % 2];
  const need = {...G.sel};
  if(!Object.keys(need).length) return;
  const rec = findRecipeByNeed(need);
  if(!rec){ log("这组物质不能直接反应。", "sys"); return; }
  const cost = reactionCost(p, rec);
  if(p.ap < cost) return;
  for(const [c,n] of Object.entries(need)){
    if(count(p.hand,c) < n){ G.sel = {}; log("选中的牌已不在手里。", "sys"); render(); return; }
  }
  consume(p, need, false);
  p.ap -= cost;
  if(cost === 0) p.freeTagUsed = true;
  finishReaction(p, rec);
  if(cost === 0) freeTagDraw(p, rec);
  G.sel = {};
  log(`${p.name} 合成「${rec.name}」→ ${rec.out}（链长 ${p.chain}）。`);
  showFormula(rec);
  render();
  synthPose();
}

function takePrivate(card){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("private", {card}); return; }
  const p = G.players[G.turn % 2];
  if(G.over) return;
  const i = p.privateShelf.indexOf(card);
  if(i < 0) return;
  p.privateShelf.splice(i,1);
  p.hand.push(card);
  log(NET && NET.active ? `${p.name} 从私人试剂架取出一张试剂。` : `${p.name} 从私人试剂架取出 ${card}。`, "sys");
  render();
}

function takeBench(card){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("takeBench", {card}); return false; }
  const p = G.players[G.turn % 2];
  const slot = G.bench[card];
  if(G.over || !slot || slot.stock <= 0 || p.benchUsed[card]) return false;
  if(p.takes >= RULES.takesPerTurn) return false;
  slot.stock--; p.benchUsed[card] = true; p.takes++;
  p.hand.push(card);
  log(`${p.name} 取走 1 份 ${card}（${p.takes}/${RULES.takesPerTurn}）。`, "sys");
  render();
  return true;
}

function takeTop(p, n){
  if(!p.matDeck.length){
    const back = p.discard.filter(c=>!isCond(c) && !isEvent(c));
    if(back.length){ p.matDeck = shuffle(back); p.discard = p.discard.filter(c=>isCond(c)||isEvent(c)); }
  }
  const out = [];
  while(out.length < n && p.matDeck.length) out.push(p.matDeck.pop());
  return out;
}

function refillPile(p, pile){
  if(p[pile].length) return;
  const isOp = pile === "opDeck";
  const back = p.discard.filter(c=> isOp ? (isCond(c) || isEvent(c)) : (!isCond(c) && !isEvent(c)));
  if(!back.length) return;
  p[pile] = shuffle(back);
  p.discard = p.discard.filter(c=> isOp ? (!isCond(c) && !isEvent(c)) : (isCond(c) || isEvent(c)));
}

/* 检索池：条件、事件各保底 1 张，再补物质；避免检索永远只出物质 */
function takeWhere(p, pile, pred){
  const i = p[pile].findIndex(c=>pred(c));
  if(i < 0) return null;
  return {card:p[pile].splice(i,1)[0], pile};
}

function takeSearchEntries(p, n){
  refillPile(p, "opDeck");
  refillPile(p, "matDeck");
  const entries = [];
  const add = e=>{ if(e) entries.push(e); };

  add(takeWhere(p, "opDeck", c=>isCond(c) && !isEvent(c)));
  add(takeWhere(p, "opDeck", c=>isEvent(c)));
  if(n >= 4) add(takeWhere(p, "opDeck", ()=>true));

  while(entries.length < n && p.matDeck.length) entries.push({card:p.matDeck.pop(), pile:"matDeck"});
  while(entries.length < n){
    const e = takeWhere(p, "opDeck", ()=>true);
    if(!e) break;
    entries.push(e);
  }
  return entries;
}

function search(){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("search", {}); return; }
  if(!G || G.over) return;
  const p = G.players[G.turn % 2];
  if(p.searched || isAITurn()) return;
  const cost = chemKey(p)==="mendeleev" ? 1 : 2;
  if(p.ap < cost) return;
  const n = chemKey(p)==="scheele" ? 4 : 3;
  const entries = takeSearchEntries(p, n);
  if(!entries.length){ log("牌库已经空了。", "sys"); return; }
  G.discover = {entries, cost, side:0};
  renderDiscover();
}

function renderDiscover(){
  if(!G || !G.discover) return;
  $("discoverCards").innerHTML = G.discover.entries.map((e,i)=>
    `<div class="dcard" onclick="pickSearch(${i})">${cardHTML(e.card,{draggable:false})}</div>`).join("");
  $("discoverInfo").textContent = `支付 ${G.discover.cost} 点活化能，选 1 张进入手牌；已混入条件/事件牌`;
  $("discover").classList.remove("hidden");
}

function pickSearch(i){
  if(!G || !G.discover) return;
  const d = G.discover;
  const p = G.players[d.side];
  const chosen = d.entries[i];
  if(!chosen || p.ap < d.cost) return;
  p.hand.push(chosen.card);
  d.entries.forEach((e,j)=>{
    if(j !== i) p[e.pile].unshift(e.card);
  });
  p.ap -= d.cost;
  p.searched = true;
  G.discover = null;
  $("discover").classList.add("hidden");
  log(`${p.name} 检索到「${chosen.card}」（${d.cost===0?"免费":d.cost+" 点"}）。`, "hint");
  render();
}

function aiSearch(side=1){
  const p = G.players[side];
  if(G.over || p.searched) return false;
  const cost = chemKey(p)==="mendeleev" ? 1 : 2;
  if(p.ap < cost) return false;
  const dm = demandMap();
  const entries = takeSearchEntries(p, 3);
  if(!entries.length) return false;
  const score = c => ATTACKS[c] ? 80 : (isCond(c) || isEvent(c) ? 35 : (dm.has(c) ? 60 : 20));
  entries.sort((a,b)=>score(b.card)-score(a.card));
  const chosen = entries[0];
  p.hand.push(chosen.card);
  entries.slice(1).forEach(e=>p[e.pile].unshift(e.card));
  p.ap -= cost;
  p.searched = true;
  log(`${p.name} 检索到「${chosen.card}」。`, "sys");
  render();
  return true;
}

const COUNTERS = {
  "氯气":   ["氢氧化钠","亚硫酸钠","通风橱"],
  "SO2":    ["氢氧化钠","氢氧化钙"],
  "NO2":    ["氢氧化钠","水"],
  "H2S":    ["氢氧化钠","碘","氯化铁"],
  "氯化氢": ["氢氧化钠","水","氢氧化钙"],
  "氨":     ["盐酸","稀硫酸","浓硫酸"],
  "H2SO4":  ["氢氧化钠","氢氧化钙"],
  "溴":     ["氢氧化钠","亚硫酸钠"],
  "溴甲烷": ["通风橱"],
  "甲醛":   ["通风橱","水"],
  "丙烯腈": ["通风橱"],
  "四氯化碳":["通风橱"],
  "氯仿":   ["通风橱"],
  "乙醚":   ["通风橱"]
};
const DEF_PRODUCT = {
  "氯气|氢氧化钠":"氯化钠", "氯气|亚硫酸钠":"氯化钠",
  "SO2|氢氧化钠":"亚硫酸钠", "SO2|氢氧化钙":"亚硫酸钙",
  "NO2|氢氧化钠":"硝酸钠", "NO2|水":"HNO3",
  "H2S|氢氧化钠":"硫化钠", "H2S|碘":"S", "H2S|氯化铁":"S",
  "氯化氢|氢氧化钠":"氯化钠", "氯化氢|水":"盐酸", "氯化氢|氢氧化钙":"氯化钙",
  "氨|盐酸":"氯化铵", "氨|稀硫酸":"硫酸铵", "氨|浓硫酸":"硫酸铵",
  "H2SO4|氢氧化钠":"硫酸钠", "H2SO4|氢氧化钙":"硫酸钙",
  "溴|氢氧化钠":"溴化钠", "溴|亚硫酸钠":"溴化钠"
};
const DEF_TEXT = {
  "氢氧化钠":"碱液吸收","亚硫酸钠":"还原吸收","氢氧化钙":"石灰乳吸收",
  "水":"溶解吸收","盐酸":"酸吸收","稀硫酸":"酸吸收","浓硫酸":"酸吸收","通风橱":"直接排风",
  "碘":"碘氧化","氯化铁":"铁盐氧化"
};

function getCounters(defender, product){
  const list = [];
  (COUNTERS[product] || []).forEach(card=>{
    if(defender.hand.includes(card)) list.push({card, from:"hand"});
  });
  return list;
}

function consumeCounter(defender, c){
  if(c.from === "hand"){
    const i = defender.hand.indexOf(c.card);
    if(i >= 0) defender.hand.splice(i,1);
  } else if(G.bench[c.card]){
    G.bench[c.card].stock--;
  }
}

function defenseLine(product, card){
  const made = DEF_PRODUCT[product+"|"+card];
  return `用「${card}」${DEF_TEXT[card]||"吸收"}「${product}」，伤害减至 1`
    + (made ? `，获得「${made}」` : "") + "，下回合 -1 活化能";
}

function showDefenseModal(){
  const pa = G.pendingAttack;
  if(!pa) return;
  $("defSub").textContent = `对手释放「${pa.product}」，将造成 ${pa.dmg} 点伤害。你有可以吸收它的试剂：`;
  $("defOptions").innerHTML = pa.counters.map((c,i)=>
    `<button class="btn primary" onclick="chooseDefense(${i})">${defenseLine(pa.product,c.card)}（${c.from==="bench"?"试剂台":"手牌"}）</button>`).join("");
  $("defense").classList.remove("hidden");
}

function chooseDefense(i){
  const pa = G.pendingAttack;
  if(!pa) return;
  const c = pa.counters[i];
  if(!c) return;
  consumeCounter(pa.defender, c);
  pa.defender.apDebt = (pa.defender.apDebt||0) + 1;
  const made = DEF_PRODUCT[pa.product+"|"+c.card];
  if(made) pa.defender.hand.push(made);
  pa.defender.hp -= 1;
  $("defense").classList.add("hidden");
  G.pendingAttack = null;
  G.paused = false;
  log(`${defenseLine(pa.product,c.card)}。`, "sys");
  if(checkWin()) return;
  render();
  if(NET && NET.active && NET.role === "host") netSendState();
  if(isAITurn()) aiAfter();
}

function applyHit(attacker, defender, a, dmg, product){
  defender.hp -= dmg;
  let note = "";
  if(dmg > 0){
    if(a.status === "poison"){
      let add = 1;
      defender.poison = Math.min(3, defender.poison + add);
      note = `，中毒 +${add}`;
    } else if(a.status === "choke"){
      defender.choke = true;
      note = "，窒息";
    } else if(a.status === "corrode"){
      const slots = BENCH_CARDS.filter(c=>G.bench[c].stock > 0);
      if(slots.length){
        const c = slots[Math.floor(Math.random()*slots.length)];
        G.bench[c].stock--;
        note = `，腐蚀 ${c}`;
      }
    }
  }
  log(`${attacker.name} 释放「${product}」：${dmg} 点伤害${note}。`);
  if(window.SFX) SFX.attack();
  showGas();
  if(checkWin()) return;
  render();
}

function takeAttack(){
  const pa = G.pendingAttack;
  if(!pa) return;
  $("defense").classList.add("hidden");
  G.pendingAttack = null;
  G.paused = false;
  const attacker = G.players[1 - pa.defenderSide];
  applyHit(attacker, pa.defender, pa.a, pa.dmg, pa.product);
  if(NET && NET.active && NET.role === "host") netSendState();
  if(isAITurn()) aiAfter();
}

function cardInPile(p, card){
  let i = p.matDeck.indexOf(card);
  if(i >= 0){ p.matDeck.splice(i,1); return true; }
  i = p.opDeck.indexOf(card);
  if(i >= 0){ p.opDeck.splice(i,1); return true; }
  i = p.discard.indexOf(card);
  if(i >= 0){ p.discard.splice(i,1); return true; }
  return false;
}

function researchTargets(p){
  return G.objectives.filter(o=>!o.claimed).map(o=>{
    const rec = RECIPES.find(r=>r.out===o.name);
    if(!rec) return null;
    const plan = planRecipe(p, rec);
    return {name:o.name, rec, missing:plan.missing};
  }).filter(Boolean);
}

function researchFetch(p, objName){
  const rec = RECIPES.find(r=>r.out===objName);
  if(!rec) return null;
  const need = recipeNeed(rec);
  const missing = [];
  for(const [c,n] of Object.entries(need)){
    const have = count(p.hand,c);
    const bench = G.bench[c] && G.bench[c].stock > 0;
    if(have < n && !bench) missing.push(c);
  }
  for(const c of missing){
    if(cardInPile(p, c)){ p.hand.push(c); return c; }
  }
  return null;
}

function research(){
  if(!G || G.over || isAITurn()) return;
  const p = G.players[0];
  const cost = researchCost(p);
  if(p.researchUsed || p.ap < cost) return;
  const targets = researchTargets(p).filter(t=>t.missing.length>0);
  if(!targets.length){ log("当前课题没有可以从牌库补的缺口。", "sys"); return; }
  G.research = {targets};
  $("researchInfo").textContent = `花费 ${cost} 点活化能，选择课题，从牌库定向找 1 张缺失原料（每局一次）`;
  $("researchOptions").innerHTML = targets.map((t,i)=>
    `<button class="btn primary" onclick="pickResearch(${i})">${t.name} · 缺 ${t.missing.join("、")}</button>`).join("");
  $("research").classList.remove("hidden");
}

function pickResearch(i){  if(!G || !G.research) return;
  if(NET && NET.active && NET.role === "client"){
    const t = G.research.targets[i];
    if(t){ netClientAction("research", {obj:t.name}); $("research").classList.add("hidden"); G.research = null; }
    return;
  }
  const t = G.research.targets[i];
  if(!t) return;
  const p = G.players[0];
  if(p.ap < researchCost(p) || p.researchUsed) return;
  const cost = researchCost(p);
  const got = researchFetch(p, t.name);
  if(!got){ log(`牌库里没有「${t.missing[0]}」。`, "sys"); return; }
  p.ap -= cost;
  p.researchUsed = true;
  G.research = null;
  $("research").classList.add("hidden");
  log(`课题研究：找到「${got}」，用于「${t.name}」。`, "hint");
  render();
}

function closeResearch(){
  if(G) G.research = null;
  const el = $("research");
  if(el) el.classList.add("hidden");
}

function aiResearch(){
  const p = G.players[1];
  if(p.researchUsed || p.ap < researchCost(p)) return false;
  const cost = researchCost(p);
  const targets = researchTargets(p).filter(t=>t.missing.length>0);
  if(!targets.length) return false;
  targets.sort((a,b)=>a.missing.length-b.missing.length);
  for(const t of targets){
    const got = researchFetch(p, t.name);
    if(got){
      p.ap -= cost;
      p.researchUsed = true;
      log(`对手课题研究：找到「${got}」。`, "sys");
      render();
      return true;
    }
  }
  return false;
}

function attack(product){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("attack", {product}); return; }
  const p = G.players[G.turn % 2], o = G.players[1-(G.turn % 2)];
  const a = ATTACKS[product];
  if(G.over || p.attacked || !a) return;
  const cost = RULES.attackCost || 0;
  if(p.ap < cost) return;
  const idx = p.hand.indexOf(product);
  if(idx < 0) return;
  p.hand.splice(idx,1); p.discard.push(product);
  let dmg = a.dmg + Math.min(Math.max(p.chain-1,0), 2);
  const nb = nobelBonus(p);
  if(nb){ dmg += nb; p.nobelUsed = true; }
  const sb = scheeleBonus(p, product);
  if(sb){ dmg += sb; p.scheeleUsed = (p.scheeleUsed||0) + 1; }
  if(chemKey(p)==="curie" && o.poison > 0) dmg += 1;
  p.attacked = true;
  p.ap -= cost;
  G.lastAttackSide = G.turn % 2;
  G.stats.attacks++;

  const surprise = G.firstStrike && (G.turn % 2) === 0;
  if(surprise) G.firstStrike = false;
  const counters = (surprise || a.noDefense) ? [] : getCounters(o, product);
  const defenderSide = 1 - (G.turn % 2);
  if(counters.length){
    if(defenderSide === G.humanSide){
      G.pendingAttack = {product, dmg, a, counters, defender:o, defenderSide};
      G.paused = true;
      showDefenseModal();
      return;
    }
    if(NET && NET.active && NET.role === "host"){
      G.pendingAttack = {product, dmg, a, counters, defender:o, defenderSide};
      G.paused = true;
      netSendDefenseRequest(product, dmg, counters);
      netSendState();
      return;
    }
    if(dmg >= 3 || o.hp <= 8){
      const c = counters[0];
      consumeCounter(o, c);
      o.apDebt = (o.apDebt||0) + 1;
      const made = DEF_PRODUCT[product+"|"+c.card];
      if(made) o.hand.push(made);
      o.hp -= 1;
      log(`对手${defenseLine(product, c.card)}。`, "sys");
      if(checkWin()) return;
      render();
      return;
    }
  }
  applyHit(p, o, a, dmg, product);
}


function claim(objName){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("claim", {objName}); return; }
  const p = G.players[G.turn % 2], o = G.players[1-(G.turn % 2)];
  const objective = G.objectives.find(x=>x.name===objName);
  const cost = chemKey(p)==="woodward" ? 1 : 2;
  if(G.over || G.claimedThisTurn || p.ap < cost) return;
  if(!objective || objective.claimed) return;
  const idx = p.hand.indexOf(objName);
  if(idx < 0) return;
  if(o.review){
    o.review = false;
    G.stats.blocks++;
    p.ap -= cost;
    G.claimedThisTurn = true;
    log(`${p.name} 宣告「${objName}」，被「同行评审」驳回（产物保留）。`);
    render();
    return;
  }
  p.hand.splice(idx,1); p.discard.push(objName);
  p.ap -= cost; p.claims++; G.claimedThisTurn = true;
  objective.claimed = true;
  const dmg = RULES.claimDamage + (chemKey(p)==="woodward" ? 2 : 0);
  o.hp -= dmg;
  p.bonusAp = (p.bonusAp||0) + 1;
  drawMat(p, 2);
  log(`${p.name} 完成课题「${objName}」：${dmg} 点伤害并抽 2。`);
  if(window.SFX) SFX.claim();
  showFormula({name:objName, mat:{[objName]:1}, cond:{}, out:objName});
  render();
  synthPose();
  if(checkWin()) return;
}

function playEvent(card){
  if(G && G.paused) return;
  if(NET && NET.active && NET.role === "client"){ netClientAction("playEvent", {card}); return; }
  const p = G.players[G.turn % 2], o = G.players[1-(G.turn % 2)];
  if(G.over || p.ap < 1) return;
  if(card === "同行评审" && p.review) return;
  const idx = p.hand.indexOf(card);
  if(idx < 0) return;
  p.hand.splice(idx,1); p.discard.push(card); p.ap -= 1;
  if(card === "暴沸"){
    if(o.hand.length){
      const i = Math.floor(Math.random()*o.hand.length);
      const c = o.hand.splice(i,1)[0];
      o.discard.push(c);
      log(`${p.name} 打出「暴沸」，${o.name} 弃掉 ${c}。`);
    } else log(`${p.name} 打出「暴沸」，对手没有手牌。`);
  } else if(card === "通风橱"){
    p.poison = 0;
    log(`${p.name} 打出「通风橱」，清除中毒。`);
  } else if(card === "论文发表"){
    drawMat(p, 2);
    log(`${p.name} 打出「论文发表」，抽 2 张。`);
  } else if(card === "同行评审"){
    p.review = true;
    log(`${p.name} 挂起「同行评审」。`);
  }
  render();
}

function isAITurn(){
  if(NET && NET.active) return false;
  return !!(G && !G.over && (G.turn%2)===1);
}

function aiScore(rec, p, o){
  if(rec.obj) return 100;
  if(rec.out === "氯气") return 78 + (3-o.poison)*5;
  if(["乙醇","乙酸","乙醛","苯酚","硝基苯","HNO3","NO2","NH3","Ca(OH)2"].includes(rec.out)) return 55;
  return 15;
}

function demandMap(){
  const m = new Map();
  const walk = (name, obj, depth) => {
    if(depth <= 0) return;
    const rec = RECIPES.find(r=>r.out===name);
    if(!rec) return;
    Object.keys(rec.mat).forEach(x=>{ if(!m.has(x)) m.set(x, obj); walk(x, obj, depth-1); });
    Object.keys(rec.cond).forEach(x=>{ if(!m.has(x)) m.set(x, obj); });
  };
  G.objectives.filter(o=>!o.claimed).forEach(o=>{ m.set(o.name, o.name); walk(o.name, o.name, 5); });
  return m;
}

function demandSet(){
  const d = new Set();
  const walk = (name, depth) => {
    if(depth <= 0) return;
    const rec = RECIPES.find(r=>r.out===name);
    if(!rec) return;
    Object.keys(rec.mat).forEach(x=>{ d.add(x); walk(x, depth-1); });
    Object.keys(rec.cond).forEach(x=>d.add(x));
  };
  G.objectives.filter(o=>!o.claimed).forEach(o=>{ d.add(o.name); walk(o.name, 5); });
  return d;
}

function aiAfter(){ if(!G.over) setTimeout(aiTurn, 520); }

function aiTurn(){ if(isAITurn()) aiAct(1); }

function isActiveObj(name){
  return G.objectives.some(o=>!o.claimed && o.name===name);
}

function aiAct(side){
  if(!G || G.over || G.paused) return;
  const p = G.players[side], o = G.players[1-side];
  if(p.hand.includes("同行评审") && !p.review && p.ap >= 1){ playEvent("同行评审"); aiAfter(); return; }
  const obj = G.objectives.find(x=>!x.claimed && p.hand.includes(x.name));
  const claimCost = chemKey(p)==="woodward" ? 1 : 2;
  if(obj && p.ap >= claimCost && !G.claimedThisTurn){ claim(obj.name); aiAfter(); return; }
  if(p.privateShelf && p.privateShelf.length && p.hand.length < 7){ takePrivate(p.privateShelf[0]); aiAfter(); return; }
  if(!p.attacked && p.ap >= (RULES.attackCost||0)){
    const list = Object.keys(ATTACKS).filter(x=>p.hand.includes(x));
    if(list.length){
      list.sort((a,b)=>ATTACKS[b].dmg-ATTACKS[a].dmg);
      attack(list[0]); aiAfter(); return;
    }
  }
  const opts = [];
  const dm = demandMap();
  for(const rec of RECIPES){
    const plan = planRecipe(p, rec);
    if(!plan.ok || p.ap < plan.cost) continue;
    const activeObj = isActiveObj(rec.out);
    const useful = activeObj || ATTACKS[rec.out] || dm.has(rec.out);
    if(!useful) continue;
    if(!activeObj && !ATTACKS[rec.out] && count(p.hand, rec.out) > 0) continue;
    let s = activeObj ? 100 : (ATTACKS[rec.out] ? 85 : 60);
    opts.push({rec, s: s - plan.cost*6});
  }
  if(opts.length){ opts.sort((a,b)=>b.s-a.s); doRecipe(opts[0].rec); aiAfter(); return; }
  for(const rec of RECIPES){
    const plan = planRecipe(p, rec);
    if(plan.ok || plan.missing.length !== 1) continue;
    if(!rec.obj && !ATTACKS[rec.out] && !dm.has(rec.out)) continue;
    if(rec.obj && !isActiveObj(rec.out)) continue;
    const card = plan.missing[0];
    if(G.bench[card] && G.bench[card].stock > 0 && !p.benchUsed[card] && p.takes < RULES.takesPerTurn){
      takeBench(card); aiAfter(); return;
    }
  }
  if(aiResearch()){ aiAfter(); return; }
  if(aiSearch(side)){ aiAfter(); return; }
  if(p.hand.includes("通风橱") && p.poison >= 2 && p.ap >= 1){ playEvent("通风橱"); aiAfter(); return; }
  if(p.hand.includes("论文发表") && p.ap >= 1 && p.hand.length <= 5){ playEvent("论文发表"); aiAfter(); return; }
  if(p.hand.includes("暴沸") && p.ap >= 1 && o.hand.length >= 5){ playEvent("暴沸"); aiAfter(); return; }
  endTurn();
}

/* ---------- 视觉 ---------- */
function showFormula(rec){
  const el = $("formulaFx");
  const parts = [...Object.entries(rec.mat), ...Object.entries(rec.cond)]
    .map(([k,v])=> (FORMULAS[k]||k) + (v>1?`×${v}`:""));
  el.innerHTML = `<div class="fx-line">${parts.join(" + ")}</div>
    <div class="fx-arrow">↓</div>
    <div class="fx-out">${FORMULAS[rec.out]||rec.out}</div>`;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"), 1600);
}

function showGas(){
  const side = G.turn % 2;
  const el = $("gasFx");
  el.classList.remove("fly-left","fly-right");
  el.style.left = side===0 ? "58%" : "42%";
  void el.offsetWidth;
  el.classList.add(side===0 ? "fly-left" : "fly-right");
  document.body.classList.add("shake");
  setTimeout(()=>document.body.classList.remove("shake"), 420);
  setTimeout(()=>el.classList.remove("fly-left","fly-right"), 1200);
}

function synthPose(){
  const side = G.turn % 2;
  const img = side===0 ? $("pSprite") : $("aSprite");
  if(!img) return;
  const p = G.players[side];
  const idle = `美术/立绘/${spriteOf(p)}_idle.png`;
  img.src = `美术/立绘/${spriteOf(p)}_synth.png`;
  setTimeout(()=>{ if(G && !G.over) img.src = idle; }, 1100);
}

function closeHint(){
  if(G) G.hint = null;
  const box = $("hintBox");
  if(box) box.classList.add("hidden");
  applyHint();
}

function applyHint(){
  document.querySelectorAll(".hint-glow").forEach(el=>el.classList.remove("hint-glow"));
  if(!G || !G.hint) return;
  document.querySelectorAll("#hand .card").forEach(el=>{
    if(G.hint.cards.includes(el.dataset.card)) el.classList.add("hint-glow");
  });
  document.querySelectorAll("#bench .slot").forEach(el=>{
    if(G.hint.bench.includes(el.dataset.bench)) el.classList.add("hint-glow");
  });
}

function showAttackHint(c, dmg, lethal){
  const box = $("hintBox");
  const a = ATTACKS[c];
  const cost = RULES.attackCost || 0;
  G.sel = {};
  box.innerHTML = `<button class="hclose" onclick="closeHint()">×</button>
    <h4>提示 · ${lethal ? "这一下可以直接击败对手" : "本回合可以先攻击"}</h4>
    <div class="hsub">手上有 <b>${c}</b>，攻击消耗 ${cost} 点活化能。</div>
    <div class="hrow"><b>${c}</b><span>${dmg} 点伤害</span><span class="warn">${a.text}</span></div>
    <div class="hfoot"><button class="btn primary" ${p.ap>=cost?"":"disabled"} onclick="closeHint();attack('${c}')">攻击对手（${dmg} 点 · ${cost} 费）</button></div>`;
  G.hint = {cards:[c], bench:[]};
  box.classList.remove("hidden");
  render();
}

function showClaimHint(objName){
  const p = G.players[0];
  const cost = chemKey(p)==="woodward" ? 1 : 2;
  const box = $("hintBox");
  box.innerHTML = `<button class="hclose" onclick="closeHint()">×</button>
    <h4>提示 · 课题「${objName}」可以宣告</h4>
    <div class="hsub">产物已经在手，支付 ${cost} 点活化能造成 ${RULES.claimDamage} 点伤害并抽 2 张。</div>
    <div class="hrow"><b>${objName}</b><span>×1</span><span class="ok">手牌 ✓</span></div>
    <div class="hfoot"><button class="btn primary" onclick="closeHint();claim('${objName}')">宣告课题（${cost} 点）</button></div>`;
  G.hint = {cards:[objName], bench:[]};
  box.classList.remove("hidden");
  render();
}

function showCraftHint(rec, plan, kicker){
  const p = G.players[0];
  const box = $("hintBox");
  const need = recipeNeed(rec);
  G.sel = {};
  Object.entries(need).forEach(([c,n])=>{ if(count(p.hand,c)>=n) G.sel[c]=n; });
  const rows = Object.entries(need).map(([c,n])=>{
    const have = Math.min(count(p.hand,c), n);
    const bench = plan.fromBench.find(x=>x[0]===c);
    let where;
    if(have >= n) where = `<span class="ok">手牌 ✓</span>`;
    else if(bench) where = `<span class="warn">试剂台可取 ${n-have} 张</span>`;
    else where = `<span class="bad">还缺 ${n-have} 张</span>`;
    return `<div class="hrow"><b>${c}</b><span>×${n}</span>${where}</div>`;
  }).join("");
  const benchCards = plan.fromBench.map(x=>x[0]);
  const apTxt = p.ap >= plan.cost
    ? `${plan.cost} 点活化能`
    : `<span class="bad">活化能不足：需 ${plan.cost}，当前 ${p.ap}</span>`;
  box.innerHTML = `<button class="hclose" onclick="closeHint()">×</button>
    <h4>提示 · ${kicker}</h4>
    <div class="hsub">${apTxt} ｜ 合成「${rec.name}」→ <b>${rec.out}</b></div>
    ${rows}
    <div class="hfoot">${plan.fromBench.length===0
      ? `<button class="btn primary" onclick="closeHint();react()">合成「${rec.out}」</button>`
      : `<button class="btn primary" ${p.ap>=plan.cost?"":"disabled"} onclick="hintCraft('${rec.id}')">取料并合成「${rec.out}」</button>`}</div>`;
  G.hint = {cards:Object.keys(G.sel), bench:benchCards};
  box.classList.remove("hidden");
  render();
}

function showMissingHint(rec, owner){
  const p = G.players[0];
  const box = $("hintBox");
  const plan = planRecipe(p, rec);
  const missing = plan.missing;
  const rows = missing.map(c=>{
    const onBench = !!G.bench[c] && G.bench[c].stock > 0;
    return `<div class="hrow"><b>${c}</b><span>×1</span>${onBench
      ? `<span class="warn">在公共试剂台，点「取」</span>`
      : `<span class="bad">不在手牌/试剂台，点「检索」找</span>`}</div>`;
  }).join("");
  const canResearch = !p.researchUsed && p.ap>=2;
  box.innerHTML = `<button class="hclose" onclick="closeHint()">×</button>
    <h4>提示 · 课题「${rec.out}」还差 ${missing.length} 张</h4>
    <div class="hsub">${owner && owner !== rec.out ? `这一步是「${owner}」的前置。` : ""}
      凑齐后再合成「${rec.name}」。</div>
    ${rows}
    <div class="hfoot">${canResearch
      ? `<button class="btn primary" onclick="closeHint();research()">课题研究（${researchCost(p)} 点，定向找 1 张）</button>`
      : `<span class="warn">取完或检索到之后，再点一次「提示」。</span>`}</div>`;
  G.hint = {cards:[], bench:missing.filter(c=>G.bench[c] && G.bench[c].stock>0)};
  box.classList.remove("hidden");
  render();
}

function hint(){
  if(!G || G.over || isAITurn()) return;
  if(G.difficulty !== "easy") return;
  const p = G.players[0], o = G.players[1];
  const all = RECIPES.map(rec=>({rec, plan:planRecipe(p,rec)}));
  const dm = demandMap();
  const claimCost = chemKey(p)==="woodward" ? 1 : 2;

  // 1. 产物已在手，直接宣告课题
  const claimable = G.objectives.find(x=>!x.claimed && p.hand.includes(x.name));
  if(claimable && !G.claimedThisTurn && p.ap >= claimCost){
    showClaimHint(claimable.name);
    return;
  }

  // 2. 斩杀线攻击
  if(!p.attacked && p.ap >= (RULES.attackCost||0)){
    const atkList = Object.keys(ATTACKS).filter(c=>p.hand.includes(c))
      .sort((a,b)=>ATTACKS[b].dmg-ATTACKS[a].dmg);
    if(atkList.length){
      const c = atkList[0], a = ATTACKS[c];
      let dmg = a.dmg + Math.min(Math.max(p.chain-1,0),4);
      dmg += nobelBonus(p);
      dmg += scheeleBonus(p, c);
      if(dmg >= o.hp){ showAttackHint(c, dmg, true); return; }
    }
  }

  // 3. 课题产物可以直接做
  const objCraft = all.filter(x=>isActiveObj(x.rec.out) && x.plan.ok && p.ap>=x.plan.cost);
  if(objCraft.length){
    const x = objCraft[0];
    showCraftHint(x.rec, x.plan, `课题「${x.rec.out}」可以直接合成`);
    return;
  }

  // 4. 为了课题先做中间体
  const interCraft = all.filter(x=>
    !x.rec.obj && !ATTACKS[x.rec.out] && dm.has(x.rec.out) &&
    x.plan.ok && p.ap>=x.plan.cost && count(p.hand, x.rec.out) === 0
  );
  if(interCraft.length){
    interCraft.sort((a,b)=>a.plan.cost-b.plan.cost);
    const x = interCraft[0];
    showCraftHint(x.rec, x.plan, `为了课题「${dm.get(x.rec.out)}」，先做这一步`);
    return;
  }

  // 5. 离课题最近的一步
  const objSteps = all.filter(x=>isActiveObj(x.rec.out) && x.plan.missing.length>0)
    .sort((a,b)=>a.plan.missing.length-b.plan.missing.length);
  if(objSteps.length){
    showMissingHint(objSteps[0].rec, objSteps[0].rec.out);
    return;
  }

  // 6. 没有课题可推进时，才提示普通攻击
  if(!p.attacked && p.ap >= (RULES.attackCost||0)){
    const atkList = Object.keys(ATTACKS).filter(c=>p.hand.includes(c))
      .sort((a,b)=>ATTACKS[b].dmg-ATTACKS[a].dmg);
    if(atkList.length){
      const c = atkList[0], a = ATTACKS[c];
      let dmg = a.dmg + Math.min(Math.max(p.chain-1,0),4);
      dmg += nobelBonus(p);
      dmg += scheeleBonus(p, c);
      showAttackHint(c, dmg, false);
      return;
    }
  }

  const box = $("hintBox");
  box.innerHTML = `<button class="hclose" onclick="closeHint()">×</button>
    <h4>提示</h4><div class="hsub">现在没有能推进课题或攻击的动作。先点「检索」抽牌，或结束回合。</div>`;
  G.hint = null;
  box.classList.remove("hidden");
  render();
}


function hintCraft(id){
  if(!G || G.over) return;
  const p = G.players[0];
  const rec = RECIPES.find(r=>r.id===id);
  if(!rec) return;
  const plan = planRecipe(p, rec);
  if(!plan.ok || p.ap < plan.cost) return;
  plan.fromBench.forEach(([c,n])=>{ for(let i=0;i<n;i++) takeBench(c); });
  const need = recipeNeed(rec);
  G.sel = {};
  Object.entries(need).forEach(([c,n])=>{ if(count(p.hand,c)>=n) G.sel[c]=n; });
  closeHint();
  react();
}

/* ---------- 渲染 ---------- */
function typeOf(c){
  if(isEvent(c)) return "event";
  if(isCond(c)) return "cond";
  if(ATTACKS[c]) return "attack";
  if(isProduct(c)) return "product";
  return "material";
}

function statOf(c){
  if(ATTACKS[c]){
    const a = ATTACKS[c];
    const extra = a.noDefense && !/不可吸收/.test(a.text) ? " · 不可吸收" : "";
    return `${a.dmg} 伤 · ${a.text}${extra}`;
  }
  if(isEvent(c)) return EVENT_DESC[c];
  if(isCond(c)) return "条件";
  return FORMULAS[c] || "物质";
}

function svgWrap(inner){
  return `<svg viewBox="0 0 100 54" class="struct-svg" aria-hidden="true">${inner}</svg>`;
}

function aromSVG(name){
  const sub = {
    "苯酚":"OH","苯胺":"NH2","溴苯":"Br","硝基苯":"NO₂","甲苯":"CH₃",
    "苯甲酸":"COOH","苯甲醛":"CHO","苯乙酮":"COCH₃","苯磺酸":"SO₃H",
    "阿司匹林":"OCOCH₃","水杨酸":"COOH"
  }[name] || "";
  const p = [];
  const cx=32, cy=27, r=14;
  const pts = [];
  for(let i=0;i<6;i++){
    const a = Math.PI/3*i - Math.PI/2;
    pts.push([cx+r*Math.cos(a), cy+r*Math.sin(a)]);
  }
  p.push(`<polygon points="${pts.map(q=>q.map(v=>v.toFixed(1)).join(",")).join(" ")}" fill="none" stroke="#141414" stroke-width="1.6"/>`);
  p.push(`<circle cx="${cx}" cy="${cy}" r="7.5" fill="none" stroke="#141414" stroke-width="1.2"/>`);
  if(sub){
    p.push(`<line x1="${cx+r}" y1="${cy}" x2="58" y2="${cy}" stroke="#141414" stroke-width="1.4"/>`);
    p.push(`<text x="60" y="${cy+3}" font-size="8" fill="#141414" font-family="Consolas,monospace">${sub}</text>`);
  }
  return svgWrap(p.join(""));
}

function polySVG(name){
  const unit = {
    "聚乙烯":"CH₂—CH₂","聚氯乙烯":"CH₂—CHCl","聚苯乙烯":"CH₂—CH(C₆H₅)",
    "聚丙烯":"CH₂—CH(CH₃)","尼龙 66":"NH—(CH₂)₆—NH—CO—(CH₂)₄—CO",
    "聚对苯二甲酸乙二醇酯":"O—CH₂CH₂—O—CO—C₆H₄—CO",
    "淀粉":"C₆H₁₀O₅","纤维素":"C₆H₁₀O₅","多肽":"NH—CHR—CO","油脂":"CH₂—O—CO—R"
  }[name] || "—";
  const fs = unit.length > 16 ? 6 : 7.5;
  return svgWrap(`
    <path d="M14 14 h6 v28 h-6" fill="none" stroke="#141414" stroke-width="1.4"/>
    <path d="M80 14 h6 v28 h-6" fill="none" stroke="#141414" stroke-width="1.4"/>
    <text x="26" y="32" font-size="${fs}" fill="#141414" font-family="Consolas,monospace">${unit}</text>
    <text x="90" y="42" font-size="8" fill="#C8402F" font-family="Consolas,monospace">n</text>`);
}

function simpleSVG(name, fs){
  if(name==="水" || fs==="H₂O"){
    return svgWrap(`<text x="50" y="30" text-anchor="middle" font-size="11" fill="#141414" font-family="Consolas,monospace">O</text>
      <line x1="44" y1="33" x2="30" y2="42" stroke="#141414" stroke-width="1.4"/>
      <line x1="56" y1="33" x2="70" y2="42" stroke="#141414" stroke-width="1.4"/>
      <text x="23" y="49" font-size="9" fill="#141414">H</text><text x="71" y="49" font-size="9" fill="#141414">H</text>`);
  }
  if(name==="过氧化氢" || fs==="H₂O₂"){
    return svgWrap(`<text x="26" y="31" font-size="10" fill="#141414">H</text>
      <line x1="34" y1="27" x2="44" y2="21" stroke="#141414" stroke-width="1.4"/>
      <text x="45" y="20" font-size="10" fill="#141414">O</text>
      <line x1="54" y1="21" x2="64" y2="27" stroke="#141414" stroke-width="1.4"/>
      <text x="64" y="31" font-size="10" fill="#141414">O</text>
      <line x1="72" y1="24" x2="80" y2="18" stroke="#141414" stroke-width="1.4"/>
      <text x="80" y="18" font-size="10" fill="#141414">H</text>`);
  }
  if(name==="二氧化碳" || fs==="CO₂"){
    return svgWrap(`<text x="12" y="31" font-size="10" fill="#141414">O</text>
      <line x1="22" y1="27" x2="38" y2="27" stroke="#141414" stroke-width="1.4"/>
      <line x1="22" y1="31" x2="38" y2="31" stroke="#141414" stroke-width="1.4"/>
      <text x="40" y="31" font-size="10" fill="#141414">C</text>
      <line x1="52" y1="27" x2="68" y2="27" stroke="#141414" stroke-width="1.4"/>
      <line x1="52" y1="31" x2="68" y2="31" stroke="#141414" stroke-width="1.4"/>
      <text x="70" y="31" font-size="10" fill="#141414">O</text>`);
  }
  if(name==="氨" || fs==="NH₃"){
    return svgWrap(`<text x="50" y="30" text-anchor="middle" font-size="11" fill="#141414">N</text>
      <line x1="45" y1="34" x2="28" y2="44" stroke="#141414" stroke-width="1.3"/>
      <line x1="55" y1="34" x2="72" y2="44" stroke="#141414" stroke-width="1.3"/>
      <line x1="50" y1="37" x2="50" y2="49" stroke="#141414" stroke-width="1.3"/>
      <text x="22" y="51" font-size="8" fill="#141414">H</text><text x="73" y="51" font-size="8" fill="#141414">H</text><text x="47" y="53" font-size="8" fill="#141414">H</text>`);
  }
  if(name==="二氧化锰" || fs==="MnO₂"){
    return svgWrap(`<text x="10" y="31" font-size="10" fill="#141414">O</text>
      <line x1="20" y1="27" x2="36" y2="27" stroke="#141414" stroke-width="1.4"/>
      <line x1="20" y1="31" x2="36" y2="31" stroke="#141414" stroke-width="1.4"/>
      <text x="38" y="31" font-size="10" fill="#141414">Mn</text>
      <line x1="58" y1="27" x2="74" y2="27" stroke="#141414" stroke-width="1.4"/>
      <line x1="58" y1="31" x2="74" y2="31" stroke="#141414" stroke-width="1.4"/>
      <text x="76" y="31" font-size="10" fill="#141414">O</text>`);
  }
  if(name==="二氧化硫" || fs==="SO₂"){
    return svgWrap(`<text x="50" y="32" text-anchor="middle" font-size="10" fill="#141414">S</text>
      <line x1="44" y1="27" x2="28" y2="20" stroke="#141414" stroke-width="1.4"/>
      <line x1="45" y1="31" x2="29" y2="24" stroke="#141414" stroke-width="1.4"/>
      <text x="18" y="24" font-size="10" fill="#141414">O</text>
      <line x1="56" y1="27" x2="72" y2="20" stroke="#141414" stroke-width="1.4"/>
      <line x1="55" y1="31" x2="71" y2="24" stroke="#141414" stroke-width="1.4"/>
      <text x="74" y="24" font-size="10" fill="#141414">O</text>`);
  }
  if(name==="硫化氢" || fs==="H₂S"){
    return svgWrap(`<text x="50" y="33" text-anchor="middle" font-size="11" fill="#141414">S</text>
      <line x1="44" y1="28" x2="30" y2="19" stroke="#141414" stroke-width="1.4"/>
      <line x1="56" y1="28" x2="70" y2="19" stroke="#141414" stroke-width="1.4"/>
      <text x="23" y="18" font-size="9" fill="#141414">H</text><text x="72" y="18" font-size="9" fill="#141414">H</text>`);
  }
  if(name==="氯化氢" || fs==="HCl"){
    return svgWrap(`<text x="22" y="31" font-size="10" fill="#141414">H</text>
      <line x1="32" y1="27" x2="58" y2="27" stroke="#141414" stroke-width="1.6"/>
      <text x="60" y="31" font-size="10" fill="#141414">Cl</text>`);
  }
  if(name==="浓硫酸" || fs==="H₂SO₄"){
    return svgWrap(`<text x="46" y="31" font-size="10" fill="#141414">S</text>
      <line x1="50" y1="22" x2="50" y2="12" stroke="#141414" stroke-width="1.4"/>
      <line x1="54" y1="22" x2="54" y2="12" stroke="#141414" stroke-width="1.4"/>
      <text x="50" y="11" font-size="9" fill="#141414">O</text>
      <line x1="56" y1="28" x2="70" y2="28" stroke="#141414" stroke-width="1.4"/>
      <line x1="56" y1="32" x2="70" y2="32" stroke="#141414" stroke-width="1.4"/>
      <text x="72" y="32" font-size="9" fill="#141414">O</text>
      <line x1="44" y1="28" x2="30" y2="28" stroke="#141414" stroke-width="1.4"/>
      <text x="24" y="32" font-size="9" fill="#141414">HO</text>
      <line x1="46" y1="34" x2="46" y2="44" stroke="#141414" stroke-width="1.4"/>
      <text x="41" y="52" font-size="9" fill="#141414">OH</text>`);
  }
  if(name==="浓硝酸" || fs==="HNO₃"){
    return svgWrap(`<text x="44" y="31" font-size="10" fill="#141414">N</text>
      <line x1="48" y1="22" x2="58" y2="14" stroke="#141414" stroke-width="1.4"/>
      <line x1="51" y1="25" x2="61" y2="17" stroke="#141414" stroke-width="1.4"/>
      <text x="60" y="13" font-size="9" fill="#141414">O</text>
      <line x1="52" y1="30" x2="68" y2="30" stroke="#141414" stroke-width="1.4"/>
      <text x="70" y="34" font-size="9" fill="#141414">O</text>
      <line x1="40" y1="28" x2="28" y2="20" stroke="#141414" stroke-width="1.4"/>
      <text x="20" y="18" font-size="9" fill="#141414">HO</text>`);
  }
  if(["氯气","溴","碘","氢气","氧气","氮气"].includes(name)){
    const a = fs.replace(/[₀-₉]/g,"").replace(/\d/g,"") || name[0];
    return svgWrap(`<text x="24" y="31" font-size="11" fill="#141414" font-family="Consolas,monospace">${a}</text>
      <line x1="40" y1="27" x2="60" y2="27" stroke="#141414" stroke-width="1.8"/>
      <text x="62" y="31" font-size="11" fill="#141414" font-family="Consolas,monospace">${a}</text>`);
  }
  return svgWrap(`<rect x="8" y="7" width="84" height="40" rx="3" fill="none" stroke="#D8D3C6" stroke-dasharray="3 2"/>
    <text x="50" y="32" text-anchor="middle" font-size="10" fill="#141414" font-family="Consolas,monospace">${fs||name}</text>`);
}

function chainSVG(name){
  const fs = FORMULAS[name] || "";
  const m = fs.match(/C(\d*)/);
  let n = m ? (m[1] ? parseInt(m[1]) : 1) : 0;
  n = Math.max(1, Math.min(n, 6));
  const pts = [];
  for(let i=0;i<n;i++){
    pts.push([12 + i*14, i%2===0 ? 30 : 20]);
  }
  const poly = pts.map(p=>p.join(",")).join(" ");
  let g = "";
  if(/酸$/.test(name) && !/氨基酸/.test(name)) g="COOH";
  else if(/酯$/.test(name)) g="COO";
  else if(/醛$/.test(name)) g="CHO";
  else if(/酮$/.test(name)) g="C=O";
  else if(/醇$/.test(name)) g="OH";
  else if(/酚$/.test(name)) g="OH";
  else if(/胺$/.test(name)) g="NH₂";
  else if(/酰胺$/.test(name)) g="CONH₂";
  else if(/腈$/.test(name)) g="CN";
  const end = pts[pts.length-1];
  const gx = end[0] + 8;
  return svgWrap(`
    <polyline points="${poly}" fill="none" stroke="#141414" stroke-width="1.8"/>
    <text x="${pts[0][0]-4}" y="${pts[0][1]+14}" font-size="7" fill="#8A867C">CH₃</text>
    ${g?`<text x="${gx}" y="${end[1]+3}" font-size="7.5" fill="#141414" font-family="Consolas,monospace">${g}</text>`:""}
    <text x="84" y="47" font-size="7" fill="#8A867C" text-anchor="end">${fs}</text>`);
}

function condSVG(name){
  if(/点燃/.test(name)){
    return svgWrap(`<line x1="30" y1="46" x2="52" y2="24" stroke="#8A867C" stroke-width="2"/>
      <circle cx="53" cy="23" r="2.4" fill="#C8402F"/>
      <path d="M62 10c-7 9-10 14-10 18a10 10 0 0 0 20 0c0-4-3-9-10-18z" fill="none" stroke="#C8402F" stroke-width="1.6"/>
      <path d="M62 22c-2 3-3 5-3 7a3 3 0 0 0 6 0c0-2-1-4-3-7z" fill="#C8402F"/>`);
  }
  if(/加热|高温|灼烧|煅烧/.test(name)){
    return svgWrap(`<path d="M30 12h16v13l12 17H18l12-17z" fill="none" stroke="#141414" stroke-width="1.6"/>
      <line x1="25" y1="37" x2="51" y2="37" stroke="#C8402F" stroke-width="2"/>
      <path d="M62 18c-8 10-11 15-11 20a11 11 0 0 0 22 0c0-5-3-10-11-20z" fill="none" stroke="#C8402F" stroke-width="1.6"/>
      <path d="M62 30c-3 4-4 6-4 8a4 4 0 0 0 8 0c0-2-1-4-4-8z" fill="#C8402F"/>`);
  }
  if(/催化剂/.test(name)){
    return svgWrap(`<path d="M42 10h18v14l12 18H30l12-18z" fill="none" stroke="#141414" stroke-width="1.6"/>
      <line x1="36" y1="38" x2="66" y2="38" stroke="#8A867C" stroke-width="1.2"/>
      <circle cx="42" cy="33" r="2.4" fill="#141414"/><circle cx="50" cy="37" r="2.4" fill="#141414"/>
      <circle cx="58" cy="32" r="2.4" fill="#141414"/><circle cx="62" cy="38" r="2.4" fill="#141414"/>
      <text x="72" y="22" font-size="13" fill="#C8402F">+</text>`);
  }
  if(/光照|光/.test(name)){
    return svgWrap(`<circle cx="50" cy="27" r="9" fill="none" stroke="#C8402F" stroke-width="1.8"/>
      ${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<line x1="${50+Math.cos(a)*14}" y1="${27+Math.sin(a)*14}" x2="${50+Math.cos(a)*22}" y2="${27+Math.sin(a)*22}" stroke="#141414" stroke-width="1.4"/>`}).join("")}`);
  }
  if(/通电|电解|电/.test(name)){
    return svgWrap(`<polygon points="55,6 36,30 48,30 42,48 66,22 53,22" fill="none" stroke="#C8402F" stroke-width="1.8"/>
      <line x1="18" y1="46" x2="30" y2="46" stroke="#141414" stroke-width="1.4"/>
      <line x1="70" y1="46" x2="82" y2="46" stroke="#141414" stroke-width="1.4"/>`);
  }
  if(/加压|高压/.test(name)){
    return svgWrap(`<rect x="30" y="10" width="40" height="9" fill="none" stroke="#141414" stroke-width="1.6"/>
      <line x1="50" y1="19" x2="50" y2="34" stroke="#141414" stroke-width="2"/>
      <polyline points="42,30 50,38 58,30" fill="none" stroke="#141414" stroke-width="2"/>
      <line x1="26" y1="43" x2="74" y2="43" stroke="#8A867C" stroke-width="1.4"/>
      <polyline points="38,47 30,43 38,39" fill="none" stroke="#C8402F" stroke-width="1.4"/>
      <polyline points="62,47 70,43 62,39" fill="none" stroke="#C8402F" stroke-width="1.4"/>`);
  }
  if(/中毒|毒/.test(name)){
    return svgWrap(`<circle cx="36" cy="30" r="10" fill="none" stroke="#141414" stroke-width="1.4"/>
      <circle cx="52" cy="24" r="12" fill="none" stroke="#141414" stroke-width="1.4"/>
      <circle cx="66" cy="32" r="9" fill="none" stroke="#141414" stroke-width="1.4"/>
      <line x1="43" y1="38" x2="57" y2="48" stroke="#C8402F" stroke-width="2"/>
      <line x1="57" y1="38" x2="43" y2="48" stroke="#C8402F" stroke-width="2"/>`);
  }
  if(/冷却|降温|低温/.test(name)){
    return svgWrap(`<line x1="50" y1="8" x2="50" y2="46" stroke="#141414" stroke-width="1.6"/>
      <line x1="34" y1="17" x2="66" y2="37" stroke="#141414" stroke-width="1.6"/>
      <line x1="66" y1="17" x2="34" y2="37" stroke="#141414" stroke-width="1.6"/>
      <circle cx="50" cy="27" r="3" fill="none" stroke="#C8402F" stroke-width="1.4"/>`);
  }
  return svgWrap(`<circle cx="50" cy="27" r="14" fill="none" stroke="#141414" stroke-width="1.6"/>
    <circle cx="50" cy="27" r="5" fill="none" stroke="#C8402F" stroke-width="1.6"/>
    ${Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return `<line x1="${50+Math.cos(a)*14}" y1="${27+Math.sin(a)*14}" x2="${50+Math.cos(a)*19}" y2="${27+Math.sin(a)*19}" stroke="#141414" stroke-width="1.4"/>`}).join("")}`);
}

function eventSVG(name){
  if(/暴沸/.test(name)){
    return svgWrap(`<path d="M38 10h24v14l10 18H28l10-18z" fill="none" stroke="#141414" stroke-width="1.6"/>
      <line x1="32" y1="36" x2="68" y2="36" stroke="#C8402F" stroke-width="1.8"/>
      <circle cx="40" cy="7" r="2.4" fill="none" stroke="#C8402F" stroke-width="1.2"/>
      <circle cx="50" cy="4" r="2" fill="none" stroke="#C8402F" stroke-width="1.2"/>
      <circle cx="61" cy="8" r="2.6" fill="none" stroke="#C8402F" stroke-width="1.2"/>`);
  }
  if(/通风橱/.test(name)){
    return svgWrap(`<rect x="24" y="10" width="52" height="36" rx="2" fill="none" stroke="#141414" stroke-width="1.6"/>
      <circle cx="50" cy="28" r="4" fill="none" stroke="#C8402F" stroke-width="1.4"/>
      <path d="M50 24c-8-2-13-8-12-13 6 1 12 6 12 13z" fill="none" stroke="#141414" stroke-width="1.4"/>
      <path d="M54 28c2-8 8-13 13-12-1 6-6 12-13 12z" fill="none" stroke="#141414" stroke-width="1.4"/>
      <path d="M50 32c8 2 13 8 12 13-6-1-12-6-12-13z" fill="none" stroke="#141414" stroke-width="1.4"/>
      <path d="M46 28c-2 8-8 13-13 12 1-6 6-12 13-12z" fill="none" stroke="#141414" stroke-width="1.4"/>`);
  }
  if(/论文/.test(name)){
    return svgWrap(`<path d="M30 8h30l10 10v28H30z" fill="none" stroke="#141414" stroke-width="1.6"/>
      <path d="M60 8v10h10" fill="none" stroke="#141414" stroke-width="1.4"/>
      <line x1="37" y1="24" x2="63" y2="24" stroke="#8A867C" stroke-width="1.2"/>
      <line x1="37" y1="30" x2="63" y2="30" stroke="#8A867C" stroke-width="1.2"/>
      <line x1="37" y1="36" x2="54" y2="36" stroke="#8A867C" stroke-width="1.2"/>`);
  }
  if(/评审/.test(name)){
    return svgWrap(`<circle cx="50" cy="27" r="17" fill="none" stroke="#C8402F" stroke-width="1.8"/>
      <polyline points="40,27 48,35 62,18" fill="none" stroke="#C8402F" stroke-width="2.4"/>
      <path d="M28 45h44" stroke="#141414" stroke-width="1.2"/>`);
  }
  return svgWrap(`<path d="M30 8h40v38H30z" fill="none" stroke="#141414" stroke-width="1.6"/>
    <line x1="37" y1="20" x2="63" y2="20" stroke="#8A867C" stroke-width="1.2"/>
    <line x1="37" y1="27" x2="63" y2="27" stroke="#8A867C" stroke-width="1.2"/>
    <line x1="37" y1="34" x2="54" y2="34" stroke="#8A867C" stroke-width="1.2"/>`);
}

function structureSVG(name){
  if(isCond(name)) return condSVG(name);
  if(isEvent(name)) return eventSVG(name);
  if(/苯|萘/.test(name)) return aromSVG(name);
  if(/^聚|尼龙|PET|淀粉|纤维素|多肽|油脂|对苯二甲酸乙二醇酯/.test(name)) return polySVG(name);
  const fs = FORMULAS[name] || "";
  const ionic = /钠|钾|钙|铵|铁|铜|锌|铝|银|锰|铬/.test(name);
  if(!ionic && /C/.test(fs) && !/二氧化碳|碳酸/.test(name)) return chainSVG(name);
  return simpleSVG(name, fs);
}

function cardHTML(c, opts={}){
  const t = typeOf(c);
  const sel = (G && G.sel[c]) ? " selected" : "";
  const draggable = opts.draggable === false ? "" : 'draggable="true"';
  return `<div class="card ${t}${sel}" ${draggable} data-card="${c}"
    onclick="toggleCard('${c}')" ondragstart="onDragStart(event,'${c}')" ondragend="onDragEnd(event)">
    <div class="cname">${c}</div>
    <div class="cstruct">${structureSVG(c)}</div>
    <div class="cformula">${FORMULAS[c]||""}</div>
    <div class="cstat">${statOf(c)}</div>
    <div class="cbadge">${t==="attack"?"攻击":t==="event"?"事件":t==="cond"?"条件":t==="product"?"产物":"物质"}</div>
  </div>`;
}

function render(){
  if(!G) return;
  const p = G.players[MY_SIDE], o = G.players[1-MY_SIDE];
  const human = (NET && NET.active) ? (G.turn%2) === MY_SIDE : !isAITurn();

  for(const c of Object.keys(G.sel || {})){
    if(G.sel[c] > count(p.hand,c)) G.sel[c] = count(p.hand,c);
    if(!G.sel[c]) delete G.sel[c];
  }

  $("pName").textContent = (NET && NET.active) ? "你" : p.name;
  $("pChem").textContent = `${p.chemist} · ${CHEMISTS[p.chemist].desc}`;
  $("pHP").textContent = Math.max(0,p.hp);
  $("pStatus").textContent = `中毒 ${p.poison}${p.shield?" · 护盾 "+p.shield:""}${p.choke?" · 窒息":""}${p.review?" · 评审":""}`;
  const psBox = $("privateShelf");
  if(psBox){
    psBox.innerHTML = p.privateShelf && p.privateShelf.length
      ? `<span class="pslabel">私人试剂</span>` + p.privateShelf.map(c=>
          `<button class="psbtn" ${human&&!G.over?"":"disabled"} onclick="takePrivate('${c}')">${c}</button>`).join("")
      : `<span class="pslabel">私人试剂已用完</span>`;
  }
  $("aName").textContent = (NET && NET.active) ? (NET.oppName || "对手") : o.name;
  $("aChem").textContent = `${o.chemist} · ${CHEMISTS[o.chemist].desc}`;
  $("aHP").textContent = Math.max(0,o.hp);
  $("aStatus").textContent = `中毒 ${o.poison}${o.shield?" · 护盾 "+o.shield:""}${o.choke?" · 窒息":""}${o.review?" · 评审":""}`;
  const ah = $("aHand");
  if(ah) ah.textContent = `手牌 ${o.handCount != null ? o.handCount : o.hand.length}`;
  $("pSprite").src = `美术/立绘/${spriteOf(p)}_idle.png`;
  $("aSprite").src = `美术/立绘/${spriteOf(o)}_idle.png`;
  $("pSprite").classList.toggle("active", human && !G.over);
  $("aSprite").classList.toggle("active", !human && !G.over);

  $("roundInfo").textContent = `第 ${Math.floor(G.turn/2)+1} 回合 · ${human?"你的回合":"对手回合"} · 活化能 ${human?p.ap:o.ap}`;

  $("objectives").innerHTML = G.objectives.map(x=>{
    const held = p.hand.includes(x.name);
    return `<div class="obj ${x.claimed?"done":""} ${held?"held":""}">${x.name}</div>`;
  }).join("");

  $("bench").innerHTML = BENCH_CARDS.map(c=>{
    const s = G.bench[c], used = p.benchUsed[c];
    const dis = G.over || !human || used || s.stock<=0 || p.takes>=RULES.takesPerTurn;
    return `<div class="slot ${used?"used":""}" data-bench="${c}">
      <div class="sname">${c}</div>
      <div class="dots">${"●".repeat(s.stock)}${"○".repeat(Math.max(0,RULES.benchStock-s.stock))}</div>
      <button ${dis?"disabled":""} onclick="takeBench('${c}')">取</button>
    </div>`;
  }).join("");

  const need = G.sel;
  const rec = findRecipeByNeed(need);
  const drop = $("drop");
  if(Object.keys(need).length === 0){
    drop.innerHTML = `<div class="drop-hint">把手牌拖到这里<br><span>或直接点击手牌</span></div>`;
    drop.classList.remove("ready");
  } else {
    const chips = Object.entries(need).map(([k,v])=>`<span class="chip">${k}${v>1?"×"+v:""}</span>`).join("");
    if(rec){
      drop.innerHTML = `<div class="drop-recipe">${chips}<div class="arrow">→</div><b>${rec.name}</b><div class="out">${rec.out}</div>
        <button class="btn primary" onclick="react()">合成（${reactionCost(p,rec)} 点）</button>`;
      drop.classList.add("ready");
    } else {
      drop.innerHTML = `<div class="drop-recipe">${chips}<div class="muted">还不是一个配方</div>
        <button class="btn ghost" onclick="clearSel()">清空</button>`;
      drop.classList.remove("ready");
    }
  }

  $("hand").innerHTML = p.hand.map(c=>cardHTML(c)).join("") || `<div class="empty">手牌为空</div>`;
  $("handCount").textContent = `${p.hand.length}/7 · 牌库 ${p.matDeck.length + p.opDeck.length}`;

  const acts = [];
  const sc = chemKey(p)==="mendeleev" ? 1 : 2;
  acts.push(`<button class="btn" ${human&&!p.searched&&p.ap>=sc&&!G.over?"":"disabled"} onclick="search()">检索 <small>${sc} 点</small></button>`);
  acts.push(`<button class="btn" ${human&&!p.researchUsed&&p.ap>=researchCost(p)&&!G.over?"":"disabled"} onclick="research()">课题研究 <small>${researchCost(p)} 点 · 每局一次</small></button>`);
  const atkList = Object.keys(ATTACKS).filter(x=>p.hand.includes(x));
  atkList.forEach(x=>{
    let d = ATTACKS[x].dmg + Math.min(Math.max(p.chain-1,0),4);
    d += nobelBonus(p);
    d += scheeleBonus(p, x);
    acts.push(`<button class="btn danger" ${human&&!p.attacked&&!G.over?"":"disabled"} onclick="attack('${x}')">攻击「${x}」 <small>${d} 点</small></button>`);
  });
  const cc = chemKey(p)==="woodward" ? 1 : 2;
  G.objectives.forEach(x=>{
    if(!x.claimed && p.hand.includes(x.name)){
      acts.push(`<button class="btn primary" ${human&&!G.claimedThisTurn&&p.ap>=cc&&!G.over?"":"disabled"} onclick="claim('${x.name}')">宣告「${x.name}」 <small>${cc} 点</small></button>`);
    }
  });
  ["暴沸","通风橱","论文发表","同行评审"].forEach(e=>{
    if(p.hand.includes(e)) acts.push(`<button class="btn" ${human&&p.ap>=1&&!G.over?"":"disabled"} onclick="playEvent('${e}')">${e} <small>1 点</small></button>`);
  });
  acts.push(`<button class="btn ghost" ${human&&!G.over?"":"disabled"} onclick="endTurn()">结束回合</button>`);
  $("actions").innerHTML = acts.join("");

  $("log").classList.toggle("enemy-turn", !human);
  if(!human) $("roundInfo").textContent += " · 对手思考中…";
  applyHint();
}

/* ---------- 交互 ---------- */
function onDragStart(e, c){
  dragCard = c;
  e.dataTransfer.setData("text/plain", c);
  e.target.classList.add("dragging");
}
function onDragEnd(e){ dragCard = null; e.target.classList.remove("dragging"); }
function onDrop(e){
  e.preventDefault();
  const c = e.dataTransfer.getData("text/plain") || dragCard;
  if(c) addCard(c);
}
function onDragOver(e){ e.preventDefault(); }

function toggleModal(id, show){
  const el = $(id);
  el.classList.toggle("hidden", !show);
}

function buildGallery(){
  const cards = window.ALL_CARDS || [];
  const cats = {};
  cards.forEach(c=>{ const k=c.id[0]; (cats[k]=cats[k]||[]).push(c); });
  const order = ["A","B","C","D","E","F","G","H","I","J"];
  $("modalBody").innerHTML = order.filter(k=>cats[k]).map(k=>`
    <h3>${k} 类 · ${cats[k].length} 张</h3>
    <div class="gallery">${cats[k].map(c=>`
      <div class="gcard" onclick="zoomCard('${c.name}')"><div class="gid">${c.id}</div><div class="gname">${c.name}</div>
      <div class="gstruct">${structureSVG(c.name)}</div>
      <div class="gformula">${c.formula}</div><div class="gcat">${c.cat}</div>
      <div class="geffect">${c.effect}</div><div class="grarity">${c.rarity}</div></div>`).join("")}</div>
  `).join("");
}

function openGallery(){ buildGallery(); toggleModal("modal", true); }

function zoomCard(name){
  const c = (window.ALL_CARDS || []).find(x=>x.name === name);
  if(!c) return;
  $("modalBody").innerHTML = `<div class="zoom-wrap">
    <div class="zoom-card">
      <div class="zid">${c.id}</div>
      <div class="zname">${c.name}</div>
      <div class="zstruct">${structureSVG(c.name)}</div>
      <div class="zformula">${c.formula}</div>
      <div class="zcat">${c.cat} · ${c.rarity}</div>
    </div>
    <div class="zoom-side">
      <h3>${c.name}</h3>
      <p>${c.effect}</p>
      <button class="btn" onclick="buildGallery()">返回图鉴</button>
    </div>
  </div>`;
  toggleModal("modal", true);
}
function closeModal(){ toggleModal("modal", false); }
function toggleLog(){ $("log").classList.toggle("show"); }

function buildHandbook(){
  $("modalBody").innerHTML = `<div class="handbook">${RECIPES.map(r=>{
    const parts = [...Object.entries(r.mat), ...Object.entries(r.cond)].map(([k,v])=>v>1?`${k}×${v}`:k);
    return `<div class="hrow"><b>${r.name}</b><span>${parts.join(" + ")} → ${r.out}</span></div>`;
  }).join("")}</div>`;
}
function openHandbook(){ buildHandbook(); toggleModal("modal", true); }

function fillSelects(){
  const names = Object.keys(CHEMISTS);
  ["c0","c1"].forEach((id,i)=>{
    $(id).innerHTML = names.map(n=>`<option value="${n}">${n} · ${CHEMISTS[n].desc}</option>`).join("");
    $(id).selectedIndex = i;
  });
}

window.addEventListener("DOMContentLoaded", ()=>{
  fillSelects();
  renderLeaderboard();
  $("startBtn").addEventListener("click", startGame);
  const nameInput = $("pname");
  if(nameInput) nameInput.addEventListener("keydown", e=>{ if(e.key === "Enter") startGame(); });
  $("restartBtn").addEventListener("click", ()=>{
    if(typeof closeOnline === "function") closeOnline();
    $("gameover").classList.add("hidden");
    $("setup").classList.remove("hidden");
    G = null;
  });
  if(location.search.includes("auto")) setTimeout(startGame, 500);
  if(location.search.includes("demo")) setTimeout(()=>{
    if(!G) return;
    const p = G.players[0];
    p.hand = ["MnO2","HCl","加热"];
    G.sel = {MnO2:1, HCl:1, 加热:1};
    doRecipe(RECIPES.find(r=>r.id==="cl2"));
  }, 1100);
  if(location.search.includes("gallery")) setTimeout(openGallery, 900);
  if(location.search.includes("rules")) setTimeout(showRules, 700);
  if(location.search.includes("zoom=")){
    const zn = decodeURIComponent(location.search.split("zoom=")[1] || "");
    if(zn) setTimeout(()=>zoomCard(zn), 800);
  }
  if(location.search.includes("hint")) setTimeout(hint, 1300);
  if(location.search.includes("search")) setTimeout(()=>{ if(G && !G.over) search(); }, 1200);
  if(location.search.includes("discard")) setTimeout(()=>{
    if(!G || G.over) return;
    const p = G.players[0];
    while(p.hand.length < 10) drawCard(p, "mat");
    endTurn();
  }, 1300);
  if(location.search.includes("defense")) setTimeout(()=>{
    if(!G || G.over) return;
    G.players[1].hand.push("氯气");
    G.players[0].hand.push("氢氧化钠");
    G.turn = 1;
    attack("氯气");
  }, 1300);
  if(location.search.includes("research")) setTimeout(()=>{ if(G && !G.over) research(); }, 1200);
});
















