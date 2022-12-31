addLayer("Exp", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                   // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        level: new Decimal(0),
        pp: new Decimal(0),
        best11: new Decimal(0),
        best12: new Decimal(0),
        best21: new Decimal(0),
        best22: new Decimal(0),
        freepp: new Decimal(0),
        treepp: new Decimal(0),
        balanceTicai: new Decimal(10),
        ChineseRecent: new Decimal(0),
        EnglishRecent: new Decimal(0),
        inChallenge: false,
        selectedChallenge: false,
        bought55: false,
        bought56: false,
        bought58: false,
        bought59: false,
        bought60: false,
        bought62: false,
        bought63: false,
        bought65: false,
        bought66: false,
        bought67: false,
        bought68: false,
        bought70: false,
        bought71: false,
                     // "points" is the internal name for the main resource of the layer.
    }},
    requires: new Decimal(5),
    exponent: new Decimal(1),
    type: "static",

    
    color: "#6495ED",                       // The color for this layer, which affects many elements.
    resource: "经验点数",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).
    layerShown(){return hasMilestone("E",1)},
    unlocked(){return true},
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points }, 
    tooltip(){return "经验等级:"+player.Exp.level+"<br>("+format(player.Exp.points)+" / "+format(tmp.Exp.limit)+")"}, // A function to return the current amount of baseResource.
       // The amount of the base needed to  gain 1 of the prestige currency.
                                       // "normal" prestige gain is (currency^exponent).
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    expMult(){
let mult = new Decimal(1)
if(getBuyableAmount("C",43).gte(1)) mult = mult.mul(buyableEffect("C",43))
if(getBuyableAmount("Exp",55).gte(1)) mult = mult.mul(buyableEffect("Exp",55))
if(player.C.total2.gte(1)) mult = mult.mul(tmp.C.effect2)
if((getBuyableAmount("Exp",59)).gte(1)) mult = mult.mul(buyableEffect("Exp",59))
if(player.Eng.points.gte(1)) mult = mult.mul(new Decimal(10).pow(player.Eng.points).min(1e10))
if(hasUpgrade("Eng",14)) mult = mult.mul(upgradeEffect("Eng",14))
if(hasUpgrade("Eng",24)) mult = mult.mul(upgradeEffect("Eng",24))
if(hasUpgrade("Eng",34)) mult = mult.mul(upgradeEffect("Eng",34))
if(hasUpgrade("Eng",44)) mult = mult.mul(upgradeEffect("Eng",44))
if(hasUpgrade("Eng",54)) mult = mult.mul(upgradeEffect("Eng",54))
if(hasUpgrade("Eng",64)) mult = mult.mul(upgradeEffect("Eng",64))
if(hasUpgrade("Eng",74)) mult = mult.mul(upgradeEffect("Eng",74))
if(hasUpgrade("Eng",84)) mult = mult.mul(upgradeEffect("Eng",84))
if(hasChallenge("Exp",21)) mult = mult.mul(tmp.Exp.challenges[21].rewardEffect)
if(hasChallenge("Exp",22)) mult = mult.pow(tmp.Exp.challenges[22].rewardEffect)
return mult
    },
    maxBalance()
{
    let max = new Decimal(10)
    return max
},
    limit()
    {
        let lim = new Decimal(10).mul(new Decimal(2).pow(player.Exp.level.add(1)))
        if (lim.gte(1e12)) lim = lim.mul(new Decimal(2).pow(player.Exp.level.sub(35)))
        if (player.Exp.level.gte(250)) lim = lim.mul(new Decimal(5).pow(player.Exp.level.sub(250)))
        if((getBuyableAmount("Exp",60)).gte(1)) lim = lim.div(buyableEffect("Exp",60))
        return lim
    },
    infoboxes: {
        introBox: {
                title: "经验点数获取",
                body(){
                        let a = "每次参加中考，经验点数+10<br>中考成绩不足6分时，每获得1分，经验点数+5<br>中考成绩在6-10分之间时，每获得1分，经验点数+100<br>中考成绩在11-300分之间时，每获得1分，经验点数+10000"

                        return a
                },
        },
},
    bars:{

        NextCD: {
            direction: RIGHT,
            width: 700,
            height: 30,
            fillStyle: {'background-color' : "#6495ED"},
            Style: {'background-color' : "#6495ED"},
            req() {
                let req =new Decimal("1e3500")
                return req
            },
            display() {

                let r = "您需要 " + format(player.Exp.points) + " / " + format(tmp.Exp.limit)+ " 经验点数以升至下一经验等级，并获取 1 天赋点数"
                return r
            },
            progress() { 
                let f = player.Exp.points
                let p = f.div(tmp.Exp.limit)
                return p
            },
        },
    },
    update(diff)
    {
        if((player.Exp.points).gte(tmp.Exp.limit)) player.Exp.points = player.Exp.points.sub(tmp.Exp.limit),player.Exp.level = player.Exp.level.add(1),player.Exp.pp = player.Exp.pp.add(1)
        if((getBuyableAmount("Exp",11)).gte(player.Exp.best11)) player.Exp.best11 = getBuyableAmount("Exp",11)
        if((getBuyableAmount("Exp",12)).gte(player.Exp.best12)) player.Exp.best12 = getBuyableAmount("Exp",12)
        if((getBuyableAmount("Exp",21)).gte(player.Exp.best21)) player.Exp.best21 = getBuyableAmount("Exp",21)
        if((getBuyableAmount("Exp",57)).gte(player.Exp.best22)) player.Exp.best22 = getBuyableAmount("Exp",57)
        if(inChallenge("Exp",21)&&player.E.inExam.gte(1)&&player.E.completedExam.lt(1)&&player.E.Chinese.gt(player.Exp.ChineseRecent)) player.C.points = player.C.points.sqrt(),player.Exp.ChineseRecent = player.E.Chinese
        if(inChallenge("Exp",21)&&player.E.inExam.gte(1)&&player.E.completedExam.lt(1)&&player.E.English.gt(player.Exp.EnglishRecent)) player.Eng.power = player.Eng.power.sqrt(),player.Exp.EnglishRecent = player.E.English
        if(inChallenge("Exp",22)&&player.E.inExam.gte(1)&&player.E.completedExam.lt(1)&&player.E.Chinese.gt(player.Exp.ChineseRecent)) player.C.points = player.C.points.root(1.5),player.Exp.ChineseRecent = player.E.Chinese
        if(inChallenge("Exp",22)&&player.E.inExam.gte(1)&&player.E.completedExam.lt(1)&&player.E.English.gt(player.Exp.EnglishRecent)) player.Eng.power = player.Eng.power.root(1.5),player.Exp.EnglishRecent = player.E.English

    },
    effect()
    {
        let eff = new Decimal(1)
        eff = eff.mul(new Decimal(3).pow(player.Exp.level)).mul(player.points.add(10).log10().log2().cbrt())
        if(hasMilestone("E",2))eff = eff.mul(player.points.add(10).log10().log2().root(5))
        if(hasMilestone("E",4))eff = eff.pow(2)
        if(hasUpgrade("C",25))eff = eff.mul(upgradeEffect("C",25))
        if(hasMilestone("C",4))eff = eff.mul(tmp.C.effectGold2)
        if(hasMilestone("E",15))eff = eff.pow(2)
        return eff
    },
    tabFormat:{
        "Experience":{
            content:[
    "blank",
    ["display-text",
            function() {return "您的经验等级为 <h2 style='color:#6495ED;text-shadow:0px 0px 10px;'>"+player.Exp.level+"<h2><h4><br>这使得您的学分获取提升(基于经验等级的较大数值与学分的较小数值)<h2 style='color:#6495ED;text-shadow:0px 0px 10px;'>"+format(tmp.Exp.effect)+"x"},
            {}],
            "blank",
    ["bar", "NextCD"],
    ["infobox", "introBox"],

"blank",
"upgrades",

"milestones",

"blank",
, "blank", "blank", ]
},
"Genius":{
    content:[
"blank",

["display-text",
    function() {return "您当前拥有的天赋点为 <h2 style='color:#6495ED;text-shadow:0px 0px 10px;'>"+player.Exp.pp+"<h2>"},
    {}],
    "blank",
    ["row",[["buyable",11],["buyable",12],["buyable",13]]],
    ["row",[["buyable",21],["buyable",57],["buyable",64]]],
    ["row",[["buyable",41]]],
],
unlocked(){return hasMilestone("E",3)},
},
"Transformers":{
    content:[
"blank",

["display-text",
    function() {return "您当前拥有的天赋点为 <h2 style='color:#6495ED;text-shadow:0px 0px 10px;'>"+player.Exp.pp+"<h2>"},
    {}],
    ["display-text",
    function() {return "您的所有天赋转换器一共为您提供了天赋点数 <h2 style='color:#6495ED;text-shadow:0px 0px 10px;'>+"+player.Exp.freepp+"<h2>"},
    {}],
    "blank",
    ["row",[["buyable",51],["buyable",52]]],
    
],
unlocked(){return hasMilestone("E",7)},
},
"GeniusTree":{
    content:[
        "blank",

        ["display-text",
            function() {return "您当前拥有的天赋点为 <h2 style='color:#6495ED;text-shadow:0px 0px 10px;'>"+player.Exp.pp+"<h2>"},
            {}],
            ["display-text",
            function() {return "Tips:黄色线段表示该研究需要上方所有连接的研究全部购买，白色线段则表示该研究需要上方所有连接的研究购买任意一项。"},
            {}],
            "blank",
            ["row",[["buyable",53]]],
            "blank",
            "blank",
            ["row",[["buyable",55]]],
            "blank",
            "blank",
            ["row",[["buyable",56],["buyable",58]]],
            "blank",
            "blank",
            ["row",[["buyable",59],["buyable",60]]],
            "blank",
            "blank",
            ["row",[["buyable",62]]],
            "blank",
            "blank",
            ["row",[["buyable",63]]],
            "blank",
            "blank",
            ["row",[["buyable",65],["buyable",66]]],
            "blank",
            "blank",
            ["row",[["buyable",67],["buyable",68]]],
            "blank",
            "blank",
            ["row",[["buyable",70]]],
            "blank",
            "blank",
            ["row",[["buyable",71]]],
            "blank",
            "blank",
            ["row",[["buyable",72],["buyable",74],["buyable",73]]],
            "blank",
            "blank",
            ["row",[["buyable",75]]],
            "blank",
            "blank",
            ["row",[["buyable",76]]],
            
        ],
        unlocked(){return hasMilestone("E",11)&&(!inChallenge("Exp",11))},
        },
"Muse":{
    content:[
"blank",


    "blank",
    ["row",[["buyable",54],["buyable",61]]],
    ["row",[["buyable",69]]],
    
],
unlocked(){return hasMilestone("E",11)},
},

"Challenges":{
    content:[
        ["display-text",
        function() {return "当前挑战完成总进度： <h2 style='color:#B341E0;text-shadow:0px 0px 10px;'>"+tmp.Exp.totalChallenges+" / 60<h2>"},
        {}],
        ["display-text",
        function() {return "所有的挑战只能在中考外且距离中考0天时进入，在考试出分后完成或退出，其他时间考试将会隐藏。同时你需要在天赋树中购买对应挑战的研究才能进入该挑战！"},
        {}],
        ["display-text",
        function() {if(!player.Exp.inChallenge)return "你现在不在任何经验挑战中"},
        {}],
        ["display-text",
        function() {if(inChallenge("Exp",11))return "你现在正在经验挑战 1 中"},
        {}],
        ["display-text",
        function() {if(inChallenge("Exp",12))return "你现在正在经验挑战 2 中"},
        {}],
        ["display-text",
        function() {if(inChallenge("Exp",21))return "你现在正在经验挑战 3 中"},
        {}],
        ["display-text",
        function() {if(inChallenge("Exp",22))return "你现在正在经验挑战 4 中"},
        {}],
"challenges",
],
unlocked(){return player.Exp.bought70},
buttonStyle: {"border-color": "#A230D0","background-color": "#B341E0"},
},
},   
totalChallenges()
{
    let total = new Decimal(challengeCompletions("Exp",11))
    total = total.add(new Decimal(challengeCompletions("Exp",12)))
    total = total.add(new Decimal(challengeCompletions("Exp",21)))
    total = total.add(new Decimal(challengeCompletions("Exp",22)))
    return total
},       // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    buyables: {
        11: {
          title: "技能1：学分获取",
          canAfford() { return player.Exp.pp.gte(this.cost())},
          cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
          if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
          if(hasMilestone("E",8)&&!hasMilestone("Eng",0))return x
          if(hasMilestone("Eng",0)&&!hasMilestone("C",6)) return x.pow(0.9).floor()
          if(hasMilestone("C",6)&&!hasMilestone("E",15)) return x.pow(0.8).floor()
        if(hasMilestone("E",15)&&!hasMilestone("C",7)) return x.pow(0.75).floor()
    if(hasMilestone("C",7)) return x.pow(0.6).floor()},
          buy() {
            player.Exp.pp = player.Exp.pp.sub(this.cost())
             setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
             
          },
          display() {return `提升学分获取。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：学分获取x${format(this.effect())}`},
          effect(x) { 
            let base = new Decimal(10000)
            if(hasUpgrade("C",31)) base = base.mul(upgradeEffect("C",31))
            if(getBuyableAmount("Exp",62).gte(1)) base = base.mul(buyableEffect("Exp",62))
            if(!hasUpgrade("C",41))mult2 = base.pow(x)
            if(hasUpgrade("C",41)&&!hasMilestone("E",13))mult2 = base.pow(player.Exp.best11)
            if(hasMilestone("E",13))mult2 = base.pow(player.Exp.best11)
            if(hasMilestone("E",22))mult2 = new Decimal("1e500")
            return mult2},
          unlocked(){return hasMilestone("E",3)},
          style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
        },
        12: {
            title: "技能2：语文知识获取",
            cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
            if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
            if(hasMilestone("E",8)&&!hasMilestone("Eng",0))return x
            if(hasMilestone("Eng",0)&&!hasMilestone("C",6)) return x.pow(0.9).floor()
            if(hasMilestone("C",6)&&!hasMilestone("E",15)) return x.pow(0.8).floor()
            if(hasMilestone("E",15)&&!hasMilestone("C",7)) return x.pow(0.75).floor()
            if(hasMilestone("C",7)) return x.pow(0.6).floor()},
            canAfford() { return player.Exp.pp.gte(this.cost())},
            buy() {
                player.Exp.pp = player.Exp.pp.sub(this.cost())
               setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升语文知识获取。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：语文知识获取x${format(this.effect())}`},
            effect(x) { 
                let base = new Decimal(1000)
                if(hasUpgrade("C",32)) base = base.mul(upgradeEffect("C",32))
                if(hasMilestone("E",5)) base = base.mul(2)
                if((getBuyableAmount("C",42)).gte(1)) base = base.mul(buyableEffect("C",42))
                if(!hasUpgrade("C",42))mult2 = base.pow(x)
            if(hasUpgrade("C",42)&&!hasMilestone("E",13))mult2 = base.pow(player.Exp.best12)
            if(hasMilestone("E",13))mult2 = base.pow(player.Exp.best11)
            if(hasMilestone("E",22))mult2 = new Decimal("1e3000")
                return new Decimal(mult2)},
            unlocked(){return hasMilestone("E",3)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
          },
          13: {
            title: "技能3：第一行语文升级效果倍增",
            cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
            if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
            if(hasMilestone("E",8)&&!hasMilestone("Eng",0))return x
            if(hasMilestone("Eng",0)&&!hasMilestone("C",6)) return x.pow(0.9).floor()
            if(hasMilestone("C",6)&&!hasMilestone("E",15)) return x.pow(0.8).floor()
            if(hasMilestone("E",15)&&!hasMilestone("C",7)) return x.pow(0.75).floor()
            if(hasMilestone("C",7)) return x.pow(0.6).floor()},
            canAfford() { return player.Exp.pp.gte(this.cost())},
            buy() {
                player.Exp.pp = player.Exp.pp.sub(this.cost())
               setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升第一行全部语文升级效果。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：第一行全部语文升级效果x${format(this.effect())}`},
            effect(x) { 
                let base = new Decimal(20)
                if(hasUpgrade("C",33)) base = base.mul(upgradeEffect("C",33))
                if(!hasMilestone("E",13))mult2 = base.pow(x)
                if(hasMilestone("E",13))mult2 = base.pow(player.Exp.best11)
                if(hasMilestone("E",22))mult2 = new Decimal("1e150")
                return new Decimal(mult2)},
                style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",4)}
          },
          21: {
            title: "技能4：阅读摘抄能力提升",
            cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
            if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
            if(hasMilestone("E",8)&&!hasMilestone("Eng",0))return x
            if(hasMilestone("Eng",0)&&!hasMilestone("C",6)) return x.pow(0.9).floor()
            if(hasMilestone("C",6)&&!hasMilestone("E",15)) return x.pow(0.8).floor()
            if(hasMilestone("E",15)&&!hasMilestone("C",7)) return x.pow(0.75).floor()
            if(hasMilestone("C",7)) return x.pow(0.6).floor()},
            canAfford() { return player.Exp.pp.gte(this.cost())},
            buy() {
                player.Exp.pp = player.Exp.pp.sub(this.cost())
               setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `增加所有好文精华获取速度。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：所有好文精华获取速度x${format(this.effect())}`},
            effect(x) { 
                let base = new Decimal(1)
                if(!hasMilestone("E",9))mult2 = base.add(x)
                if(hasMilestone("E",9)&&!hasMilestone("E",13))mult2 = base.add(player.Exp.best21)
                if(hasMilestone("E",13))mult2 = base.add(player.Exp.best11)
                if(hasMilestone("E",22))mult2 = new Decimal("50")
                return mult2},
                style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",6)}
          },
          
          41: {
            title: "洗点",
            canAfford() { return true},
            buy() {
               setBuyableAmount("Exp",11,new Decimal(0))
               setBuyableAmount("Exp",12,new Decimal(0))
               setBuyableAmount("Exp",13,new Decimal(0))
               setBuyableAmount("Exp",21,new Decimal(0))
               setBuyableAmount("Exp",57,new Decimal(0))
               setBuyableAmount("Exp",64,new Decimal(0))
               
               player.Exp.pp = player.Exp.level.add(player.Exp.freepp).sub(player.Exp.treepp)
            },
            display() {return `重置天赋技能并且返还您全部的天赋点数。`},
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
              style() { return {'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return hasMilestone("E",3)}
          },
          51: {
            title: "天赋转换器-经验",
            canAfford() { return player.Exp.points.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(20)},
            cost(x) {return new Decimal(100).pow(x)},
            buy() {
                player.Exp.freepp = player.Exp.freepp.add(1)
                player.Exp.pp = player.Exp.pp.add(1)
                player.Exp.points = player.Exp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {return `将你的经验点数转化为天赋点数。(最多转换20个)价格：${format(this.cost())}经验点数\n效果：获得${format(this.effect())}个免费天赋点`},
            effect(x) { 
              return x
            },
              style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",7)}
          },
          52: {
            title: "天赋转换器-作文质量",
            canAfford() { return player.E.ccPoints.gte(this.cost())},
            cost(x) {return new Decimal(2500).mul(new Decimal(2).pow(x))},
            buy() {
                player.Exp.freepp = player.Exp.freepp.add(1)
                player.Exp.pp = player.Exp.pp.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {return `(*不消耗作文质量)将你的作文质量转化为天赋点数。<br>需要：${format(this.cost())}作文质量\n效果：获得${format(this.effect())}个免费天赋点`},
            effect(x) { 
              return x
            },
              style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",11)}
          },
          53: {
            title: "洗点",
            canAfford() { return true},
            buy() {
               player.Exp.pp = player.Exp.pp.add(player.Exp.treepp)
               player.Exp.treepp = new Decimal(0)
               player.Exp.selectedChallenge = false
               setBuyableAmount("Exp",55,new Decimal(0))
               setBuyableAmount("Exp",56,new Decimal(0))
               setBuyableAmount("Exp",58,new Decimal(0))
               setBuyableAmount("Exp",59,new Decimal(0))
               setBuyableAmount("Exp",60,new Decimal(0))
               setBuyableAmount("Exp",62,new Decimal(0))
               setBuyableAmount("Exp",63,new Decimal(0))
               setBuyableAmount("Exp",65,new Decimal(0))
               setBuyableAmount("Exp",66,new Decimal(0))
               setBuyableAmount("Exp",67,new Decimal(0))
               setBuyableAmount("Exp",68,new Decimal(0))
               setBuyableAmount("Exp",70,new Decimal(0))
               setBuyableAmount("Exp",71,new Decimal(0))
               setBuyableAmount("Exp",72,new Decimal(0))
               setBuyableAmount("Exp",73,new Decimal(0))
               setBuyableAmount("Exp",74,new Decimal(0))
               setBuyableAmount("Exp",75,new Decimal(0))
               setBuyableAmount("Exp",76,new Decimal(0))
            },
            display() {return `重置天赋树并且返还您全部的天赋点数。`},
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
              style() { return {'border-radius': "5px", height: "100px", width: "100px"}},
            unlocked(){return hasMilestone("E",11)}
          },
          54: {
            title: "作文题材挖掘-Uncommon",
            canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(5)},
            cost(x) {return new Decimal(25).add(new Decimal(5).mul(x))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.Exp.balanceTicai = player.Exp.balanceTicai.sub(1)
            },
            display() {return "进行生活实践，挖掘1个Uncommon级别的作文题材。<br>已挖掘总数："+getBuyableAmount(this.layer,this.id)+" / 5<br>需要: "+this.cost()+" 天赋点数"},
            effect(x) { 
              return x
            },
            style() { return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",11)}
          },
          55: {
     unlocked(){return true},
     title: "Chinese-11",
     cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(29)
     if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
     req(){return new Decimal(18000)},
     canAfford() { return player.Exp.pp.gte(this.cost())&&(player.E.ccPoints.gte(this.req())||player.Exp.bought55)},
     buy() {
     
     player.Exp.pp = player.Exp.pp.sub(this.cost())
     player.Exp.treepp = player.Exp.treepp.add(this.cost())
     player.Exp.bought55 = true
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
     },
     display() {return `价格：${format(this.cost())}天赋点数\n需要：${format(this.req())}作文质量\n效果：你每次写作可以选择2个题材或写作风格。同时中考最佳分数倍增经验获取。\n当前：x${format(this.effect())}`},
     effect(x) { 
     eff = player.E.bestPoints
     return eff
     },
     style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}
     if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
     },
     56: {
        unlocked(){return player.Exp.bought55},
        title: "Chinese-21",
        cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(4)
        if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
        canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",55).gte(1)},
        buy() {
        
        player.Exp.pp = player.Exp.pp.sub(this.cost())
        player.Exp.treepp = player.Exp.treepp.add(this.cost())
        player.Exp.bought56 = true
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() {return `价格：${format(this.cost())}天赋点数\n效果：解锁名著升级。上一阶好文精华达到一定数目时，可以提升脑洞等级，挖掘更高级脑洞。(曾经购买过即生效)\n同时阅读感悟获取提升10倍。(需要当前拥有)\n当前：x${format(this.effect())}`},
        effect(x) { 
        eff = new Decimal(10)
        return eff
        },
        style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "5px", height: "240px", width: "240px"}
        if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "240px", width: "240px"}},
        branches:["55"],
        },
        57: {
            title: "技能5：阅读感悟能力提升",
            cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
            if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
            if(hasMilestone("E",8)&&!hasMilestone("Eng",0))return x
        if(hasMilestone("Eng",0)&&!hasMilestone("C",6)) return x.pow(0.9).floor()
        if(hasMilestone("C",6)&&!hasMilestone("E",15)) return x.pow(0.8).floor()
        if(hasMilestone("E",15)&&!hasMilestone("C",7)) return x.pow(0.75).floor()
            if(hasMilestone("C",7)) return x.pow(0.6).floor()},
        canAfford() { return player.Exp.pp.gte(this.cost())},
            buy() {
                player.Exp.pp = player.Exp.pp.sub(this.cost())
               setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `增加阅读感悟获取速度。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：阅读感悟获取x${format(this.effect())}`},
            effect(x) { 
                let base = new Decimal(1.5)
                if(!player.Exp.bought58)mult2 = base.pow(x)
                if(player.Exp.bought58&&!hasMilestone("E",13))mult2 = base.pow(player.Exp.best22)
                if(hasMilestone("E",13))mult2 = base.pow(player.Exp.best11)
                if(hasMilestone("E",22))mult2 = new Decimal("1e10")
                return mult2},
                style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",12)}
          },
          58: {
            unlocked(){return player.Exp.bought55},
            title: "Chinese-22",
            cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(16)
            if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
            canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",55).gte(1)},
            buy() {
            
            player.Exp.pp = player.Exp.pp.sub(this.cost())
            player.Exp.treepp = player.Exp.treepp.add(this.cost())
            player.Exp.bought58 = true
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {return `价格：${format(this.cost())}天赋点数\n效果：解锁1个全新的阅读感悟升级(曾经购买过即生效)，且天赋技能5基于最佳。\n同时阅读感悟数量倍增语文知识获取。(曾经购买过即生效)\n当前：x${format(this.effect())}`},
            effect(x) { 
            eff = player.C.readingPoints.add(1)
            return eff
            },
            style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "5px", height: "240px", width: "240px"}
            if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "240px", width: "240px"}},
            branches:["55"],
            },
            59: {
                unlocked(){return player.Exp.bought57||player.Exp.bought58},
                title: "Chinese-31",
                cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(4)
                if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",56).gte(1)},
                buy() {
                
                player.Exp.pp = player.Exp.pp.sub(this.cost())
                player.Exp.treepp = player.Exp.treepp.add(this.cost())
                player.Exp.bought59 = true
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                display() {return `价格：${format(this.cost())}天赋点数\n效果：作文最佳分数倍增经验点数获取\n当前：x${format(this.effect())}`},
                effect(x) { 
                eff = player.E.ccBest.add(1)
                return eff
                },
                style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}
                if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                branches:["56"],
                },
                60: {
                    unlocked(){return player.Exp.bought57||player.Exp.bought58},
                    title: "Chinese-32",
                    cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(4)
                    if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                    canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",58).gte(1)},
                    buy() {
                    
                    player.Exp.pp = player.Exp.pp.sub(this.cost())
                    player.Exp.treepp = player.Exp.treepp.add(this.cost())
                    player.Exp.bought60 = true
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                    display() {return `价格：${format(this.cost())}天赋点数\n效果：经验获取阈值根据最佳中考分数而降低。\n当前：/${format(this.effect())}`},
                    effect(x) { 
                    eff = player.E.bestPoints.add(1)
                    return eff
                    },
                    style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}
                    if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                    branches:["58"],
                    },
                    61: {
                        title: "作文写作手法挖掘-Uncommon",
                        canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(5)},
                        cost(x) {return new Decimal(40).add(new Decimal(6).mul(x))},
                        buy() {
                            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                            player.Exp.balanceTicai = player.Exp.balanceTicai.sub(1)
                        },
                        display() {return "进行生活实践，挖掘1个Uncommon级别的作文写作手法。<br>已挖掘总数："+getBuyableAmount(this.layer,this.id)+" / 5<br>需要: "+this.cost()+" 天赋点数"},
                        effect(x) { 
                          return x
                        },
                        style() { return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "200px", width: "200px"}},
                        unlocked(){return hasMilestone("C",5)}
                      },
                      62: {
                        unlocked(){return player.Exp.bought59&&player.Exp.bought60},
                        title: "Chinese-41",
                        cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(5)
                        if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                        canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",59).gte(1)&&getBuyableAmount("Exp",60).gte(1)&&player.C.tier.gte(4)&&player.C.pps.gte(3.5)},
                        buy() {
                        
                        player.Exp.pp = player.Exp.pp.sub(this.cost())
                        player.Exp.treepp = player.Exp.treepp.add(this.cost())
                        player.Exp.bought62 = true
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                        },
                        display() {return `价格：${format(this.cost())}天赋点数\n需要：名著阶层到达 4 &脑洞每秒阅读能力达到 3.5\n效果：获得2个免费的阅读感悟技能5等级。同时，名著每提升1等阶，都会倍增一次天赋技能1基础。\n当前：x${format(this.effect())}`},
                        effect(x) { 
                        eff = new Decimal(2).pow(player.C.tier)
                        return eff
                        },
                        style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "5px", height: "240px", width: "240px"}
                        if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "240px", width: "240px"}},
                        branches: [["59","yellow",15],["60","yellow",15]],
                        },
                        63: {
                            unlocked(){return player.Exp.bought62},
                            title: "English-11",
                            cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(7)
                            if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                            canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",62).gte(1)&&player.C.tier.gte(6)},
                            buy() {
                            
                            player.Exp.pp = player.Exp.pp.sub(this.cost())
                            player.Exp.treepp = player.Exp.treepp.add(this.cost())
                            player.Exp.bought63 = true
                            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                            },
                            display() {return `价格：${format(this.cost())}天赋点数\n需要：名著阶层到达 6 \n效果：上方研究效果同样对英语知识生效！同时，如果您曾经购买过此研究，则解锁英语网格！\n当前：x${format(this.effect())}`},
                            effect(x) { 
                            eff = new Decimal(2).pow(player.C.tier)
                            return eff
                            },
                            style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "240px", width: "240px"}
                            if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "240px", width: "240px"}},
                            branches: ["62"],
                            },
                            64: {
                                title: "技能6：英语知识获取",
                                cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
                                if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
                                if(hasMilestone("E",8)&&!hasMilestone("Eng",0))return x
                            if(hasMilestone("Eng",0)&&!hasMilestone("C",6)) return x.pow(0.9).floor()
                            if(hasMilestone("C",6)&&!hasMilestone("E",15)) return x.pow(0.8).floor()
                            if(hasMilestone("E",15)&&!hasMilestone("C",7)) return x.pow(0.75).floor()
            if(hasMilestone("C",7)) return x.pow(0.6).floor()},
                            canAfford() { return player.Exp.pp.gte(this.cost())},
                                buy() {
                                    player.Exp.pp = player.Exp.pp.sub(this.cost())
                                   setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                   
                                },
                                display() {return `增加英语知识获取速度。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：英语知识获取x${format(this.effect())}`},
                                effect(x) { 
                                    let base = new Decimal(1.2)
                                    if(!player.Exp.bought58)mult2 = base.pow(x)
                                    if(player.Exp.bought58&&!hasMilestone("E",13))mult2 = base.pow(player.Exp.best22)
                                    if(hasMilestone("E",13))mult2 = base.pow(player.Exp.best11)
                                    if(hasMilestone("E",22))mult2 = new Decimal("1e10")
                                    return mult2},
                                    style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
                                unlocked(){return hasMilestone("E",15)}
                              },
                              65: {
                                unlocked(){return player.Exp.bought63},
                                title: "English-21",
                                cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(2)
                                if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",63).gte(1)},
                                buy() {
                                
                                player.Exp.pp = player.Exp.pp.sub(this.cost())
                                player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                player.Exp.bought65 = true
                                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                },
                                display() {return `价格：${format(this.cost())}天赋点数\n效果：阅读技能1基础效果提升40%。\n当前：+${format(this.effect().mul(100))}%`},
                                effect(x) { 
                                eff = new Decimal(0.4)
                                return eff
                                },
                                style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "120px", width: "240px"}
                                if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                branches: ["63"],
                                },
                                66: {
                                    unlocked(){return player.Exp.bought63},
                                    title: "English-22",
                                    cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(3)
                                    if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                    canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",63).gte(1)},
                                    buy() {
                                    
                                    player.Exp.pp = player.Exp.pp.sub(this.cost())
                                    player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                    player.Exp.bought66 = true
                                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                    },
                                    display() {return `价格：${format(this.cost())}天赋点数\n效果：英语单词效应提升至5次方！\n当前：x${format(this.effect())}`},
                                    effect(x) { 
                                    eff = tmp.Eng.ppEffect.pow(4)
                                    return eff
                                    },
                                    style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "120px", width: "240px"}
                                    if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                    branches: ["63"],
                                    },
                                    67: {
                                        unlocked(){return player.Exp.bought65&&player.Exp.bought66},
                                        title: "English-31",
                                        cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(8)
                                        if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                        canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",65).gte(1)&&getBuyableAmount("Exp",66).gte(1)},
                                        buy() {
                                        
                                        player.Exp.pp = player.Exp.pp.sub(this.cost())
                                        player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                        player.Exp.bought67 = true
                                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                        },
                                        display() {return `价格：${format(this.cost())}天赋点数\n效果：大大改良英语语法生产英语知识的公式！\n当前：x^3+1 => 100^(x^1.05)`},
                                        effect(x) { 
                                        eff = tmp.Eng.ppEffect.pow(4)
                                        return eff
                                        },
                                        style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "120px", width: "240px"}
                                        if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                        branches:[["65","yellow",15],["66","yellow",15]],
                                        },
                                        68: {
                                            unlocked(){return player.Exp.bought65&&player.Exp.bought66},
                                            title: "English-32",
                                            cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(8)
                                            if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                            canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",65).gte(1)&&getBuyableAmount("Exp",66).gte(1)},
                                            buy() {
                                            
                                            player.Exp.pp = player.Exp.pp.sub(this.cost())
                                            player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                            player.Exp.bought68 = true
                                            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                            },
                                            display() {return `价格：${format(this.cost())}天赋点数\n效果：阅读技能5效果始终为-9。\n当前：-${format(this.effect())}`},
                                            effect(x) { 
                                            eff = new Decimal(9)
                                            return eff
                                            },
                                            style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "120px", width: "240px"}
                                            if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                            branches: [["65","yellow",15],["66","yellow",15]],
                                            },
                                            69: {
                                                title: "作文写作手法挖掘-Rare",
                                                canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(1)},
                                                cost(x) {return new Decimal(127)},
                                                buy() {
                                                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                    player.Exp.balanceTicai = player.Exp.balanceTicai.sub(1)
                                                },
                                                display() {return "进行生活实践，挖掘1个Rare级别的作文写作手法。<br>已挖掘总数："+getBuyableAmount(this.layer,this.id)+" / 1<br>需要: "+this.cost()+" 天赋点数"},
                                                effect(x) { 
                                                  return x
                                                },
                                                style() { return {'background-color': "#1035D0", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "200px", width: "200px"}},
                                                unlocked(){return hasMilestone("Eng",7)}
                                              },
                                              70: {
                                                unlocked(){return player.Exp.bought67&&player.Exp.bought68},
                                                title: "经验挑战 1",
                                                cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(160)
                                                if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                                canAfford() { return !player.Exp.selectedChallenge&&player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",67).gte(1)&&getBuyableAmount("Exp",68).gte(1)&&player.E.bestPoints.gte(this.req())},
                                                buy() {
                                                    player.Exp.selectedChallenge = true
                                                player.Exp.pp = player.Exp.pp.sub(this.cost())
                                                player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                                player.Exp.bought70 = true
                                                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                },
                                                req(){return new Decimal(128)},
                                                display() {return "解锁该挑战花费：160天赋点数<br>需要最高中考分数达到 "+this.req()+"<br>完成次数："+challengeCompletions("Exp",11)+" / 5"},
                                                effect(x) { 
                                                eff = new Decimal(9)
                                                return eff
                                                },
                                                style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#B341E0", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#C452F1",'border-radius': "5px", height: "120px", width: "240px"}
                                                if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#FFFFFF", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                                branches: [["67","yellow",15],["68","yellow",15]],
                                                },
                                                71: {
                                                    unlocked(){return challengeCompletions("Exp",11) >= 1},
                                                    title: "English-41",
                                                    cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(170)
                                                    if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                                    canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",67).gte(1)&&getBuyableAmount("Exp",68).gte(1)},
                                                    buy() {
                                                    
                                                    player.Exp.pp = player.Exp.pp.sub(this.cost())
                                                    player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                                    player.Exp.bought71 = true
                                                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                    },
                                                    display() {return `价格：${format(this.cost())}天赋点数\n效果：将EngK3受到网格力量的加成移到硬上限之后。\n当前：在上面写着了！`},
                                                    effect(x) { 
                                                    eff = new Decimal(9)
                                                    return eff
                                                    },
                                                    style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "120px", width: "240px"}
                                                    if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                                    branches: ["70"],
                                                    },
                                                    72: {
                                                        unlocked(){return player.Exp.bought71},
                                                        title: "English-51",
                                                        cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(40)
                                                        if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                                        canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",71).gte(1)},
                                                        buy() {
                                                        
                                                        player.Exp.pp = player.Exp.pp.sub(this.cost())
                                                        player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                        },
                                                        display() {return `价格：${format(this.cost())}天赋点数\n效果：ReqN6的效果变为原来的2次方。\n当前：^2.00`},
                                                        effect(x) { 
                                                        eff = new Decimal(9)
                                                        return eff
                                                        },
                                                        style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "120px", width: "240px"}
                                                        if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                                        branches: ["71"],
                                                        },
                                                        73: {
                                                            unlocked(){return player.Exp.bought71},
                                                            title: "English-53",
                                                            cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(40)
                                                            if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                                            canAfford() { return player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",71).gte(1)},
                                                            buy() {
                                                            
                                                            player.Exp.pp = player.Exp.pp.sub(this.cost())
                                                            player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                                            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                            },
                                                            display() {return `价格：${format(this.cost())}天赋点数\n效果：R列英语网格节点受到网格力量的加成移到硬上限之后。\n`},
                                                            effect(x) { 
                                                            eff = new Decimal(9)
                                                            return eff
                                                            },
                                                            style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "5px", height: "120px", width: "240px"}
                                                            if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#00BB00", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                                            branches: ["71"],
                                                            },
                                                            74: {
                                                                unlocked(){return player.Exp.bought71},
                                                                title: "经验挑战 2",
                                                                cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(120)
                                                                if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                                                canAfford() { return !player.Exp.selectedChallenge&&player.Exp.pp.gte(this.cost())&&getBuyableAmount("Exp",71).gte(1)&&player.E.bestPoints.gte(this.req())},
                                                                buy() {
                                                                    player.Exp.selectedChallenge = true
                                                                player.Exp.pp = player.Exp.pp.sub(this.cost())
                                                                player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                                                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                                },
                                                                req(){return new Decimal(150)},
                                                                display() {return "解锁该挑战花费：120天赋点数<br>需要曾经被职高录取过"+"<br>完成次数："+challengeCompletions("Exp",12)+" / 5"},
                                                                effect(x) { 
                                                                eff = new Decimal(9)
                                                                return eff
                                                                },
                                                                style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#B341E0", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#C452F1",'border-radius': "5px", height: "120px", width: "240px"}
                                                                if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#FFFFFF", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                                                branches: ["71"],
                                                                },
                                                                75: {
                                                                    unlocked(){return challengeCompletions("Exp",12) >= 1},
                                                                    title: "经验挑战 3",
                                                                    cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(150)
                                                                    if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                                                    canAfford() { return !player.Exp.selectedChallenge&&player.Exp.pp.gte(this.cost())&&hasChallenge("Exp",12)&&getBuyableAmount("Exp",72).gte(1)&&getBuyableAmount("Exp",73).gte(1)&&player.E.bestPoints.gte(this.req())},
                                                                    buy() {
                                                                        player.Exp.selectedChallenge = true
                                                                    player.Exp.pp = player.Exp.pp.sub(this.cost())
                                                                    player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                                                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                                    },
                                                                    req(){return new Decimal(165)},
                                                                    display() {return "解锁该挑战花费：150天赋点数<br>需要曾经被天津市北辰职业中等技术学校或更好的学校录取过"+"<br>完成次数："+challengeCompletions("Exp",21)+" / 5"},
                                                                    effect(x) { 
                                                                    eff = new Decimal(9)
                                                                    return eff
                                                                    },
                                                                    style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#B341E0", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#C452F1",'border-radius': "5px", height: "120px", width: "240px"}
                                                                    if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#FFFFFF", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                                                    branches: [["72","yellow",15],["73","yellow",15],["74","yellow",15]],
                                                                    },
                                                                    76: {
                                                                        unlocked(){return challengeCompletions("Exp",21) >= 1},
                                                                        title: "经验挑战 4",
                                                                        cost(x) {if (!getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(310)
                                                                        if (getBuyableAmount(this.layer, this.id).gte(1)) return new Decimal(1e309)},
                                                                        canAfford() { return !player.Exp.selectedChallenge&&player.Exp.pp.gte(this.cost())&&hasChallenge("Exp",21)&&getBuyableAmount("Exp",72).gte(1)&&getBuyableAmount("Exp",73).gte(1)&&player.E.bestPoints.gte(this.req())},
                                                                        buy() {
                                                                        player.Exp.selectedChallenge = true
                                                                        player.Exp.pp = player.Exp.pp.sub(this.cost())
                                                                        player.Exp.treepp = player.Exp.treepp.add(this.cost())
                                                                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                                                                        },
                                                                        req(){return new Decimal(180)},
                                                                        display() {return "解锁该挑战花费：310天赋点数<br>需要最佳中考分数达到 180"+"<br>完成次数："+challengeCompletions("Exp",22)+" / 5"},
                                                                        effect(x) { 
                                                                        eff = new Decimal(9)
                                                                        return eff
                                                                        },
                                                                        style() {  if (!getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#B341E0", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#C452F1",'border-radius': "5px", height: "120px", width: "240px"}
                                                                        if (getBuyableAmount(this.layer,this.id).gte(1)) return {'background-color': "#FFFFFF", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "5px", height: "120px", width: "240px"}},
                                                                        branches: [["72","yellow",15],["73","yellow",15],["75","yellow",15]],
                                                                        },
        
         
    },
    resetsNothing(){return true},
    challenges:{
        11: {
            name: "挑战1：时间紧迫 I",
            currencyDisplayName: "考试分数",
            currencyInternalName: "points",
            currencyLayer: "E",
            challengeDescription: function() {
                let c11 = "所有学科中考时间-50%。"
                if (inChallenge("Exp", 11)) c11 = c11 + " (挑战中)"
                c11 = c11 + "<br>完成次数：" + challengeCompletions("Exp",11) + " / " + tmp.Exp.challenges[11].completionLimit
                return c11
            },
            goal(){
                if (challengeCompletions("Exp", 11) == 0) return new Decimal(70).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 11) == 1) return new Decimal(90).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 11) == 2) return new Decimal(110).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 11) == 3) return new Decimal(120).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 11) == 4) return new Decimal(140).sub(tmp.Exp.goalNerf)
            },
            completionLimit:5 ,

            rewardDescription: "英语网格力量提升",
            rewardEffect() {
                let c11 = new Decimal(0.03)
                let c11c = challengeCompletions("Exp", 11)
                c11 = c11.mul(c11c)
                if(hasMilestone("Eng",11)) c11 = c11.mul(1.5)
                return c11
           },
           rewardDisplay() {return format(tmp.Exp.challenges[11].rewardEffect.mul(100))+"%(第1次完成该挑战时，平方Exp4效果且解锁自动化！)"},
            onEnter() { 
                    buyBuyable("E",11)
                    player.E.ChineseTime = new Decimal(3600)
                    player.Exp.inChallenge = true
                
            },
            onExit()
            {
                player.Exp.inChallenge = false
            },
            unlocked(){
                return getBuyableAmount("Exp",70).gte(1)&&(player.E.inExam.lt(1)||(player.E.completedExam.gte(1))&&player.Exp.inChallenge)&&player.E.freeze.lt(1)
            },
            style() {
                return {'border-radius': "25px", height: "400px", width: "400px","border-color":"#B341E0","background-color":"#000000","color":"#B341E0"}

            },
        },
        12: {
            name: "挑战2：急急国王",
            currencyDisplayName: "考试分数",
            currencyInternalName: "points",
            currencyLayer: "E",
            challengeDescription: function() {
                let c11 = "考试策略被锁定为“速战速决”且无法更改。"
                if (inChallenge("Exp", 12)) c11 = c11 + " (挑战中)"
                c11 = c11 + "<br>完成次数：" + challengeCompletions("Exp",12) + " / " + tmp.Exp.challenges[12].completionLimit
                return c11
            },
            goal(){
                if (challengeCompletions("Exp", 12) == 0) return new Decimal(100).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 12) == 1) return new Decimal(130).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 12) == 2) return new Decimal(160).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 12) == 3) return new Decimal(190).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 12) == 4) return new Decimal(220).sub(tmp.Exp.goalNerf)
            },
            completionLimit:5 ,

            rewardDescription: "英语单词与阅读感悟获取效率提升(基于挑战完成次数的较大数值与英语网格力量的较小数值)",
            rewardEffect() {
                let c11 = new Decimal(1e10)
                let c11c = challengeCompletions("Exp", 12)
                c11 = c11.pow(c11c)
                c11 = c11.pow(tmp.Eng.gridEffect)
                return c11
           },
           rewardDisplay() {return format(tmp.Exp.challenges[12].rewardEffect)+"x(第1次完成该挑战时，双倍P4效果且解锁更多自动化！)"},
            onEnter() { 
                    buyBuyable("E",11)
                    buyBuyable("Nf",21)
                    player.Exp.inChallenge = true
                
            },
            onExit()
            {
                player.Exp.inChallenge = false
            },
            unlocked(){
                return getBuyableAmount("Exp",74).gte(1)&&(player.E.inExam.lt(1)||(player.E.completedExam.gte(1))&&player.Exp.inChallenge)&&player.E.freeze.lt(1)
            },
            style() {
                return {'border-radius': "25px", height: "400px", width: "400px","border-color":"#B341E0","background-color":"#000000","color":"#B341E0"}

            },
        },
        21: {
            name: "挑战3：健忘症 I",
            currencyDisplayName: "考试分数",
            currencyInternalName: "points",
            currencyLayer: "E",
            challengeDescription: function() {
                let c11 = "在考试中每次正确作答题目，都会导致对应学科的知识开2次方根。同时在挑战中语文或英语知识的每秒产量被强行锁定为0，并且禁用批量答题和自动化。另外在此挑战中你无法进行语文作文的写作（包括套作）！"
                if (inChallenge("Exp", 21)) c11 = c11 + " (挑战中)"
                c11 = c11 + "<br>完成次数：" + challengeCompletions("Exp",21) + " / " + tmp.Exp.challenges[21].completionLimit
                return c11
            },
            goal(){
                if (challengeCompletions("Exp", 21) == 0) return new Decimal(20).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 21) == 1) return new Decimal(40).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 21) == 2) return new Decimal(55).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 21) == 3) return new Decimal(80).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 21) == 4) return new Decimal(100).sub(tmp.Exp.goalNerf)
            },
            completionLimit:5 ,

            rewardDescription: "英语单词与经验获取效率提升(基于挑战完成次数的较大数值与英语网格力量的较小数值)",
            rewardEffect() {
                let c11 = new Decimal(1e16)
                let c11c = challengeCompletions("Exp", 21)
                c11 = c11.pow(c11c)
                c11 = c11.pow(tmp.Eng.gridEffect)
                return c11
           },
           rewardDisplay() {return format(tmp.Exp.challenges[21].rewardEffect)+"x(第1次完成该挑战时，英语网格力量提升10%且考试冷却时间大大减少！)"},
            onEnter() { 
                    
                    setBuyableAmount("Am",11,new Decimal(0))
                    setBuyableAmount("Am",12,new Decimal(0))
                    setBuyableAmount("Am",13,new Decimal(0))
                    setBuyableAmount("Am",21,new Decimal(0))
                    setBuyableAmount("Am",22,new Decimal(0))
                    setBuyableAmount("Am",23,new Decimal(0))
                    setBuyableAmount("Am",31,new Decimal(0))
                    setBuyableAmount("Am",41,new Decimal(0))
                    setBuyableAmount("Am",42,new Decimal(0))
                    setBuyableAmount("Am",43,new Decimal(0))
                    setBuyableAmount("Am",51,new Decimal(0))
                    setBuyableAmount("Am",52,new Decimal(0))
                    setBuyableAmount("Am",53,new Decimal(0))
                    setBuyableAmount("Am",61,new Decimal(0))
                    setBuyableAmount("Am",62,new Decimal(0))
                    buyBuyable("E",11)

                    player.Exp.inChallenge = true
                
            },
            onExit()
            {
                player.Exp.inChallenge = false
                player.Exp.ChineseRecent = new Decimal(0)
                player.Exp.EnglishRecent = new Decimal(0)
            },
            unlocked(){
                return getBuyableAmount("Exp",75).gte(1)&&(player.E.inExam.lt(1)||(player.E.completedExam.gte(1))&&player.Exp.inChallenge)&&player.E.freeze.lt(1)
            },
            style() {
                return {'border-radius': "25px", height: "400px", width: "400px","border-color":"#B341E0","background-color":"#000000","color":"#B341E0"}

            },
        },
        22: {
            name: "挑战4：兴趣衰退",
            currencyDisplayName: "考试分数",
            currencyInternalName: "points",
            currencyLayer: "E",
            challengeDescription: function() {
                let c11 = "在考试中每次正确作答题目，都会导致对应学科的知识开1.5次方根，并且整个大题的作答正确率短暂降低到原来的25%(仅限语文考试)。同时在挑战中语文或英语知识的每秒产量被强行锁定为0，并且禁用批量答题和自动化。另外在此挑战中你无法进行语文作文的写作（包括套作）！"
                if (inChallenge("Exp", 22)) c11 = c11 + " (挑战中)"
                c11 = c11 + "<br>完成次数：" + challengeCompletions("Exp",22) + " / " + tmp.Exp.challenges[22].completionLimit
                return c11
            },
            goal(){
                if (challengeCompletions("Exp", 22) == 0) return new Decimal(30).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 22) == 1) return new Decimal(45).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 22) == 2) return new Decimal(73).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 22) == 3) return new Decimal(120).sub(tmp.Exp.goalNerf)
                if (challengeCompletions("Exp", 22) == 4) return new Decimal(150).sub(tmp.Exp.goalNerf)
            },
            completionLimit:5 ,

            rewardDescription: "英语单词与经验获取指数提升",
            rewardEffect() {
                let c11 = new Decimal(1)
                let c11c = challengeCompletions("Exp", 22)
                c11 = c11.add(new Decimal(c11c).mul(0.02))
                return c11
           },
           rewardDisplay() {return "^"+format(tmp.Exp.challenges[22].rewardEffect)+"(第1次完成该挑战时，英语网格力量提升12%并解锁更多的自动化选项！)"},
            onEnter() { 
                    
                    setBuyableAmount("Am",11,new Decimal(0))
                    setBuyableAmount("Am",12,new Decimal(0))
                    setBuyableAmount("Am",13,new Decimal(0))
                    setBuyableAmount("Am",21,new Decimal(0))
                    setBuyableAmount("Am",22,new Decimal(0))
                    setBuyableAmount("Am",23,new Decimal(0))
                    setBuyableAmount("Am",31,new Decimal(0))
                    setBuyableAmount("Am",41,new Decimal(0))
                    setBuyableAmount("Am",42,new Decimal(0))
                    setBuyableAmount("Am",43,new Decimal(0))
                    setBuyableAmount("Am",51,new Decimal(0))
                    setBuyableAmount("Am",52,new Decimal(0))
                    setBuyableAmount("Am",53,new Decimal(0))
                    setBuyableAmount("Am",61,new Decimal(0))
                    setBuyableAmount("Am",62,new Decimal(0))
                    buyBuyable("E",11)

                    player.Exp.inChallenge = true
                
            },
            onExit()
            {
                player.Exp.inChallenge = false
                player.Exp.ChineseRecent = new Decimal(0)
                player.Exp.EnglishRecent = new Decimal(0)
                player.E.ChineseType = new Decimal(0)
            },
            unlocked(){
                return getBuyableAmount("Exp",76).gte(1)&&(player.E.inExam.lt(1)||(player.E.completedExam.gte(1))&&player.Exp.inChallenge)&&player.E.freeze.lt(1)
            },
            style() {
                return {'border-radius': "25px", height: "400px", width: "400px","border-color":"#B341E0","background-color":"#000000","color":"#B341E0"}

            },
        },
    },
    goalNerf()
    {
        let req = new Decimal(0)
        if(hasUpgrade("Eng",18)) req = req.add(upgradeEffect("Eng",18))
        if(hasUpgrade("Eng",28)) req = req.add(upgradeEffect("Eng",28))
        if(hasUpgrade("Eng",38)) req = req.add(upgradeEffect("Eng",38))
        if(hasUpgrade("Eng",48)) req = req.add(upgradeEffect("Eng",48))
        if(hasUpgrade("Eng",58)) req = req.add(upgradeEffect("Eng",58))
        if(hasUpgrade("Eng",68)) req = req.add(upgradeEffect("Eng",68))
        if(hasUpgrade("Eng",78)) req = req.add(upgradeEffect("Eng",78))
        if(hasUpgrade("Eng",88)) req = req.add(upgradeEffect("Eng",88))
        return req
    }
})