/* 扩展内容：项目书 B–H 类产物与反应（20261111 内容修订） */
window.EXTRA_MATERIALS = [["甲烷",2],["乙烷",1],["丙烷",1],["丙烯",1],["1,3-丁二烯",1],["乙炔",1],["甲苯",1],["乙苯",1],["苯乙烯",1],["环己烷",1],["环己烯",1],["氯甲烷",1],["氯乙烯",1],["四氯化碳",1],["氯仿",1],["甲醇",1],["异丙醇",1],["丙三醇",1],["乙醚",1],["甲醛",1],["果糖",1],["甘氨酸",1],["丙烯腈",1],["麦芽糖",1],["蔗糖",1],["乳糖",1],["纤维素",1],["多肽",1],["高锰酸钾",1],["重铬酸钾",1],["碘",1],["亚硫酸钠",1],["锌",1],["铜",1],["铝",1],["稀硫酸",1],["银氨溶液",1],["新制氢氧化铜",1],["氯化铁",1],["溴甲烷",1],["氯乙酸",1]];
window.EXTRA_OPS = [["高温",2],["加压",1],["酸性介质",1],["碱性水溶液",1]];
window.EXTRA_RECIPES = [
  {
    "id": "ch3cl",
    "name": "甲烷氯代",
    "mat": {
      "甲烷": 1,
      "Cl2": 1
    },
    "cond": {
      "光照": 1
    },
    "out": "氯甲烷",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "ch3oh",
    "name": "氯甲烷水解",
    "mat": {
      "氯甲烷": 1,
      "NaOH": 1
    },
    "cond": {},
    "out": "甲醇",
    "tags": [
      "hydrolysis"
    ]
  },
  {
    "id": "hcho",
    "name": "甲醇氧化",
    "mat": {
      "甲醇": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "甲醛",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "hcooh",
    "name": "甲醛氧化",
    "mat": {
      "甲醛": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "甲酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "c2h6",
    "name": "乙烯加氢",
    "mat": {
      "乙烯": 1,
      "H2": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "乙烷",
    "tags": [
      "addition"
    ]
  },
  {
    "id": "c2h5br",
    "name": "乙烷溴代",
    "mat": {
      "乙烷": 1,
      "Br2": 1
    },
    "cond": {
      "光照": 1
    },
    "out": "溴乙烷",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "ccl4",
    "name": "甲烷深度氯代",
    "mat": {
      "甲烷": 1,
      "Cl2": 1
    },
    "cond": {
      "光照": 1
    },
    "out": "四氯化碳",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "chcl3",
    "name": "甲烷氯代（氯仿）",
    "mat": {
      "甲烷": 1,
      "Cl2": 1
    },
    "cond": {
      "光照": 1
    },
    "out": "氯仿",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "c2h4br2",
    "name": "乙烯溴加成",
    "mat": {
      "乙烯": 1,
      "Br2": 1
    },
    "cond": {},
    "out": "1,2-二溴乙烷",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "vcm_c2h4",
    "name": "乙烯氧氯化制氯乙烯",
    "mat": {
      "乙烯": 1,
      "HCl": 1,
      "O2": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "氯乙烯",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "vcm_c2h2",
    "name": "乙炔与氯化氢加成",
    "mat": {
      "乙炔": 1,
      "HCl": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "氯乙烯",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "c2h2",
    "name": "甲烷裂解",
    "mat": {
      "甲烷": 1
    },
    "cond": {
      "高温": 1
    },
    "out": "乙炔",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "benzene",
    "name": "乙炔环化",
    "mat": {
      "乙炔": 1
    },
    "cond": {
      "催化剂": 1,
      "高温": 1
    },
    "out": "苯",
    "tags": [
      "aromatic"
    ]
  },
  {
    "id": "toluene",
    "name": "苯的甲基化",
    "mat": {
      "苯": 1,
      "氯甲烷": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "甲苯",
    "tags": [
      "aromatic"
    ]
  },
  {
    "id": "eb",
    "name": "苯乙基化",
    "mat": {
      "苯": 1,
      "乙烯": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "乙苯",
    "tags": [
      "aromatic"
    ]
  },
  {
    "id": "styrene",
    "name": "乙苯脱氢",
    "mat": {
      "乙苯": 1
    },
    "cond": {
      "催化剂": 1,
      "高温": 1
    },
    "out": "苯乙烯",
    "tags": [
      "aromatic"
    ]
  },
  {
    "id": "cyclohexane",
    "name": "苯加氢",
    "mat": {
      "苯": 1,
      "H2": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "环己烷",
    "tags": [
      "aromatic"
    ]
  },
  {
    "id": "cyclohexene",
    "name": "环己烷脱氢",
    "mat": {
      "环己烷": 1
    },
    "cond": {
      "催化剂": 1,
      "高温": 1
    },
    "out": "环己烯",
    "tags": [
      "elimination"
    ]
  },
  {
    "id": "ipa",
    "name": "丙烯水合",
    "mat": {
      "丙烯": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1
    },
    "out": "异丙醇",
    "tags": [
      "hydration"
    ]
  },
  {
    "id": "glycerol",
    "name": "油脂水解制甘油",
    "mat": {
      "油脂": 1,
      "NaOH": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "丙三醇",
    "tags": [
      "hydrolysis",
      "ester"
    ]
  },
  {
    "id": "ether",
    "name": "乙醇脱水制醚",
    "mat": {
      "乙醇": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "乙醚",
    "tags": [
      "dehydration"
    ]
  },
  {
    "id": "acetone",
    "name": "异丙醇氧化",
    "mat": {
      "异丙醇": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "丙酮",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "benzaldehyde",
    "name": "甲苯氧化",
    "mat": {
      "甲苯": 1,
      "O2": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "苯甲醛",
    "tags": [
      "aromatic",
      "oxidation"
    ]
  },
  {
    "id": "acetophenone",
    "name": "苯的乙酰化",
    "mat": {
      "苯": 1,
      "乙酸": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "苯乙酮",
    "tags": [
      "aromatic"
    ]
  },
  {
    "id": "cyclohexanone",
    "name": "环己烯氧化",
    "mat": {
      "环己烯": 1,
      "O2": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "环己酮",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "fructose",
    "name": "葡萄糖异构",
    "mat": {
      "葡萄糖": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "果糖",
    "tags": [
      "isomerization"
    ]
  },
  {
    "id": "oxalic",
    "name": "葡萄糖氧化",
    "mat": {
      "葡萄糖": 1,
      "浓硝酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "乙二酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "benzoic",
    "name": "甲苯氧化制苯甲酸",
    "mat": {
      "甲苯": 1,
      "高锰酸钾": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "苯甲酸",
    "tags": [
      "aromatic",
      "oxidation"
    ]
  },
  {
    "id": "stearic",
    "name": "油脂水解制硬脂酸",
    "mat": {
      "油脂": 1,
      "水": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "硬脂酸",
    "tags": [
      "hydrolysis",
      "ester"
    ]
  },
  {
    "id": "oleic",
    "name": "油脂水解制油酸",
    "mat": {
      "油脂": 1,
      "水": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "油酸",
    "tags": [
      "hydrolysis",
      "ester"
    ]
  },
  {
    "id": "lactic",
    "name": "葡萄糖发酵制乳酸",
    "mat": {
      "葡萄糖": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "乳酸",
    "tags": [
      "fermentation"
    ]
  },
  {
    "id": "acrylic",
    "name": "丙烯氧化",
    "mat": {
      "丙烯": 1,
      "O2": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "丙烯酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "ethylamine",
    "name": "氯乙烷氨解",
    "mat": {
      "氯乙烷": 1,
      "NH3": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "乙胺",
    "tags": [
      "nitrogen"
    ]
  },
  {
    "id": "urea",
    "name": "尿素合成",
    "mat": {
      "CO2": 1,
      "NH3": 1
    },
    "cond": {
      "加压": 1
    },
    "out": "尿素",
    "tags": [
      "nitrogen"
    ]
  },
  {
    "id": "glycine",
    "name": "氯乙酸氨解制甘氨酸",
    "mat": {
      "氯乙酸": 1,
      "NH3": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "甘氨酸",
    "tags": [
      "nitrogen",
      "chlorination"
    ]
  },
  {
    "id": "acetamide",
    "name": "乙酰胺合成",
    "mat": {
      "乙酸": 1,
      "NH3": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "乙酰胺",
    "tags": [
      "nitrogen"
    ]
  },
  {
    "id": "acrylonitrile",
    "name": "丙烯氨氧化",
    "mat": {
      "丙烯": 1,
      "NH3": 1,
      "O2": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "丙烯腈",
    "tags": [
      "nitrogen",
      "oxidation"
    ]
  },
  {
    "id": "maltose",
    "name": "淀粉部分水解",
    "mat": {
      "淀粉": 1,
      "水": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "麦芽糖",
    "tags": [
      "glycoside"
    ]
  },
  {
    "id": "sucrose",
    "name": "蔗糖合成",
    "mat": {
      "葡萄糖": 1,
      "果糖": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "蔗糖",
    "tags": [
      "glycoside"
    ]
  },
  {
    "id": "pvc",
    "name": "氯乙烯聚合",
    "mat": {
      "氯乙烯": 1
    },
    "cond": {
      "引发剂": 1
    },
    "out": "聚氯乙烯",
    "tags": [
      "polymer",
      "chlorination"
    ]
  },
  {
    "id": "ps",
    "name": "苯乙烯聚合",
    "mat": {
      "苯乙烯": 1
    },
    "cond": {
      "引发剂": 1
    },
    "out": "聚苯乙烯",
    "tags": [
      "polymer"
    ]
  },
  {
    "id": "pp",
    "name": "丙烯聚合",
    "mat": {
      "丙烯": 1
    },
    "cond": {
      "引发剂": 1
    },
    "out": "聚丙烯",
    "tags": [
      "polymer"
    ]
  },
  {
    "id": "sbr",
    "name": "丁二烯聚合",
    "mat": {
      "1,3-丁二烯": 1
    },
    "cond": {
      "引发剂": 1
    },
    "out": "顺丁橡胶",
    "tags": [
      "polymer"
    ]
  },
  {
    "id": "peptide",
    "name": "甘氨酸缩合",
    "mat": {
      "甘氨酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "多肽",
    "tags": [
      "polymer",
      "nitrogen"
    ]
  },
  {
    "id": "fecl3",
    "name": "铁与氯气",
    "mat": {
      "Fe": 1,
      "Cl2": 1
    },
    "cond": {},
    "out": "氯化铁",
    "tags": [
      "metal"
    ]
  },
  {
    "id": "na2so3",
    "name": "二氧化硫吸收",
    "mat": {
      "SO2": 1,
      "NaOH": 1
    },
    "cond": {},
    "out": "亚硫酸钠",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "ethylene_glycol",
    "name": "乙烯氧化制乙二醇",
    "mat": {
      "乙烯": 1,
      "O2": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "乙二醇",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "salicylic",
    "name": "苯酚羧化",
    "mat": {
      "苯酚": 1,
      "CO2": 1
    },
    "cond": {
      "加压": 1
    },
    "out": "水杨酸",
    "tags": [
      "aromatic"
    ]
  },
  {
    "id": "ester_hydro",
    "name": "酯水解",
    "mat": {
      "乙酸乙酯": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1
    },
    "out": "乙酸",
    "tags": [
      "ester",
      "oxidation"
    ]
  },
  {
    "id": "asp_hydro",
    "name": "阿司匹林水解",
    "mat": {
      "阿司匹林": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1
    },
    "out": "水杨酸",
    "tags": [
      "ester",
      "hydrolysis"
    ]
  },
  {
    "id": "oil_hydro",
    "name": "油脂酸性水解",
    "mat": {
      "油脂": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1,
      "加热": 1
    },
    "out": "硬脂酸",
    "tags": [
      "ester",
      "hydrolysis"
    ]
  },
  {
    "id": "sucrose_hydro",
    "name": "蔗糖水解",
    "mat": {
      "蔗糖": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1,
      "加热": 1
    },
    "out": "葡萄糖",
    "tags": [
      "hydrolysis"
    ]
  },
  {
    "id": "maltose_hydro",
    "name": "麦芽糖水解",
    "mat": {
      "麦芽糖": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1,
      "加热": 1
    },
    "out": "葡萄糖",
    "tags": [
      "hydrolysis"
    ]
  },
  {
    "id": "lactose_hydro",
    "name": "乳糖水解",
    "mat": {
      "乳糖": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1,
      "加热": 1
    },
    "out": "葡萄糖",
    "tags": [
      "hydrolysis"
    ]
  },
  {
    "id": "cellulose_hydro",
    "name": "纤维素水解",
    "mat": {
      "纤维素": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1,
      "加热": 1
    },
    "out": "葡萄糖",
    "tags": [
      "hydrolysis"
    ]
  },
  {
    "id": "peptide_hydro",
    "name": "多肽水解",
    "mat": {
      "多肽": 1,
      "水": 1
    },
    "cond": {
      "酸性介质": 1,
      "加热": 1
    },
    "out": "甘氨酸",
    "tags": [
      "nitrogen"
    ]
  },
  {
    "id": "ferment",
    "name": "葡萄糖发酵",
    "mat": {
      "葡萄糖": 1
    },
    "cond": {
      "催化剂": 1
    },
    "out": "乙醇",
    "tags": [
      "fermentation"
    ]
  },
  {
    "id": "ethane_crack",
    "name": "乙烷裂解",
    "mat": {
      "乙烷": 1
    },
    "cond": {
      "高温": 1
    },
    "out": "乙烯",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "propane_crack",
    "name": "丙烷裂解",
    "mat": {
      "丙烷": 1
    },
    "cond": {
      "高温": 1
    },
    "out": "丙烯",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "butadiene",
    "name": "乙醇制丁二烯",
    "mat": {
      "乙醇": 1
    },
    "cond": {
      "催化剂": 1,
      "高温": 1
    },
    "out": "1,3-丁二烯",
    "tags": [
      "dehydrogenation"
    ]
  },
  {
    "id": "nitroglycerin",
    "name": "甘油硝化",
    "mat": {
      "丙三醇": 1,
      "浓硝酸": 1,
      "浓硫酸": 1
    },
    "cond": {},
    "out": "硝化甘油",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "tnt",
    "name": "甲苯硝化",
    "mat": {
      "甲苯": 1,
      "浓硝酸": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "TNT",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "picric",
    "name": "苯酚硝化",
    "mat": {
      "苯酚": 1,
      "浓硝酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "苦味酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "nitrocellulose",
    "name": "纤维素硝化",
    "mat": {
      "纤维素": 1,
      "浓硝酸": 1,
      "浓硫酸": 1
    },
    "cond": {},
    "out": "硝化纤维",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "bromomethane",
    "name": "甲烷溴代",
    "mat": {
      "甲烷": 1,
      "Br2": 1
    },
    "cond": {
      "光照": 1
    },
    "out": "溴甲烷",
    "tags": [
      "chlorination"
    ]
  },
  {
    "id": "methyl_benzoate",
    "name": "苯甲酸甲酯化",
    "mat": {
      "苯甲酸": 1,
      "甲醇": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "苯甲酸甲酯",
    "tags": [
      "aromatic",
      "ester"
    ]
  },
  {
    "id": "methyl_salicylate",
    "name": "水杨酸甲酯化",
    "mat": {
      "水杨酸": 1,
      "甲醇": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "水杨酸甲酯",
    "tags": [
      "aromatic",
      "ester"
    ]
  },
  {
    "id": "methyl_acetate",
    "name": "乙酸甲酯化",
    "mat": {
      "乙酸": 1,
      "甲醇": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "乙酸甲酯",
    "tags": [
      "ester"
    ]
  },
  {
    "id": "ethyl_formate",
    "name": "甲酸乙酯化",
    "mat": {
      "甲酸": 1,
      "乙醇": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "甲酸乙酯",
    "tags": [
      "ester"
    ]
  },
  {
    "id": "zn_h2",
    "name": "锌与稀硫酸制氢",
    "mat": {
      "锌": 1,
      "稀硫酸": 1
    },
    "cond": {},
    "out": "H2",
    "tags": [
      "metal"
    ]
  },
  {
    "id": "al_h2",
    "name": "铝与盐酸制氢",
    "mat": {
      "铝": 1,
      "盐酸": 1
    },
    "cond": {},
    "out": "H2",
    "tags": [
      "metal"
    ]
  },
  {
    "id": "cu_h2so4",
    "name": "铜与浓硫酸",
    "mat": {
      "铜": 1,
      "浓硫酸": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "SO2",
    "tags": [
      "metal",
      "oxidation"
    ]
  },
  {
    "id": "cu_hno3",
    "name": "铜与浓硝酸",
    "mat": {
      "铜": 1,
      "浓硝酸": 1
    },
    "cond": {},
    "out": "NO2",
    "tags": [
      "metal",
      "oxidation"
    ]
  },
  {
    "id": "ag_mirror_acetaldehyde",
    "name": "乙醛银镜氧化",
    "mat": {
      "乙醛": 1,
      "银氨溶液": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "乙酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "ag_mirror_formaldehyde",
    "name": "甲醛银镜氧化",
    "mat": {
      "甲醛": 1,
      "银氨溶液": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "甲酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "cuoh2_acetaldehyde",
    "name": "乙醛与新制氢氧化铜",
    "mat": {
      "乙醛": 1,
      "新制氢氧化铜": 1
    },
    "cond": {
      "加热": 1
    },
    "out": "乙酸",
    "tags": [
      "metal",
      "oxidation"
    ]
  },
  {
    "id": "k2cr2o7_ethanol",
    "name": "乙醇重铬酸钾氧化",
    "mat": {
      "乙醇": 1,
      "重铬酸钾": 1
    },
    "cond": {
      "酸性介质": 1,
      "加热": 1
    },
    "out": "乙酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "kmno4_ipa",
    "name": "异丙醇高锰酸钾氧化",
    "mat": {
      "异丙醇": 1,
      "高锰酸钾": 1
    },
    "cond": {},
    "out": "丙酮",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "brph_fecl3",
    "name": "氯化铁催化溴苯",
    "mat": {
      "苯": 1,
      "Br2": 1,
      "氯化铁": 1
    },
    "cond": {},
    "out": "溴苯",
    "tags": [
      "aromatic",
      "metal",
      "chlorination"
    ]
  },
  {
    "id": "hcooh_o2",
    "name": "甲醇催化氧化制甲酸",
    "mat": {
      "甲醇": 1,
      "O2": 1
    },
    "cond": {
      "催化剂": 1,
      "加热": 1
    },
    "out": "甲酸",
    "tags": [
      "oxidation"
    ]
  },
  {
    "id": "chloroacetic",
    "name": "乙酸氯代制氯乙酸",
    "mat": {
      "乙酸": 1,
      "Cl2": 1
    },
    "cond": {
      "光照": 1
    },
    "out": "氯乙酸",
    "tags": [
      "chlorination"
    ]
  }
];
