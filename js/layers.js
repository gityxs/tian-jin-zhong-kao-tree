document.οncοntextmenu=ContextMenu;
function ContextMenu()  
{  
  return false;  
}
document.body.onkeydown  = function(e){
    var keyCode = e.keyCode || e.which || e.charCode;
     var ctrlKey = e.ctrlKey || e.metaKey;
     if(ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 73)) {
         e.preventDefault();
         return false;
 }
 else if(ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 67)) {
     e.preventDefault();
     return false;         
     }else if(keyCode && keyCode == 123){
         return false;
     }
}
addLayer("C", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        tier: new Decimal(0),
        brainTier: new Decimal(0),
        cbrainTier: new Decimal(0),
        readingPoints: new Decimal(0),
        cpower: new Decimal(0),
        cfreeze: new Decimal(0),
        cq: new Decimal(0),
        cpps: new Decimal(0),
        power: new Decimal(1),
        freeze: new Decimal(1),
        currentlyFreeze: new Decimal(1),
        pps: new Decimal(1),
        current: new Decimal(1),
        q: new Decimal(50),
        totalGold: new Decimal(0),
        balanceGold: new Decimal(0),
        remain1: new Decimal(2),
        total1: new Decimal(0),
        balance1: new Decimal(0),
        remain2: new Decimal(5),
        total2: new Decimal(0),
        balance2: new Decimal(0),
        remain3: new Decimal(10),
        total3: new Decimal(0),
        balance3: new Decimal(0),
        remain4: new Decimal(50),
        total4: new Decimal(0),
        balance4: new Decimal(0),
        remain5: new Decimal(120),
        total5: new Decimal(0),
        balance5: new Decimal(0),
        remain6: new Decimal(520),
        total6: new Decimal(0),
        balance6: new Decimal(0),
        end: new Decimal(0),
        read: new Decimal(0),
                  // "points" is the internal name for the main resource of the layer.
    }},
    position: 0,
    perSecond()
    {
        let gain = new Decimal(0)
        gain = gain.add((tmp.C.readingPointsMult).mul(player.C.balance1))
        gain = gain.add((tmp.C.readingPointsMult).mul(player.C.balance2).mul(8))
        gain = gain.add((tmp.C.readingPointsMult).mul(player.C.balance3).mul(30))
        gain = gain.add((tmp.C.readingPointsMult).mul(player.C.balance4).mul(1000))
        gain = gain.add((tmp.C.readingPointsMult).mul(player.C.balance5).mul(1e10))
        gain = gain.add((tmp.C.readingPointsMult).mul(player.C.balance6).mul(1e50))
        return gain
    },
    maxTier()
    {
        let max = new Decimal(0)
        if(getBuyableAmount("C",54).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",60).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",61).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",68).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",69).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",75).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",76).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",77).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",78).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",83).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",84).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",85).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",90).gte(1)) max = max.add(1)
        if(getBuyableAmount("C",92).gte(1)) max = max.add(1)
        return max
    },
    goldMult()
    {
        let mult = new Decimal(1)
        if(hasMilestone("C",10)) mult = mult.mul(player.C.pps)
        if(hasMilestone("C",11)) mult = mult.mul(player.C.tier.pow(2))
        return mult
    },
    goldChance()
    {
        let chs = new Decimal(0)
        if(hasMilestone("E",8)) chs = chs.add(2.5)
        if(getBuyableAmount("C",44).gte(1)) chs = chs.add(buyableEffect("C",44))
        return chs
    },
    readMult()
    {
        let mult = new Decimal(1)
        if(getBuyableAmount("Exp",21).gte(1)||hasMilestone("E",9)) mult = mult.mul(buyableEffect("Exp",21))
        return mult
    },
    readingPointsMult()
    {
        let mult = new Decimal(1)
        if((getBuyableAmount("C",41)).gte(1)) mult = mult.mul(buyableEffect("C",41))
        if((getBuyableAmount("Exp",56)).gte(1)) mult = mult.mul(buyableEffect("Exp",56))
        if(player.C.totalGold.gte(1)) mult = mult.mul(tmp.C.effectGold2)
        if((getBuyableAmount("Exp",57)).gte(1)||player.Exp.bought58) mult = mult.mul(buyableEffect("Exp",57))
        if(hasMilestone("E",13)) mult = mult.mul(10)
        if(player.Eng.points.gte(1)) mult = mult.mul(new Decimal(3).pow(player.Eng.points).min(59049))
        if(hasUpgrade("Eng",11)) mult = mult.mul(upgradeEffect("Eng",11))
        if(hasUpgrade("Eng",21)) mult = mult.mul(upgradeEffect("Eng",21))
        if(hasUpgrade("Eng",31)) mult = mult.mul(upgradeEffect("Eng",31))
        if(hasUpgrade("Eng",41)) mult = mult.mul(upgradeEffect("Eng",41))
        if(hasUpgrade("Eng",51)) mult = mult.mul(upgradeEffect("Eng",51))
        if(hasUpgrade("Eng",61)) mult = mult.mul(upgradeEffect("Eng",61))
        if(hasChallenge("Exp",12)) mult = mult.mul(tmp.Exp.challenges[12].rewardEffect)
        if(hasUpgrade("Eng",71)) mult = mult.mul(upgradeEffect("Eng",71))
        if((getBuyableAmount("C",87)).gte(1)) mult = mult.mul(buyableEffect("C",87))
        return mult
    },
    effectGold1()
    {
    let eff = new Decimal(100).pow(player.C.totalGold).min(1e30)
    return eff
    },
    effectGold2()
    {
    let eff = player.C.totalGold.add(1).min(30)
    return eff
    },
    effect1()
    {
    let eff = player.C.total1.add(1).pow(5).min(5e15)
    return eff
    },
    effect2()
    {
    let eff = player.C.total2.add(1).sqrt().min(35)
    return eff
    },
    effect3()
    {
    let eff = player.C.total3.add(1).pow(6).min(1e21)
    return eff
    },
    effect4()
    {
    let eff = player.C.total4.add(1).pow(100).min(1e250)
    return eff
    },
    effect5()
    {
    let eff = player.C.total5.add(1).pow(16).min(1e45)
    return eff
    },
    effect6()
    {
    let eff = player.C.total6.add(1).pow(40).min(1e100)
    return eff
    },
    
    
    infoboxes: {
        1: {
                title(){return "1阶好文精华"},
                body(){
                        let a = "您总共获得过<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.total1)+"<h4>个1阶好文精华，加成语文知识获取<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effect1)+"x<h4>(上限在"+format(new Decimal(5e15))+").<br>"
                        let b = "您当前拥有<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.balance1)+"<h4>个1阶好文精华。<br>"
                        let c = "领悟每个1阶好文精华可获得<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>1<h4>阅读感悟。"

                        return a + b + c
                },
                style() { return {borderColor: "#222222",}},
                titleStyle() { return {backgroundColor: "#222222",color: "#FFFFFF"}},
        },
        2: {
            title(){return "金句摘抄"},
            body(){
                    let a = "您总共获得过<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(player.C.totalGold)+"<h4>个金句摘抄，加成学分与语文知识获取<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effectGold1)+"x<h4>(上限在"+format(new Decimal(1e30))+").<br>，同时提升阅读感悟获取效率<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effectGold2)+"x<h4>(上限在30).<br>"
                    let b = "您当前拥有<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(player.C.balanceGold)+"<h4>个金句摘抄。<br>"
                    let c = "金句摘抄是脑洞精炼的必要原料！"

                    return a + b + c
            },
            style() { return {borderColor: "#FFFF00",}},
            titleStyle() { return {backgroundColor: "#FFFF00",color: "#000000"}},
    },
    3: {
        title(){return "2阶好文精华"},
        body(){
                let a = "您总共获得过<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.total2)+"<h4>个2阶好文精华，加成经验获取<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effect2)+"x<h4>(上限在35).<br>"
                let b = "您当前拥有<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.balance2)+"<h4>个2阶好文精华。<br>"
                let c = "领悟每个2阶好文精华可获得<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>8<h4>阅读感悟。"

                return a + b + c
        },
        style() { return {borderColor: "#444444",}},
        titleStyle() { return {backgroundColor: "#444444",color: "#FFFFFF"}},
},
4: {
    title(){return "3阶好文精华"},
    body(){
            let a = "您总共获得过<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.total3)+"<h4>个3阶好文精华，加成学分获取<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effect3)+"x<h4>(上限在"+format(new Decimal(1e21))+").<br>"
            let b = "您当前拥有<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.balance3)+"<h4>个3阶好文精华。<br>"
            let c = "领悟每个3阶好文精华可获得<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>30<h4>阅读感悟。"

            return a + b + c
    },
    style() { return {borderColor: "#888888",}},
    titleStyle() { return {backgroundColor: "#888888",color: "#FFFFFF"}},
},
5: {
    title(){return "4阶好文精华"},
    body(){
            let a = "您总共获得过<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.total4)+"<h4>个4阶好文精华，加成学分获取<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effect4)+"x<h4>(上限在"+format(new Decimal(1e250))+").<br>"
            let b = "您当前拥有<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.balance4)+"<h4>个4阶好文精华。<br>"
            let c = "领悟每个4阶好文精华可获得<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>1000<h4>阅读感悟。"

            return a + b + c
    },
    style() { return {borderColor: "#48A461",}},
    titleStyle() { return {backgroundColor: "#48A461",color: "#FFFFFF"}},
},
6: {
    title(){return "5阶好文精华"},
    body(){
            let a = "您总共获得过<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.total5)+"<h4>个5阶好文精华，加成英语知识获取<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effect5)+"x<h4>(上限在"+format(new Decimal(1e45))+").<br>"
            let b = "您当前拥有<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.balance5)+"<h4>个5阶好文精华。<br>"
            let c = "领悟每个5阶好文精华可获得<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>1e10<h4>阅读感悟。"

            return a + b + c
    },
    style() { return {borderColor: "#6AC683",}},
    titleStyle() { return {backgroundColor: "#6AC683",color: "#FFFFFF"}},
},
7: {
    title(){return "6阶好文精华"},
    body(){
            let a = "您总共获得过<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.total6)+"<h4>个6阶好文精华，加成英语知识获取<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effect6)+"x<h4>(上限在"+format(new Decimal(1e100))+").<br>"
            let b = "您当前拥有<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.balance6)+"<h4>个6阶好文精华。<br>"
            let c = "领悟每个6阶好文精华可获得<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>1e50<h4>阅读感悟。"

            return a + b + c
    },
    style() { return {borderColor: "#2146E0",}},
    titleStyle() { return {backgroundColor: "#2146E0",color: "#FFFFFF"}},
},
    },
    buyables:
    {
        11: {
            title(){return "您的脑洞(等阶:"+player.C.brainTier+")"},
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "脑洞力量："+format(player.C.power)+"<br>思维活跃度："+format(player.C.q)+"%<br>阅读冷却："+format(player.C.freeze)+"s<br>每秒阅读能力:"+format(player.C.pps)},
            style() { if(player.C.brainTier.lt(2))return {'background-color': "#111111",color: "white", 'border-color': "#444444",'border-radius': "5px", height: "120px", width: "240px"}
            if(player.C.brainTier.gte(2)&&player.C.brainTier.lt(3))return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}
            if(player.C.brainTier.gte(3)&&player.C.brainTier.lt(4))return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "120px", width: "240px"}
            if(player.C.brainTier.gte(4)&&player.C.brainTier.lt(5))return {'background-color': "#268240",color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return true},
            
          },
        21: {
            title: "1阶精选好文",
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "阅读进度："+format(player.C.remain1)+"/ 2<br>阅读奖励：<br>(100%)1阶好文精华*1"},
            style() { return {'background-color': "#111111",color: "white", 'border-color': "#444444",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.current == 1},
            
          },
          
          31: {
            title: "领悟x1",
            canAfford() { return player.C.balance1.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance1 = player.C.balance1.sub(1) 
            },
            gain()
            {
let gain = new Decimal(1)
gain = gain.mul(tmp.C.readingPointsMult)
return gain
            },
            display() {return "领悟1个1阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#111111",color: "white", 'border-color': "#444444",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return hasMilestone("E",8)&&!hasMilestone("Eng",12)},
            
          },
          32: {
            title: "领悟50%",
            canAfford() { return player.C.balance1.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance1 = player.C.balance1.sub(player.C.balance1.mul(0.5).floor())
            },
            gain()
            {
let gain = new Decimal(1)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance1.mul(0.5).floor())
return gain
            },
            display() {return "领悟您50%的1阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#111111",color: "white", 'border-color': "#444444",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return hasMilestone("E",8)&&!hasMilestone("Eng",12)},
            
          },
          33: {
            title: "领悟100%",
            canAfford() { return player.C.balance1.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance1 = new Decimal(0)
            },
            gain()
            {
let gain = new Decimal(1)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance1)
return gain
            },
            display() {return "领悟您100%的1阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#111111",color: "white", 'border-color': "#444444",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return hasMilestone("E",8)&&!hasMilestone("Eng",12)},
            
          },
          41: {
            title: "阅读技能1:阅读感悟效率提升",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&getBuyableAmount(this.layer, this.id).lt(600)},
            cost(x) {return new Decimal(10).pow(x.add(1))},
            buy() {
              if(!hasMilestone("Eng",2))player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升阅读感悟获取倍率。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：阅读感悟获取x${format(this.effect())}`},
            effect(x) { 
              let base = new Decimal(2)
              if(getBuyableAmount("Exp",65).gte(1)) base = base.mul(1.4)
              mult2 = base.pow(x)
              return mult2},
            unlocked(){return hasMilestone("E",8)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            buyMax(){return hasMilestone("Eng",2)}
          },
          42: {
            title: "阅读技能2:天赋技能2基础倍增",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&getBuyableAmount(this.layer, this.id).lt(600)},
            cost(x) {return new Decimal(15).mul(new Decimal(3).pow(x))},
            buy() {
                if(!hasMilestone("Eng",2))player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `倍增天赋技能2基础。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：天赋技能2基础x${format(this.effect())}`},
            effect(x) { 
              let base = new Decimal(1.5)
              if(hasMilestone("E",20)) base = base.add(0.3)
              if(hasMilestone("E",9)) x = x.add(2)
              mult2 = base.pow(x)
              return mult2},
            unlocked(){return hasMilestone("E",8)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            buyMax(){return hasMilestone("Eng",2)}
          },
          43: {
            title: "阅读技能3:经验获取倍增",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&getBuyableAmount(this.layer, this.id).lt(600)},
            cost(x) {return new Decimal(30).mul(new Decimal(4).pow(x))},
            buy() {
                if(!hasMilestone("Eng",2))player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `倍增考试过程中的经验获取。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：所有经验获取x${format(this.effect())}`},
            effect(x) { 
              let base = new Decimal(2.5)
              mult2 = base.pow(x)
              return mult2},
            unlocked(){return hasMilestone("E",8)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            buyMax(){return hasMilestone("Eng",2)}
          },
          44: {
            title: "阅读技能4:金句摘抄概率提升",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&tmp.C.goldChance.lt(100)&&getBuyableAmount(this.layer, this.id).lt(600)},
            cost(x) {return new Decimal(200).mul(new Decimal(5).pow(x))},
            buy() {
                if(!hasMilestone("Eng",2))player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升金句摘抄的获取概率。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：金句摘抄获取概率+${format(this.effect())}%`},
            effect(x) { 
              let base = new Decimal(0.5)
              mult2 = base.mul(x)
              return mult2},
            unlocked(){return hasMilestone("C",4)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            buyMax(){return hasMilestone("Eng",2)}
          },
          51: {
            title: "←",
            canAfford() { return player.C.tier.gte(1)},
            buy() {
            player.C.tier = player.C.tier.sub(1)
            },
            
            display() {return ""},
            style() { return {'border-radius': "30% 0% 0% 30%", height: "50px", width: "50px"}},
            unlocked(){return player.Exp.bought56},
            
          },
          52: {
            title: "→",
            canAfford() { return player.C.tier.lt(tmp.C.maxTier)},
            buy() {
            player.C.tier = player.C.tier.add(1)
            },
            
            display() {return ""},
            style() { return {'border-radius': "0% 30% 30% 0%", height: "50px", width: "50px"}},
            unlocked(){return player.Exp.bought56},
            
          },
          53: {
            title: "名著",
            canAfford() { return false},
            cost(x) {return new Decimal(200).mul(new Decimal(5).pow(x))},
            buy() {
              player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `当前名著阶层： ${player.C.tier}\nTips：名著阶层越高，出现的精选好文越高阶，收益也就越高！`},
            effect(x) { 
              let base = new Decimal(0.5)
              mult2 = base.mul(x)
              return mult2},
            unlocked(){return player.Exp.bought56},
            style() { return {'background-color': "#888888",'border-radius': "5px", height: "100px", width: "200px"}},
          },
          54: {
            title: "名著许可α",
            canAfford() { return player.C.readingPoints.gte(this.cost()) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(1.5e8)},
            display() {return "获得阅读下一阶名著的许可。在1阶名著，将会解锁2阶精选好文！<br>需要："+format(this.cost())+"阅读感悟"},
            style() { return {'background-color': "#111111",color: "white", 'border-color': "#444444",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.Exp.bought56&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          55: {
            title: "2阶精选好文",
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "阅读进度："+format(player.C.remain2)+"/ 5<br>阅读奖励：<br>(100%)2阶好文精华*1"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.current == 2},
            
          },
          56: {
            title: "领悟x1",
            canAfford() { return player.C.balance2.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance2 = player.C.balance2.sub(1) 
            },
            gain()
            {
let gain = new Decimal(8)
gain = gain.mul(tmp.C.readingPointsMult)
return gain
            },
            display() {return "领悟1个2阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total2.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          57: {
            title: "领悟50%",
            canAfford() { return player.C.balance2.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance2 = player.C.balance2.sub(player.C.balance2.mul(0.5).floor())
            },
            gain()
            {
let gain = new Decimal(8)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance2.mul(0.5).floor())
return gain
            },
            display() {return "领悟您50%的2阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total2.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          58: {
            title: "领悟100%",
            canAfford() { return player.C.balance2.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance2 = new Decimal(0)
            },
            gain()
            {
let gain = new Decimal(8)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance2)
return gain
            },
            display() {return "领悟您100%的2阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total2.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          59: {
            title: "阅读技能5:写作效率提升",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&buyableEffect(this.layer,this.id).lt(9)},
            cost(x) {return new Decimal(10).pow(new Decimal(2).pow(x))},
            buy() {
                if(!hasMilestone("Eng",2))player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `减少写作中两次属性提升的时间间隔。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：时间间隔-${format(this.effect())}tick`},
            effect(x) { 
              let base = new Decimal(0)
              mult2 = base.add(x)
              if(hasMilestone("E",13)) mult2 = mult2.add(1)
              if(getBuyableAmount("Exp",62).gte(1)) mult2 = mult2.add(2)
              if(getBuyableAmount("Exp",68).gte(1)) mult2 = new Decimal(9)
              return mult2},
            unlocked(){return player.Exp.bought58},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            buyMax(){return hasMilestone("Eng",2)}
          },
          60: {
            title: "名著许可β",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(32) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(5e11)},
            display() {return "获得阅读下一阶名著的许可。在2阶名著，2阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 32"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          61: {
            title: "名著许可γ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(33) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(2e12)},
            display() {return "获得阅读下一阶名著的许可。在3阶名著，2阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 33"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(2)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          64: {
            title: "当前已打造脑洞属性",
            canAfford() { return false },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(2e12)},
            display() {return "脑洞力量："+format(player.C.cpower)+"<br>思维活跃度："+format(player.C.cq)+"%<br>阅读冷却："+format(player.C.cfreeze)+"s<br>每秒阅读能力："+format(player.C.cpps)},
            style() { return {'background-color': "#666666",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return true},
            
          },
          65: {
            title: "应用",
            canAfford() { return player.C.cpps.gte(1)},
            buy() {
               player.C.pps = player.C.cpps
               player.C.power = player.C.cpower
               player.C.freeze = player.C.cfreeze
               player.C.q = player.C.cq
               player.C.brainTier = player.C.cbrainTier
            },
            cost(x) {return new Decimal(2e12)},
            display() {return ""},
            style() { return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "5px", height: "60px", width: "120px"}},
            unlocked(){return true},
            
          },
          66: {
            title: "取消",
            canAfford() { return player.C.cpps.gte(1)},
            buy() {
               player.C.cpps = new Decimal(0)
               player.C.cq = new Decimal(0)
               player.C.cpower = new Decimal(0)
               player.C.cfreeze = new Decimal(0)
            },
            cost(x) {return new Decimal(2e12)},
            display() {return ""},
            style() { return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "5px", height: "60px", width: "120px"}},
            unlocked(){return true},
            
          },
          67: {
            title: "打造2阶脑洞",
            canAfford() { return player.C.balance2.gte(this.cost1())&&player.C.readingPoints.gte(this.cost2())&&player.C.balanceGold.gte(this.cost3()) },
            buy() {
               player.C.balance2 = player.C.balance2.sub(this.cost1())
               player.C.readingPoints = player.C.readingPoints.sub(this.cost2())
               player.C.balanceGold = player.C.balanceGold.sub(this.cost3())
               player.C.cq = player.E.random.mul(10)
               player.C.cpps = new Decimal(5).mul(player.C.cq).div(100)
               player.C.cfreeze = new Decimal(Math.random()*10).div(5).max(0.3)
               player.C.cpower = player.C.cpps.mul(player.C.cfreeze)
               player.C.cbrainTier = new Decimal(2)
            },
            cost1()
            {return new Decimal(300)},
            cost2()
            {return new Decimal(1e12)},
            cost3()
            {return new Decimal(10)},
            cost(x) {return new Decimal(2e12)},
            display() {return "使用2阶好文精华和阅读感悟、金句摘抄，打造2阶的随机属性脑洞。<br>基础每秒阅读能力:2.5<br>花费2阶好文精华："+format(this.cost1())+"<br>花费阅读点数："+format(this.cost2())+"<br>花费金句摘抄："+format(this.cost3())},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "240px", width: "240px"}},
            unlocked(){return true},
            
          },
          68: {
            title: "名著许可δ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(38) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(6e12)},
            display() {return "获得阅读下一阶名著的许可。在4阶名著，2阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 38"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(3)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          69: {
            title: "名著许可ε",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(47) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(6e13)},
            display() {return "获得阅读下一阶名著的许可。在5阶名著，将会解锁3阶精选好文！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 47"},
            style() { return {'background-color': "#444444",color: "white", 'border-color': "#888888",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(4)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          70: {
            title: "3阶精选好文",
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "阅读进度："+format(player.C.remain3)+"/ 10<br>阅读奖励：<br>(100%)3阶好文精华*1"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.current == 3},
            
          },
          71: {
            title: "领悟x1",
            canAfford() { return player.C.balance3.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance3 = player.C.balance3.sub(1) 
            },
            gain()
            {
let gain = new Decimal(30)
gain = gain.mul(tmp.C.readingPointsMult)
return gain
            },
            display() {return "领悟1个3阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total3.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          72: {
            title: "领悟50%",
            canAfford() { return player.C.balance3.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance3 = player.C.balance3.sub(player.C.balance3.mul(0.5).floor())
            },
            gain()
            {
let gain = new Decimal(30)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance3.mul(0.5).floor())
return gain
            },
            display() {return "领悟您50%的3阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total3.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          73: {
            title: "领悟100%",
            canAfford() { return player.C.balance3.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance3 = new Decimal(0)
            },
            gain()
            {
let gain = new Decimal(30)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance3)
return gain
            },
            display() {return "领悟您100%的3阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total3.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          74: {
            title: "打造3阶脑洞",
            canAfford() { return player.C.balance3.gte(this.cost1())&&player.C.readingPoints.gte(this.cost2())&&player.C.balanceGold.gte(this.cost3()) },
            buy() {
               player.C.balance3 = player.C.balance3.sub(this.cost1())
               player.C.readingPoints = player.C.readingPoints.sub(this.cost2())
               player.C.balanceGold = player.C.balanceGold.sub(this.cost3())
               player.C.cq = player.E.random.mul(10)
               player.C.cpps = new Decimal(10).mul(player.C.cq).div(100)
               player.C.cfreeze = new Decimal(Math.random()*10).div(5).max(0.3)
               player.C.cpower = player.C.cpps.mul(player.C.cfreeze)
               player.C.cbrainTier = new Decimal(3)
            },
            cost1()
            {return new Decimal(300)},
            cost2()
            {return new Decimal(1e14)},
            cost3()
            {return new Decimal(10)},
            cost(x) {return new Decimal(2e12)},
            display() {return "使用3阶好文精华和阅读感悟、金句摘抄，打造3阶的随机属性脑洞。<br>基础每秒阅读能力:5<br>花费3阶好文精华："+format(this.cost1())+"<br>花费阅读点数："+format(this.cost2())+"<br>花费金句摘抄："+format(this.cost3())},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "240px", width: "240px"}},
            unlocked(){return true},
            
          },
          75: {
            title: "名著许可ζ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(48) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(1e15)},
            display() {return "获得阅读下一阶名著的许可。在6阶名著，3阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 48"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(5)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          76: {
            title: "名著许可η",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(61) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(1e26)},
            display() {return "获得阅读下一阶名著的许可。在7阶名著，3阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 61"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(6)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          77: {
            title: "名著许可θ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(84) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(1e44)},
            display() {return "获得阅读下一阶名著的许可。在8阶名著，3阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 84"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(7)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          78: {
            title: "名著许可ι",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(111) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(1e70)},
            display() {return "获得阅读下一阶名著的许可。在9阶名著，将会解锁4阶精选好文！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 111"},
            style() { return {'background-color': "#888888",color: "white", 'border-color': "#AAAAAA",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(8)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          79: {
            title: "4阶精选好文",
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "阅读进度："+format(player.C.remain4)+"/ 50<br>阅读奖励：<br>(100%)4阶好文精华*1"},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.current == 4},
            
          },
          80: {
            title: "领悟x1",
            canAfford() { return player.C.balance4.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance4 = player.C.balance4.sub(1) 
            },
            gain()
            {
let gain = new Decimal(1000)
gain = gain.mul(tmp.C.readingPointsMult)
return gain
            },
            display() {return "领悟1个4阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total4.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          81: {
            title: "领悟50%",
            canAfford() { return player.C.balance4.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance4 = player.C.balance4.sub(player.C.balance4.mul(0.5).floor())
            },
            gain()
            {
let gain = new Decimal(1000)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance4.mul(0.5).floor())
return gain
            },
            display() {return "领悟您50%的4阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total4.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          82: {
            title: "领悟100%",
            canAfford() { return player.C.balance4.gte(1)},
            buy() {
            player.C.readingPoints = player.C.readingPoints.add(this.gain())
            player.C.balance4 = new Decimal(0)
            },
            gain()
            {
let gain = new Decimal(1000)
gain = gain.mul(tmp.C.readingPointsMult).mul(player.C.balance4)
return gain
            },
            display() {return "领悟您100%的4阶精选好文，并获取 "+format(this.gain())+" 阅读感悟。"},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "100px", width: "200px"}},
            unlocked(){return player.C.total4.gte(1)&&!hasMilestone("Eng",12)},
            
          },
          83: {
            title: "名著许可κ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(129) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(1e130)},
            display() {return "获得阅读下一阶名著的许可。在10阶名著，4阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 129"},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(9)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          84: {
            title: "名著许可λ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(150) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal(1e250)},
            display() {return "获得阅读下一阶名著的许可。在11阶名著，4阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 150"},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(10)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          85: {
            title: "名著许可μ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(151) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal("1e360")},
            display() {return "获得阅读下一阶名著的许可。在12阶名著，将解锁5阶精选好文！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 151"},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(11)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          86: {
            title: "5阶精选好文",
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "阅读进度："+format(player.C.remain5)+"/ 120<br>阅读奖励：<br>(100%)5阶好文精华*1"},
            style() { return {"background": "radial-gradient(circle, #48A461 0%, #8CE8A5 100%)",   color: "white", 'border-color': "#6AC683",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.current == 5},
            
          },
          87: {
            title: "阅读技能G1:超级阅读感悟效率提升",
            canAfford() { return player.C.balanceGold.gte(this.cost())&&getBuyableAmount(this.layer, this.id).lt(600)},
            cost(x) {return new Decimal(10).pow(x.add(1))},
            buy() {
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升阅读感悟获取倍率。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}金句摘抄\n效果：阅读感悟获取x${format(this.effect())}`},
            effect(x) { 
              let base = new Decimal(1e10)
              mult2 = base.pow(x)
              if(hasUpgrade("Eng",81)) mult2 = mult2.pow(upgradeEffect("Eng",81))
              return mult2},
            unlocked(){return hasMilestone("Eng",15)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px",'background-color':"#FFFF00"}},
            buyMax(){return hasMilestone("Eng",15)},
          },
          88: {
            title: "阅读技能G2:英语网格力量提升",
            canAfford() { return player.C.balanceGold.gte(this.cost())&&getBuyableAmount(this.layer, this.id).lt(600)},
            cost(x) {return new Decimal(20).pow(x.add(1))},
            buy() {
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升英语网格力量。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}金句摘抄\n效果：英语网格力量+${format(this.effect().mul(100))}%`},
            effect(x) { 
              let base = new Decimal(0.005)
              mult2 = base.mul(x)
              return mult2},
            unlocked(){return hasMilestone("Eng",15)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px",'background-color':"#FFFF00"}},
            buyMax(){return hasMilestone("Eng",15)}
          },
          89: {
            title: "阅读技能G3:灵感加速",
            canAfford() { return player.C.balanceGold.gte(this.cost())&&getBuyableAmount(this.layer, this.id).lt(600)},
            cost(x) {return new Decimal(20).pow(x.add(1))},
            buy() {
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `减少两次作文灵感的迸发间隔。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}金句摘抄\n当前灵感迸发间隔：${format(tmp.E.lingganFreezeLimit)}tick`},
            effect(x) { 
              let base = new Decimal(1)
              mult2 = base.mul(x).add(1)
              mult3 = new Decimal(10).sub(mult2.log2()).div(10)
              return mult3},
            unlocked(){return hasMilestone("Eng",15)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px",'background-color':"#FFFF00"}},
            buyMax(){return hasMilestone("Eng",15)}
          },
          90: {
            title: "名著许可v",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(170) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal("1e700")},
            display() {return "获得阅读下一阶名著的许可。在13阶名著，5阶精选好文的出现概率将会提升！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 170"},
            style() { return {"background": "radial-gradient(circle, #48A461 0%, #8CE8A5 100%)", color: "white",'border-color': "#48A461",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(12)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          91: {
            title: "打造4阶脑洞",
            canAfford() { return player.C.balance4.gte(this.cost1())&&player.C.readingPoints.gte(this.cost2())&&player.C.balanceGold.gte(this.cost3()) },
            buy() {
               player.C.balance4 = player.C.balance4.sub(this.cost1())
               player.C.readingPoints = player.C.readingPoints.sub(this.cost2())
               player.C.balanceGold = player.C.balanceGold.sub(this.cost3())
               player.C.cq = player.E.random.mul(10)
               player.C.cpps = new Decimal(25).mul(player.C.cq).div(100)
               player.C.cfreeze = new Decimal(Math.random()*10).div(5).max(0.3)
               player.C.cpower = player.C.cpps.mul(player.C.cfreeze)
               player.C.cbrainTier = new Decimal(4)
            },
            cost1()
            {return new Decimal(500)},
            cost2()
            {return new Decimal("1e700")},
            cost3()
            {return new Decimal(1e8)},
            cost(x) {return new Decimal(2e12)},
            display() {return "使用4阶好文精华和阅读感悟、金句摘抄，打造4阶的随机属性脑洞。<br>基础每秒阅读能力:12<br>花费4阶好文精华："+format(this.cost1())+"<br>花费阅读点数："+format(this.cost2())+"<br>花费金句摘抄："+format(this.cost3())},
            style() { return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "5px", height: "240px", width: "240px"}},
            unlocked(){return hasMilestone("C",10)},
            
          },
          92: {
            title: "名著许可ξ",
            canAfford() { return player.C.readingPoints.gte(this.cost())&&player.E.bestPoints.gte(184) },
            buy() {
               setBuyableAmount(this.layer,this.id,new Decimal(1))
            },
            cost(x) {return new Decimal("1e918")},
            display() {return "获得阅读下一阶名著的许可。在14阶名著，将解锁6阶精选好文！<br>需要："+format(this.cost())+"阅读感悟&中考最高分数达到 184"},
            style() { return {"background": "radial-gradient(circle, #48A461 0%, #8CE8A5 100%)", color: "white",'border-color': "#48A461",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.tier.gte(13)&&getBuyableAmount(this.layer,this.id).lt(1)},
            
          },
          93: {
            title: "6阶精选好文",
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "阅读进度："+format(player.C.remain6)+"/ 520<br>阅读奖励：<br>(100%)6阶好文精华*1"},
            style() { return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return player.C.current == 6},
            
          },
    },
    update(diff)
    {
    if(player.C.remain1.lte(0)&&!tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain1 = new Decimal(2), player.C.balance1 = player.C.balance1.add(tmp.C.readMult), player.C.total1 = player.C.total1.add(tmp.C.readMult), player.C.end = new Decimal(1)
    if(player.C.remain1.lte(0)&&tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain1 = new Decimal(2), player.C.balance1 = player.C.balance1.add(tmp.C.readMult), player.C.total1 = player.C.total1.add(tmp.C.readMult), player.C.end = new Decimal(1),player.C.totalGold = player.C.totalGold.add(tmp.C.goldMult),player.C.balanceGold = player.C.balanceGold.add(tmp.C.goldMult)
    if(player.C.remain2.lte(0)&&!tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain2 = new Decimal(5), player.C.balance2 = player.C.balance2.add(tmp.C.readMult), player.C.total2 = player.C.total2.add(tmp.C.readMult), player.C.end = new Decimal(1)
    if(player.C.remain2.lte(0)&&tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain2 = new Decimal(5), player.C.balance2 = player.C.balance2.add(tmp.C.readMult), player.C.total2 = player.C.total2.add(tmp.C.readMult), player.C.end = new Decimal(1),player.C.totalGold = player.C.totalGold.add(tmp.C.goldMult),player.C.balanceGold = player.C.balanceGold.add(tmp.C.goldMult)
    if(player.C.remain3.lte(0)&&!tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain3 = new Decimal(10), player.C.balance3 = player.C.balance3.add(tmp.C.readMult), player.C.total3 = player.C.total3.add(tmp.C.readMult), player.C.end = new Decimal(1)
    if(player.C.remain3.lte(0)&&tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain3 = new Decimal(10), player.C.balance3 = player.C.balance3.add(tmp.C.readMult), player.C.total3 = player.C.total3.add(tmp.C.readMult), player.C.end = new Decimal(1),player.C.totalGold = player.C.totalGold.add(tmp.C.goldMult),player.C.balanceGold = player.C.balanceGold.add(tmp.C.goldMult)
    if(player.C.remain4.lte(0)&&!tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain4 = new Decimal(50), player.C.balance4 = player.C.balance4.add(tmp.C.readMult), player.C.total4 = player.C.total4.add(tmp.C.readMult), player.C.end = new Decimal(1)
    if(player.C.remain4.lte(0)&&tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain4 = new Decimal(50), player.C.balance4 = player.C.balance4.add(tmp.C.readMult), player.C.total4 = player.C.total4.add(tmp.C.readMult), player.C.end = new Decimal(1),player.C.totalGold = player.C.totalGold.add(tmp.C.goldMult),player.C.balanceGold = player.C.balanceGold.add(tmp.C.goldMult)
    if(player.C.remain5.lte(0)) player.C.remain5 = new Decimal(120), player.C.balance5 = player.C.balance5.add(tmp.C.readMult), player.C.total5 = player.C.total5.add(tmp.C.readMult), player.C.end = new Decimal(1),player.C.totalGold = player.C.totalGold.add(tmp.C.goldMult),player.C.balanceGold = player.C.balanceGold.add(tmp.C.goldMult)
    if(player.C.remain6.lte(0)) player.C.remain6 = new Decimal(520), player.C.balance6 = player.C.balance6.add(tmp.C.readMult), player.C.total6 = player.C.total6.add(tmp.C.readMult), player.C.end = new Decimal(1)
    if(player.C.end.gte(1)&&player.C.tier == 0) player.C.current = new Decimal(1),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 1) player.E.random.lt(9)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 2) player.E.random.lt(7)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 3) player.E.random.lt(5)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 4) player.E.random.lt(3)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 5&&player.E.random.lt(8)) player.E.random.lt(6)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 5&&player.E.random.gte(8)) player.C.current = new Decimal(3),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 6&&player.E.random.lt(5)) player.E.random.lt(3)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 6&&player.E.random.gte(5)) player.C.current = new Decimal(3),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 7&&player.E.random.lt(3)) player.E.random.lt(2)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 7&&player.E.random.gte(3)) player.C.current = new Decimal(3),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 8&&player.E.random.lt(2)) player.E.random.lt(1)? (player.C.current = new Decimal(1),player.C.end = new Decimal(0)):(player.C.current = new Decimal(2),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 8&&player.E.random.gte(2)) player.C.current = new Decimal(3),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 9&&player.E.random.lt(9.5)) player.E.random.lt(1)? (player.C.current = new Decimal(2),player.C.end = new Decimal(0)):(player.C.current = new Decimal(3),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 9&&player.E.random.gte(9.5)) player.C.current = new Decimal(4),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 10&&player.E.random.lt(8)) player.E.random.lt(0.5)? (player.C.current = new Decimal(2),player.C.end = new Decimal(0)):(player.C.current = new Decimal(3),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 10&&player.E.random.gte(8)) player.C.current = new Decimal(4),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 11&&player.E.random.lt(8)) player.E.random.lt(0.5)? (player.C.current = new Decimal(2),player.C.end = new Decimal(0)):(player.C.current = new Decimal(3),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 11&&player.E.random.gte(8)) player.C.current = new Decimal(4),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 12&&player.E.random.lt(9)) player.E.random.lt(5)? (player.C.current = new Decimal(3),player.C.end = new Decimal(0)):(player.C.current = new Decimal(4),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 12&&player.E.random.gte(9)) player.C.current = new Decimal(5),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 13&&player.E.random.lt(7)) player.E.random.lt(2)? (player.C.current = new Decimal(3),player.C.end = new Decimal(0)):(player.C.current = new Decimal(4),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 13&&player.E.random.gte(7)) player.C.current = new Decimal(5),player.C.end = new Decimal(0)
    if(player.C.end.gte(1)&&player.C.tier == 14&&player.E.random.lt(9)) player.E.random.lt(3)? (player.C.current = new Decimal(4),player.C.end = new Decimal(0)):(player.C.current = new Decimal(5),player.C.end = new Decimal(0))
    if(player.C.end.gte(1)&&player.C.tier == 14&&player.E.random.gte(9)) player.C.current = new Decimal(6),player.C.end = new Decimal(0)
    
    if(hasMilestone("E",6)) player.C.currentlyFreeze = player.C.currentlyFreeze.sub(diff)
    if(player.C.currentlyFreeze.lt(0)) player.C.currentlyFreeze = player.C.freeze, player.C.read = new Decimal(1)
    if(player.C.read.gte(1)&&player.C.current == 1) player.C.remain1 = player.C.remain1.sub(player.C.power),player.C.read = new Decimal(0)
    if(player.C.read.gte(1)&&player.C.current == 2) player.C.remain2 = player.C.remain2.sub(player.C.power),player.C.read = new Decimal(0)
    if(player.C.read.gte(1)&&player.C.current == 3) player.C.remain3 = player.C.remain3.sub(player.C.power),player.C.read = new Decimal(0)
    if(player.C.read.gte(1)&&player.C.current == 4) player.C.remain4 = player.C.remain4.sub(player.C.power),player.C.read = new Decimal(0)
    if(player.C.read.gte(1)&&player.C.current == 5) player.C.remain5 = player.C.remain5.sub(player.C.power),player.C.read = new Decimal(0)
    if(player.C.read.gte(1)&&player.C.current == 6) player.C.remain6 = player.C.remain6.sub(player.C.power),player.C.read = new Decimal(0)
    if(hasMilestone("Eng",12)) player.C.readingPoints = player.C.readingPoints.add((tmp.C.perSecond).mul(diff))
    if(hasMilestone("Eng",15)) player.C.balanceGold = new Decimal(10).pow((player.C.readingPoints.log10().div(100))).mul(tmp.C.goldMult)
    },
    tabFormat:{
        "Main":{
            content:[
    "main-display",
    function(){if(!hasMilestone("C",1))return "prestige-button"},
    "blank",
    ["display-text",
            function() {if(!hasMilestone("C",1)) return "↑点击以学习语文，提升语文知识！"},
            {}],
            ["display-text",
            function() {if(hasMilestone("C",1)) return "你正在每秒获取"+format(tmp.C.gainMult.pow(tmp.C.gainExp))+"基础语文知识"},
            {}],
            ["display-text",
            function() {if(tmp.C.gainMult.gte(tmp.C.softcap)) return "软上限力量："+format(new Decimal(1).sub(tmp.C.softcapPower).mul(100))+"%"},
            {}],
            ["display-text",
            function() {if(tmp.C.gainMult.gte(tmp.C.softcap)) return "软上限起始于："+format(tmp.C.softcap)+""},
            {}],
    "grid",

"blank",
"upgrades",
"milestones",

"blank",
, "blank", "blank", ]
},
"Reading":{
    content:[
"main-display",
["display-text",
            function() {if(hasMilestone("E",8))return "您当前拥有的阅读感悟为 <h2 style='color:#888888;text-shadow:0px 0px 10px;'>"+format(player.C.readingPoints)+ "<h2>"},
            {}],
            ["display-text",
            function() {if(hasMilestone("E",8))return "您当前拥有的金句摘抄为 <h2 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(player.C.balanceGold)+ "<h2>"},
            {}],
            ["display-text",
            function() {if(hasMilestone("E",8))return "当前每次阅读获取金句摘抄的概率为 <h2 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.goldChance)+ "%<h2>"},
            {}],
            ["display-text",
            function() {return "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'>Warning:阅读是一个长期积累的过程。如果你在阅读过程中离线，阅读的收益会严重降低！<h4>"},
            {}],
            
            ["row",[["buyable",51],["buyable",53],["buyable",52]]],
["buyable",11],
["row",[["buyable",21],["buyable",54],["buyable",55],["buyable",60],["buyable",61],["buyable",68],["buyable",69],["buyable",70],["buyable",75],["buyable",76],["buyable",77],["buyable",78],["buyable",79],["buyable",83],["buyable",84],["buyable",85],["buyable",86],["buyable",90],["buyable",92],["buyable",93]]],
function(){if(player.C.totalGold.gte(1))return ["infobox","2"]},
function(){if(player.C.total1.gte(1))return ["infobox","1"]},


["row",[["buyable",31],["buyable",32],["buyable",33]]],
function(){if(player.C.total2.gte(1))return ["infobox","3"]},
["row",[["buyable",56],["buyable",57],["buyable",58]]],
function(){if(player.C.total3.gte(1))return ["infobox","4"]},
["row",[["buyable",71],["buyable",72],["buyable",73]]],
function(){if(player.C.total4.gte(1))return ["infobox","5"]},
["row",[["buyable",80],["buyable",81],["buyable",82]]],
function(){if(player.C.total5.gte(1))return ["infobox","6"]},
function(){if(player.C.total6.gte(1))return ["infobox","7"]},
],

unlocked(){return hasMilestone("E",6)}
},
"ReadingSkill":{
    content:[
"main-display",
["display-text",
            function() {if(hasMilestone("E",8))return "您当前拥有的阅读感悟为 <h2 style='color:#888888;text-shadow:0px 0px 10px;'>"+format(player.C.readingPoints)+ "<h2>"},
            {}],
["row",[["buyable",41],["buyable",42],["buyable",43]]],
["row",[["buyable",44],["buyable",59]]],
["row",[["buyable",87],["buyable",88],["buyable",89]]],
],
unlocked(){return hasMilestone("E",8)}
},
"ReadingUpgrade":{
    content:[
"main-display",
["display-text",
            function() {if(hasMilestone("E",8))return "您当前拥有的阅读感悟为 <h2 style='color:#888888;text-shadow:0px 0px 10px;'>"+format(player.C.readingPoints)+ "<h2>"},
            {}],
            ["display-text",
            function() {return "*Tips:应用意味着用打造的脑洞来替换目前的脑洞。如果脑洞的每秒阅读能力低于1，将会无法应用脑洞。"},
            {}],
            ["row",[["buyable",64]]],
            ["row",[["buyable",65],["buyable",66]]],
            ["row",[["buyable",67],["buyable",74],["buyable",91]]],


],
unlocked(){return hasMilestone("C",5)&&tmp.C.maxTier.gte(3)}
},
},
    
    color: "#888888",                       // The color for this layer, which affects many elements.
    resource: "语文知识",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "学分",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    softcap() {
        let sc = new Decimal(1e16)
        if(hasMilestone("C",12)) sc = sc.plus(1e16)
        return sc;
    },
    softcapPower() {
        let scp = new Decimal(0.53)
        if(hasMilestone("C",3)) scp = scp.plus(0.03)
        if(hasMilestone("E",12)) scp = scp.plus(0.03)
        return scp;
    },
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let gain = new Decimal(1)
        if(hasUpgrade("C",14)) gain = gain.mul(upgradeEffect("C",14))
        if(hasUpgrade("C",21)) gain = gain.mul(upgradeEffect("C",21))
        if(hasMilestone("E",3)) gain = gain.mul(player.E.bestPoints)
        if(getBuyableAmount("Exp",12).gte(1)||hasUpgrade("C",42)) gain = gain.mul(buyableEffect("Exp",12))
        if(hasMilestone("E",6)) gain = gain.mul(tmp.C.effect1)
        if(player.C.totalGold.gte(1)) gain = gain.mul(tmp.C.effectGold1)
        if(player.Exp.bought58) gain = gain.mul(buyableEffect("Exp",58))
        if(player.Eng.totalpp.gte(1)) gain = gain.mul(tmp.Eng.ppEffect)
        if(hasUpgrade("Eng",15)) gain = gain.mul(upgradeEffect("Eng",15))
if(hasUpgrade("Eng",25)) gain = gain.mul(upgradeEffect("Eng",25))
if(hasUpgrade("Eng",35)) gain = gain.mul(upgradeEffect("Eng",35))
if(hasUpgrade("Eng",45)) gain = gain.mul(upgradeEffect("Eng",45))
if(hasUpgrade("Eng",55)) gain = gain.mul(upgradeEffect("Eng",55))
if(hasUpgrade("Eng",65)) gain = gain.mul(upgradeEffect("Eng",65))
if(hasUpgrade("Eng",75)) gain = gain.mul(upgradeEffect("Eng",75))
if(inChallenge("Exp",21)||inChallenge("Exp",22)) gain = gain.mul(0)
        return gain            // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        let gain = new Decimal(1)
        if(hasUpgrade("C",24)) gain = gain.add(0.3)
        if(hasMilestone("E",2)) gain = gain.add(0.1)
        if(hasMilestone("E",4)) gain = gain.add(0.2)
        return gain
    },
    resetsNothing(){return true},
    layerShown() { return true },           
    
    upgrades: {
        11: {
            title: "在山的那边",
            description: "每秒自动生产10学分。",
            cost: new Decimal(10),
            effect(){ let eff = new Decimal(10)
            return eff
            },
            tooltip(){return "受到其后其他加成的影响。"},
            unlocked(){return hasMilestone("E",0)},
            effectDisplay(){return `+${format(this.effect())}`}
            
            },
            12: {
                title: "走一步，再走一步",
                description: "语文知识加成学分获取",
                cost: new Decimal(500),
                effect(){ 
                if(!hasMilestone("C",1)) eff = player.C.points.add(1).log10().max(1)
                if(hasMilestone("C",1)) eff = player.C.points.add(1).log2().max(1)
                if(hasUpgrade("C",22)) eff = eff.mul(eff.log10())
                if(getBuyableAmount("Exp",13).gte(1)||hasMilestone("E",13)) eff = eff.mul(buyableEffect("Exp",13))
                return eff
                },
                unlocked(){return hasMilestone("E",0)&&hasUpgrade("C",11)},
                effectDisplay(){return `x${format(this.effect())}`}
                
                },
                13: {
                    title: "生命，生命",
                    description: "学分加成自身获取。",
                    cost: new Decimal(4000),
                    effect(){ 
                    eff = player.points.add(10).log10()
                    if(hasUpgrade("C",22)) eff = eff.mul(eff.log10())
                    if(getBuyableAmount("Exp",13).gte(1)||hasMilestone("E",13)) eff = eff.mul(buyableEffect("Exp",13))
                    return eff
                    },
                    unlocked(){return hasMilestone("E",0)&&hasUpgrade("C",12)},
                    effectDisplay(){return `x${format(this.effect())}`}
                    
                    },
                    14: {
                        title: "紫藤萝瀑布",
                        description: "左侧升级以降低的效果提升语文知识获取。",
                        cost: new Decimal(12000),
                        effect(){ 
                        eff = player.points.add(10).log10().root(1.5)
                        if(hasUpgrade("C",22)) eff = eff.mul(eff.log10())
                        if(getBuyableAmount("Exp",13).gte(1)||hasMilestone("E",13)) eff = eff.mul(buyableEffect("Exp",13))
                        return eff
                        },
                        unlocked(){return hasMilestone("E",0)&&hasUpgrade("C",13)},
                        effectDisplay(){return `x${format(this.effect())}`}
                        
                        },
                        15: {
                            title: "语文经验",
                            description: "每完成一次中考，学分获取提升2倍。(上限为7次)",
                            cost: new Decimal(30000),
                            effect(){ 
                            if(!hasUpgrade("C",24))eff = new Decimal(2).pow(player.E.year.sub(2022)).min(128)
                            if(hasUpgrade("C",24))eff = new Decimal(2).pow(player.E.year.sub(2022)).min(4096)
                            if(hasUpgrade("C",22)) eff = eff.mul(eff.log10())
                            if(getBuyableAmount("Exp",13).gte(1)||hasMilestone("E",13)) eff = eff.mul(buyableEffect("Exp",13))
                            return eff
                            },
                            unlocked(){return hasMilestone("E",0)&&hasUpgrade("C",14)},
                            effectDisplay(){return `x${format(this.effect())}`}
                            
                            },
                            21: {
                                title: "童趣",
                                description: "经验等级以降低的速率提升语文知识获取。",
                                cost: new Decimal(5e6),
                                effect(){ 
                                if(!hasUpgrade("C",23))eff = tmp.Exp.effect.sqrt()
                                if(hasUpgrade("C",23))eff = tmp.Exp.effect
                                if(hasUpgrade("C",35))eff = eff.mul(upgradeEffect("C",35))
                                return eff
                                },
                                unlocked(){return hasMilestone("E",1)&&hasUpgrade("C",15)},
                                effectDisplay(){return `x${format(this.effect())}`}
                                
                                },
                                22: {
                                    title: "理想",
                                    description: "第一行全部升级都以削弱的倍率提升自身效果。",
                                    cost: new Decimal(3e7),
                                    effect(){ 
                                    eff = tmp.Exp.effect.sqrt()
                                    return eff
                                    },
                                    unlocked(){return hasMilestone("E",1)&&hasUpgrade("C",21)}
                                    
                                    },
                                    23: {
                                        title: "人生寓言",
                                        description: "优化“童趣”的公式。",
                                        cost: new Decimal(6e7),
                                        effect(){ 
                                        eff = tmp.Exp.effect.sqrt()
                                        return eff
                                        },
                                        unlocked(){return hasMilestone("E",1)&&hasUpgrade("C",22)}
                                        
                                        },
                                        24: {
                                            title: "我的信念",
                                            description: "“语文经验”的上限提升5，语文知识获取的指数提升0.3，但强制将您的学分和语文知识设置为10。",
                                            cost: new Decimal(6e8),
                                            effect(){ 
                                            eff = tmp.Exp.effect.sqrt()
                                            return eff
                                            },
                                            pay(){player.points = new Decimal(10)
                                            player.C.points = new Decimal(10)},
                                            unlocked(){return hasMilestone("E",1)&&hasUpgrade("C",23)}
                                            
                                            },
                                            25: {
                                                title: "《论语》十二则",
                                                description: "中考最佳分数以增加的倍率倍增经验等级效应。",
                                                cost: new Decimal(2e32),
                                                effect(){ 
                                                eff = player.E.bestPoints.pow(2)
                                                return eff
                                                },
                                                unlocked(){return hasMilestone("E",4)&&hasUpgrade("C",24)},
                                                effectDisplay(){return `x${format(this.effect())}`}
                                                
                                                },
                                                31: {
                                                    title: "春",
                                                    description: "中考最佳分数倍增天赋技能1基础倍率",
                                                    cost: new Decimal(6e35),
                                                    effect(){ 
                                                    eff = player.E.bestPoints
                                                    if(hasUpgrade("C",34))eff = eff.mul(2)
                                                    return eff
                                                    },
                                                    unlocked(){return hasMilestone("E",4)&&hasUpgrade("C",25)},
                                                    effectDisplay(){return `x${format(this.effect())}`}
                                                    
                                                    },
                                                    32: {
                                                        title: "济南的冬天",
                                                        description: "中考最佳分数倍增天赋技能2基础倍率",
                                                        cost: new Decimal(3e36),
                                                        effect(){ 
                                                        eff = player.E.bestPoints
                                                        if(hasUpgrade("C",34))eff = eff.mul(2)
                                                        return eff
                                                        },
                                                        unlocked(){return hasMilestone("E",4)&&hasUpgrade("C",31)},
                                                        effectDisplay(){return `x${format(this.effect())}`}
                                                        
                                                        },
                                                        33: {
                                                            title: "雨的四季",
                                                            description: "中考最佳分数以降低的效果倍增天赋技能3基础倍率",
                                                            cost: new Decimal(8e37),
                                                            effect(){ 
                                                            eff = player.E.bestPoints.sqrt()
                                                            if(hasUpgrade("C",34))eff = eff.mul(2)
                                                            return eff
                                                            },
                                                            unlocked(){return hasMilestone("E",4)&&hasUpgrade("C",32)},
                                                            effectDisplay(){return `x${format(this.effect())}`}
                                                            
                                                            },
                                                            34: {
                                                                title: "观沧海",
                                                                description: "本行前面所有升级效果翻倍。",
                                                                cost: new Decimal(1e43),
                                                                effect(){ 
                                                                eff = new Decimal(2)
                                                                return eff
                                                                },
                                                                unlocked(){return hasMilestone("E",4)&&hasUpgrade("C",33)},
                                                                effectDisplay(){return `x${format(this.effect())}`}
                                                                
                                                                },
                                                                35: {
                                                                    title: "次北固山下",
                                                                    description: "天赋技能3同样生效于“童趣”。",
                                                                    cost: new Decimal(3e45),
                                                                    effect(){ 
                                                                    eff = buyableEffect("Exp",13)
                                                                    return eff
                                                                    },
                                                                    unlocked(){return hasMilestone("E",4)&&hasUpgrade("C",34)},
                                                                    effectDisplay(){return `x${format(this.effect())}`}
                                                                    
                                                                    },
                                                                    41: {
                                                                        title: "闻王昌龄左迁龙标遥有此寄",
                                                                        description: "天赋技能1始终基于最佳数值。",
                                                                        cost: new Decimal(2e76),
                                                                        effect(){ 
                                                                        eff = buyableEffect("Exp",13)
                                                                        return eff
                                                                        },
                                                                        unlocked(){return hasMilestone("E",4)&&hasUpgrade("C",35)},
                                                                        
                                                                        },
                                                                        42: {
                                                                            title: "天净沙·秋思",
                                                                            description: "天赋技能2始终基于最佳数值。同时“精读文言文”基础再次提升5%！",
                                                                            cost: new Decimal(1e109),
                                                                            effect(){ 
                                                                            eff = new Decimal(5)
                                                                            return eff
                                                                            },
                                                                            unlocked(){return hasMilestone("C",3)&&hasUpgrade("C",41)},
                                                                            
                                                                            },
    },
    milestones:{
        0: {
            requirementDescription: "10 语文知识(0)",
            effectDescription: "解锁中考。可以运用你的语文知识在语文中考中获得分数。",
            done() {
                return player.C.points.gte(10)
            }
        },
        1: {
            requirementDescription(){return format(new Decimal(1000))+" 语文知识(1)"},
            effectDescription: "每秒自动学习 1 次语文，禁用手动学习语文。同时改良“走一步，再走一步”的公式",
            done() {
                return player.C.points.gte(1000)
            }
        },
        2: {
            requirementDescription(){return format(new Decimal(2e89))+" 语文知识(2)"},
            effectDescription: "在语文考试选项卡下解锁文言文阅读！同时解锁考试策略。",
            done() {
                return player.C.points.gte(2e89)
            }
        },
        3: {
            requirementDescription(){return format(new Decimal(2e103))+" 语文知识(3)"},
            effectDescription: "“精读文言文”的基础增加10%（叠加）。同时语文知识软上限削弱3%。",
            done() {
                return player.C.points.gte(2e103)
            }
        },
        4: {
            requirementDescription: "3 金句摘抄(4)",
            effectDescription: "将经验效应的公式中添加金句摘抄。同时解锁1个全新的阅读技能！",
            done() {
                return player.C.totalGold.gte(3)
            }
        },
        5: {
            requirementDescription: "最高名著阶层达到 3(5)",
            effectDescription: "你可以花费不同阶层的好文精华来精炼你的脑洞，提升阅读效率。在语文考试中追加综合性学习。同时你可以挖掘Uncommon级别的写作手法了！",
            done() {
                return player.C.tier.gte(3)
            }
        },
        6: {
            requirementDescription: "最高名著阶层达到 5(6)",
            effectDescription: "如果你的英语知识低于60000秒的产量，则获取速度提升1000倍，天赋技能指数为0.8。同时在语文考试中解锁套作！",
            done() {
                return player.C.tier.gte(5)
            }
        },
        7: {
            requirementDescription: "最高名著阶层达到 7(7)",
            effectDescription: "天赋技能指数为0.6。",
            done() {
                return player.C.tier.gte(7)
            }
        },
        8: {
            requirementDescription: "最高名著阶层达到 8(8)",
            effectDescription: "在英语考试中解锁选词填空。",
            done() {
                return player.C.tier.gte(8)
            }
        },
        9: {
            requirementDescription: "最高名著阶层达到 12(9)",
            effectDescription: "解锁除作文外的所有英语考试内容，同时在语文作文中追加灵感。",
            done() {
                return player.C.tier.gte(12)
            }
        },
        10: {
            requirementDescription: "最高名著阶层达到 13(10)",
            effectDescription: "阅读技能G2基础x1.5。同时脑洞每秒阅读能力倍增金句摘抄获取。",
            done() {
                return player.C.tier.gte(13)
            }
        },
        11: {
            requirementDescription: "最高名著阶层达到 14(11)",
            effectDescription: "在英语考试中解锁英语作文。解锁3个异常强大的作文灵感并淘汰3个较差的作文灵感！同时名著阶层^2倍增金句摘抄获取。",
            done() {
                return player.C.tier.gte(14)
            }
        },
    },
    passiveGeneration(){return hasMilestone('C',1)? 1 : 0},

})

addLayer("E", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,
        random: new Decimal(0),  
        InText: '输入您的主角名字！这个名字将会在排行榜与录取通知书上使用。注意，名字长度不能超过30个字符！否则将会强制被替换为初始的“Nameless”。', 
        name: 'Nameless',                // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        bestPoints: new Decimal(0),
        rank: new Decimal(109123),
        inExam: new Decimal(0),
        completedExam: new Decimal(0),
        year: new Decimal(2022),
        Chinese: new Decimal(0),
        ChineseType: new Decimal(0),
        inChinese: new Decimal(0),
        ChineseBest: new Decimal(0),
        ChineseTime: new Decimal(0),
        English: new Decimal(0),
        inEnglish: new Decimal(0),
        completedEnglish: false,
        EnglishBest: new Decimal(0),
        EnglishTime: new Decimal(0),
        zuowenTime: new Decimal(0),
        inZuowen: new Decimal(0),
        startedZuowen: new Decimal(0),
        completedZuowen: new Decimal(0),
        ccSelected1: new Decimal(1),
        ccSelected2: new Decimal(1),
        ccPoints: new Decimal(0),
        ccBest: new Decimal(0),
        ccRandom0: new Decimal(0),
        ccRandom1: new Decimal(0),
        ccRandom2: new Decimal(0),
        luojiMult: new Decimal(0),
        wenbiMult: new Decimal(0),
        sixiangMult: new Decimal(0),
        xiangxiangMult: new Decimal(0),
        luoji: new Decimal(0),
        wenbi: new Decimal(0),
        sixiang: new Decimal(0),
        xiangxiang: new Decimal(0),
        story: new Decimal(0),
        freeze: new Decimal(0),
        lingganFreeze: new Decimal(10),
        linggan: false,
        lingganRandom: new Decimal(0),
        ccFreeze: new Decimal(10)    // "points" is the internal name for the main resource of the layer.
    };},
    nodeStyle() {
        if(player.E.bestPoints.lt(30))return {
            'color': '#FFFFFF',
            'background-image': 'url(https://i.postimg.cc/YChQW1Yh/Rating-0-30.jpg)',
            'background-position': 'center center',
            'background-size': '150%',
            'border': '4px solid #FFFFFF'
        }
        if(player.E.bestPoints.gte(30)&&player.E.bestPoints.lt(60))return {
            'color': '#FFFFFF',
            'background-image': 'url(https://i.postimg.cc/5NtChwPn/Rating-31-70.jpg)',
            'background-position': 'center center',
            'background-size': '150%',
            'border': '4px solid #FFFFFF'
        }
        if(player.E.bestPoints.gte(60)&&player.E.bestPoints.lt(100))return {
            'color': '#FFFFFF',
            'background-image': 'url(https://i.postimg.cc/N0mRhzp9/Rating-1.png)',
            'background-position': 'center center',
            'background-size': '150%',
            'border': '4px solid #FFFFFF'
        }
        if(player.E.bestPoints.gte(100)&&player.E.bestPoints.lt(200))return {
            'color': '#FFFFFF',
            'background-image': 'url(https://i.postimg.cc/4xVfqyvp/Rating-2.png)',
            'background-position': 'center center',
            'background-size': '150%',
            'border': '4px solid #FFFFFF'
        }
        if(player.E.bestPoints.gte(200)&&player.E.bestPoints.lt(300))return {
            'color': '#FFFFFF',
            'background-image': 'url(https://i.postimg.cc/6qgBbPnV/Rating-3.png)',
            'background-position': 'center center',
            'background-size': '150%',
            'border': '4px solid #FFFFFF'
        }
        
    },  
    

    color: "#FFFFFF",                       // The color for this layer, which affects many elements.
    resource: "中考分数",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "学分",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },
    symbol()
    {
return "E<sup>"+player.E.bestPoints+"</sup>"
    },// A function to return the current amount of baseResource.
cclim1()
{
let lim = new Decimal(1)
if(getBuyableAmount("Exp",55).gte(1)) lim = lim.add(1)
return lim
},
cclim2()
{
let lim = new Decimal(1)
if(getBuyableAmount("Exp",55).gte(1)) lim = lim.add(1)
if(hasMilestone("Eng",7)) lim = lim.add(1)
return lim
},
    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    tooltip(){return "最佳中考分数:"+player.E.bestPoints+"分"},
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    ccTotal1()
    {
let total = new Decimal(3)
return total
    },
    ccTotal2()
    {
let total = new Decimal(3)
return total
    },
    milestones:{
        0: {
            requirementDescription: "最佳中考分数达到 1 (0)",
            effectDescription: "解锁 5 个语文升级。",
            done() {
                return player.E.bestPoints.gte(1)
            }
        },
        1: {
            requirementDescription: "最佳中考分数达到 2 (1)",
            effectDescription: "解锁经验。另外中考最佳分数倍增学分获取。另外解锁 4 个很贵的语文升级！",
            done() {
                return player.E.bestPoints.gte(2)
            },
            unlocked(){
return hasMilestone("E",0)
            },
        },
        2: {
            requirementDescription: "最佳中考分数达到 3 (2)",
            effectDescription: "经验效应公式变得些微更好。语文指数再度提升 0.1 ！",
            done() {
                return player.E.bestPoints.gte(3)
            },
            unlocked(){
                return hasMilestone("E",1)
                            },
        },
        3: {
            requirementDescription: "最佳中考分数达到 5 (3)",
            effectDescription: "在经验选项卡下追加天赋。中考最佳分数同样倍增语文知识获取。",
            done() {
                return player.E.bestPoints.gte(5)
            },
            unlocked(){
return hasMilestone("E",2)
            },
        },
        4: {
            requirementDescription: "最佳中考分数达到 6 (4)",
            effectDescription: "追加 1 个天赋技能，平方经验效应，同时语文指数再度提升 0.2 。同时解锁 4 个很贵、很强大的语文升级！",
            done() {
                return player.E.bestPoints.gte(6)
            },
            unlocked(){
                return hasMilestone("E",3)
                            },
        },
        5: {
            requirementDescription: "最佳中考分数达到 7 (5)",
            effectDescription: "天赋技能 2 基础翻倍",
            done() {
                return player.E.bestPoints.gte(7)
            },
            unlocked(){
                return hasMilestone("E",4)
                            },
        },
        6: {
            requirementDescription: "最佳中考分数达到 9 (6)",
            effectDescription: "在语文选项卡下追加阅读，可以通过阅读书籍提升阅读点数，加成语文知识获取。第1次升级天赋技能不消耗天赋点数。同时解锁排行榜，可以查看自己在班级内的中考分数排名情况。",
            done() {
                return player.E.bestPoints.gte(9)
            },
            unlocked(){
                return hasMilestone("E",5)
                            },
        },
        7: {
            requirementDescription: "最佳中考分数达到 11 (7)",
            effectDescription: "在经验选项卡下追加天赋转换器。可以将您的经验点数转换为天赋点数！",
            done() {
                return player.E.bestPoints.gte(11)
            },
            unlocked(){
                return hasMilestone("E",6)
                            },
        },
        8: {
            requirementDescription: "最佳中考分数达到 13 (8)",
            effectDescription: "所有天赋技能成本增长从指数改为线性。同时在语文选项卡下解锁将好文精华转化为阅读感悟的能力和3个全新的阅读感悟技能。并且每次阅读有较小概率获得金句摘抄！",
            done() {
                return player.E.bestPoints.gte(13)
            },
            unlocked(){
                return hasMilestone("E",7)
                            },
        },
        9: {
            requirementDescription: "最佳中考分数达到 15 (9)",
            effectDescription: "天赋技能 4 基于最佳。阅读技能 2 免费提升2级。",
            done() {
                return player.E.bestPoints.gte(15)
            },
            unlocked(){
                return hasMilestone("E",8)
                            },
        },
        10: {
            requirementDescription: "最佳中考分数达到 17 (10)",
            effectDescription: "在语文考试中追加作文。作文是语文考试的大分题！",
            done() {
                return player.E.bestPoints.gte(17)
            },
            unlocked(){
                return hasMilestone("E",9)
                            },
        },
        11: {
            requirementDescription: "最佳中考分数达到 27 (11)",
            effectDescription: "在经验选项卡下追加天赋树，并且解锁 1 个全新的天赋转换器。",
            done() {
                return player.E.bestPoints.gte(27)
            },
            unlocked(){
                return hasMilestone("E",10)
                            },
        },
        12: {
            requirementDescription: "最佳中考分数达到 29 (12)",
            effectDescription: "语文软上限再度削弱3%且延迟生效。解锁一个天赋技能，能够倍增阅读感悟获取。",
            done() {
                return player.E.bestPoints.gte(29)
            },
            unlocked(){
                return hasMilestone("E",11)
                            },
        },
        13: {
            requirementDescription: "最佳中考分数达到 32 (13)",
            effectDescription: "阅读感悟获取再翻10倍，将所有的“基于最佳”统一为基于天赋技能1的最佳数值。获得一个免费的阅读感悟技能5等级。",
            done() {
                return player.E.bestPoints.gte(32)
            },
            unlocked(){
                return hasMilestone("E",12)
                            },
        },
        14: {
            requirementDescription: "最佳中考分数达到 42 (14)",
            effectDescription: "解锁一个新层级！",
            done() {
                return player.E.bestPoints.gte(42)
            },
            unlocked(){
                return hasMilestone("E",13)
                            },
        },
        15: {
            requirementDescription: "最佳中考分数达到 51 (15)",
            effectDescription: "天赋技能指数为0.75。解锁1个全新的天赋技能（很强大！）",
            done() {
                return player.E.bestPoints.gte(51)
            },
            unlocked(){
                return hasMilestone("E",14)
                            },
        },
        16: {
            requirementDescription: "最佳中考分数达到 61 (16)",
            effectDescription: "英语知识生产快10倍。再度平方经验效应。同时所有文言文类题目解题快50%。",
            done() {
                return player.E.bestPoints.gte(61)
            },
            unlocked(){
                return hasMilestone("E",15)
                            },
        },
        17: {
            requirementDescription: "最佳中考分数达到 69 (17)",
            effectDescription: "我是个占位符啦~本来我是氨基酸的最后一个里程碑，没想到当晚遭遇了龙卷风，我被卷出了氨基酸层，卷出了生命树，然后降落在这里。",
            done() {
                return player.E.bestPoints.gte(69)
            },
            unlocked(){
                return hasMilestone("E",16)
                            },
        },
        18: {
            requirementDescription: "最佳中考分数达到 71 (18)",
            effectDescription: "英语知识获取公式的底数 100 => 222，指数 1.05 => 1.07。同时解锁一行一列全新的英语网格节点！",
            done() {
                return player.E.bestPoints.gte(71)
            },
            unlocked(){
                return hasMilestone("E",17)
                            },
        },
        19: {
            requirementDescription: "最佳中考分数达到 84 (19)",
            effectDescription: "平方R2。",
            done() {
                return player.E.bestPoints.gte(84)
            },
            unlocked(){
                return hasMilestone("E",18)
                            },
        },
        20: {
            requirementDescription: "最佳中考分数达到 88 (20)",
            effectDescription: "阅读技能2基础提升",
            done() {
                return player.E.bestPoints.gte(88)
            },
            unlocked(){
                return hasMilestone("E",19)
                            },
        },
        21: {
            requirementDescription: "最佳中考分数达到 103 (21)",
            effectDescription: "英语知识指数再度提升0.05！",
            done() {
                return player.E.bestPoints.gte(103)
            },
            unlocked(){
                return hasMilestone("E",20)
                            },
        },
        22: {
            requirementDescription: "最佳中考分数达到 119 (22)",
            effectDescription: "所有经验技能效果大幅提升，但不再受到技能等级的影响。C列英语网格不再花费任何英语知识。",
            done() {
                return player.E.bestPoints.gte(119)
            },
            unlocked(){
                return hasMilestone("E",21)
                            },
        },
        23: {
            requirementDescription: "最佳中考分数达到 128 (23)",
            effectDescription: "英语知识获取x100,000,000。同时平方Exp5。",
            done() {
                return player.E.bestPoints.gte(128)
            },
            unlocked(){
                return hasMilestone("E",22)
                            },
        },
        24: {
            requirementDescription: "最佳中考分数达到 200 (24)",
            effectDescription: "解锁一个新层级！",
            done() {
                return player.E.bestPoints.gte(200)
            },
            unlocked(){
                return hasMilestone("E",23)
                            },
        },
    },


    layerShown() { return true },           

    
    buyables:{
    11: {
        title: "参加中考！",
        gain() { 
            let gain = new Decimal(5)
        return gain
    },
        display() {  
            let data = tmp[this.layer].buyables[this.id]
            if(!player.E.inExam.gte(1))display = ("参加"+(player.E.year).add(1)+"年的天津市中考。根据中考成绩可以获得很多游戏加成！")
            if(player.E.inExam.gte(1))display = ("你现在正在"+(player.E.year)+"年的天津市中考中。祝您考试顺利，考入理想学校！")
            return display;
        },
        unlocked() { return hasMilestone("C",0)}, 
        canAfford() { return (!player.E.inExam.gte(1))&&player.E.freeze.lte(0)},
        buy() { 
        player.E.year = player.E.year.add(1)
        player.E.inExam = new Decimal(1)
        player.E.completedExam = new Decimal(0)
        player.E.ChineseTime = new Decimal(7200)
        player.E.Chinese = new Decimal(0)
        player.E.English = new Decimal(0)
        player.E.inChinese = new Decimal(1)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        player.E.points = new Decimal(0)
        },
        buyMax() {
              
        },
        style: {'height':'120px', 'width':'180px', 'font-size':'13px',
            'background-color'() {
                let points = player.E.inExam
                let color = "#bf8f8f"
                if ((!points.gte(1))&&(player.E.freeze.lte(0))) color = "#FFFFFF"
                return color
            }
            },
},
21: {
    title(){return player.E.year+"年天津市初中学业水平考试试卷<br><h1>语文<h1>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本试卷分为第I卷（选择题）、第II卷两部分。第I卷为第1页至第4页。第II卷为第5页至第8页。<br>试卷满分120分，答题时间120min。<h4>剩余时间:<h2>"+player.E.ChineseTime+"s<h2><h4>祝你考试顺利！<h4>")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "150px", width: "600px"}},
    autoed() { return false},
},
22: {
    title(){return "<h2>一、选择题<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共11小题，共28分。1~4小题、6小题，每题2分；5小题，7~11小题，每题3分")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
31: {
    title(){return "(2分) 选择题T1：字音字形"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e10<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e6)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e6)&&!player.C.points.gte(1e7)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e7)&&!player.C.points.gte(1e8)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e8)&&!player.C.points.gte(1e10)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e10)) chs = player.C.points.log10().div(27).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte(1e6)) time = time.sub(300)
        if(player.C.points.gte(1e8)) time = time.sub(200)
        if(player.C.points.gte(1e10)) time = time.sub(100)
        if(player.C.points.gte(1e13)) time = time.sub(100)
        if(player.C.points.gte(1e20)) time = time.sub(100)
        if(player.C.points.gte(1e30)) time = time.sub(100)
        if(player.C.points.gte(1e50)) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
32: {
    title(){return "(2分) 选择题T2：词语选择"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e50<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e30)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e30)&&!player.C.points.gte(1e40)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e40)&&!player.C.points.gte(1e43)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e43)&&!player.C.points.gte(1e50)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e50)) chs = player.C.points.log10().div(120).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte(1e30)) time = time.sub(300)
        if(player.C.points.gte(1e40)) time = time.sub(200)
        if(player.C.points.gte(1e50)) time = time.sub(100)
        if(player.C.points.gte(1e60)) time = time.sub(100)
        if(player.C.points.gte(1e70)) time = time.sub(100)
        if(player.C.points.gte(1e80)) time = time.sub(100)
        if(player.C.points.gte(1e100)) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
   
    if((player.E.random.mul(10)).lt(this.chance()))setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
33: {
    title(){return "(2分) 选择题T3：病句辨析"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e300<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e200)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e200)&&!player.C.points.gte(1e240)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e240)&&!player.C.points.gte(1e280)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e280)&&!player.C.points.gte(1e300)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e300)) chs = player.C.points.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1500)
        if(player.C.points.gte(1e300)) time = time.sub(700)
        if(player.C.points.gte("1e400")) time = time.sub(300)
        if(player.C.points.gte("1e500")) time = time.sub(100)
        if(player.C.points.gte("1e600")) time = time.sub(100)
        if(player.C.points.gte("1e700")) time = time.sub(100)
        if(player.C.points.gte("1e800")) time = time.sub(100)
        if(player.C.points.gte("1e1000")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
34: {
    title(){return "(2分) 选择题T4：标点符号判断"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e140<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e90)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e100)&&!player.C.points.gte(1e110)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e110)&&!player.C.points.gte(1e120)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e120)&&!player.C.points.gte(1e140)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e140)) chs = player.C.points.log10().div(400).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e100")) time = time.sub(300)
        if(player.C.points.gte("1e120")) time = time.sub(200)
        if(player.C.points.gte("1e140")) time = time.sub(100)
        if(player.C.points.gte("1e160")) time = time.sub(100)
        if(player.C.points.gte("1e180")) time = time.sub(100)
        if(player.C.points.gte("1e200")) time = time.sub(100)
        if(player.C.points.gte("1e250")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 

    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
35: {
    title(){return "(3分) 选择题T5：诗词赏析"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e600<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e400")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e400")&&!player.C.points.gte("1e500")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e500")&&!player.C.points.gte("1e550")) chs = new Decimal(1)
        if(player.C.points.gte("1e550")&&!player.C.points.gte("1e600")) chs = new Decimal(5)
        if(player.C.points.gte("1e600")) chs = player.C.points.log10().div(1500).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2000)
        if(player.C.points.gte("1e400")) time = time.sub(500)
        if(player.C.points.gte("1e500")) time = time.sub(300)
        if(player.C.points.gte("1e600")) time = time.sub(200)
        if(player.C.points.gte("1e900")) time = time.sub(200)
        if(player.C.points.gte("1e1400")) time = time.sub(200)
        if(player.C.points.gte("1e2000")) time = time.sub(200)
        if(player.C.points.gte("1e4000")) time = time.sub(200)
        if(player.C.points.gte("1e4000")) time = time.sub(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
36: {
    title(){return "(2分) 选择题T6：说明文阅读-Easy"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e80<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e20")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e20")&&!player.C.points.gte("1e40")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e40")&&!player.C.points.gte("1e60")) chs = new Decimal(1)
        if(player.C.points.gte("1e60")&&!player.C.points.gte("1e80")) chs = new Decimal(5)
        if(player.C.points.gte("1e80")) chs = player.C.points.log10().div(150).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e20")) time = time.sub(300)
        if(player.C.points.gte("1e50")) time = time.sub(200)
        if(player.C.points.gte("1e80")) time = time.sub(100)
        if(player.C.points.gte("1e160")) time = time.sub(100)
        if(player.C.points.gte("1e320")) time = time.sub(100)
        if(player.C.points.gte("1e640")) time = time.sub(100)
        if(player.C.points.gte("1e1280")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
37: {
    title(){return "(3分) 选择题T7：说明文阅读-Hard"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e1000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e300")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e300")&&!player.C.points.gte("1e400")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e400")&&!player.C.points.gte("1e600")) chs = new Decimal(1)
        if(player.C.points.gte("1e600")&&!player.C.points.gte("1e1000")) chs = new Decimal(5)
        if(player.C.points.gte("1e1000")) chs = player.C.points.log10().div(2400).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2000)
        if(player.C.points.gte("1e200")) time = time.sub(600)
        if(player.C.points.gte("1e500")) time = time.sub(400)
        if(player.C.points.gte("1e800")) time = time.sub(200)
        if(player.C.points.gte("1e1600")) time = time.sub(200)
        if(player.C.points.gte("1e2400")) time = time.sub(200)
        if(player.C.points.gte("1e3200")) time = time.sub(200)
        if(player.C.points.gte("1e6400")) time = time.sub(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
38: {
    title(){return "(3分) 选择题T8：说明文阅读-Insane"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e2500<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e300")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e300")&&!player.C.points.gte("1e900")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e900")&&!player.C.points.gte("1e1200")) chs = new Decimal(1)
        if(player.C.points.gte("1e1200")&&!player.C.points.gte("1e2500")) chs = new Decimal(5)
        if(player.C.points.gte("1e2500")) chs = player.C.points.log10().div(5000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(3000)
        if(player.C.points.gte("1e200")) time = time.sub(900)
        if(player.C.points.gte("1e500")) time = time.sub(600)
        if(player.C.points.gte("1e800")) time = time.sub(300)
        if(player.C.points.gte("1e1600")) time = time.sub(300)
        if(player.C.points.gte("1e2400")) time = time.sub(300)
        if(player.C.points.gte("1e3200")) time = time.sub(300)
        if(player.C.points.gte("1e6400")) time = time.sub(150)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
39: {
    title(){return "(3分) 选择题T9：课内文言文赏析-Easy"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e500<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e300")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e300")&&!player.C.points.gte("1e350")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e350")&&!player.C.points.gte("1e400")) chs = new Decimal(1)
        if(player.C.points.gte("1e400")&&!player.C.points.gte("1e500")) chs = new Decimal(5)
        if(player.C.points.gte("1e500")) chs = player.C.points.log10().div(1250).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e60")) time = time.sub(300)
        if(player.C.points.gte("1e150")) time = time.sub(200)
        if(player.C.points.gte("1e280")) time = time.sub(100)
        if(player.C.points.gte("1e460")) time = time.sub(100)
        if(player.C.points.gte("1e920")) time = time.sub(100)
        if(player.C.points.gte("1e1640")) time = time.sub(100)
        if(player.C.points.gte("1e3280")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
41: {
    title(){return "(3分) 选择题T10：课内文言文赏析-Hard"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e5000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e3000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e3000")&&!player.C.points.gte("1e3500")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e3500")&&!player.C.points.gte("1e4000")) chs = new Decimal(1)
        if(player.C.points.gte("1e4000")&&!player.C.points.gte("1e5000")) chs = new Decimal(5)
        if(player.C.points.gte("1e5000")) chs = player.C.points.log10().div(12500).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2000)
        if(player.C.points.gte("1e600")) time = time.sub(600)
        if(player.C.points.gte("1e1500")) time = time.sub(300)
        if(player.C.points.gte("1e2800")) time = time.sub(200)
        if(player.C.points.gte("1e4600")) time = time.sub(200)
        if(player.C.points.gte("1e9200")) time = time.sub(200)
        if(player.C.points.gte("1e16400")) time = time.sub(200)
        if(player.C.points.gte("1e32800")) time = time.sub(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
42: {
    title(){return "(3分) 选择题T11：课内文言文赏析-Insane"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e50000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e30000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e30000")&&!player.C.points.gte("1e35000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e35000")&&!player.C.points.gte("1e40000")) chs = new Decimal(1)
        if(player.C.points.gte("1e40000")&&!player.C.points.gte("1e50000")) chs = new Decimal(5)
        if(player.C.points.gte("1e50000")) chs = player.C.points.log10().div(12500).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 1&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(4000)
        if(player.C.points.gte("1e6000")) time = time.sub(1200)
        if(player.C.points.gte("1e15000")) time = time.sub(600)
        if(player.C.points.gte("1e28000")) time = time.sub(600)
        if(player.C.points.gte("1e46000")) time = time.sub(600)
        if(player.C.points.gte("1e92000")) time = time.sub(400)
        if(player.C.points.gte("1e164000")) time = time.sub(400)
        if(player.C.points.gte("1e328000")) time = time.sub(200)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)

        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(1)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
43: {
    title(){return "<h2>二、诗句补充<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共1小题，共7分。")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
44: {
    title(){return "(1分)①小学诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：10<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(6)) return new Decimal(0.001)
        if(player.C.points.gte(6)&&!player.C.points.gte(7)) return new Decimal(0.01)
        if(player.C.points.gte(7)&&!player.C.points.gte(8)) return new Decimal(0.1)
        if(player.C.points.gte(8)&&!player.C.points.gte(10)) return new Decimal(0.5)
        if(player.C.points.gte(10)) return player.C.points.log10().div(1).mul(100).min(100)
        if(player.E.ChineseType == 2&&inChallenge("Exp",22)) chs = chs.div(4)

        
    },
    time(){
        let time = new Decimal(100)
        if(player.C.points.gte(6)) time = time.sub(30)
        if(player.C.points.gte(8)) time = time.sub(20)
        if(player.C.points.gte(10)) time = time.sub(10)
        if(player.C.points.gte(20)) time = time.sub(10)
        if(player.C.points.gte(40)) time = time.sub(10)
        if(player.C.points.gte(60)) time = time.sub(10)
        if(player.C.points.gte(80)) time = time.sub(5)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(2)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
45: {
    title(){return "(1分)②七年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e6<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e4)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e4)&&!player.C.points.gte(5e4)) chs = new Decimal(0.01)
        if(player.C.points.gte(5e4)&&!player.C.points.gte(2e5)) chs = new Decimal(0.1)
        if(player.C.points.gte(2e5)&&!player.C.points.gte(1e6)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e6)) chs = player.C.points.log10().div(9).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 2&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(100)
        if(player.C.points.gte(1e4)) time = time.sub(30)
        if(player.C.points.gte(1e5)) time = time.sub(20)
        if(player.C.points.gte(1e7)) time = time.sub(10)
        if(player.C.points.gte(1e14)) time = time.sub(10)
        if(player.C.points.gte(1e21)) time = time.sub(10)
        if(player.C.points.gte(1e28)) time = time.sub(10)
        if(player.C.points.gte(1e35)) time = time.sub(5)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(2)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
46: {
    title(){return "(1分)③七年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e12<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e8)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e8)&&!player.C.points.gte(1e9)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e9)&&!player.C.points.gte(1e10)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e10)&&!player.C.points.gte(1e12)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e12)) chs = player.C.points.log10().div(28).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 2&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(100)
        if(player.C.points.gte(1e8)) time = time.sub(30)
        if(player.C.points.gte(1e10)) time = time.sub(20)
        if(player.C.points.gte(1e14)) time = time.sub(10)
        if(player.C.points.gte(1e28)) time = time.sub(10)
        if(player.C.points.gte(1e56)) time = time.sub(10)
        if(player.C.points.gte(1e100)) time = time.sub(10)
        if(player.C.points.gte(1e200)) time = time.sub(5)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(2)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
47: {
    title(){return "(1分)④八年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e24<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e16)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e16)&&!player.C.points.gte(1e18)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e18)&&!player.C.points.gte(1e20)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e20)&&!player.C.points.gte(1e24)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e24)) chs = player.C.points.log10().div(35).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 2&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(200)
        if(player.C.points.gte(1e16)) time = time.sub(60)
        if(player.C.points.gte(1e20)) time = time.sub(40)
        if(player.C.points.gte(1e28)) time = time.sub(20)
        if(player.C.points.gte(1e56)) time = time.sub(20)
        if(player.C.points.gte(1e100)) time = time.sub(20)
        if(player.C.points.gte(1e200)) time = time.sub(20)
        if(player.C.points.gte(1e400)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(2)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
48: {
    title(){return "(1分)⑤八年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e48<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e32)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e32)&&!player.C.points.gte(1e36)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e36)&&!player.C.points.gte(1e40)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e40)&&!player.C.points.gte(1e48)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e48)) chs = player.C.points.log10().div(112).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 2&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(200)
        if(player.C.points.gte(1e32)) time = time.sub(60)
        if(player.C.points.gte(1e40)) time = time.sub(40)
        if(player.C.points.gte(1e56)) time = time.sub(20)
        if(player.C.points.gte(1e100)) time = time.sub(20)
        if(player.C.points.gte(1e200)) time = time.sub(20)
        if(player.C.points.gte(1e400)) time = time.sub(20)
        if(player.C.points.gte(1e800)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(2)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
49: {
    title(){return "(2分)⑥*理解性默写*九年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e192<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e96)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e96)&&!player.C.points.gte(1e112)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e112)&&!player.C.points.gte(1e140)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e140)&&!player.C.points.gte(1e192)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e192)) chs = player.C.points.log10().div(448).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 2&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(600)
        if(player.C.points.gte(1e96)) time = time.sub(180)
        if(player.C.points.gte(1e120)) time = time.sub(120)
        if(player.C.points.gte(1e200)) time = time.sub(60)
        if(player.C.points.gte(1e400)) time = time.sub(60)
        if(player.C.points.gte(1e800)) time = time.sub(60)
        if(player.C.points.gte(1e1600)) time = time.sub(60)
        if(player.C.points.gte(1e3200)) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(2)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
51: {
    title(){return "交卷！"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        if(player.E.inChinese.gte(1))display = ("完成你本次中考语文科目的考试。<br>*交卷后无法对语文科目答题卡进行操作！<br><h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>请慎重交卷，在交卷前认真检查答题卡！<h4>")
        if(player.E.inChinese.lt(1))display = ("您已完成本次中考语文科目的考试。努力完成剩余科目的考试吧！")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return player.E.inChinese.gte(1)&&player.E.inZuowen.lt(1)},
    buy() { 
    player.E.inChinese = new Decimal(0)
    if(hasMilestone("Eng",0)) player.E.inEnglish = new Decimal(1),player.E.EnglishTime = new Decimal(6000)  
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    player.E.points = player.E.Chinese
    
    if(inChallenge("Exp",11)) player.E.EnglishTime = new Decimal(3000)
    },
       
    style() { if(player.E.inChinese.gte(1))return {'background-color': "#888800",   color: "white", 'border-color': "#FFFF00",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.inChinese.lt(1))return {'background-color': "#000000",   color: "white", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
52: {
    title(){return "完成中考并查分！"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("完成你"+player.E.year+"年的中考旅程，并且查询中考分数。你所有科目的对错题情况也会揭晓。<br>*确保你已完成您所有已解锁科目的考试，再点击此处完成中考！")
        return display;
    },
    unlocked() { return player.E.inExam.gte(1)&&player.E.completedExam.lt(1)&&player.E.inZuowen.lt(1)&&player.E.inEnglish.lt(1) }, 
    canAfford() { return true},
    buy() { 
    buyBuyable("E",51)
    if(hasMilestone("Eng",0))buyBuyable("E",116)
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    player.E.inEnglish = new Decimal(0)
    },
       
    style() { return {'background-color': "#888800",   color: "white", 'border-color': "#FFFF00",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
53: {
    title(){return "<h2>天津市初中学业水平考试信息综合查询平台<h1><br><h3>"+player.E.year+"年初中学业水平考试成绩查询结果<h3>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("姓名："+player.E.name+"<br>考生号：202050007<br>考场号：25081<br>座位号：51<br>考试日期："+player.E.year+".6.8")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#DDDDDD",   color: "black", 'border-color': "#FFFFFF",'border-radius': "3px", height: "150px", width: "600px"}},
    autoed() { return false},
},
54: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>语文："+player.E.Chinese+"/120"
else return "语文：97/120"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
55: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>数学：0/120"
else return "数学：107/120"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#7A7064",   color: "white", 'border-color': "#8B8175",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
56: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>英语："+player.E.English+"/120"
else return "英语：115/120"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
57: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>政治：0/100"
else return "政治：83/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#628D44",   color: "white", 'border-color': "#739E55",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
58: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>历史：0/100"
else return "历史：100/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#379350",   color: "white", 'border-color': "#48A461",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
59: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>地理：0/100"
    else return "地理：100/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#24A089",   color: "white", 'border-color': "#35B09A",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
60: {
        title(){if(player.E.name != "Lixiaohan")return "<h3>生物：0/100"
        else return "生物：98/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#1686C3",   color: "white", 'border-color': "#2897D4",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
61: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>物理：0/100"
        else return "物理：97/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
62: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>化学：0/100"
        else return "化学：99/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
63: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>体育：0/40"
        else return "体育：39/40"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#EB1DEC",   color: "white", 'border-color': "#FC2EFD",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
64: {
    title(){if(player.E.name != "Lixiaohan")return "<h3>总成绩："+player.E.points+"/1000"
        else return "总成绩：940/1000(含少数民族5分加分)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#DDDD00",   color: "white", 'border-color': "#FFFF00",'border-radius': "3px", height: "30px", width: "600px"}},
    autoed() { return false},
},
65: {
    title(){return "<h2>录取通知书"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = (player.E.name+"同学：<br>您以"+player.E.points+"分数被我校录取，中考排名天津市第"+tmp.E.Rank+"名，请凭本通知书来我校报到。<br><br>祝您高中学习生活愉快！<br><br><br>                  <h2>")
        if(player.E.points.lt(150)) display += "<h2 style='color:#000000;text-shadow:0px 0px 10px;'>家里蹲"
        if(player.E.points.gte(150)&&player.E.points.lt(165)) display += "<h2 style='color:#111111;text-shadow:0px 0px 10px;'>天津市滨海新区汉沽中等专业学校"
        if(player.E.points.gte(165)) display += "<h2 style='color:#222222;text-shadow:0px 0px 10px;'>天津市北辰职业中等技术学校"
        if(player.E.name == "Lixiaohan") display = "Lixiaohan同学：<br>您以938分数被我校录取，中考排名天津市第7168名，请凭本通知书来我校报到。<br><br>祝您高中学习生活愉快！<br><br><br>                  <h2 style='color:#702FED;text-shadow:0px 0px 10px;'>天津市第42中学"
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#DDDDDD",   color: "black", 'border-color': "#FFFFFF",'border-radius': "3px", height: "200px", width: "600px"}},
    autoed() { return false},
},
66: {
    title(){return "<h2>好耶！"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("总结考试经验，记录考试成绩，备战"+player.E.year.add(1)+"年的中考！")
        return display;
    },
    unlocked() { return player.E.inExam.gte(1) }, 
    canAfford() { return true},
    buy() { 
    player.E.inExam = new Decimal(0)
    if(hasMilestone("E",1))player.Exp.points = player.Exp.points.add(new Decimal(4).mul(tmp.Exp.expMult))
    if(hasMilestone("E",1))player.Exp.points = player.Exp.points.add(new Decimal(4).mul(tmp.Exp.expMult))
    if(hasMilestone("E",1))player.Exp.points = player.Exp.points.add(new Decimal(4).mul(tmp.Exp.expMult))
    if(hasMilestone("E",1))player.Exp.points = player.Exp.points.add(player.E.points.mul(2).mul(tmp.Exp.expMult))
    if(hasMilestone("E",1))player.Exp.points = player.Exp.points.add(player.E.points.mul(2).mul(tmp.Exp.expMult))
    if(hasMilestone("E",1))player.Exp.points = player.Exp.points.add(player.E.points.mul(2).mul(tmp.Exp.expMult))
    if(player.E.points.gte(6))player.Exp.points = player.Exp.points.add((player.E.points.sub(5)).mul(34).mul(tmp.Exp.expMult))
    if(player.E.points.gte(6))player.Exp.points = player.Exp.points.add((player.E.points.sub(5)).mul(34).mul(tmp.Exp.expMult))
    if(player.E.points.gte(6))player.Exp.points = player.Exp.points.add((player.E.points.sub(5)).mul(34).mul(tmp.Exp.expMult))
    if(player.E.points.gte(11))player.Exp.points = player.Exp.points.add((player.E.points.sub(10)).mul(3334).mul(tmp.Exp.expMult))
    if(player.E.points.gte(11))player.Exp.points = player.Exp.points.add((player.E.points.sub(10)).mul(3334).mul(tmp.Exp.expMult))
    if(player.E.points.gte(11))player.Exp.points = player.Exp.points.add((player.E.points.sub(10)).mul(3334).mul(tmp.Exp.expMult))
    player.E.completedEnglish = false
    if(tmp.E.Rank.lt(player.E.rank)) player.E.rank = tmp.E.Rank
    if(player.E.points.gte(player.E.bestPoints)) player.E.bestPoints = player.E.points
    if(player.E.points.gte(player.E.bestPoints)) player.E.bestPoints = player.E.points
    if(player.E.points.gte(player.E.bestPoints)) player.E.bestPoints = player.E.points
    player.E.completedExam = new Decimal(0)
    player.E.completedZuowen = new Decimal(0)
    player.E.freeze = new Decimal(360)
    examReset()
    },
       
    style() { return {'background-color': "#888800",   color: "white", 'border-color': "#FFFF00",'border-radius': "3px", height: "100px", width: "400px"}},
    autoed() { return false},
},
67: {
    title(){return "<h2>三、文言文阅读<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共3小题，共7分。")
        return display;
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
68: {
    title(){return "(1分)T13:①解释文言文字词意思"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e90<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e50)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e60)&&!player.C.points.gte(1e112)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e70)&&!player.C.points.gte(1e140)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e80)&&!player.C.points.gte(1e192)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e90)) chs = player.C.points.log10().div(270).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        if(player.E.ChineseType == 3&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1200)
        if(player.C.points.gte(1e60)) time = time.sub(360)
        if(player.C.points.gte(1e80)) time = time.sub(240)
        if(player.C.points.gte(1e160)) time = time.sub(120)
        if(player.C.points.gte(1e400)) time = time.sub(120)
        if(player.C.points.gte(1e800)) time = time.sub(120)
        if(player.C.points.gte(1e1600)) time = time.sub(120)
        if(player.C.points.gte(1e3200)) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("E",15)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(3)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
69: {
    title(){return "(1分)T13:②解释文言文字词意思"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e9000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e5000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e5000")&&!player.C.points.gte("1e7000")) chs = new Decimal(0.01)
        if(player.C.points.gte("1e7000")&&!player.C.points.gte("1e8000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e8000")&&!player.C.points.gte("1e9000")) chs = new Decimal(0.5)
        if(player.C.points.gte("1e9000")) chs = player.C.points.log10().div(10000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
         if(player.E.ChineseType == 3&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1200)
        if(player.C.points.gte(1e6000)) time = time.sub(360)
        if(player.C.points.gte(1e8000)) time = time.sub(240)
        if(player.C.points.gte(1e16000)) time = time.sub(120)
        if(player.C.points.gte(1e40000)) time = time.sub(120)
        if(player.C.points.gte(1e80000)) time = time.sub(120)
        if(player.C.points.gte(1e160000)) time = time.sub(120)
        if(player.C.points.gte(1e320000)) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("E",15)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(3)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
70: {
    title(){return "(2分)T14:翻译文言文句子"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本小题包含2个答题点，前一个答题点回答的正确与否将会影响后一个答题点的回答成功率！")
        return display;
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
71: {
    title(){return "答题点1(Easy)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e100<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e60)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e70)&&!player.C.points.gte(1e80)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e80)&&!player.C.points.gte(1e90)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e90)&&!player.C.points.gte(1e100)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e100)) chs = player.C.points.log10().div(350).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        if(player.E.ChineseType == 3&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1200)
        if(player.C.points.gte(1e60)) time = time.sub(360)
        if(player.C.points.gte(1e80)) time = time.sub(240)
        if(player.C.points.gte(1e160)) time = time.sub(120)
        if(player.C.points.gte(1e400)) time = time.sub(120)
        if(player.C.points.gte(1e800)) time = time.sub(120)
        if(player.C.points.gte(1e1600)) time = time.sub(120)
        if(player.C.points.gte(1e3200)) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("E",15)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(3)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
72: {
    title(){return "答题点2(Hard)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e200<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e120)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e120)&&!player.C.points.gte(1e160)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e160)&&!player.C.points.gte(1e180)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e180)&&!player.C.points.gte(1e200)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e200)) chs = player.C.points.log10().div(1000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",71) == 1) chs = chs.mul(1.2).min(100)
        if(getBuyableAmount("E",71) == 2) chs = chs.mul(0.6)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        if(player.E.ChineseType == 3&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1200)
        if(player.C.points.gte(1e120)) time = time.sub(360)
        if(player.C.points.gte(1e160)) time = time.sub(240)
        if(player.C.points.gte(1e320)) time = time.sub(120)
        if(player.C.points.gte(1e900)) time = time.sub(120)
        if(player.C.points.gte(1e1600)) time = time.sub(120)
        if(player.C.points.gte(1e3200)) time = time.sub(120)
        if(player.C.points.gte(1e6400)) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(getBuyableAmount("E",71) == 1) time = time.mul(0.8)
        if(getBuyableAmount("E",71) == 2) time = time.mul(2)
        if(hasMilestone("E",15)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(3)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
73: {
    title(){return "精读文言文"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
effect(x)
{
let eff = this.base().pow(x)
return eff
},
base()
{
let base = new Decimal(1.1)
if(hasMilestone("C",3)) base = base.add(0.1)
if(hasUpgrade("C",42)) base = base.add(0.05)
return base
},
time()
{
let time = new Decimal(1500)
return time
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("消耗一定时间精读题目中文言文原文。<br>消耗时间："+format(this.time())+"s<br>当前效果：本大题所有小题解答正确率+"+format(this.effect().sub(1).mul(100))+"%<br>基础效果："+format(this.base().sub(1).mul(100))+"%")
        return display;
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return player.E.ChineseTime.gte(this.time())},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "200px", width: "200px"}},
    autoed() { return false},
},
74: {
    title(){return "(3分)T15:分析文言文人物形象"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本小题包含3个答题点，前一个答题点回答的正确与否将会影响后一个答题点的回答成功率！")
        return display;
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
75: {
    title(){return "答题点1(Easy)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e10000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e6000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e6000")&&!player.C.points.gte("1e8000")) chs = new Decimal(0.01)
        if(player.C.points.gte("1e8000")&&!player.C.points.gte("1e9000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e9000")&&!player.C.points.gte("1e10000")) chs = new Decimal(0.5)
        if(player.C.points.gte("1e10000")) chs = player.C.points.log10().div(50000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        if(player.E.ChineseType == 3&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2400)
        if(player.C.points.gte("1e6000")) time = time.sub(720)
        if(player.C.points.gte("1e8000")) time = time.sub(480)
        if(player.C.points.gte("1e16000")) time = time.sub(240)
        if(player.C.points.gte("1e40000")) time = time.sub(240)
        if(player.C.points.gte("1e80000")) time = time.sub(240)
        if(player.C.points.gte("1e160000")) time = time.sub(240)
        if(player.C.points.gte("1e320000")) time = time.sub(120)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("E",15)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(3)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "133px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "133px"}},
    autoed() { return false},
},
76: {
    title(){return "答题点2(Hard)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e30000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e18000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e18000")&&!player.C.points.gte("1e24000")) chs = new Decimal(0.01)
        if(player.C.points.gte("1e24000")&&!player.C.points.gte("1e28000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e28000")&&!player.C.points.gte("1e30000")) chs = new Decimal(0.5)
        if(player.C.points.gte("1e30000")) chs = player.C.points.log10().div(120000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        if(getBuyableAmount("E",75) == 1) chs = chs.mul(1.2)
        if(getBuyableAmount("E",75) == 2) chs = chs.mul(0.6)
        if(player.E.ChineseType == 3&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2400)
        if(player.C.points.gte("1e6000")) time = time.sub(720)
        if(player.C.points.gte("1e8000")) time = time.sub(480)
        if(player.C.points.gte("1e16000")) time = time.sub(240)
        if(player.C.points.gte("1e40000")) time = time.sub(240)
        if(player.C.points.gte("1e80000")) time = time.sub(240)
        if(player.C.points.gte("1e160000")) time = time.sub(240)
        if(player.C.points.gte("1e320000")) time = time.sub(120)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(getBuyableAmount("E",75) == 1) time = time.mul(0.8)
        if(getBuyableAmount("E",75) == 2) time = time.mul(2)
        if(hasMilestone("E",15)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(3)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "133px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "133px"}},
    autoed() { return false},
},
77: {
    title(){return "答题点3(Insane)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e100000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e60000)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e60000)&&!player.C.points.gte(1e70000)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e70000)&&!player.C.points.gte(1e80000)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e80000)&&!player.C.points.gte(1e100000)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e100000)) chs = player.C.points.log10().div(380000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        if(getBuyableAmount("E",75) == 1) chs = chs.mul(1.1)
        if(getBuyableAmount("E",75) == 2) chs = chs.mul(0.8)
        if(getBuyableAmount("E",76) == 1) chs = chs.mul(1.2)
        if(getBuyableAmount("E",76) == 2) chs = chs.mul(0.6)
        if(player.E.ChineseType == 3&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2400)
        if(player.C.points.gte(1e60000)) time = time.sub(720)
        if(player.C.points.gte(1e80000)) time = time.sub(480)
        if(player.C.points.gte(1e160000)) time = time.sub(240)
        if(player.C.points.gte(1e400000)) time = time.sub(240)
        if(player.C.points.gte(1e800000)) time = time.sub(240)
        if(player.C.points.gte(1e1600000)) time = time.sub(240)
        if(player.C.points.gte(1e3200000)) time = time.sub(120)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(getBuyableAmount("E",75) == 1) time = time.mul(0.9)
        if(getBuyableAmount("E",75) == 2) time = time.mul(1.4)
        if(getBuyableAmount("E",76) == 1) time = time.mul(0.8)
        if(getBuyableAmount("E",76) == 2) time = time.mul(2)
        if(hasMilestone("E",15)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(3)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "134px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "134px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "134px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "134px"}},
    autoed() { return false},
},
78: {
    title(){return "<h2>六、作文<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共1小题，共50分。")
        return display;
    },
    unlocked() { return hasMilestone("E",10) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
79: {
    title(){return "40分钟作文"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "花费40分钟完成考场作文。花费时间的多少将会直接影响作文成品的质量！"
        return display;
    },
    time(){
        let time = new Decimal(2400)
        return time
    },
    unlocked() { return hasMilestone("E",10)&&player.E.completedZuowen.lt(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)&&player.E.inZuowen.lt(1)&&player.E.completedZuowen.lt(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    player.E.zuowenTime = new Decimal(2400)
    if(player.E.random.lt(1)) player.E.ccRandom0 = new Decimal(1),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(30),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(2)) player.E.ccRandom0 = new Decimal(2),player.E.luoji = new Decimal(15),player.E.wenbi = new Decimal(25),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(3)) player.E.ccRandom0 = new Decimal(3),player.E.luoji = new Decimal(30),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(4)) player.E.ccRandom0 = new Decimal(4),player.E.luoji = new Decimal(20),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(5)) player.E.ccRandom0 = new Decimal(5),player.E.luoji = new Decimal(20),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(6)) player.E.ccRandom0 = new Decimal(6),player.E.luoji = new Decimal(15),player.E.wenbi = new Decimal(20),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(20)
    else if(player.E.random.lt(7)) player.E.ccRandom0 = new Decimal(7),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(20),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(25)
    else if(player.E.random.lt(8)) player.E.ccRandom0 = new Decimal(8),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(25)
    else if(player.E.random.lt(9)) player.E.ccRandom0 = new Decimal(9),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(25),player.E.xiangxiang = new Decimal(25)
    else player.E.ccRandom0 = new Decimal(9),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(30),player.E.xiangxiang = new Decimal(20)
    player.E.ccRandom1 = player.E.random
    player.E.ccRandom2 = player.E.random
    player.E.inZuowen = new Decimal(1)
    player.E.ccSelected1 = tmp.E.cclim1
    player.E.ccSelected2 = tmp.E.cclim2
    if(hasMilestone("Eng",17)&&player.E.wenbi.lt(20)) player.E.wenbi = new Decimal(20)
    
    
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
80: {
    title(){return "50分钟作文"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "花费50分钟完成考场作文。花费时间的多少将会直接影响作文成品的质量！"
        return display;
    },
    time(){
        let time = new Decimal(3000)
        return time
    },
    unlocked() { return hasMilestone("E",10)&&player.E.completedZuowen.lt(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)&&player.E.inZuowen.lt(1)&&player.E.completedZuowen.lt(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    player.E.zuowenTime = new Decimal(3000)
    if(player.E.random.lt(1)) player.E.ccRandom0 = new Decimal(1),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(30),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(2)) player.E.ccRandom0 = new Decimal(2),player.E.luoji = new Decimal(15),player.E.wenbi = new Decimal(25),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(3)) player.E.ccRandom0 = new Decimal(3),player.E.luoji = new Decimal(30),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(4)) player.E.ccRandom0 = new Decimal(4),player.E.luoji = new Decimal(20),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(5)) player.E.ccRandom0 = new Decimal(5),player.E.luoji = new Decimal(20),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(6)) player.E.ccRandom0 = new Decimal(6),player.E.luoji = new Decimal(15),player.E.wenbi = new Decimal(20),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(20)
    else if(player.E.random.lt(7)) player.E.ccRandom0 = new Decimal(7),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(20),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(25)
    else if(player.E.random.lt(8)) player.E.ccRandom0 = new Decimal(8),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(25)
    else if(player.E.random.lt(9)) player.E.ccRandom0 = new Decimal(9),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(25),player.E.xiangxiang = new Decimal(25)
    else player.E.ccRandom0 = new Decimal(10),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(30),player.E.xiangxiang = new Decimal(20)
    player.E.ccRandom1 = player.E.random
    player.E.ccRandom2 = player.E.random
    player.E.inZuowen = new Decimal(1)
    player.E.ccSelected1 = tmp.E.cclim1
    player.E.ccSelected2 = tmp.E.cclim2
    if(hasMilestone("Eng",17)&&player.E.wenbi.lt(20)) player.E.wenbi = new Decimal(20)
    
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
81: {
    title(){return "60分钟作文"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "花费60分钟完成考场作文。花费时间的多少将会直接影响作文成品的质量！"
        return display;
    },
    time(){
        let time = new Decimal(3600)
        return time
    },
    unlocked() { return hasMilestone("E",10)&&player.E.completedZuowen.lt(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)&&player.E.inZuowen.lt(1)&&player.E.completedZuowen.lt(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    player.E.zuowenTime = new Decimal(3600)
    if(player.E.random.lt(1)) player.E.ccRandom0 = new Decimal(1),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(30),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(2)) player.E.ccRandom0 = new Decimal(2),player.E.luoji = new Decimal(15),player.E.wenbi = new Decimal(25),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(3)) player.E.ccRandom0 = new Decimal(3),player.E.luoji = new Decimal(30),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(4)) player.E.ccRandom0 = new Decimal(4),player.E.luoji = new Decimal(20),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(5)) player.E.ccRandom0 = new Decimal(5),player.E.luoji = new Decimal(20),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(15)
    else if(player.E.random.lt(6)) player.E.ccRandom0 = new Decimal(6),player.E.luoji = new Decimal(15),player.E.wenbi = new Decimal(20),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(20)
    else if(player.E.random.lt(7)) player.E.ccRandom0 = new Decimal(7),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(20),player.E.sixiang = new Decimal(15),player.E.xiangxiang = new Decimal(25)
    else if(player.E.random.lt(8)) player.E.ccRandom0 = new Decimal(8),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(15),player.E.sixiang = new Decimal(20),player.E.xiangxiang = new Decimal(25)
    else if(player.E.random.lt(9)) player.E.ccRandom0 = new Decimal(9),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(25),player.E.xiangxiang = new Decimal(25)
    else player.E.ccRandom0 = new Decimal(9),player.E.luoji = new Decimal(10),player.E.wenbi = new Decimal(10),player.E.sixiang = new Decimal(30),player.E.xiangxiang = new Decimal(20)
    player.E.ccRandom1 = player.E.random
    player.E.ccRandom2 = player.E.random
    player.E.inZuowen = new Decimal(1)
    player.E.ccSelected1 = tmp.E.cclim1
    player.E.ccSelected2 = tmp.E.cclim2
    if(hasMilestone("Eng",17)&&player.E.wenbi.lt(20)) player.E.wenbi = new Decimal(20)
    
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
82: {
    title(){return "<h3>逻辑："+player.E.luoji},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#379350",   color: "white", 'border-color': "#48A461",'border-radius': "3px", height: "30px", width: "180px"}},
    autoed() { return false},
},
83: {
    title(){return "<h3>文笔："+player.E.wenbi},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#CC0000",   color: "white", 'border-color': "#FF0000",'border-radius': "3px", height: "30px", width: "180px"}},
    autoed() { return false},
},
84: {
    title(){return "<h3>思想："+player.E.sixiang},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#AAAA00",   color: "white", 'border-color': "#FFFF00",'border-radius': "3px", height: "30px", width: "180px"}},
    autoed() { return false},
},
85: {
    title(){return "<h3>想象："+player.E.xiangxiang},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "3px", height: "30px", width: "180px"}},
    autoed() { return false},
},
86: {
    title(){return "<h2>=-=-=作文专用答题卡=-=-=<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        if(player.E.ccRandom0 == 1)display = "<h3>作文题目：葡萄酸<br>"
        if(player.E.ccRandom0 == 2)display = "<h3>作文题目：再见与不见<br>"
        if(player.E.ccRandom0 == 3)display = "<h3>作文题目：桥<br>"
        if(player.E.ccRandom0 == 4)display = "<h3>作文题目：向日葵与阳光<br>"
        if(player.E.ccRandom0 == 5)display = "<h3>作文题目：旅途<br>"
        if(player.E.ccRandom0 == 6)display = "<h3>作文题目：庄周蝴蝶<br>"
        if(player.E.ccRandom0 == 7)display = "<h3>作文题目：义气与正义<br>"
        if(player.E.ccRandom0 == 8)display = "<h3>作文题目：盲人与心眼<br>"
        if(player.E.ccRandom0 == 9)display = "<h3>作文题目：故乡<br>"
        if(player.E.ccRandom0 == 10)display = "<h3>作文题目：救赎与拯救<br>"
        subdisplay = "要求：①请正确填写此作文专用答题卡上的个人信息；②立意自定，文休自选（诗歌除外）；③文中不要出现真实的地名、校名、人名；④书写工整．不少于600字。"
        return display + subdisplay;
    },
    unlocked() { return hasMilestone("E",10) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "120px", width: "600px"}},
    autoed() { return false},
},
87: {
    title(){return "<h3>请选择您的作文题材!<h3>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "暂时能想到符合题意的，也只有这些题材了。。。(品质越高的题材，一般越难成功运用！)"
        return display
    },
    unlocked() { return hasMilestone("E",10) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
88: {
    title(){return "(Common) 坚强"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：思想+10 文笔+5"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<br>(已选择)"
        return display;
    },
    unlocked() { return player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.sixiang = player.E.sixiang.add(10).min(300)
    player.E.wenbi = player.E.wenbi.add(5).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
89: {
    title(){return "(Common) 家庭"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：文笔+10 想象+5"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.xiangxiang = player.E.xiangxiang.add(5).min(300)
    player.E.wenbi = player.E.wenbi.add(10).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
90: {
    title(){return "(Common) 生活"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：文笔+5 思想+5 逻辑+5"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.sixiang = player.E.sixiang.add(5).min(300)
    player.E.wenbi = player.E.wenbi.add(5).min(300)
    player.E.luoji = player.E.luoji.add(5).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
101: {
    title(){return "(Uncommon) 反驳"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：逻辑+30 想象-5"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",54).gte(1)&&player.E.ccRandom1.gte(0)&&player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.xiangxiang = player.E.xiangxiang.sub(5).min(300)
    player.E.luoji = player.E.luoji.add(30).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
102: {
    title(){return "(Uncommon) 心情"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：想象+15 文笔+10"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",54).gte(2)&&player.E.ccRandom1.gte(1)&&player.E.ccRandom1.lt(9)&&player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.xiangxiang = player.E.xiangxiang.add(15).min(300)
    player.E.wenbi = player.E.wenbi.add(10).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
103: {
    title(){return "(Uncommon) 教训"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：思想+15 逻辑+10"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",54).gte(3)&&player.E.ccRandom1.gte(0)&&player.E.ccRandom1.lt(10)&&player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.sixiang = player.E.sixiang.add(15).min(300)
    player.E.luoji = player.E.luoji.add(10).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
104: {
    title(){return "(Uncommon)风景"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：想象+15 文笔+10 思想+5"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",54).gte(4)&&player.E.ccRandom1.gte(0)&&player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.xiangxiang = player.E.xiangxiang.add(15).min(300)
    player.E.wenbi = player.E.wenbi.add(10).min(300)
    player.E.sixiang = player.E.sixiang.add(5).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
105: {
    title(){return "(Uncommon)独立意识"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：逻辑+15 文笔+10 思想+5"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",54).gte(5)&&player.E.ccRandom1.gte(0)&&player.E.ccRandom1.lt(10)&&player.E.inZuowen.gte(1) }, 
    canAfford() { return player.E.ccSelected1.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
        player.E.luoji = player.E.luoji.add(15).min(300)
        player.E.wenbi = player.E.wenbi.add(10).min(300)
        player.E.sixiang = player.E.sixiang.add(5).min(300)
    player.E.ccSelected1 = player.E.ccSelected1.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
91: {
    title(){return "<h3>请选择您的写作风格!<h3>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "接下来，我这次要用什么风格写作呢？(品质越高的风格，一般越难成功运用！)"
        return display
    },
    unlocked() { return player.E.ccSelected1.lt(1) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
92: {
    title(){return "(Common) 简洁"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：文笔^1.1 逻辑^1.05"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<br>(已选择)"
        return display;
    },
    unlocked() { return player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.luoji = player.E.luoji.pow(1.05).floor().min(300)
    player.E.wenbi = player.E.wenbi.pow(1.1).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
93: {
    title(){return "(Common) 含蓄"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：文笔^1.05 思想^1.1"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<br>(已选择)"
        return display;
    },
    unlocked() { return player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.sixiang = player.E.sixiang.pow(1.1).floor().min(300)
    player.E.wenbi = player.E.wenbi.pow(1.05).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
94: {
    title(){return "(Common) 明快"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：思想^1.05 想象^1.1"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<br>(已选择)"
        return display;
    },
    unlocked() { return player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    player.E.sixiang = player.E.sixiang.pow(1.05).floor().min(300)
    player.E.xiangxiang = player.E.xiangxiang.pow(1.1).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
95: {
    title(){return ">>>开始写作！<<<"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "开始完成您的作文。您作文的当前属性将会影响作文成品的最终质量！"
        return display;
    },
    unlocked() { return player.E.ccSelected2.lt(1) }, 
    canAfford() { return getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    player.E.luojiMult = player.E.luoji
    player.E.wenbiMult = player.E.wenbi
    player.E.sixiangMult = player.E.sixiang
    player.E.xiangxiangMult = player.E.xiangxiang
    player.E.startedZuowen = new Decimal(1)
    },
       
    style() { if (getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}
    if (getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},

},
96: {
    title: "继续",
    gain() { 
    let gain = new Decimal(1)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("")
        return display;
    },
    unlocked(){
    return player.E.completedZuowen.gte(1)&&player.E.story.lt(3)&&player.E.inZuowen.gte(1)},
    canAfford() { return true },
    buy() { 
        player.E.story = player.E.story.add(1)
    
    },
       
    style() { return {  color: "black", 'border-radius': "10px", height: "50px", width: "100px"}},
    autoed() { return false},
},
97: {
    title(){return "<h3>作文总质量："+player.E.ccPoints},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        if(player.E.ccPoints.lt(10000))display = "作文体量不足200字，语句不通顺，结构不完整，错别字较多，内容简单，没有中心，不知所云。且字迹潦草，辨识困难，实属废纸之作。"
        else if(player.E.ccPoints.lt(100000))display = "作文体量300字，语句通顺性、结构完整性较为欠缺，错别字较多，句子表达不完整，有语病，文章层次不清楚。且字迹潦草，辨识困难，实为下等之作。"
        else if(player.E.ccPoints.lt(1000000))display = "作文体量500字，语句通顺性、结构完整性尚可，有错别字，部分句子表达不完整，有语病，文章层次不清楚，实为中下之作。"
        else if(player.E.ccPoints.lt(5000000))display = "作文体量600字，语句通顺性、结构完整性尚可，语言较为平淡，有少量语病，文章层次清晰，是中规中矩的一篇作文。"
        else if(player.E.ccPoints.lt(25000000))display = "作文体量700字，语句通顺，立意明确，整体意思连贯，分段合理，文章层次清晰，详略较为得当，是中上水平的一篇作文。"
        else if(player.E.ccPoints.lt(250000000))display = "作文体量700字，语句通顺，立意明确，段落连贯，分段合理，文章层次清晰，详略得当，多处运用了生动准确的语言描摹，书写认真，是上等水平的一篇作文。"
        else display = "关于对这篇作文的赞美语言，我确信已发现了一种美妙的写法，可惜这里空白的地方太小，写不下。"
        return display;
    },
    unlocked() { return player.E.story.gte(1) }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { if(player.E.ccPoints.lt(10000)) return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "400px"}
    else if(player.E.ccPoints.lt(100000)) return {'background-color': "#00CCCC",   color: "black", 'border-color': "#00FFFF",'border-radius': "10px", height: "100px", width: "400px"}
    else if(player.E.ccPoints.lt(1000000)) return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "400px"}
    else if(player.E.ccPoints.lt(5000000)) return {'background-color': "#BB0000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "400px"}
    else if(player.E.ccPoints.lt(25000000)) return {'background-color': "#EB1DEC",   color: "white", 'border-color': "#FC2EFD",'border-radius': "10px", height: "100px", width: "400px"}
    else if(player.E.ccPoints.lt(250000000)) return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "10px", height: "100px", width: "400px"}
    else return{'background-color': "#AAAA00",   color: "white", 'border-color': "#FFFF00",'border-radius': "10px", height: "100px", width: "400px"}},
    autoed() { return false},
},
98: {
    title(){return "<h3>作文评分："+tmp.E.ccScore+" / 50"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("此作文得分将会计入您的语文中考总分！")
        return display;
    },
    unlocked() { return player.E.story.gte(3) }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { return {'background-color': "#CCCCCC",   color: "black", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "500px"}},
    autoed() { return false},
},
99: {
    title(){return "<h3>作文评级"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        if(player.E.ccPoints.lt(10000))display = "<h1>False"
        else if(player.E.ccPoints.lt(20000))display = "<h1>C"
        else if(player.E.ccPoints.lt(50000))display = "<h1>C+"
        else if(player.E.ccPoints.lt(100000))display = "<h1>C++"
        else if(player.E.ccPoints.lt(200000))display = "<h1>B"
        else if(player.E.ccPoints.lt(500000))display = "<h1>B+"
        else if(player.E.ccPoints.lt(1000000))display = "<h1>B++"
        else if(player.E.ccPoints.lt(2000000))display = "<h1>A"
        else if(player.E.ccPoints.lt(3000000))display = "<h1>AA"
        else if(player.E.ccPoints.lt(5000000))display = "<h1>AAA"
        else if(player.E.ccPoints.lt(8000000))display = "<h1>S"
        else if(player.E.ccPoints.lt(16000000))display = "<h1>SS"
        else if(player.E.ccPoints.lt(25000000))display = "<h1>SSS"
        else if(player.E.ccPoints.lt(100000000))display = "<h1>V"
        else if(player.E.ccPoints.lt(150000000))display = "<h1>VV"
        else if(player.E.ccPoints.lt(250000000))display = "<h1>VVV"
        else if(player.E.ccPoints.lt(10000000000))display = "<h1>φ"
        return display;
    },
    unlocked() { return player.E.story.gte(2) }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
       
    style() { if(player.E.ccPoints.lt(10000)) return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "100px", height: "100px", width: "100px"}
    else if(player.E.ccPoints.lt(100000)) return {'background-color': "#00CCCC",   color: "black", 'border-color': "#00FFFF",'border-radius': "100px", height: "100px", width: "100px"}
    else if(player.E.ccPoints.lt(1000000)) return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "100px", height: "100px", width: "100px"}
    else if(player.E.ccPoints.lt(5000000)) return {'background-color': "#BB0000",   color: "white", 'border-color': "#FF0000",'border-radius': "100px", height: "100px", width: "100px"}
    else if(player.E.ccPoints.lt(25000000)) return {'background-color': "#EB1DEC",   color: "white", 'border-color': "#FC2EFD",'border-radius': "100px", height: "100px", width: "100px"}
    else if(player.E.ccPoints.lt(250000000)) return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "100px", height: "100px", width: "100px"}
else return{'background-color': "#AAAA00",   color: "white", 'border-color': "#FFFF00",'border-radius': "100px", height: "100px", width: "100px"}},
    autoed() { return false},
},
100: {
    title(){return "结束"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "结束本次试卷的作文部分。继续完成试卷其他题目！"
        return display;
    },
    unlocked() { return player.E.story.gte(3) }, 
    canAfford() { return getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    player.E.wenbi = new Decimal(0)
    player.E.wenbiMult = new Decimal(0)
    player.E.luoji = new Decimal(0)
    player.E.luojiMult = new Decimal(0)
    player.E.sixiang = new Decimal(0)
    player.E.sixiangMult = new Decimal(0)
    player.E.xiangxiang = new Decimal(0)
    player.E.xiangxiangMult = new Decimal(0)
    player.E.Chinese = player.E.Chinese.add(tmp.E.ccScore)
    if(tmp.E.ccScore.gte(player.E.ccBest)) player.E.ccBest = tmp.E.ccScore
    player.E.ccPoints = new Decimal(0)
    player.E.inZuowen = new Decimal(0)
    player.E.story = new Decimal(0)
    },
       
    style() { if (getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}
    if (getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},

},
106: {
    title(){return "<h2>五、(一)综合性学习<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共3小题，共5分。")
        return display;
    },
    unlocked() { return hasMilestone("C",5) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
107: {
    title(){return "(2分) T20：材料阅读-Easy"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e80<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e20")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e20")&&!player.C.points.gte("1e40")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e40")&&!player.C.points.gte("1e60")) chs = new Decimal(1)
        if(player.C.points.gte("1e60")&&!player.C.points.gte("1e80")) chs = new Decimal(5)
        if(player.C.points.gte("1e80")) chs = player.C.points.log10().div(150).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 5&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e20")) time = time.sub(300)
        if(player.C.points.gte("1e50")) time = time.sub(200)
        if(player.C.points.gte("1e80")) time = time.sub(100)
        if(player.C.points.gte("1e160")) time = time.sub(100)
        if(player.C.points.gte("1e320")) time = time.sub(100)
        if(player.C.points.gte("1e640")) time = time.sub(100)
        if(player.C.points.gte("1e1280")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("C",5) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(5)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
108: {
    title(){return "(3分) T21：材料阅读-Hard"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e8000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e2000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e2000")&&!player.C.points.gte("1e4000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e4000")&&!player.C.points.gte("1e6000")) chs = new Decimal(1)
        if(player.C.points.gte("1e6000")&&!player.C.points.gte("1e8000")) chs = new Decimal(5)
        if(player.C.points.gte("1e8000")) chs = player.C.points.log10().div(150).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 5&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e2000")) time = time.sub(300)
        if(player.C.points.gte("1e5000")) time = time.sub(200)
        if(player.C.points.gte("1e8000")) time = time.sub(100)
        if(player.C.points.gte("1e16000")) time = time.sub(100)
        if(player.C.points.gte("1e32000")) time = time.sub(100)
        if(player.C.points.gte("1e64000")) time = time.sub(100)
        if(player.C.points.gte("1e128000")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("C",5) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(5)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
109: {
    title(){return "(Uncommon)婉约细腻"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：文笔^1.2 想象^1.05"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",61).gte(1)&&player.E.ccRandom2.gte(0)&&player.E.ccRandom2.lt(9)&&player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
        player.E.wenbi = player.E.wenbi.pow(1.2).floor().min(300)
        player.E.xiangxiang = player.E.xiangxiang.pow(1.05).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
110: {
    title(){return "(Uncommon)豪放不羁"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：逻辑^1.2 思想^1.05"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",61).gte(2)&&player.E.ccRandom2.gte(0)&&player.E.ccRandom2.lt(10)&&player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
        player.E.luoji = player.E.luoji.pow(1.2).floor().min(300)
        player.E.sixiang = player.E.sixiang.pow(1.05).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
111: {
    title(){return "(Uncommon)虚实相生"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：逻辑^1.2 想象^1.1"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",61).gte(3)&&player.E.ccRandom2.gte(0)&&player.E.ccRandom2.lt(10)&&player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
        player.E.luoji = player.E.luoji.pow(1.2).floor().min(300)
        player.E.xiangxiang = player.E.xiangxiang.pow(1.1).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
112: {
    title(){return "(Uncommon)华丽炫技"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：文笔^1.25 思想^0.9"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",61).gte(4)&&player.E.ccRandom2.gte(0)&&player.E.ccRandom2.lt(10)&&player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1)}, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
        player.E.wenbi = player.E.wenbi.pow(1.25).floor().min(300)
        player.E.sixiang = player.E.sixiang.pow(0.9).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
113: {
    title(){return "(Uncommon)独辟蹊径"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：文笔^1.1 逻辑^1.1 想象^1.1"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",61).gte(4)&&player.E.ccRandom2.gte(0)&&player.E.ccRandom2.lt(10)&&player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
        player.E.wenbi = player.E.wenbi.pow(1.1).floor().min(300)
        player.E.luoji = player.E.luoji.pow(1.1).floor().min(300)
        player.E.xiangxiang = player.E.xiangxiang.pow(1.1).floor().min(300)
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#268240",   color: "white", 'border-color': "#48A461",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
114: {
    title(){return player.E.year+"年天津市初中学业水平考试试卷<br><h1>英语<h1>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本试卷分为第I卷（选择题）、第II卷两部分。第I卷为第1页至第8页。第II卷为第9页至第12页。<br>试卷满分120分，答题时间100min。<h4>剩余时间:<h2>"+player.E.EnglishTime+"s<h2><h4>祝你考试顺利！<h4>")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "150px", width: "600px"}},
    autoed() { return false},
},
115: {
    title(){return "<h2>一、听力理解<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共20小题，每小题1分，共20分。")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
116: {
    title(){return "交卷！"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        if(player.E.inEnglish.gte(1))display = ("完成你本次中考英语科目的考试。<br>*交卷后无法对英语科目答题卡进行操作！<br><h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>请慎重交卷，在交卷前认真检查答题卡！<h4>")
        if(player.E.inEnglish.lt(1))display = ("您已完成本次中考英语科目的考试。努力完成剩余科目的考试吧！")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return player.E.inEnglish.gte(1)},
    buy() { 
    player.E.inEnglish = new Decimal(0)  
    player.E.points = player.E.points.add(player.E.English)
    player.E.completedEnglish = true
    },
       
    style() { if(player.E.inEnglish.gte(1))return {'background-color': "#888800",   color: "white", 'border-color': "#FFFF00",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.inEnglish.lt(1))return {'background-color': "#000000",   color: "white", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
117: {
    title(){return "(5分)听力理解-难度1"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：10~320"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(6)) return new Decimal(0.001)
        if(player.Eng.power.gte(6)&&!player.Eng.power.gte(7)) return new Decimal(0.01)
        if(player.Eng.power.gte(7)&&!player.Eng.power.gte(8)) return new Decimal(0.1)
        if(player.Eng.power.gte(8)&&!player.Eng.power.gte(10)) return new Decimal(0.5)
        if(player.Eng.power.gte(10)) return player.Eng.power.log10().div(1).mul(100).min(100)

        
    },
    time(){
        let time = new Decimal(100)
        if(player.Eng.power.gte(6)) time = time.sub(30)
        if(player.Eng.power.gte(8)) time = time.sub(20)
        if(player.Eng.power.gte(10)) time = time.sub(10)
        if(player.Eng.power.gte(20)) time = time.sub(10)
        if(player.Eng.power.gte(40)) time = time.sub(10)
        if(player.Eng.power.gte(60)) time = time.sub(10)
        if(player.Eng.power.gte(80)) time = time.sub(5)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return !getBuyableAmount("E",118).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",118)
    buyBuyable("E",119)
    buyBuyable("E",120)
    buyBuyable("E",121)
    buyBuyable("E",122)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
118: {
    title(){return "<h1>1."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(6)) time = new Decimal(0.001)
        if(player.Eng.power.gte(6)&&!player.Eng.power.gte(7)) time = new Decimal(0.01)
        if(player.Eng.power.gte(7)&&!player.Eng.power.gte(8)) time = new Decimal(0.1)
        if(player.Eng.power.gte(8)&&!player.Eng.power.gte(10)) time = new Decimal(0.5)
        if(player.Eng.power.gte(10)) time = player.Eng.power.log10().div(1).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(100)
        if(player.Eng.power.gte(6)) time = time.sub(30)
        if(player.Eng.power.gte(8)) time = time.sub(20)
        if(player.Eng.power.gte(10)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        return true
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
119: {
    title(){return "<h1>2."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(12)) time = new Decimal(0.001)
        if(player.Eng.power.gte(12)&&!player.Eng.power.gte(14)) time = new Decimal(0.01)
        if(player.Eng.power.gte(14)&&!player.Eng.power.gte(16)) time = new Decimal(0.1)
        if(player.Eng.power.gte(16)&&!player.Eng.power.gte(20)) time = new Decimal(0.5)
        if(player.Eng.power.gte(20)) time = player.Eng.power.log10().div(1).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(100)
        if(player.Eng.power.gte(6)) time = time.sub(30)
        if(player.Eng.power.gte(8)) time = time.sub(20)
        if(player.Eng.power.gte(10)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
120: {
    title(){return "<h1>3."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(20)&&!player.Eng.power.gte(40)) time = new Decimal(0.01)
        if(player.Eng.power.gte(40)&&!player.Eng.power.gte(50)) time = new Decimal(0.1)
        if(player.Eng.power.gte(50)&&!player.Eng.power.gte(60)) time = new Decimal(0.5)
        if(player.Eng.power.gte(60)) time = player.Eng.power.log10().div(2).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(100)
        if(player.Eng.power.gte(6)) time = time.sub(30)
        if(player.Eng.power.gte(8)) time = time.sub(20)
        if(player.Eng.power.gte(10)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
121: {
    title(){return "<h1>4."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(40)&&!player.Eng.power.gte(80)) time = new Decimal(0.01)
        if(player.Eng.power.gte(80)&&!player.Eng.power.gte(160)) time = new Decimal(0.1)
        if(player.Eng.power.gte(160)&&!player.Eng.power.gte(320)) time = new Decimal(0.5)
        if(player.Eng.power.gte(320)) time = player.Eng.power.log10().div(3).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(100)
        if(player.Eng.power.gte(6)) time = time.sub(30)
        if(player.Eng.power.gte(8)) time = time.sub(20)
        if(player.Eng.power.gte(10)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
122: {
    title(){return "<h1>5."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(80)) time = new Decimal(0.001)
        if(player.Eng.power.gte(80)&&!player.Eng.power.gte(160)) time = new Decimal(0.01)
        if(player.Eng.power.gte(160)&&!player.Eng.power.gte(320)) time = new Decimal(0.1)
        if(player.Eng.power.gte(320)&&!player.Eng.power.gte(640)) time = new Decimal(0.5)
        if(player.Eng.power.gte(640)) time = player.Eng.power.log10().div(4).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(100)
        if(player.Eng.power.gte(6)) time = time.sub(30)
        if(player.Eng.power.gte(8)) time = time.sub(20)
        if(player.Eng.power.gte(10)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
123: {
    title(){return "(5分)听力理解-难度2"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e6~1e10"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e4)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e4)&&!player.Eng.power.gte(5e4)) time = new Decimal(0.01)
        if(player.Eng.power.gte(5e4)&&!player.Eng.power.gte(1e5)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e5)&&!player.Eng.power.gte(1e6)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e6)) time = player.Eng.power.log10().div(12).mul(100).min(100)

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e3)) time = time.sub(60)
        if(player.Eng.power.gte(1e6)) time = time.sub(40)
        if(player.Eng.power.gte(1e9)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return !getBuyableAmount("E",124).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",124)
    buyBuyable("E",125)
    buyBuyable("E",126)
    buyBuyable("E",127)
    buyBuyable("E",128)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
124: {
    title(){return "<h1>6."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e4)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e4)&&!player.Eng.power.gte(5e4)) time = new Decimal(0.01)
        if(player.Eng.power.gte(5e4)&&!player.Eng.power.gte(1e5)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e5)&&!player.Eng.power.gte(1e6)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e6)) time = player.Eng.power.log10().div(12).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e3)) time = time.sub(60)
        if(player.Eng.power.gte(1e6)) time = time.sub(40)
        if(player.Eng.power.gte(1e9)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
125: {
    title(){return "<h1>7."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e5)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e5)&&!player.Eng.power.gte(5e5)) time = new Decimal(0.01)
        if(player.Eng.power.gte(5e5)&&!player.Eng.power.gte(1e6)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e6)&&!player.Eng.power.gte(1e7)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e7)) time = player.Eng.power.log10().div(14).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e3)) time = time.sub(60)
        if(player.Eng.power.gte(1e6)) time = time.sub(40)
        if(player.Eng.power.gte(1e9)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
126: {
    title(){return "<h1>8."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e6)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e6)&&!player.Eng.power.gte(5e6)) time = new Decimal(0.01)
        if(player.Eng.power.gte(5e6)&&!player.Eng.power.gte(1e7)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e7)&&!player.Eng.power.gte(1e8)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e8)) time = player.Eng.power.log10().div(16).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e3)) time = time.sub(60)
        if(player.Eng.power.gte(1e6)) time = time.sub(40)
        if(player.Eng.power.gte(1e9)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
127: {
    title(){return "<h1>9."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e7)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e7)&&!player.Eng.power.gte(5e7)) time = new Decimal(0.01)
        if(player.Eng.power.gte(5e7)&&!player.Eng.power.gte(1e8)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e8)&&!player.Eng.power.gte(1e9)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e9)) time = player.Eng.power.log10().div(18).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e3)) time = time.sub(60)
        if(player.Eng.power.gte(1e6)) time = time.sub(40)
        if(player.Eng.power.gte(1e9)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
128: {
    title(){return "<h1>10."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e8)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e8)&&!player.Eng.power.gte(5e8)) time = new Decimal(0.01)
        if(player.Eng.power.gte(5e8)&&!player.Eng.power.gte(1e9)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e9)&&!player.Eng.power.gte(1e10)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e10)) time = player.Eng.power.log10().div(20).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e3)) time = time.sub(60)
        if(player.Eng.power.gte(1e6)) time = time.sub(40)
        if(player.Eng.power.gte(1e9)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
129: {
    title(){return "(5分)听力理解-难度3"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e12~1e20"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e8)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e8)&&!player.Eng.power.gte(1e10)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e10)&&!player.Eng.power.gte(1e12)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e12)&&!player.Eng.power.gte(1e14)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e14)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e6)) time = time.sub(60)
        if(player.Eng.power.gte(1e12)) time = time.sub(40)
        if(player.Eng.power.gte(1e18)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return !getBuyableAmount("E",130).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",130)
    buyBuyable("E",131)
    buyBuyable("E",132)
    buyBuyable("E",133)
    buyBuyable("E",134)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
130: {
    title(){return "<h1>11."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e8)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e8)&&!player.Eng.power.gte(1e10)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e10)&&!player.Eng.power.gte(1e12)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e12)&&!player.Eng.power.gte(1e14)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e14)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e6)) time = time.sub(60)
        if(player.Eng.power.gte(1e12)) time = time.sub(40)
        if(player.Eng.power.gte(1e18)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
131: {
    title(){return "<h1>12."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e10)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e10)&&!player.Eng.power.gte(1e12)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e12)&&!player.Eng.power.gte(1e14)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e14)&&!player.Eng.power.gte(1e16)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e16)) time = player.Eng.power.log10().div(32).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e6)) time = time.sub(60)
        if(player.Eng.power.gte(1e12)) time = time.sub(40)
        if(player.Eng.power.gte(1e18)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
132: {
    title(){return "<h1>13."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e12)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e12)&&!player.Eng.power.gte(1e14)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e14)&&!player.Eng.power.gte(1e16)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e18)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e18)) time = player.Eng.power.log10().div(36).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e6)) time = time.sub(60)
        if(player.Eng.power.gte(1e12)) time = time.sub(40)
        if(player.Eng.power.gte(1e18)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
133: {
    title(){return "<h1>14."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e14)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e14)&&!player.Eng.power.gte(1e16)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e18)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e18)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e20)) time = player.Eng.power.log10().div(40).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e6)) time = time.sub(60)
        if(player.Eng.power.gte(1e12)) time = time.sub(40)
        if(player.Eng.power.gte(1e18)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
134: {
    title(){return "<h1>15."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e16)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e18)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e18)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e22)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e22)) time = player.Eng.power.log10().div(44).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e6)) time = time.sub(60)
        if(player.Eng.power.gte(1e12)) time = time.sub(40)
        if(player.Eng.power.gte(1e18)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
135: {
    title(){return "(5分)听力理解-难度4"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e30"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e16)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e24)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e24)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e30)) time = player.Eng.power.log10().div(30).mul(100).min(100)

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(player.Eng.power.gte(1e40)) time = time.sub(20)
        if(player.Eng.power.gte(1e50)) time = time.sub(20)
        if(player.Eng.power.gte(1e100)) time = time.sub(20)
        if(player.Eng.power.gte(1e200)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return !getBuyableAmount("E",136).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",136)
    buyBuyable("E",137)
    buyBuyable("E",138)
    buyBuyable("E",139)
    buyBuyable("E",140)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
136: {
    title(){return "<h1>16."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e16)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e24)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e24)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e30)) time = player.Eng.power.log10().div(60).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
137: {
    title(){return "<h1>17."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e24)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e24)&&!player.Eng.power.gte(1e28)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e28)&&!player.Eng.power.gte(1e34)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e34)) time = player.Eng.power.log10().div(68).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
138: {
    title(){return "<h1>18."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e24)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e24)&&!player.Eng.power.gte(1e28)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e28)&&!player.Eng.power.gte(1e32)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e32)&&!player.Eng.power.gte(1e38)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e38)) time = player.Eng.power.log10().div(76).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
139: {
    title(){return "<h1>19."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e28)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e28)&&!player.Eng.power.gte(1e32)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e32)&&!player.Eng.power.gte(1e36)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e36)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e40)) time = player.Eng.power.log10().div(80).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time
        
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
140: {
    title(){return "<h1>20."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e32)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e32)&&!player.Eng.power.gte(1e36)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e36)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e44)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e44)) time = player.Eng.power.log10().div(88).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
141: {
    title(){return "<h2>二、单项选择题<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共15小题，每小题1分，共15分。")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
142: {
    title(){return "(5分)单项选择-难度1"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e20~1e36"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e10)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e10)&&!player.Eng.power.gte(1e14)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e14)&&!player.Eng.power.gte(1e16)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e20)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(player.Eng.power.gte(1e40)) time = time.sub(20)
        if(player.Eng.power.gte(1e50)) time = time.sub(20)
        if(player.Eng.power.gte(1e100)) time = time.sub(20)
        if(player.Eng.power.gte(1e200)) time = time.sub(10)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return !getBuyableAmount("E",143).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",143)
    buyBuyable("E",144)
    buyBuyable("E",145)
    buyBuyable("E",146)
    buyBuyable("E",147)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
143: {
    title(){return "<h1>21."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e10)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e10)&&!player.Eng.power.gte(1e14)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e14)&&!player.Eng.power.gte(1e16)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e20)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
144: {
    title(){return "<h1>22."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e12)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e12)&&!player.Eng.power.gte(1e14)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e14)&&!player.Eng.power.gte(1e18)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e18)&&!player.Eng.power.gte(1e22)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e22)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
145: {
    title(){return "<h1>23."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e14)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e14)&&!player.Eng.power.gte(1e16)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e24)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e24)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
146: {
    title(){return "<h1>24."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e16)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e16)&&!player.Eng.power.gte(1e18)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e18)&&!player.Eng.power.gte(1e22)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e22)&&!player.Eng.power.gte(1e26)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e26)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
147: {
    title(){return "<h1>25."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e18)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e18)&&!player.Eng.power.gte(1e20)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e24)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e24)&&!player.Eng.power.gte(1e28)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e28)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte(1e10)) time = time.sub(60)
        if(player.Eng.power.gte(1e20)) time = time.sub(40)
        if(player.Eng.power.gte(1e30)) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
148: {
    title(){return "(5分)单项选择-难度2"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e40~1e60"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e40)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(player.Eng.power.gte("1e80")) time = time.sub(30)
        if(player.Eng.power.gte("1e100")) time = time.sub(30)
        if(player.Eng.power.gte("1e200")) time = time.sub(30)
        if(player.Eng.power.gte("1e400")) time = time.sub(15)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return !getBuyableAmount("E",149).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",149)
    buyBuyable("E",150)
    buyBuyable("E",151)
    buyBuyable("E",152)
    buyBuyable("E",153)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
149: {
    title(){return "<h1>26."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e40)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
150: {
    title(){return "<h1>27."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e25)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e35)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e35)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e45)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
151: {
    title(){return "<h1>28."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e30)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e35)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e35)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e50)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
152: {
    title(){return "<h1>29."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e35)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e35)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e45)&&!player.Eng.power.gte(1e55)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e55)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
153: {
    title(){return "<h1>30."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e45)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e60)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
154: {
    title(){return "(5分)单项选择-难度3"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e70~1e110"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e70)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e70)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(player.Eng.power.gte("1e160")) time = time.sub(60)
        if(player.Eng.power.gte("1e200")) time = time.sub(60)
        if(player.Eng.power.gte("1e400")) time = time.sub(60)
        if(player.Eng.power.gte("1e800")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return !getBuyableAmount("E",155).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",155)
    buyBuyable("E",156)
    buyBuyable("E",157)
    buyBuyable("E",158)
    buyBuyable("E",159)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
155: {
    title(){return "<h1>31."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e70)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e70)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
156: {
    title(){return "<h1>32."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e50)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e70)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e70)&&!player.Eng.power.gte(1e80)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e80)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
157: {
    title(){return "<h1>33."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e60)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e70)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e70)&&!player.Eng.power.gte(1e80)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e90)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e90)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
158: {
    title(){return "<h1>34."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e70)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e70)&&!player.Eng.power.gte(1e80)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e90)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e90)&&!player.Eng.power.gte(1e100)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e100)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
159: {
    title(){return "<h1>35."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e80)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e90)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e90)&&!player.Eng.power.gte(1e100)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e100)&&!player.Eng.power.gte(1e110)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e110)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
160: {
    title(){return "套作("+player.E.ccBest+"分)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "花费60分钟将你史上最佳的作文套到答题卡上，并获得"+player.E.ccBest+"分！"
        return display;
    },
    time(){
        let time = new Decimal(3600)
        return time
    },
    unlocked() { return hasMilestone("C",6)&&player.E.completedZuowen.lt(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)&&player.E.inZuowen.lt(1)&&player.E.completedZuowen.lt(1)},
    buy() { 
    player.E.Chinese = player.E.Chinese.add(player.E.ccBest)
    player.E.completedZuowen = new Decimal(1)
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "600px"}},
    autoed() { return false},
},
161: {
    title(){return "<h2>五、(二)名著阅读<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共3小题，共8分。")
        return display;
    },
    unlocked() { return hasMilestone("Eng",4) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
162: {
    title(){return "(4分) T22：填写作品、人物表格"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e500<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e300")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e300")&&!player.C.points.gte("1e350")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e350")&&!player.C.points.gte("1e400")) chs = new Decimal(1)
        if(player.C.points.gte("1e400")&&!player.C.points.gte("1e500")) chs = new Decimal(5)
        if(player.C.points.gte("1e500")) chs = player.C.points.log10().div(700).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 5&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e60")) time = time.sub(300)
        if(player.C.points.gte("1e150")) time = time.sub(200)
        if(player.C.points.gte("1e280")) time = time.sub(100)
        if(player.C.points.gte("1e460")) time = time.sub(100)
        if(player.C.points.gte("1e920")) time = time.sub(100)
        if(player.C.points.gte("1e1640")) time = time.sub(100)
        if(player.C.points.gte("1e3280")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",4) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(4)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(5)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
163: {
    title(){return "(2分) T23①：填写名著故事情节"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e50000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e30000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e30000")&&!player.C.points.gte("1e35000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e35000")&&!player.C.points.gte("1e40000")) chs = new Decimal(1)
        if(player.C.points.gte("1e40000")&&!player.C.points.gte("1e50000")) chs = new Decimal(5)
        if(player.C.points.gte("1e50000")) chs = player.C.points.log10().div(125000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 5&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e6000")) time = time.sub(300)
        if(player.C.points.gte("1e15000")) time = time.sub(200)
        if(player.C.points.gte("1e28000")) time = time.sub(100)
        if(player.C.points.gte("1e46000")) time = time.sub(100)
        if(player.C.points.gte("1e92000")) time = time.sub(100)
        if(player.C.points.gte("1e164000")) time = time.sub(100)
        if(player.C.points.gte("1e328000")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",4) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(5)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
164: {
    title(){return "(2分) T23②：分析名著内人物形象"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e500000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e300000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e300000")&&!player.C.points.gte("1e350000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e350000")&&!player.C.points.gte("1e400000")) chs = new Decimal(1)
        if(player.C.points.gte("1e400000")&&!player.C.points.gte("1e500000")) chs = new Decimal(5)
        if(player.C.points.gte("1e500000")) chs = player.C.points.log10().div(125000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 5&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e60000")) time = time.sub(300)
        if(player.C.points.gte("1e150000")) time = time.sub(200)
        if(player.C.points.gte("1e280000")) time = time.sub(100)
        if(player.C.points.gte("1e460000")) time = time.sub(100)
        if(player.C.points.gte("1e920000")) time = time.sub(100)
        if(player.C.points.gte("1e1640000")) time = time.sub(100)
        if(player.C.points.gte("1e3280000")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",4) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    player.E.ChineseType = new Decimal(5)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
165: {
    title(){return "<h2>四、现代文阅读<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共4小题，共15分。")
        return display;
    },
    unlocked() { return hasMilestone("Eng",5) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
166: {
    title(){return "精读现代文"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
effect(x)
{
let eff = this.base().pow(x)
return eff
},
base()
{
let base = new Decimal(1.1)
if(hasMilestone("C",3)) base = base.add(0.1)
if(hasUpgrade("C",42)) base = base.add(0.05)
return base
},
time()
{
let time = new Decimal(500)
return time
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("消耗一定时间精读题目中现代文原文。<br>消耗时间："+format(this.time())+"s<br>当前效果：本大题所有小题解答正确率+"+format(this.effect().sub(1).mul(100))+"%<br>基础效果："+format(this.base().sub(1).mul(100))+"%")
        return display;
    },
    unlocked() { return hasMilestone("Eng",5) }, 
    canAfford() { return player.E.ChineseTime.gte(this.time())},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
    },
       
    style() { return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "200px", width: "200px"}},
    autoed() { return false},
},
167: {
    title(){return "(4分) T16：填写故事情节表格"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e500<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e300")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e300")&&!player.C.points.gte("1e350")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e350")&&!player.C.points.gte("1e400")) chs = new Decimal(1)
        if(player.C.points.gte("1e400")&&!player.C.points.gte("1e500")) chs = new Decimal(5)
        if(player.C.points.gte("1e500")) chs = player.C.points.log10().div(1000).mul(100).min(100)
        if(getBuyableAmount("E",166).gte(1)) chs = chs.mul(buyableEffect("E",166))
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(player.E.ChineseType == 4&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(1000)
        if(player.C.points.gte("1e60")) time = time.sub(300)
        if(player.C.points.gte("1e150")) time = time.sub(200)
        if(player.C.points.gte("1e280")) time = time.sub(100)
        if(player.C.points.gte("1e460")) time = time.sub(100)
        if(player.C.points.gte("1e920")) time = time.sub(100)
        if(player.C.points.gte("1e1640")) time = time.sub(100)
        if(player.C.points.gte("1e3280")) time = time.sub(50)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",5) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(4)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    
    player.E.ChineseType = new Decimal(4)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "300px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
168: {
    title(){return "(3分) T17：修辞手法赏析"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e6000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e4000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e4000")&&!player.C.points.gte("1e5000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e5000")&&!player.C.points.gte("1e5500")) chs = new Decimal(1)
        if(player.C.points.gte("1e5500")&&!player.C.points.gte("1e6000")) chs = new Decimal(5)
        if(player.C.points.gte("1e6000")) chs = player.C.points.log10().div(20000).mul(100).min(100)
        if(getBuyableAmount("E",166).gte(1)) chs = chs.mul(buyableEffect("E",166))
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 4&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2000)
        if(player.C.points.gte("1e4000")) time = time.sub(500)
        if(player.C.points.gte("1e5000")) time = time.sub(300)
        if(player.C.points.gte("1e6000")) time = time.sub(200)
        if(player.C.points.gte("1e9000")) time = time.sub(200)
        if(player.C.points.gte("1e14000")) time = time.sub(200)
        if(player.C.points.gte("1e20000")) time = time.sub(200)
        if(player.C.points.gte("1e40000")) time = time.sub(200)
        if(player.C.points.gte("1e40000")) time = time.sub(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",5)  }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    
    player.E.ChineseType = new Decimal(4)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "300px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
169: {
    title(){return "(4分) T18：分析文章主旨"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e600000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e400000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e400000")&&!player.C.points.gte("1e500000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e500000")&&!player.C.points.gte("1e550000")) chs = new Decimal(1)
        if(player.C.points.gte("1e550000")&&!player.C.points.gte("1e600000")) chs = new Decimal(5)
        if(player.C.points.gte("1e600000")) chs = player.C.points.log10().div(1500000).mul(100).min(100)
        if(getBuyableAmount("E",166).gte(1)) chs = chs.mul(buyableEffect("E",166))
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 4&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2000)
        if(player.C.points.gte("1e400000")) time = time.sub(500)
        if(player.C.points.gte("1e500000")) time = time.sub(300)
        if(player.C.points.gte("1e600000")) time = time.sub(200)
        if(player.C.points.gte("1e900000")) time = time.sub(200)
        if(player.C.points.gte("1e1400000")) time = time.sub(200)
        if(player.C.points.gte("1e2000000")) time = time.sub(200)
        if(player.C.points.gte("1e4000000")) time = time.sub(200)
        if(player.C.points.gte("1e4000000")) time = time.sub(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",5)  }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(4)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    
    player.E.ChineseType = new Decimal(4)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "300px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
170: {
    title(){return "(4分) T19：现代文内容理解双项选择"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e60000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e40000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e40000")&&!player.C.points.gte("1e50000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e50000")&&!player.C.points.gte("1e55000")) chs = new Decimal(1)
        if(player.C.points.gte("1e55000")&&!player.C.points.gte("1e60000")) chs = new Decimal(5)
        if(player.C.points.gte("1e60000")) chs = player.C.points.log10().div(1500000).mul(100).min(100)
        if(getBuyableAmount("E",166).gte(1)) chs = chs.mul(buyableEffect("E",166))
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(player.E.ChineseType == 4&&inChallenge("Exp",22)) chs = chs.div(4)
        return chs
    },
    time(){
        let time = new Decimal(2000)
        if(player.C.points.gte("1e40000")) time = time.sub(500)
        if(player.C.points.gte("1e50000")) time = time.sub(300)
        if(player.C.points.gte("1e60000")) time = time.sub(200)
        if(player.C.points.gte("1e90000")) time = time.sub(200)
        if(player.C.points.gte("1e140000")) time = time.sub(200)
        if(player.C.points.gte("1e200000")) time = time.sub(200)
        if(player.C.points.gte("1e400000")) time = time.sub(200)
        if(player.C.points.gte("1e400000")) time = time.sub(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",3)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",5)  }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(4)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    
    player.E.ChineseType = new Decimal(4)
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666",   color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "300px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
171: {
    title(){return "<h2>三、选词填空<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共10小题，每小题1分，共10分。")
        return display;
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
172: {
    title(){return "(5分)选词填空-难度1"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e35~1e60"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e35)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e35)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(player.Eng.power.gte("1e160")) time = time.sub(60)
        if(player.Eng.power.gte("1e200")) time = time.sub(60)
        if(player.Eng.power.gte("1e400")) time = time.sub(60)
        if(player.Eng.power.gte("1e800")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return !getBuyableAmount("E",173).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",173)
    buyBuyable("E",174)
    buyBuyable("E",175)
    buyBuyable("E",176)
    buyBuyable("E",177)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
173: {
    title(){return "<h1>36."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e35)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e35)) time = player.Eng.power.log10().div(60).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
174: {
    title(){return "<h1>37."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e30)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e35)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e35)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e45)) time = player.Eng.power.log10().div(70).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
175: {
    title(){return "<h1>38."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e45)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e55)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e55)) time = player.Eng.power.log10().div(80).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
176: {
    title(){return "<h1>39."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e50)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e55)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e55)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e65)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e65)) time = player.Eng.power.log10().div(90).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
177: {
    title(){return "<h1>40."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e60)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e65)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e65)&&!player.Eng.power.gte(1e70)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e70)&&!player.Eng.power.gte(1e75)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e75)) time = player.Eng.power.log10().div(90).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
178: {
    title(){return "(5分)选词填空-难度2"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e100~1e200"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e80)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e100)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e100)) time = player.Eng.power.log10().div(200).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(player.Eng.power.gte("1e160")) time = time.sub(60)
        if(player.Eng.power.gte("1e200")) time = time.sub(60)
        if(player.Eng.power.gte("1e400")) time = time.sub(60)
        if(player.Eng.power.gte("1e800")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return !getBuyableAmount("E",179).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",179)
    buyBuyable("E",180)
    buyBuyable("E",181)
    buyBuyable("E",183)
    buyBuyable("E",184)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
179: {
    title(){return "<h1>41."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e80)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e100)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e100)) time = player.Eng.power.log10().div(200).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
180: {
    title(){return "<h1>42."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e60)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e80)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e100)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e100)&&!player.Eng.power.gte(1e120)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e120)) time = player.Eng.power.log10().div(240).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
181: {
    title(){return "<h1>43."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e80)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e100)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e100)&&!player.Eng.power.gte(1e120)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e120)&&!player.Eng.power.gte(1e140)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e140)) time = player.Eng.power.log10().div(280).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
183: {
    title(){return "<h1>44."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e80)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e100)&&!player.Eng.power.gte(1e120)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e120)&&!player.Eng.power.gte(1e140)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e140)&&!player.Eng.power.gte(1e160)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e160)) time = player.Eng.power.log10().div(320).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
184: {
    title(){return "<h1>45."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e100)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e120)&&!player.Eng.power.gte(1e140)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e140)&&!player.Eng.power.gte(1e160)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e160)&&!player.Eng.power.gte(1e180)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e180)) time = player.Eng.power.log10().div(360).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(400)
        if(player.Eng.power.gte("1e40")) time = time.sub(120)
        if(player.Eng.power.gte("1e80")) time = time.sub(90)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",8) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
185: {
    title(){return "(Rare)借景抒情"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
        if(hasMilestone("Eng",15)) gain = gain.mul(new Decimal(player.Eng.upgrades.length).div(30).max(1))
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以选定您的作文题材！<br>题材效果：根据英语网格节点数目加成所有当前作文属性。当前：x"+format(this.gain())
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return getBuyableAmount("Exp",69).gte(1)&&player.E.ccRandom2.gte(0)&&player.E.ccRandom2.lt(10)&&player.E.inZuowen.gte(1)&&player.E.ccSelected1.lt(1) }, 
    canAfford() { return player.E.ccSelected2.gte(1)&&getBuyableAmount(this.layer,this.id).lt(1)},
    buy() { 
        player.E.luoji = player.E.luoji.mul(this.gain()).floor()
        player.E.sixiang = player.E.sixiang.mul(this.gain()).floor()
        player.E.xiangxiang = player.E.xiangxiang.mul(this.gain()).floor()
        player.E.wenbi = player.E.wenbi.mul(this.gain()).floor()
    player.E.ccSelected2 = player.E.ccSelected2.sub(1)
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
186: {
    title(){return "<h2>四、阅读理解<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共15小题，每小题2分，共30分。")
        return display;
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
187: {
    title(){return "(10分)阅读理解-A篇"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e200~1e300"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e120)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e120)&&!player.Eng.power.gte(1e160)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e160)&&!player.Eng.power.gte(1e180)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e180)&&!player.Eng.power.gte(1e200)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e200)) time = player.Eng.power.log10().div(400).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(90)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return !getBuyableAmount("E",188).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",188)
    buyBuyable("E",189)
    buyBuyable("E",190)
    buyBuyable("E",191)
    buyBuyable("E",192)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
188: {
    title(){return "<h1>46."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e120)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e120)&&!player.Eng.power.gte(1e160)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e160)&&!player.Eng.power.gte(1e180)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e180)&&!player.Eng.power.gte(1e200)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e200)) time = player.Eng.power.log10().div(400).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
189: {
    title(){return "<h1>47."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e140)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e140)&&!player.Eng.power.gte(1e180)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e180)&&!player.Eng.power.gte(1e200)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e200)&&!player.Eng.power.gte(1e220)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e220)) time = player.Eng.power.log10().div(440).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
190: {
    title(){return "<h1>48."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e160)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e160)&&!player.Eng.power.gte(1e200)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e200)&&!player.Eng.power.gte(1e220)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e220)&&!player.Eng.power.gte(1e240)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e240)) time = player.Eng.power.log10().div(480).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
191: {
    title(){return "<h1>49."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e180)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e180)&&!player.Eng.power.gte(1e220)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e220)&&!player.Eng.power.gte(1e240)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e240)&&!player.Eng.power.gte(1e260)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e260)) time = player.Eng.power.log10().div(520).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
192: {
    title(){return "<h1>50."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e200)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e200)&&!player.Eng.power.gte(1e240)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e240)&&!player.Eng.power.gte(1e260)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e260)&&!player.Eng.power.gte(1e280)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e280)) time = player.Eng.power.log10().div(520).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
193: {
    title(){return "(10分)阅读理解-B篇"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e400~1e600"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte("1e240")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e240")&&!player.Eng.power.gte("1e320")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e320")&&!player.Eng.power.gte("1e360")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e400")) time = player.Eng.power.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(90)
        if(player.Eng.power.gte("1e160")) time = time.sub(90)
        if(player.Eng.power.gte("1e200")) time = time.sub(90)
        if(player.Eng.power.gte("1e400")) time = time.sub(90)
        if(player.Eng.power.gte("1e800")) time = time.sub(45)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return !getBuyableAmount("E",194).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",194)
    buyBuyable("E",195)
    buyBuyable("E",196)
    buyBuyable("E",197)
    buyBuyable("E",198)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
194: {
    title(){return "<h1>51."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e240")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e240")&&!player.Eng.power.gte("1e320")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e320")&&!player.Eng.power.gte("1e360")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e400")) time = player.Eng.power.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
195: {
    title(){return "<h1>52."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e280")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e280")&&!player.Eng.power.gte("1e360")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e400")&&!player.Eng.power.gte("1e440")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e440")) time = player.Eng.power.log10().div(880).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
196: {
    title(){return "<h1>53."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e320")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e320")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e400")&&!player.Eng.power.gte("1e440")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e440")&&!player.Eng.power.gte("1e480")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e480")) time = player.Eng.power.log10().div(960).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
197: {
    title(){return "<h1>54."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e360")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e440")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e440")&&!player.Eng.power.gte("1e480")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e480")&&!player.Eng.power.gte("1e520")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e520")) time = player.Eng.power.log10().div(1040).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
198: {
    title(){return "<h1>55."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e400")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e400")&&!player.Eng.power.gte("1e480")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e480")&&!player.Eng.power.gte("1e520")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e520")&&!player.Eng.power.gte("1e560")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e560")) time = player.Eng.power.log10().div(1040).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
199: {
    title(){return "(10分)阅读理解-C篇"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e1000~1e2000"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e600)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e600)&&!player.Eng.power.gte(1e700)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e700)&&!player.Eng.power.gte(1e800)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e800)&&!player.Eng.power.gte(1e1000)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e1000)) time = player.Eng.power.log10().div(2000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(90)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return !getBuyableAmount("E",200).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",200)
    buyBuyable("E",201)
    buyBuyable("E",202)
    buyBuyable("E",203)
    buyBuyable("E",204)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
200: {
    title(){return "<h1>56."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e600")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e600")&&!player.Eng.power.gte("1e700")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e700")&&!player.Eng.power.gte("1e800")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e800")&&!player.Eng.power.gte("1e1000")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e1000")) time = player.Eng.power.log10().div(2000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
201: {
    title(){return "<h1>57."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e800")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e800")&&!player.Eng.power.gte("1e900")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e900")&&!player.Eng.power.gte("1e1000")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e1000")&&!player.Eng.power.gte("1e1200")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e1200")) time = player.Eng.power.log10().div(2000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
202: {
    title(){return "<h1>58."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e1000")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e1000")&&!player.Eng.power.gte("1e1100")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e1100")&&!player.Eng.power.gte("1e1200")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e1200")&&!player.Eng.power.gte("1e1400")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e1400")) time = player.Eng.power.log10().div(2000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
203: {
    title(){return "<h1>59."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e1100")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e1100")&&!player.Eng.power.gte("1e1200")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e1200")&&!player.Eng.power.gte("1e1300")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e1300")&&!player.Eng.power.gte("1e1500")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e1500")) time = player.Eng.power.log10().div(2000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
204: {
    title(){return "<h1>60."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e1200")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e1200")&&!player.Eng.power.gte("1e1300")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e1300")&&!player.Eng.power.gte("1e1400")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e1400")&&!player.Eng.power.gte("1e1600")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e1600")) time = player.Eng.power.log10().div(2000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
205: {
    title(){return "<h2>五、补全对话<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共5小题，每小题1分，共5分。")
        return display;
    },
    unlocked() { return hasMilestone("Eng",10) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
206: {
    title(){return "(5分)补全对话"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e40~1e60"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e40)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(player.Eng.power.gte("1e80")) time = time.sub(30)
        if(player.Eng.power.gte("1e100")) time = time.sub(30)
        if(player.Eng.power.gte("1e200")) time = time.sub(30)
        if(player.Eng.power.gte("1e400")) time = time.sub(15)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("Eng",10) }, 
    canAfford() { return !getBuyableAmount("E",207).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",207)
    buyBuyable("E",208)
    buyBuyable("E",209)
    buyBuyable("E",210)
    buyBuyable("E",211)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
207: {
    title(){return "<h1>61."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e40)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",10) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
208: {
    title(){return "<h1>62."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e25)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e35)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e35)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e45)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",10) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
209: {
    title(){return "<h1>63."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e30)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e35)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e35)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e50)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",10) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
210: {
    title(){return "<h1>64."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e35)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e35)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e45)&&!player.Eng.power.gte(1e55)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e55)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",10) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
211: {
    title(){return "<h1>65."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e45)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e45)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e60)) time = player.Eng.power.log10().div(30).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(300)
        if(player.Eng.power.gte("1e20")) time = time.sub(90)
        if(player.Eng.power.gte("1e40")) time = time.sub(60)
        if(player.Eng.power.gte("1e60")) time = time.sub(30)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("Eng",10) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
212: {
    title(){return "<h2>六、完成句子<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共5小题，每小题2分，共10分。")
        return display;
    },
    unlocked() { return hasMilestone("Eng",11) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
213: {
    title(){return "(10分)完成句子"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e40~1e640"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e40)) time = player.Eng.power.log10().div(80).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte("1e20")) time = time.sub(60)
        if(player.Eng.power.gte("1e40")) time = time.sub(40)
        if(player.Eng.power.gte("1e60")) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("Eng",11) }, 
    canAfford() { return !getBuyableAmount("E",214).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",214)
    buyBuyable("E",215)
    buyBuyable("E",216)
    buyBuyable("E",217)
    buyBuyable("E",218)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
214: {
    title(){return "<h1>66."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e20)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e20)&&!player.Eng.power.gte(1e25)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e25)&&!player.Eng.power.gte(1e30)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e30)&&!player.Eng.power.gte(1e40)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e40)) time = player.Eng.power.log10().div(80).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte("1e20")) time = time.sub(60)
        if(player.Eng.power.gte("1e40")) time = time.sub(40)
        if(player.Eng.power.gte("1e60")) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("Eng",11) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
215: {
    title(){return "<h1>67."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e40)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e40)&&!player.Eng.power.gte(1e50)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e50)&&!player.Eng.power.gte(1e60)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e60)&&!player.Eng.power.gte(1e80)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e80)) time = player.Eng.power.log10().div(160).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte("1e20")) time = time.sub(60)
        if(player.Eng.power.gte("1e40")) time = time.sub(40)
        if(player.Eng.power.gte("1e60")) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("Eng",11) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
216: {
    title(){return "<h1>68."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e80)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e80)&&!player.Eng.power.gte(1e100)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e100)&&!player.Eng.power.gte(1e120)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e120)&&!player.Eng.power.gte(1e160)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e160)) time = player.Eng.power.log10().div(320).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte("1e20")) time = time.sub(60)
        if(player.Eng.power.gte("1e40")) time = time.sub(40)
        if(player.Eng.power.gte("1e60")) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("Eng",11) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
217: {
    title(){return "<h1>69."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e160)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e160)&&!player.Eng.power.gte(1e200)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e200)&&!player.Eng.power.gte(1e240)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e240)&&!player.Eng.power.gte("1e320")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e320")) time = player.Eng.power.log10().div(640).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte("1e20")) time = time.sub(60)
        if(player.Eng.power.gte("1e40")) time = time.sub(40)
        if(player.Eng.power.gte("1e60")) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("Eng",11) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
218: {
    title(){return "<h1>70."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e320")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e320")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e400")&&!player.Eng.power.gte("1e480")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e480")&&!player.Eng.power.gte("1e640")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e640")) time = player.Eng.power.log10().div(1280).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(200)
        if(player.Eng.power.gte("1e20")) time = time.sub(60)
        if(player.Eng.power.gte("1e40")) time = time.sub(40)
        if(player.Eng.power.gte("1e60")) time = time.sub(20)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("Eng",11) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
219: {
    title(){return "<h2>七、任务型阅读<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共5小题，每小题1分，共5分。")
        return display;
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
220: {
    title(){return "(5分)任务型阅读"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e400~1e600"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e240)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e240)&&!player.Eng.power.gte(1e320)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e320)&&!player.Eng.power.gte(1e360)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e360)&&!player.Eng.power.gte(1e400)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e400)) time = player.Eng.power.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(90)
        if(player.Eng.power.gte("1e160")) time = time.sub(90)
        if(player.Eng.power.gte("1e200")) time = time.sub(90)
        if(player.Eng.power.gte("1e400")) time = time.sub(90)
        if(player.Eng.power.gte("1e800")) time = time.sub(45)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return !getBuyableAmount("E",221).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",221)
    buyBuyable("E",222)
    buyBuyable("E",223)
    buyBuyable("E",224)
    buyBuyable("E",225)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
221: {
    title(){return "<h1>71."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte(1e240)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e240)&&!player.Eng.power.gte("1e320")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e320")&&!player.Eng.power.gte("1e360")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e400")) time = player.Eng.power.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
222: {
    title(){return "<h1>72."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e280")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e280")&&!player.Eng.power.gte("1e360")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e400")&&!player.Eng.power.gte("1e440")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e440")) time = player.Eng.power.log10().div(880).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
223: {
    title(){return "<h1>73."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e320")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e320")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e400")&&!player.Eng.power.gte("1e440")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e440")&&!player.Eng.power.gte("1e480")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e480")) time = player.Eng.power.log10().div(960).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
224: {
    title(){return "<h1>74."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e360")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e440")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e440")&&!player.Eng.power.gte("1e480")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e480")&&!player.Eng.power.gte("1e520")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e520")) time = player.Eng.power.log10().div(1040).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
225: {
    title(){return "<h1>75."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e400")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e400")&&!player.Eng.power.gte("1e480")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e480")&&!player.Eng.power.gte("1e520")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e520")&&!player.Eng.power.gte("1e560")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e560")) time = player.Eng.power.log10().div(1040).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
226: {
    title(){return "<h2>八、首字母填空<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共10小题，每小题1分，共10分。")
        return display;
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
227: {
    title(){return "(5分)首字母填空-难度1"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e400~1e6400"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e240)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e240)&&!player.Eng.power.gte(1e320)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e320)&&!player.Eng.power.gte(1e360)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e360)&&!player.Eng.power.gte(1e400)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e400)) time = player.Eng.power.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(90)
        if(player.Eng.power.gte("1e160")) time = time.sub(90)
        if(player.Eng.power.gte("1e200")) time = time.sub(90)
        if(player.Eng.power.gte("1e400")) time = time.sub(90)
        if(player.Eng.power.gte("1e800")) time = time.sub(45)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return !getBuyableAmount("E",228).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",228)
    buyBuyable("E",229)
    buyBuyable("E",230)
    buyBuyable("E",231)
    buyBuyable("E",232)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
228: {
    title(){return "<h1>76."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e240")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e240")&&!player.Eng.power.gte("1e320")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e320")&&!player.Eng.power.gte("1e360")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e360")&&!player.Eng.power.gte("1e400")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e400")) time = player.Eng.power.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
229: {
    title(){return "<h1>77."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e480")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e480")&&!player.Eng.power.gte("1e640")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e640")&&!player.Eng.power.gte("1e720")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e720")&&!player.Eng.power.gte("1e800")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e800")) time = player.Eng.power.log10().div(1600).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
230: {
    title(){return "<h1>78."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e960")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e960")&&!player.Eng.power.gte("1e1280")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e1280")&&!player.Eng.power.gte("1e1440")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e1440")&&!player.Eng.power.gte("1e1600")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e1600")) time = player.Eng.power.log10().div(3200).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
231: {
    title(){return "<h1>79."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e1920")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e1920")&&!player.Eng.power.gte("1e2560")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e2560")&&!player.Eng.power.gte("1e2880")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e2880")&&!player.Eng.power.gte("1e3200")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e3200")) time = player.Eng.power.log10().div(6400).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
232: {
    title(){return "<h1>80."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e3840")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e3840")&&!player.Eng.power.gte("1e5120")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e5120")&&!player.Eng.power.gte("1e5760")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e5760")&&!player.Eng.power.gte("1e6400")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e6400")) time = player.Eng.power.log10().div(12800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
233: {
    title(){return "(5分)首字母填空-难度2"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "本行题目推荐英语知识：1e12800~1e204800"
        return display;
    },
    chance(){
        if(!player.Eng.power.gte(1e240)) time = new Decimal(0.001)
        if(player.Eng.power.gte(1e240)&&!player.Eng.power.gte(1e320)) time = new Decimal(0.01)
        if(player.Eng.power.gte(1e320)&&!player.Eng.power.gte(1e360)) time = new Decimal(0.1)
        if(player.Eng.power.gte(1e360)&&!player.Eng.power.gte(1e400)) time = new Decimal(0.5)
        if(player.Eng.power.gte(1e400)) time = player.Eng.power.log10().div(800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(90)
        if(player.Eng.power.gte("1e160")) time = time.sub(90)
        if(player.Eng.power.gte("1e200")) time = time.sub(90)
        if(player.Eng.power.gte("1e400")) time = time.sub(90)
        if(player.Eng.power.gte("1e800")) time = time.sub(45)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return !getBuyableAmount("E",234).gte(1)&&player.E.inEnglish.gte(1)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22)},
    buy() { 
    buyBuyable("E",234)
    buyBuyable("E",235)
    buyBuyable("E",236)
    buyBuyable("E",237)
    buyBuyable("E",238)
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "170px"}},
    autoed() { return false},
},
234: {
    title(){return "<h1>81."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e7680")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e7680")&&!player.Eng.power.gte("1e10240")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e10240")&&!player.Eng.power.gte("1e11520")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e11520")&&!player.Eng.power.gte("1e12800")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e12800")) time = player.Eng.power.log10().div(25600).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
235: {
    title(){return "<h1>82."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e15360")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e15360")&&!player.Eng.power.gte("1e20480")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e20480")&&!player.Eng.power.gte("1e23040")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e23040")&&!player.Eng.power.gte("1e25600")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e25600")) time = player.Eng.power.log10().div(51200).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
236: {
    title(){return "<h1>83."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e30720")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e30720")&&!player.Eng.power.gte("1e40960")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e40960")&&!player.Eng.power.gte("1e46080")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e46080")&&!player.Eng.power.gte("1e51200")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e51200")) time = player.Eng.power.log10().div(102400).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
237: {
    title(){return "<h1>84."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e61440")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e61440")&&!player.Eng.power.gte("1e81920")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e81920")&&!player.Eng.power.gte("1e92160")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e92160")&&!player.Eng.power.gte("1e102400")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e102400")) time = player.Eng.power.log10().div(204800).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
238: {
    title(){return "<h1>85."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    tooltip()
    {
        return "正确概率"+format(this.chance())+"%<br>消耗时间"+format(this.time())+"s"
    },
    chance(){
        if(!player.Eng.power.gte("1e122880")) time = new Decimal(0.001)
        if(player.Eng.power.gte("1e122880")&&!player.Eng.power.gte("1e163840")) time = new Decimal(0.01)
        if(player.Eng.power.gte("1e163840")&&!player.Eng.power.gte("1e184320")) time = new Decimal(0.1)
        if(player.Eng.power.gte("1e184320")&&!player.Eng.power.gte("1e204800")) time = new Decimal(0.5)
        if(player.Eng.power.gte("1e204800")) time = player.Eng.power.log10().div(409600).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(1.3).min(100)
        return time

        
    },
    time(){
        let time = new Decimal(600)
        if(player.Eng.power.gte("1e40")) time = time.sub(240)
        if(player.Eng.power.gte("1e80")) time = time.sub(120)
        if(player.Eng.power.gte("1e120")) time = time.sub(60)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(hasMilestone("Eng",9)) time = time.mul(0.5)
        return time
    },
    unlocked() { return hasMilestone("C",9) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.English = player.E.English.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "85px", width: "85px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "85px", width: "85px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "85px", width: "85px"}},
    autoed() { return false},
},
239: {
    title(){return "(Rare)很多年后，忧伤的下午"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：想象++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("Eng",15)&&player.E.lingganRandom.lt(tmp.E.lingganLimit)&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.xiangxiang = player.E.xiangxiang.add(player.E.xiangxiangMult.mul(300)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
240: {
    title(){return "(Rare)所有的记忆都是潮湿的"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：思想++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("Eng",15)&&player.E.lingganRandom.gte(9)&&player.E.lingganRandom.lt(new Decimal(9).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.sixiang = player.E.sixiang.add(player.E.sixiangMult.mul(300)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
241: {
    title(){return "(Rare)一约既定，万山难阻"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：思想-- 逻辑+ 文笔+"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("Eng",15)&&player.E.lingganRandom.gte(8)&&player.E.lingganRandom.lt(new Decimal(8).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.sixiang = player.E.sixiang.sub(player.E.sixiangMult.mul(300)).floor()
        player.E.luoji = player.E.luoji.add(player.E.luojiMult.mul(100)).floor()
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(100)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
242: {
    title(){return "(Rare)绳锯木断，水滴石穿"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：逻辑+ 文笔+"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("Eng",17)&&player.E.lingganRandom.gte(7)&&player.E.lingganRandom.lt(new Decimal(7).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.luoji = player.E.luoji.add(player.E.luojiMult.mul(100)).floor()
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(100)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
243: {
    title(){return "(Rare)白昼总会到来"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：思想+ 文笔+"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("Eng",17)&&player.E.lingganRandom.gte(6)&&player.E.lingganRandom.lt(new Decimal(6).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.sixiang = player.E.sixiang.add(player.E.sixiangMult.mul(100)).floor()
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(100)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
244: {
    title(){return "(Rare)时间把我荒废"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：逻辑+ 想象+"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("Eng",17)&&player.E.lingganRandom.gte(5.5)&&player.E.lingganRandom.lt(new Decimal(5.5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.luoji = player.E.luoji.add(player.E.luojiMult.mul(100)).floor()
        player.E.xiangxiang = player.E.xiangxiang.add(player.E.xiangxiangMult.mul(100)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
245: {
    title(){return "(Rare)爱情无药可医，唯有爱得更深"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：逻辑-- 想象++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("C",11)&&player.E.lingganRandom.gte(4.5)&&player.E.lingganRandom.lt(new Decimal(4.5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.luoji = player.E.luoji.sub(player.E.luojiMult.mul(300)).floor()
        player.E.xiangxiang = player.E.xiangxiang.add(player.E.xiangxiangMult.mul(300)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
246: {
    title(){return "(Rare)吾爱吾师，吾更爱真理"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：思想++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("C",11)&&player.E.lingganRandom.gte(3.5)&&player.E.lingganRandom.lt(new Decimal(3.5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.sixiang = player.E.sixiang.add(player.E.sixiangMult.mul(300)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
247: {
    title(){return "(Rare)时间，就像海绵里的水"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：思想- 逻辑+ 文笔+"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return !hasMilestone("C",11)&&player.E.lingganRandom.gte(2.5)&&player.E.lingganRandom.lt(new Decimal(2.5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.sixiang = player.E.sixiang.sub(player.E.sixiangMult.mul(100)).floor()
        player.E.luoji = player.E.luoji.add(player.E.luojiMult.mul(100)).floor()
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(100)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
248: {
    title(){return "(Epic)路漫漫其修远兮"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：文笔+++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("Eng",15)&&player.E.lingganRandom.gte(3)&&player.E.lingganRandom.lt(new Decimal(3).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(600)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
249: {
    title(){return "(Epic)上帝也疯狂"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：文笔+++ 逻辑---- 想象+++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("Eng",15)&&player.E.lingganRandom.gte(5)&&player.E.lingganRandom.lt(new Decimal(5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(600)).floor()
        player.E.xiangxiang = player.E.xiangxiang.add(player.E.xiangxiangMult.mul(600)).floor()
        player.E.luoji = player.E.luoji.sub(player.E.luojiMult.mul(1200)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
250: {
    title(){return "(Epic)暗恋是世界上最美丽的爱情"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：文笔--- 想象++++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("Eng",15)&&player.E.lingganRandom.gte(9)&&player.E.lingganRandom.lt(new Decimal(9).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        player.E.wenbi = player.E.wenbi.sub(player.E.wenbiMult.mul(600)).floor()
        player.E.xiangxiang = player.E.xiangxiang.add(player.E.xiangxiangMult.mul(1200)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
251: {
    title(){return "(Epic)叶里藏花一度，梦里踏雪几回"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：想象++++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("Eng",17)&&player.E.lingganRandom.gte(2)&&player.E.lingganRandom.lt(new Decimal(2).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        
        player.E.xiangxiang = player.E.xiangxiang.add(player.E.xiangxiangMult.mul(1200)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
252: {
    title(){return "(Epic)光景不待人，须臾发成丝"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：文笔++++ 逻辑----"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("Eng",17)&&player.E.lingganRandom.gte(6)&&player.E.lingganRandom.lt(new Decimal(6).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(1200)).floor()
        player.E.luoji = player.E.luoji.sub(player.E.luojiMult.mul(1200)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
253: {
    title(){return "(Epic)雾中风景"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：文笔+++ 想象++++ 思想----"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("Eng",17)&&player.E.lingganRandom.gte(8)&&player.E.lingganRandom.lt(new Decimal(8).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(600)).floor()
        player.E.sixiang = player.E.sixiang.sub(player.E.sixiangMult.mul(1200)).floor()
        player.E.xiangxiang = player.E.xiangxiang.sub(player.E.xiangxiangMult.mul(1200)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#601EDC",   color: "white", 'border-color': "#702FED",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
254: {
    title(){return "(Legendary)世有伯乐，然后有千里马"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：文笔+++++ 思想+++++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("C",11)&&player.E.lingganRandom.gte(4.5)&&player.E.lingganRandom.lt(new Decimal(4.5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(7000)).floor()
        player.E.sixiang = player.E.sixiang.add(player.E.sixiangMult.mul(7000)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#EE7000",   color: "white", 'border-color': "#FF8000",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
255: {
    title(){return "(Legendary)不乱于心，不困于情"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：思想+++++ 逻辑++++ 文笔++++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("C",11)&&player.E.lingganRandom.gte(2.5)&&player.E.lingganRandom.lt(new Decimal(2.5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(3000)).floor()
        player.E.luoji = player.E.luoji.add(player.E.luojiMult.mul(7000)).floor()
        player.E.sixiang = player.E.sixiang.add(player.E.sixiangMult.mul(7000)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#EE7000",   color: "white", 'border-color': "#FF8000",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
256: {
    title(){return "(Legendary)人生如棋，落子无悔"},
    gain() { 
        let gain = new Decimal(player.Eng.upgrades.length).div(3).add(1).min(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "点击以将此作文灵感写入作文！<br>灵感效果：逻辑+++++ 文笔+++++"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "(已选择)"
        return display;
    },
    unlocked() { return hasMilestone("C",11)&&player.E.lingganRandom.gte(2.5)&&player.E.lingganRandom.lt(new Decimal(2.5).add(tmp.E.lingganLimit))&&hasMilestone("C",9)&&player.E.linggan }, 
    canAfford() { return true},
    buy() { 
        
        player.E.wenbi = player.E.wenbi.add(player.E.wenbiMult.mul(7000)).floor()
        player.E.luoji = player.E.luoji.add(player.E.luojiMult.mul(7000)).floor()
        player.E.lingganFreeze = tmp.E.lingganFreezeLimit
        player.E.linggan = false
    },
       
    style() { if(getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#EE7000",   color: "white", 'border-color': "#FF8000",'border-radius': "10px", height: "100px", width: "200px"}
    if(getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#1035D0",   color: "white", 'border-color': "#2146E0",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
257: {
    title(){return "<h2>九、作文<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共1小题，每小题15分，共15分。")
        return display;
    },
    unlocked() { return hasMilestone("C",11) }, 
    canAfford() { return false},
    buy() { 
         
    },
       
    style() { return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
258: {
    title(){return "<h1>86."},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = "预测得分："+format(this.score())+"<br>消耗时间"+format(this.time())+"s"
        return display;
    },
    score(){
        let time = new Decimal(0)
        if(player.Eng.power.gte("1e128")) time = time.add(1)
        if(player.Eng.power.gte("1e256")) time = time.add(1)
        if(player.Eng.power.gte("1e512")) time = time.add(1)
        if(player.Eng.power.gte("1e1024")) time = time.add(1)
        if(player.Eng.power.gte("1e2048")) time = time.add(1)
        if(player.Eng.power.gte("1e4096")) time = time.add(1)
        if(player.Eng.power.gte("1e8192")) time = time.add(1)
        if(player.Eng.power.gte("1e16384")) time = time.add(1)
        if(player.Eng.power.gte("1e32768")) time = time.add(1)
        if(player.Eng.power.gte("1e65536")) time = time.add(1)
        if(player.Eng.power.gte("1e131072")) time = time.add(1)
        if(player.Eng.power.gte("1e262144")) time = time.add(1)
        if(player.Eng.power.gte("1e524288")) time = time.add(1)
        if(player.Eng.power.gte("1e1048576")) time = time.add(1)
        if(player.Eng.power.gte("1e2097152")) time = time.add(1)
        return time

        
    },
    time(){
        let time = new Decimal(1000)
        return time
    },
    unlocked() { return hasMilestone("C",11) }, 
    canAfford() { return (!player.E.EnglishTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inEnglish.gte(1)},
    buy() { 
    player.E.EnglishTime = player.E.EnglishTime.sub(this.time())
    setBuyableAmount(this.layer,this.id,new Decimal(1))
    player.E.English = player.E.English.add(this.score())
    },
       
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#808450",   color: "white", 'border-color': "#909561",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088",   color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800",   color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000",   color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
259: {
    title(){return "<h2>确定"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        display = ""
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return true},
    buy() { 
    player.E.name = player.E.InText
    if(player.E.name.length >= 30) player.E.name = 'Nameless'
    },
       
    style() { return {'background-color': "#FFFFFF",   color: "black", 'border-color': "#FFFFFF",'border-radius': "0px", height: "50px", width: "100px"}},
    autoed() { return false},
},
    },
    lingganFreezeLimit()
    {
        let lim = new Decimal(20)
        if(getBuyableAmount("C",89).gte(1)) lim = lim.mul(buyableEffect("C",89))
        if(hasMilestone("Eng",17)) lim = lim.mul(0.5)
        return lim
    },
    lingganLimit()
    {
        let lim = new Decimal(2)
        return lim
    },
    Rank(){
return new Decimal(109123).sub(player.E.points.mul(10))
    },
    ccScore()
    {
if(player.E.ccPoints.lt(10000)) score = player.E.ccPoints.div(1000).floor()
else if(player.E.ccPoints.lt(100000)) score = new Decimal(10).add(player.E.ccPoints.div(10000).floor())
else if(player.E.ccPoints.lt(1000000)) score = new Decimal(20).add(player.E.ccPoints.div(100000).floor())
else if(player.E.ccPoints.lt(5000000)) score = new Decimal(30).add(player.E.ccPoints.div(1000000).floor())
else if(player.E.ccPoints.lt(25000000)) score = new Decimal(35).add(player.E.ccPoints.div(5000000).floor())
else if(player.E.ccPoints.lt(250000000)) score = new Decimal(40).add(player.E.ccPoints.div(50000000).floor())
else score = new Decimal(46)
return score
    },
    ccFreeze()
    {
let freeze = new Decimal(10)
if(getBuyableAmount("C",59).gte(1)||player.Exp.bought68) freeze = freeze.sub(buyableEffect("C",59))
return freeze
    },
    update(diff)
    {
        player.E.random = new Decimal(Math.random()*10)
        
        if(player.E.startedZuowen.gte(1)&&player.E.ccFreeze.lt(1)&&player.E.random.lt(2.5)) player.E.ccFreeze = tmp.E.ccFreeze, player.E.luoji = player.E.luoji.add(player.E.random.mul(6).mul(player.E.luojiMult)).floor()
        if(player.E.startedZuowen.gte(1)&&player.E.ccFreeze.lt(1)&&player.E.random.gte(2.5)&&player.E.random.lt(5)) player.E.ccFreeze = tmp.E.ccFreeze, player.E.wenbi = player.E.wenbi.add(player.E.random.mul(3).mul(player.E.wenbiMult)).floor()
        if(player.E.startedZuowen.gte(1)&&player.E.ccFreeze.lt(1)&&player.E.random.gte(5)&&player.E.random.lt(7.5)) player.E.ccFreeze = tmp.E.ccFreeze, player.E.sixiang = player.E.sixiang.add(player.E.random.mul(2).mul(player.E.sixiangMult)).floor()
        if(player.E.startedZuowen.gte(1)&&player.E.ccFreeze.lt(1)&&player.E.random.gte(7.5)&&player.E.random.lt(10)) player.E.ccFreeze = tmp.E.ccFreeze, player.E.xiangxiang = player.E.xiangxiang.add(player.E.random.mul(player.E.xiangxiangMult)).floor()
        if(player.E.startedZuowen.gte(1)) player.E.ccFreeze = player.E.ccFreeze.sub(1),player.E.zuowenTime = player.E.zuowenTime.sub(5)
        if(player.E.zuowenTime.lte(0)&&player.E.inZuowen.gte(1)) player.E.startedZuowen = new Decimal(0), player.E.completedZuowen = new Decimal(1),player.E.ccPoints = player.E.luoji.add(player.E.wenbi).add(player.E.sixiang).add(player.E.xiangxiang),player.E.lingganFreeze = tmp.E.lingganFreezeLimit,player.E.linggan = false
        if(player.E.freeze.gt(0))player.E.freeze = player.E.freeze.sub(new Decimal(5).mul(diff).mul(hasChallenge("Exp",21)? 2 : 1))
        if(player.E.freeze.lt(0))player.E.freeze = new Decimal(0)
        if(player.E.lingganFreeze.gt(0)&&player.E.startedZuowen.gte(1)&&player.E.completedZuowen.lt(1)) player.E.lingganFreeze = player.E.lingganFreeze.sub(1)
        if(player.E.lingganFreeze.lt(1)) player.E.lingganRandom = player.E.random , player.E.linggan = true , player.E.lingganFreeze = tmp.E.lingganFreezeLimit
    },
    branches:[["C","grey",15],["Eng","#909561",15],["M","#8B8175",15]],
    tabFormat:{
        "Main":{
            content:[
            
            ["buyable",11],
            ["buyable",52],
            ["display-text",
            function() {return "您最佳的中考分数为 <h2 style='color:#FFFFFF;text-shadow:0px 0px 10px;'>"+ format(player.E.bestPoints)},
            {}],
            "blank",
            ["display-text",
            function() {return "在天津市109123名中考考生中排名第 <h2 style='color:#FFFFFF;text-shadow:0px 0px 10px;'>"+ player.E.rank + "<h2>"},
            {}],
            "blank",
            ["display-text",
            function() {return "距离"+player.E.year.add(1)+"年中考剩余天数: <h2 style='color:#FFFFFF;text-shadow:0px 0px 10px;'>"+ format(player.E.freeze)},
            {}],
            ["display-text",
            function() {return "Tips:如果出现考试后立即交卷的问题，请试着刷新游戏！"},
            {}],
        ["bar", "NextCD"],
        ["infobox","introBox"],
    "grid",

"blank",
"upgrades",
"milestones",

"blank",
, "blank", "blank", ]
},
"Name":{
    content:[
    
        ["strict-text-box", "InText"],
        ["buyable",259],
     ],
     unlocked(){return player.E.inExam.lt(1)}
},
"Chinese":{
    content:[
    ["buyable",21],
    ["buyable",22],
    ["row",[["buyable",31],["buyable",32],["buyable",33]]],
    ["row",[["buyable",34],["buyable",35],["buyable",36]]],
    ["row",[["buyable",37],["buyable",38],["buyable",39]]],
    ["row",[["buyable",41],["buyable",42]]],
    ["buyable",43],
    ["row",[["buyable",44],["buyable",45],["buyable",46]]],
    ["row",[["buyable",47],["buyable",48],["buyable",49]]],
    ["row",[["buyable",67]]],
    ["row",[["buyable",73]]],
    ["row",[["buyable",68],["buyable",69]]],
    ["row",[["buyable",70],["buyable",71],["buyable",72]]],
    ["row",[["buyable",74],["buyable",75],["buyable",76],["buyable",77]]],
    ["row",[["buyable",165]]],
    ["row",[["buyable",166]]],
    ["row",[["buyable",167],["buyable",168]]],
    ["row",[["buyable",169],["buyable",170]]],
    ["row",[["buyable",106]]],
    ["row",[["buyable",107],["buyable",108]]],
    ["row",[["buyable",161]]],
    ["row",[["buyable",162],["buyable",163],["buyable",164]]],
    ["row",[["buyable",78]]],
    ["row",[["buyable",79],["buyable",80],["buyable",81]]],
    ["row",[["buyable",160]]],
    
    ["buyable",51],
    
    ],
    buttonStyle: {"border-color": "#888888","background-color": "#666666"},  
    style:{"background-color":"#222222"},
    unlocked(){return player.E.inExam.gte(1)}
},
"ChineseComposition":{
    content:[
        ["row",[["buyable",82],["buyable",83],["buyable",84],["buyable",85]]],
        ["row",[["buyable",239],["buyable",240],["buyable",241]]],
        ["row",[["buyable",242],["buyable",243],["buyable",244]]],
        ["row",[["buyable",245],["buyable",246],["buyable",247]]],
        ["row",[["buyable",248],["buyable",249],["buyable",250]]],
        ["row",[["buyable",251],["buyable",252],["buyable",253]]],
        ["row",[["buyable",254],["buyable",255],["buyable",256]]],
        ["display-text",
        function() {return "您的作文剩余时间(以秒计):<h2 style='color:#888888;text-shadow:0px 0px 10px;'> "+ format(player.E.zuowenTime)},
        {}],
        "blank",
        ["display-text",
        function() {return "剩余可选作文题材:<h2 style='color:#888888;text-shadow:0px 0px 10px;'> "+ player.E.ccSelected1 +" / "+tmp.E.cclim1},
        {}],
        "blank",
        ["display-text",
        function() {return "剩余可选作文风格:<h2 style='color:#888888;text-shadow:0px 0px 10px;'> "+ player.E.ccSelected2 +" / "+tmp.E.cclim2},
        {}],
        ["row",[["buyable",86]]],
        ["row",[["buyable",87]]],
        ["row",[["buyable",88],["buyable",89],["buyable",90]]],
        ["row",[["buyable",101],["buyable",102],["buyable",103]]],
        ["row",[["buyable",104],["buyable",105]]],
        ["row",[["buyable",91]]],
        ["row",[["buyable",92],["buyable",93],["buyable",94]]],
        ["row",[["buyable",109],["buyable",110],["buyable",111]]],
        ["row",[["buyable",112],["buyable",113],["buyable",185]]],
        ["row",[["buyable",95]]],
        ["row",[["buyable",97],["buyable",99]]],
        ["row",[["buyable",98]]],
        ["row",[["buyable",96]]],
        ["row",[["buyable",100]]],

    ],
    buttonStyle: {"border-color": "#888888","background-color": "#666666"},  
    style:{"background-color":"#222222"},
    unlocked(){return player.E.inZuowen.gte(1)}
},
"English":{
    content:[

    ["row",[["buyable",114],["buyable",115]]],
    ["row",[["buyable",117],["buyable",118],["buyable",119],["buyable",120],["buyable",121],["buyable",122]]],
    ["row",[["buyable",123],["buyable",124],["buyable",125],["buyable",126],["buyable",127],["buyable",128]]],
    ["row",[["buyable",129],["buyable",130],["buyable",131],["buyable",132],["buyable",133],["buyable",134]]],
    ["row",[["buyable",135],["buyable",136],["buyable",137],["buyable",138],["buyable",139],["buyable",140]]],
    ["buyable",141],
    ["row",[["buyable",142],["buyable",143],["buyable",144],["buyable",145],["buyable",146],["buyable",147]]],
    ["row",[["buyable",148],["buyable",149],["buyable",150],["buyable",151],["buyable",152],["buyable",153]]],
    ["row",[["buyable",154],["buyable",155],["buyable",156],["buyable",157],["buyable",158],["buyable",159]]],
    ["buyable",171],
    ["row",[["buyable",172],["buyable",173],["buyable",174],["buyable",175],["buyable",176],["buyable",177]]],
    ["row",[["buyable",178],["buyable",179],["buyable",180],["buyable",181],["buyable",182],["buyable",183],["buyable",184]]],
    ["buyable",186],
    ["row",[["buyable",187],["buyable",188],["buyable",189],["buyable",190],["buyable",191],["buyable",192]]],
    ["row",[["buyable",193],["buyable",194],["buyable",195],["buyable",196],["buyable",197],["buyable",198]]],
    ["row",[["buyable",199],["buyable",200],["buyable",201],["buyable",202],["buyable",203],["buyable",204]]],
    ["buyable",205],
    ["row",[["buyable",206],["buyable",207],["buyable",208],["buyable",209],["buyable",210],["buyable",211]]],
    ["buyable",212],
    ["row",[["buyable",213],["buyable",214],["buyable",215],["buyable",216],["buyable",217],["buyable",218]]],
    ["buyable",219],
    ["row",[["buyable",220],["buyable",221],["buyable",222],["buyable",223],["buyable",224],["buyable",225]]],
    ["buyable",226],
    ["row",[["buyable",227],["buyable",228],["buyable",229],["buyable",230],["buyable",231],["buyable",232]]],
    ["row",[["buyable",233],["buyable",234],["buyable",235],["buyable",236],["buyable",237],["buyable",238]]],
    ["buyable",257],
    ["buyable",258],
    
    ["buyable",116],
    
    ],
    buttonStyle: {"border-color": "#909561","background-color": "#808450"},  
    style:{"background-color":"#404230"},
    unlocked(){return player.E.inExam.gte(1)&&(player.E.inEnglish.gte(1)||player.E.completedEnglish)}
},
"Score":{
    content:[
    ["buyable",53],
    ["row",[["buyable",54],["buyable",55],["buyable",56]]],
    ["row",[["buyable",57],["buyable",58],["buyable",59]]],
    ["row",[["buyable",60],["buyable",61],["buyable",62]]],
    ["row",[["buyable",63]]],
    ["row",[["buyable",64]]],
    ["row",[["buyable",65]]],
    function(){if(!player.Exp.inChallenge) return ["row",[["buyable",66]]]},
    
],
unlocked(){return player.E.completedExam.gte(1)}
},
    },

})


addLayer("Nf", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        ach1: new Decimal(0),
        ach2: new Decimal(0)            // "points" is the internal name for the main resource of the layer.
    }},
tooltip(){return "考试策略"},
    color: "#FFFF00",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    buyables:
    {
        11: {
            title: "中文计数法",
            canAfford() { return true},
            buy() {
                
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return `将游戏内计数法改为中文计数法。`},
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
            unlocked(){return true},
            style: {
                "background-color"() {
                    if (getBuyableAmount("Nf",11).gte(1)) color = "#00FF00"
                    if (getBuyableAmount("Nf",11).lt(1)) color = "#FFFF00"
                    return color
                    
                }
            }
          },
          12: {
            title: "科学计数法",
            canAfford() { return true},
            buy() {
               setBuyableAmount("Nf",12,new Decimal(1))
               setBuyableAmount("Nf",11,new Decimal(0))
            },
            display() {return `将游戏内计数法改为科学计数法。`},
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
            unlocked(){return true},
            style: {
                "background-color"() {
                    if (getBuyableAmount("Nf",12).gte(1)) color = "#00FF00"
                    if (getBuyableAmount("Nf",12).lt(1)) color = "#FFFF00"
                    return color
                    
                }
            }
          },
          21: {
            title: "速战速决",
            canAfford() { return true},
            buy() {
                if(getBuyableAmount("Nf",22).gte(1)) player.Nf.ach1 = player.Nf.ach1.add(1)
                else player.Nf.ach1 = new Decimal(0)
                if(getBuyableAmount(this.layer,this.id).gte(1)) player.Nf.ach2 = player.Nf.ach2.add(1)
                else player.Nf.ach2 = new Decimal(0)
               setBuyableAmount("Nf",21,new Decimal(1))
               setBuyableAmount("Nf",22,new Decimal(0))
               setBuyableAmount("Nf",23,new Decimal(0))
            },
            display() {return `点击切换考试策略！<br>效果：所有答题耗时减少50%，大部分答题准确率降低30%（叠乘）`},
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
            unlocked(){return hasMilestone("C",2)},
            style: {
                "background-color"() {
                    if (getBuyableAmount("Nf",21).gte(1)) color = "#00FF00"
                    if (getBuyableAmount("Nf",21).lt(1)) color = "#FFFF00"
                    return color
                    
                }
            }
          },
          22: {
            title: "中庸迎战(默认策略)",
            canAfford() { return true},
            buy() {
                if(getBuyableAmount("Nf",21).gte(1)||getBuyableAmount("Nf",23).gte(1)) player.Nf.ach1 = player.Nf.ach1.add(1)
                else player.Nf.ach1 = new Decimal(0)
                setBuyableAmount("Nf",21,new Decimal(0))
                setBuyableAmount("Nf",22,new Decimal(1))
                setBuyableAmount("Nf",23,new Decimal(0))
            },
            display() {return `点击切换考试策略！<br>效果：无！`},
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
            unlocked(){return hasMilestone("C",2)},
            style: {
                "background-color"() {
                    if (getBuyableAmount("Nf",22).gte(1)) color = "#00FF00"
                    if (getBuyableAmount("Nf",22).lt(1)) color = "#FFFF00"
                    return color
                    
                }
            }
          },
          23: {
            title: "稳中求胜",
            canAfford() { return true},
            buy() {
                if(getBuyableAmount("Nf",22).gte(1)) player.Nf.ach1 = player.Nf.ach1.add(1)
                else player.Nf.ach1 = new Decimal(0)
                setBuyableAmount("Nf",21,new Decimal(0))
                setBuyableAmount("Nf",22,new Decimal(0))
                setBuyableAmount("Nf",23,new Decimal(1))
            },
            display() {return `点击切换考试策略！<br>效果：所有答题耗时增加100%，大部分答题准确率提升30%（叠乘）`},
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
            unlocked(){return hasMilestone("C",2)},
            style: {
                "background-color"() {
                    if (getBuyableAmount("Nf",23).gte(1)) color = "#00FF00"
                    if (getBuyableAmount("Nf",23).lt(1)) color = "#FFFF00"
                    return color
                    
                }
            }
          },
    },

    layerShown() { return !inChallenge("Exp",12) },   
           
    tabFormat:{
        "NumberFormating":{
            
content:[function() {if(hasMilestone("C",2))return ["row",[["buyable",21],["buyable",22],["buyable",23]]]},],
},
},       
    upgrades: {
         
    },
})
addLayer("A", {
    startData() { return {
        unlocked: true,
        Goals:new Decimal(0)
    }},
    symbol()
    {
return "A<sup>"+player.A.Goals+"</sup>"
    },
    color: "red",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("成就")
    },
    
    achievements: {
        11: {
            name: "从无到有",
            done() { return player.E.bestPoints.gte(1) }
        ,
        image() { if (hasAchievement('A',11)) return "https://i.postimg.cc/FRYfwHkj/ach1.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "在中考中获得1分。",
        },
        12: {
            name: "100个语文知识很多了！",
            done() { return player.C.points.gte(100) }
        ,
        image() { if (hasAchievement('A', 12)) return "https://i.postimg.cc/TY6wJ90j/ach2.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "获得100语文知识。",
        },
        13: {
            name: "经验带来动力",
            done() { return hasUpgrade("C",15) }
        ,
        image() { if (hasAchievement('A', 13)) return "https://i.postimg.cc/C5Whn4PQ/612c85f159772ba245b4a74dcbb7be8d4e7d621b.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "购买“语文经验”。",
        },
        14: {
            name: "入“目”三分",
            done() { return player.E.bestPoints.gte(3) }
        ,
        image() { if (hasAchievement('A', 14)) return "https://i.postimg.cc/kX6DM21H/f96994469f2fff09f3fcd1745b67a55d0baaa3ee.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "在中考中获得3分。",
        },
        15: {
            name: "百年中国梦",
            done() { return player.E.year.gte(2050) }
        ,
        image() { if (hasAchievement('A', 15)) return "https://i.postimg.cc/tJ1Rgc56/f4377aecedd421a92cd2fd04c1ab703da8fe6579.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "时间到达2050年。",
        },
        16: {
            name: "天赋萌新",
            done() { return player.Exp.pp.gte(15) }
        ,
        image() { if (hasAchievement('A', 16)) return "https://i.postimg.cc/Qdct5Rrk/8f0ac114d9f8600634246f0279b72b1fa377f92c.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "拥有15个天赋点数。",
        },
        17: {
            name: "十全十美",
            done() { return player.C.totalGold.gte(10) }
        ,
        image() { if (hasAchievement('A', 17)) return "https://i.postimg.cc/Ls8J0KF1/d8c088f1b1c2b8aa7e9074ad45350cb05eee77ea.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "拥有10个金句摘抄。",
        },
        21: {
            name: "勉强能看...",
            done() { return player.E.ccPoints.gte(10000) }
        ,
        image() { if (hasAchievement('A', 21)) return "https://i.postimg.cc/7hw8m4pv/b5a5eaa1274a2069c2d9f042177ed67ec9bebba3.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "作文最佳质量达到10000。",
        },
        22: {
            name: "书是全世界的营养品 I",
            done() { return player.C.tier.gte(1)}

        ,
        image() { if (hasAchievement('A', 22)) return "https://i.postimg.cc/xCQ4SRgM/9a5425e16101a4a0d3098e32f684d1fe06280c68.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "名著等级达到1。",
        },
        23: {
            name: "∞",
            done() { return player.C.points.gte("1.8e308")}
        ,
        image() { if (hasAchievement('A', 23)) return "https://i.postimg.cc/xCQ4SRgM/9a5425e16101a4a0d3098e32f684d1fe06280c68.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "拥有 1.8e308 语文知识。",
        },
        24: {
            name: "初窥门径",
            done() { return player.E.ccPoints.gte(50000)}
        ,
        image() { if (hasAchievement('A', 24)) return "https://i.postimg.cc/xCQ4SRgM/9a5425e16101a4a0d3098e32f684d1fe06280c68.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "作文最佳质量达到50000。",
        },
        25: {
            name: "三十而立",
            done() { return player.E.bestPoints.gte(30)}
        ,
        image() { if (hasAchievement('A', 25)) return "https://i.postimg.cc/fbS3Y44j/9fc258d823aace2276bef88e96b22b139ff3bef3.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "最佳中考分数达到30。<br>奖励：因为你卓越的学习能力，你的E层级图标变得更酷！",
        },
        26: {
            name: "他们组成一棵树了？？？",
            done() { return getBuyableAmount("Exp",59).gte(1)&&getBuyableAmount("Exp",60).gte(1)}
        ,
        image() { if (hasAchievement('A', 26)) return "https://i.postimg.cc/wB5pCFDY/ed17e04aa4adae7c39e099137eaee004533b28d7.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "购买天赋树第3行的全部研究。",
        },
        27: {
            name: "书是全世界的营养品 II",
            done() { return player.C.tier.gte(4)}
        ,
        image() { if (hasAchievement('A', 27)) return "https://i.postimg.cc/8P8Vzqwg/3f06ebf815bae9b6fbba61a70491b1f5dc6af128.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "名著等级达到4。",
        },
        31: {
            name: "进展开始！（英语）",
            done() { return player.Eng.points.gte(1) }
        ,
        image() { if (hasAchievement('A', 31)) return "https://i.postimg.cc/3wxsq7rm/9c93b8f6be49a6a80e516db426ac971f05d25db3.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "拥有1个英语语法。",
        },
        32: {
            name: "书是全世界的营养品 III",
            done() { return player.C.tier.gte(6)}
        ,
        image() { if (hasAchievement('A', 32)) return "https://i.postimg.cc/4NGFMZBy/f84d39bb0675dae07aa0df5822fc9bb500189e1a.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "名著等级达到6。",
        },
        33: {
            name: "∞^2",
            done() { return player.C.points.gte("3.6e616")}
        ,
        image() { if (hasAchievement('A', 33)) return "https://i.postimg.cc/9QM15fTm/8ae98aeb2ec16fe3e2a6ec56a3eddadc2d3fdc25.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "拥有 3.6e616 语文知识。",
        },
        34: {
            name: "小学满分作文",
            done() { return player.E.ccPoints.gte(500000)}
        ,
        image() { if (hasAchievement('A', 34)) return "https://i.postimg.cc/zGshtDFP/976ef5bb43230ea3b7b9d644fd31997a6d58e732.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "作文最佳质量达到500000。",
        },
        35: {
            name: "六十而耳顺",
            done() { return player.E.bestPoints.gte(60)}
        ,
        image() { if (hasAchievement('A', 35)) return "https://i.postimg.cc/wTS3HfR1/0e219c871833472c24a71cd5e24180416f216cc7.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "最佳中考分数达到60。<br>奖励：因为你卓越的学习能力，你的E层级图标再次变得更酷！",
        },
        36: {
            name: "英语之力",
            done() { return new Decimal(player.Eng.upgrades.length).gte(1)}
        ,
        image() { if (hasAchievement('A', 36)) return "https://i.postimg.cc/QdGNvFv5/31b3c0bac75941c0d14701df1f7c1d7e145dc717.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "购买1个英语网格节点",
        },
        37: {
            name: "Nice.",
            done() { return player.E.bestPoints.gte(69)}
        ,
        image() { if (hasAchievement('A', 37)) return "https://i.postimg.cc/43wJKByb/96220105cd95aeba6e4ed8e07653429b5bdd6ada.png" },
        style: { "background-size": "100% 100%", "background-position": "center center"},
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "最高中考分数达到69。",
        },
        41: {
            name: "红 十 字 基 金 会",
            done() { return player.Eng.upgrades.length == 5&&hasUpgrade("Eng",12)&&hasUpgrade("Eng",21)&&hasUpgrade("Eng",22)&&hasUpgrade("Eng",23)&&hasUpgrade("Eng",32)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "这是一个特殊成就！<br>获得方法提示：3x3英语网格",
        },
        42: {
            name: "黄 金 替 身",
            done() { return player.E.name == 'Lixiaohan'&&player.E.completedExam.gte(1)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "让作者帮你替考！<br>获得方法提示：中考树目前版本有个地方和之前版本大相径庭，想想是哪里？",
        },
        43: {
            name: "愚人节vol.1",
            done() { return player.Nf.ach1.gte(12)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "醒醒！还有4个月呢！<br>获得方法提示：中考树里面有什么地方和某个用爱发电的音游难度选择界面很相似？现在用这个地方解锁下某个14.7的SP吧！",
        },
        44: {
            name: "愚人节vol.2",
            done() { return player.Nf.ach2.gte(12)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "玩嗨了是吧？<br>获得方法提示：还是上个成就的那个地方，但是这次改成某个14.4的SP。",
        },
        45: {
            name: "日不落帝国",
            done() { return player.Eng.upgrades.length == 17&&hasUpgrade("Eng",11)&&hasUpgrade("Eng",13)&&hasUpgrade("Eng",15)&&hasUpgrade("Eng",22)&&hasUpgrade("Eng",23)&&hasUpgrade("Eng",24)&&hasUpgrade("Eng",31)&&hasUpgrade("Eng",32)&&hasUpgrade("Eng",33)&&hasUpgrade("Eng",34)&&hasUpgrade("Eng",35)&&hasUpgrade("Eng",42)&&hasUpgrade("Eng",43)&&hasUpgrade("Eng",44)&&hasUpgrade("Eng",51)&&hasUpgrade("Eng",53)&&hasUpgrade("Eng",55)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "梦幻联动！<br>获得方法提示：Arctree有个和英语网格很相似的地方，点满之前最后一个有4条对称轴的图形长什么样？把这个图形复制到英语网格左上角！",
        },
        46: {
            name: "魔王曲",
            done() { return player.Eng.upgrades.length == 5&&hasUpgrade("Eng",68)&&hasUpgrade("Eng",84)&&hasUpgrade("Eng",77)&&hasUpgrade("Eng",87)&&hasUpgrade("Eng",85)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "要素察觉<br>获得方法提示：IN 15.5，IN 12.9，Beyond 11.4，AT 16.4，AT 16.8。",
        },
        47: {
            name: "学霸题",
            done() { return player.Eng.upgrades.length == 20&&hasUpgrade("Eng",11)&&hasUpgrade("Eng",12)&&hasUpgrade("Eng",16)&&hasUpgrade("Eng",17)&&hasUpgrade("Eng",18)&&hasUpgrade("Eng",21)&&hasUpgrade("Eng",22)&&hasUpgrade("Eng",23)&&hasUpgrade("Eng",26)&&hasUpgrade("Eng",27)&&hasUpgrade("Eng",28)&&hasUpgrade("Eng",31)&&hasUpgrade("Eng",32)&&hasUpgrade("Eng",33)&&hasUpgrade("Eng",61)&&hasUpgrade("Eng",62)&&hasUpgrade("Eng",71)&&hasUpgrade("Eng",72)&&hasUpgrade("Eng",81)&&hasUpgrade("Eng",82)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "学霸才能看懂！<br>获得方法提示：学霸题，数正方体！八乘八网格，左上正视图，右上俯视图，左下侧视图，你学会了吗？",
        },
        51: {
            name: "中学生下等作文",
            done() { return player.E.ccPoints.gte(1000000)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "最佳作文质量达到1000000.",
        },
        52: {
            name: "再见天赋技能...",
            done() { return hasMilestone("E",22)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "让你的所有天赋技能效果都不再受到其等级的影响。",
        },
        53: {
            name: "及格万岁！",
            done() { return player.C.points.gte(72)&&player.E.completedExam.gte(1)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "在任意一门学科中取得及格的成绩！",
        },
        54: {
            name: "不入虎穴，焉得虎子",
            done() { return player.Exp.bought70}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "解锁挑战。",
        },
        55: {
            name: "挑战，就这？",
            done() { return tmp.Exp.totalChallenges.gte(1)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "完成1次经验挑战。",
        },
        56: {
            name: "梅开二度",
            done() { return tmp.Exp.totalChallenges.gte(2)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "完成2次经验挑战。",
        },
        57: {
            name: "感觉像棋盘？",
            done() { return hasMilestone("Eng",11)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "英语网格体量达到6x6。",
        },
        61: {
            name: "榜上有名！",
            done() { return player.E.points.gte(150)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "第一次通过中考被职高录取。奖励：E层图标的样式再次升级！",
        },
        62: {
            name: "有条不紊",
            done() { return hasChallenge("Exp",12)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "首次完成经验挑战2.",
        },
        63: {
            name: "灵感迸发",
            done() { return hasMilestone("C",9)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "解锁作文灵感。",
        },
        64: {
            name: "有点...微妙的作文？",
            done() { return player.E.zuowenTime.lte(0)&&(player.E.luoji.lt(0)||player.E.wenbi.lt(0)||player.E.sixiang.lt(0)||player.E.xiangxiang.lt(0))}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "完成作文后，任意一项作文属性低于0.",
        },
        65: {
            name: "更加微妙的作文...",
            done() { return player.E.zuowenTime.lte(0)&&(player.E.inZuowen.gte(1))&&(player.E.startedZuowen.gte(1))&&(player.E.completedZuowen.gte(1))&&(player.E.luoji.gte(player.E.ccPoints)||player.E.wenbi.gte(player.E.ccPoints)||player.E.sixiang.gte(player.E.ccPoints)||player.E.xiangxiang.gte(player.E.ccPoints))}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "完成作文后，任意一项作文属性高于作文总质量.",
        },
        66: {
            name: "双 重 叠 加",
            done() { return hasUpgrade("Eng",12)&&hasUpgrade("Eng",42)&&hasUpgrade("Eng",72)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "让你的EngK1受到双重指数的加成.",
        },
        67: {
            name: "时间管理大师",
            done() { return new Decimal(challengeCompletions("Exp",11)).gte(5)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "完成5次经验挑战1.",
        },
        71: {
            name: "抬升及格率",
            done() { return player.E.Chinese.gte(72)&&player.E.English.gte(72)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "在任意两门学科中取得及格的成绩。",
        },
        72: {
            name: "不再挣扎，不再苦熬",
            done() { return new Decimal(challengeCompletions("Exp",21)).gte(2)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "完成2次经验挑战3.",
        },
        73: {
            name: "终极网格",
            done() { return hasMilestone("Eng",16)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "英语网格体量达到8x8.",
        },
        74: {
            name: "中学生平均作文水平",
            done() { return player.E.ccPoints.gte(10000000)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "作文质量达到10000000.",
        },
        75: {
            name: "十个也一样",
            done() { return tmp.Exp.totalChallenges.gte(10)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "总共完成10次经验挑战。",
        },
        76: {
            name: "上佳好文",
            done() { return player.E.ccPoints.gte(50000000)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "作文质量达到50000000.",
        },
        77: {
            name: "千词王",
            done() { return player.Eng.totalpp.gte(2000)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "英语词汇量达到2000.",
        },
        81: {
            name: "优秀学子",
            done() { return player.E.Chinese.gte(96)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "在任意一门学科中取得优秀的成绩。",
        },
        82: {
            name: "双喜临门",
            done() { return player.E.Chinese.gte(96)&&player.E.English.gte(96)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "在任意两门学科中取得优秀的成绩。",
        },
        83: {
            name: "超越作者 I",
            done() { return player.E.Chinese.gte(98)}
        ,
        onComplete() { player.A.Goals = player.A.Goals.add(1) },
            tooltip: "任意一门学科的成绩超过本游戏作者。",
        },

        
    },
    infoboxes: {
        1: {
                title(){return "第0幕-觉醒"},
                body(){
                        let a = "你是一名9年级14班的吊车尾中学生，平常无论大小考，成绩稳居班内89名——倒数第一，上课从不听讲，专业摸鱼九年。<br>"
                        let b = "从小学1年级第一次接触学校生活以来，从不听讲，作业一次都未完成过，你的实力也不允许你完成任何一次作业。<br>"
                        let c = "你的学习水平至今依旧停留在一年级上学期水平，和文盲别无两样，堪称九年义务教育的漏网之鱼。<br>"
                        let d = "直到9年级下学期的中考百日誓师，你觉醒了。<br>"
                        let e = "你开始羡慕上了进入市三所的学长学姐们，于是开始发奋图强，从小学一年级的知识开始，一步步精进自己的知识水平。<br>"
                        let f = "你决定先从最简单的语文开始，并且给自己定了个小目标——中考一模成绩达到班里87名！(此剧情将会随着游戏进度一步步推进)<br>"
                        g = ""
                        if(hasMilestone("C",11)) g =""
                        return a + b + c + d + e + f + g
                },
                style() { return {borderColor: "#888888",}},
                titleStyle() { return {backgroundColor: "#888888",color: "#FFFFFF"}},
        },
        2: {
            title(){return "第1幕-写作之路&初露锋芒"},
            body(){
                    let a = "在那年的中考一模中，你果然不负家长和老师的希望，排到了班里的86名！<br>"
                    let b = "你的希望之火愈烧愈烈了，坚信着自己能够在班里的排行榜上越走越前。<br>"
                    let c = "你开始看上了语文试卷的最后一题——作文。<br>"
                    let d = "你虽然智力水平不佳，但是很快就学会了作文的基本要领，写出了人生中第一篇作文。<br>"
                    let e = "你开始喜欢上习作的感觉，写作的感受是千丝万缕的。“剪不断,理还乱。是 ‘快乐’,别有一番滋味在心头”。它也带给你了源源不断地成就感与文化自信。<br>"
                    let f = "掌握了写作之力的你，学习成绩又能够攀上怎样的台阶呢？<br>"
                    g = ""
                    if(hasMilestone("C",11)) g =""
                    return a + b + c + d + e + f + g
            },
            style() { return {borderColor: "#888888",}},
            titleStyle() { return {backgroundColor: "#888888",color: "#FFFFFF"}},
    },
    3: {
        title(){return "第2幕-初识英语"},
        body(){
                let a = "你的学习成绩在写作之力的加持下继续突飞猛进，作文也越写越好。<br>"
                let b = "你在学习语文的道路上逐渐感到枯燥了，决定开始学习英语。<br>"
                let c = "你逐渐掌握了基本的英语语法。<br>"
                let d = "你的词汇量也开始不断突破，并且在短短几个月内就突破了100！<br>"
                let e = "英语成绩也实现了0的突破。<br>"
                let f = "原本身为班里垫底的你，逐渐受到了各科老师的重视！你的威望提高了！<br>"
                g = ""
                if(hasMilestone("C",11)) g =""
                return a + b + c + d + e + f + g
        },
        style() { return {borderColor: "#888888",}},
        titleStyle() { return {backgroundColor: "#888888",color: "#FFFFFF"}},
},
4: {
    title(){return "第3幕-精进英语"},
    body(){
            let a = "英语这门学科对你有了越来越强的吸引力。<br>"
            let b = "语态、词性、时态的变化，也越来越令你着迷。你开始喜欢上了英语这门学科。<br>"
            let c = "你掌握了一般现在时、冠词、一般过去时、人称代词、三单等基本的语法...<br>"
            let d = "词汇量也稳步提升。<br>"
            let e = "语文和英语两门学科双管齐下，你的成绩继续突飞猛进。<br>"
            let f = "你脱离了班内的倒数10名，成功脱离了差生的行列！<br>"
            g = ""
            if(hasMilestone("C",11)) g =""
            return a + b + c + d + e + f + g
    },
    style() { return {borderColor: "#888888",}},
    titleStyle() { return {backgroundColor: "#888888",color: "#FFFFFF"}},
},
6: {
    title(){return "第4幕-副课代表"},
    body(){
            let a = "在挑战与英语网格的加持之下，你的语文和英语成绩突破了及格线，一步步向着优秀线迈去。<br>"
            let b = "你的语文成绩逐渐受到了语文老师的重视，开始担任副课代表一职。<br>"
            let c = "虽然职位不高，但是相比你之前的过往经历，已经是从地狱到天堂了。<br>"
            let d = "你学会了与同学，老师友善相处，帮助老师分担工作，同时兼顾学业。<br>"
            let e = "自己语文作文已经偶尔几次在班里被当作范文朗读，英语的阅读理解也能看懂大半，甚至可以偶尔讲讲文章大意！<br>"
            let f = "你正在向班里的第70名学生看齐，认为自己的学习方法和学习习惯与他已经是伯仲之间，正在每次的考试中寻找超越他的机会。<br>"
            g = ""
            if(hasMilestone("C",11)) g =""
            return a + b + c + d + e + f + g
    },
    style() { return {borderColor: "#888888",}},
    titleStyle() { return {backgroundColor: "#888888",color: "#FFFFFF"}},
},
5: {
    title(){return "第1.8e308幕-特殊成就"},
    body(){
            let a = "目前共有7个特殊成就。<br>"
            let b = "特殊成就计入成就总数，但不提供任何加成。<br>"
            let c = "特殊成就不会显示完成的具体方法，但是会有完成方法的提示。<br>"
            let d = "下个版本更新后，将会揭晓所有特殊成就的达成方法！<br>"
            return a + b + c + d
    },
    style() { return {borderColor: "#FFFF00",}},
    titleStyle() { return {backgroundColor: "#FFFF00",color: "#000000"}},
},
    },
    tooltip(){return '已完成成就：' + player.A.Goals + ' / 21<h2>'},
    
    tabFormat:{
        "Awaken":{
            content:[ "main-display",
            "prestige-button",
            
        ["bar", "NextCD"],
        ["infobox",1],
        ["display-text",
        function() {return '已完成成就：<h2 style=color:red;text-shadow:0px 0px 10px;>' + player.A.Goals + '<h2>'},
            {}],
        "challenges",
        ["row",[["achievement",11],["achievement",12],["achievement",13],["achievement",14],["achievement",15],["achievement",16],["achievement",17],]],
    "grid",

"blank",
"upgrades",
"milestones",
"buyables",

"blank",
, "blank", "blank", ],
buttonStyle: {"border-color": "#888888"},
},
"Writing":{
    content:[ "main-display",
    "prestige-button",
    
["bar", "NextCD"],
["infobox",2],
["display-text",
function() {return '已完成成就：<h2 style=color:red;text-shadow:0px 0px 10px;>' + player.A.Goals + '<h2>'},
    {}],
"challenges",
["row",[["achievement",21],["achievement",22],["achievement",23],["achievement",24],["achievement",25],["achievement",26],["achievement",27],]],
"grid",

"blank",
"upgrades",
"milestones",
"buyables",

"blank",
, "blank", "blank", ],
buttonStyle: {"border-color": "#888888","background-color": "#222222"},
unlocked(){return hasMilestone("E",10)}
},
"EnglishStarting":{
    content:[ "main-display",
    "prestige-button",
    
["bar", "NextCD"],
["infobox",3],
["display-text",
function() {return '已完成成就：<h2 style=color:red;text-shadow:0px 0px 10px;>' + player.A.Goals + '<h2>'},
    {}],
"challenges",
["row",[["achievement",31],["achievement",32],["achievement",33],["achievement",34],["achievement",35],["achievement",36],["achievement",37],]],
"grid",

"blank",
"upgrades",
"milestones",
"buyables",

"blank",
, "blank", "blank", ],
buttonStyle: {"border-color": "#888888","background-color": "#333333"},
unlocked(){return hasMilestone("E",18)}
},
"BasicEnglish":{
    content:[ "main-display",
    "prestige-button",
    
["bar", "NextCD"],
["infobox",4],
["display-text",
function() {return '已完成成就：<h2 style=color:red;text-shadow:0px 0px 10px;>' + player.A.Goals + '<h2>'},
    {}],
"challenges",
["row",[["achievement",51],["achievement",52],["achievement",53],["achievement",54],["achievement",55],["achievement",56],["achievement",57],]],
"grid",

"blank",
"upgrades",
"milestones",
"buyables",

"blank",
, "blank", "blank", ],
buttonStyle: {"border-color": "#888888","background-color": "#444444"},
unlocked(){return player.E.bestPoints.gte(69)}
},
"Sub-ClassRepresentative":{
    content:[ "main-display",
    "prestige-button",
    
["bar", "NextCD"],
["infobox",6],
["display-text",
function() {return '已完成成就：<h2 style=color:red;text-shadow:0px 0px 10px;>' + player.A.Goals + '<h2>'},
    {}],
"challenges",
["row",[["achievement",61],["achievement",62],["achievement",63],["achievement",64],["achievement",65],["achievement",66],["achievement",67],]],
["row",[["achievement",71],["achievement",72],["achievement",73],["achievement",74],["achievement",75],["achievement",76],["achievement",77],]],
["row",[["achievement",81],["achievement",82],["achievement",83]]],
"grid",

"blank",
"upgrades",
"milestones",
"buyables",

"blank",
, "blank", "blank", ],
buttonStyle: {"border-color": "#888888","background-color": "#666666"},
unlocked(){return hasAchievement("A",57)}
},
"Special":{
    content:[ "main-display",
    "prestige-button",
    
["bar", "NextCD"],
["infobox",5],
["display-text",
function() {return '已完成成就：<h2 style=color:red;text-shadow:0px 0px 10px;>' + player.A.Goals + '<h2>'},
    {}],
"challenges",
["row",[["achievement",41],["achievement",42],["achievement",43],["achievement",44],["achievement",45],["achievement",46],["achievement",47],]],
"grid",

"blank",
"upgrades",
"milestones",
"buyables",

"blank",
, "blank", "blank", ],
buttonStyle: {"border-color": "#FFFF00","background-color": "#888800"},
style:{"color":"#FFFFFF"},
unlocked(){return true}
},},



})
addLayer("Eng", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        power: new Decimal(0),
        pp: new Decimal(0),
        totalpp: new Decimal(0),
        readingPoints: new Decimal(0),
        time: new Decimal(0),
        reading: false,

                     // "points" is the internal name for the main resource of the layer.
    }},

    color: "#909561",                       // The color for this layer, which affects many elements.
    resource: "英语语法",            // The name of this layer's main prestige resource.
    row: 0,  
    position: 1,                               // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,   
    readeff()
    {
let eff = new Decimal(Math.sin(player.Eng.time)).add(2)
return eff    },                     // "normal" prestige gain is (currency^exponent).
upgrades:{
    11: {
        title: "<h1>R1",
        cost(){return new Decimal(6)},
        effect(){ let eff = buyableEffect("Exp",58).sqrt().log2().pow(tmp.Eng.gridEffect).max(1)
        return eff
        },
        currencyDisplayName: "英语单词",
        currencyInternalName: "pp",
        currencyLayer: "Eng",
        tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 I】<h4><h4>效果：Chinese-22以削弱的效果提升阅读感悟获取。<br>当前：x"+format(this.effect())},
        unlocked(){return player.Exp.bought63},
        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
        },
        21: {
            title: "<h1>R2",
            cost(){return new Decimal(11)},
            effect(){ let eff = buyableEffect("Exp",62).pow(1.5).pow(tmp.Eng.gridEffect)
            if(hasMilestone("E",19)) eff = eff.pow(2)
            return eff
            },
            currencyDisplayName: "英语单词",
            currencyInternalName: "pp",
            currencyLayer: "Eng",
            tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 II】<h4><h4>效果：Chinese-41同样生效于阅读感悟获取。<br>当前：x"+format(this.effect())},
            unlocked(){return hasMilestone("Eng",2)},
            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
            },
            12: {
                title: "<h1>EngK1",
                cost(){return new Decimal(8)},
                effect(){ let eff = player.Eng.points.pow(3).add(10).min(5000).pow(tmp.Eng.gridEffect)
                    if(hasUpgrade("Eng",42)) eff = eff.pow(upgradeEffect("Eng",42))
                    if(hasUpgrade("Eng",72)) eff = eff.pow(upgradeEffect("Eng",72))
                return eff
                },
                currencyDisplayName: "英语单词",
                currencyInternalName: "pp",
                currencyLayer: "Eng",
                tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 I】<h4><h4>效果：基于英语语法的数量，降低英语单词的获取阈值。<br>当前：/"+format(this.effect())},
                unlocked(){return hasMilestone("Eng",2)},
                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                },
                22: {
                    title: "<h1>EngK2",
                    cost(){return new Decimal(10)},
                    effect(){ let eff = buyableEffect("Exp",57).pow(tmp.Eng.gridEffect)
                    return eff
                    },
                    currencyDisplayName: "英语单词",
                    currencyInternalName: "pp",
                    currencyLayer: "Eng",
                    tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 II】<h4><h4>效果：天赋技能5效应同样生效于英语知识。<br>当前：x"+format(this.effect())},
                    unlocked(){return hasMilestone("Eng",2)},
                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                    },
                    31: {
                        title: "<h1>R3",
                        cost(){return new Decimal(20)},
                        effect(){ let eff = player.A.Goals.min(21).pow(4).pow(tmp.Eng.gridEffect)
                        return eff
                        },
                        currencyDisplayName: "英语单词",
                        currencyInternalName: "pp",
                        currencyLayer: "Eng",
                        tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 III】<h4><h4>效果：已完成的成就数量(最大为21)以大大增加的倍率倍增阅读感悟获取。<br>当前：x"+format(this.effect())},
                        unlocked(){return hasMilestone("E",18)},
                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
                        },
                        32: {
                            title: "<h1>EngK3",
                            cost(){return new Decimal(15)},
                            effect(){ let eff = new Decimal(10000).pow(new Decimal(player.Eng.upgrades.length)).pow(tmp.Eng.gridEffect).min(1e70)
                                if(getBuyableAmount("Exp",71).gte(1)) eff = eff.pow(tmp.Eng.gridEffect)
                            return eff
                            },
                            currencyDisplayName: "英语单词",
                            currencyInternalName: "pp",
                            currencyLayer: "Eng",
                            tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 III】<h4><h4>效果：已购买英语网格节点的总数目倍增英语知识获取。<br>当前：x"+format(this.effect())},
                            unlocked(){return hasMilestone("E",18)},
                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                            },
                            13: {
                                title: "<h1>P1",
                                cost(){return new Decimal(3)},
                                effect(){ let eff = player.E.bestPoints.div(5000)
                                    if(hasMilestone("Eng",13)) eff = eff.mul(2)
                                return eff
                                },
                                currencyDisplayName: "英语单词",
                                currencyInternalName: "pp",
                                currencyLayer: "Eng",
                                tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 I】<h4><h4>效果：中考最佳分数以被极度削弱的效果提升英语网格力量。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                unlocked(){return hasMilestone("E",18)},
                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                },
                                23: {
                                    title: "<h1>P2",
                                    cost(){return new Decimal(6)},
                                    effect(){ let eff = player.Exp.treepp.div(4000).min(0.13)
                                    return eff
                                    },
                                    currencyDisplayName: "英语单词",
                                    currencyInternalName: "pp",
                                    currencyLayer: "Eng",
                                    tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 II】<h4><h4>效果：花费在天赋树上的天赋点数以被削弱的效果提升英语网格力量。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                    unlocked(){return hasMilestone("E",18)},
                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                    },
                                    33: {
                                        title: "<h1>P3",
                                        cost(){return new Decimal(9)},
                                        effect(){ let eff = player.E.year.sub(2022).cbrt().div(150).min(0.038)
                                        return eff
                                        },
                                        currencyDisplayName: "英语单词",
                                        currencyInternalName: "pp",
                                        currencyLayer: "Eng",
                                        tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 III】<h4><h4>效果：总考试次数提升英语网格力量。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                        unlocked(){return hasMilestone("E",18)},
                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                        },
                                        41: {
                                            title: "<h1>R4",
                                            cost(){return new Decimal(40)},
                                            effect(){ let eff = tmp.Exp.effect.log2().pow(3).pow(tmp.Eng.gridEffect).min(1e13)
                                                if(getBuyableAmount("Exp",73).gte(1)) eff = eff.pow(tmp.Eng.gridEffect)
                                            return eff
                                            },
                                            currencyDisplayName: "英语单词",
                                            currencyInternalName: "pp",
                                            currencyLayer: "Eng",
                                            tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 IV】<h4><h4>效果：经验效应同样适用于阅读感悟获取速度，只是效果倍率降低。<br>当前：x"+format(this.effect())},
                                            unlocked(){return hasMilestone("Eng",7)},
                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
                                            },
                                            42: {
                                                title: "<h1>EngK4",
                                                cost(){return new Decimal(35)},
                                                effect(){ let eff = new Decimal(5).pow(tmp.Eng.gridEffect)
                                                return eff
                                                },
                                                currencyDisplayName: "英语单词",
                                                currencyInternalName: "pp",
                                                currencyLayer: "Eng",
                                                tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 IV】<h4><h4>效果：EngK1的效果提升至一个指数。<br>当前：^"+format(this.effect())},
                                                unlocked(){return hasMilestone("Eng",7)},
                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                                                },
                                                43: {
                                                    title: "<h1>P4",
                                                    cost(){return new Decimal(12)},
                                                    effect(){ let eff = new Decimal(0.05)
                                                        if(hasChallenge("Exp",12)) eff = eff.mul(2)
                                                    return eff
                                                    },
                                                    currencyDisplayName: "英语单词",
                                                    currencyInternalName: "pp",
                                                    currencyLayer: "Eng",
                                                    tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 IV】<h4><h4>效果：一个静态的英语网格力量加成。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                                    unlocked(){return hasMilestone("Eng",7)},
                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                                    },
                                                    14: {
                                                        title: "<h1>Exp1",
                                                        cost(){return new Decimal(4)},
                                                        effect(){ let eff = player.C.tier.add(1).pow(tmp.Eng.gridEffect)
                                                        return eff
                                                        },
                                                        currencyDisplayName: "英语单词",
                                                        currencyInternalName: "pp",
                                                        currencyLayer: "Eng",
                                                        tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 I】<h4><h4>效果：经验获取提升名著阶层倍。<br>当前：x"+format(this.effect())},
                                                        unlocked(){return hasMilestone("Eng",7)},
                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                        },
                                                        24: {
                                                            title: "<h1>Exp2",
                                                            cost(){return new Decimal(8)},
                                                            effect(){ let eff = player.E.ccBest.add(1).pow(tmp.Eng.gridEffect)
                                                            return eff
                                                            },
                                                            currencyDisplayName: "英语单词",
                                                            currencyInternalName: "pp",
                                                            currencyLayer: "Eng",
                                                            tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 II】<h4><h4>效果：作文最高分数倍增经验获取。<br>当前：x"+format(this.effect())},
                                                            unlocked(){return hasMilestone("Eng",7)},
                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                            },
                                                            34: {
                                                                title: "<h1>Exp3",
                                                                cost(){return new Decimal(12)},
                                                                effect(){ let eff = player.Exp.level.pow(1.3).pow(tmp.Eng.gridEffect)
                                                                return eff
                                                                },
                                                                currencyDisplayName: "英语单词",
                                                                currencyInternalName: "pp",
                                                                currencyLayer: "Eng",
                                                                tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 III】<h4><h4>效果：经验等级倍增经验获取。<br>当前：x"+format(this.effect())},
                                                                unlocked(){return hasMilestone("Eng",7)},
                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                },
                                                                44: {
                                                                    title: "<h1>Exp4",
                                                                    cost(){return new Decimal(16)},
                                                                    effect(){ let eff = player.points.log10().pow(tmp.Eng.gridEffect)
                                                                        if(hasChallenge("Exp",11)) eff = eff.pow(2)
                                                                    return eff
                                                                    },
                                                                    currencyDisplayName: "英语单词",
                                                                    currencyInternalName: "pp",
                                                                    currencyLayer: "Eng",
                                                                    tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 IV】<h4><h4>效果：学分提升经验获取。<br>当前：x"+format(this.effect())},
                                                                    unlocked(){return hasMilestone("Eng",7)},
                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                    },
                                                                    51: {
                                                                        title: "<h1>R5",
                                                                        cost(){return new Decimal(70)},
                                                                        effect(){ let eff = player.C.readingPoints.pow(0.17).pow(tmp.Eng.gridEffect).min(1e16)
                                                                            if(getBuyableAmount("Exp",73).gte(1)) eff = eff.pow(tmp.Eng.gridEffect)
                                                                        return eff
                                                                        },
                                                                        currencyDisplayName: "英语单词",
                                                                        currencyInternalName: "pp",
                                                                        currencyLayer: "Eng",
                                                                        tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 V】<h4><h4>效果：阅读感悟提升自身，在较高数值时达到上限。<br>当前：x"+format(this.effect())},
                                                                        unlocked(){return hasMilestone("Eng",9)},
                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                        },
                                                                        52: {
                                                                            title: "<h1>EngK5",
                                                                            cost(){return new Decimal(50)},
                                                                            effect(){ let eff = player.C.readingPoints.pow(0.4).pow(tmp.Eng.gridEffect).min(1e90)
                                                                            return eff
                                                                            },
                                                                            currencyDisplayName: "英语单词",
                                                                            currencyInternalName: "pp",
                                                                            currencyLayer: "Eng",
                                                                            tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 V】<h4><h4>效果：阅读感悟提升英语知识获取。<br>当前：x"+format(this.effect())},
                                                                            unlocked(){return hasMilestone("Eng",9)},
                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                            },
                                                                            53: {
                                                                                title: "<h1>P5",
                                                                                cost(){return new Decimal(20)},
                                                                                effect(){ let eff = new Decimal(0.075)
                                                                                return eff
                                                                                },
                                                                                currencyDisplayName: "英语单词",
                                                                                currencyInternalName: "pp",
                                                                                currencyLayer: "Eng",
                                                                                tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 V】<h4><h4>效果：一个静态的英语网格力量加成。效果比上一个加成强。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                                                                unlocked(){return hasMilestone("Eng",9)},
                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                },
                                                                                54: {
                                                                                    title: "<h1>Exp5",
                                                                                    cost(){return new Decimal(30)},
                                                                                    effect(){ let eff = player.C.points.log10().pow(tmp.Eng.gridEffect)
                                                                                        if(hasMilestone("E",23)) eff = eff.pow(2)
                                                                                    return eff
                                                                                    },
                                                                                    currencyDisplayName: "英语单词",
                                                                                    currencyInternalName: "pp",
                                                                                    currencyLayer: "Eng",
                                                                                    tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 V】<h4><h4>效果：语文知识提升经验获取。<br>当前：x"+format(this.effect())},
                                                                                    unlocked(){return hasMilestone("Eng",9)},
                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                    },
                                                                                    15: {
                                                                                        title: "<h1>C1",
                                                                                        cost(){return new Decimal(10)},
                                                                                        effect(){ let eff = player.Eng.totalpp.pow(10).pow(tmp.Eng.gridEffect)
                                                                                        return eff
                                                                                        },
                                                                                        currencyDisplayName: "英语单词",
                                                                                        currencyInternalName: "pp",
                                                                                        currencyLayer: "Eng",
                                                                                        canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                        tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 I】<h4><h4>效果：总英语单词数目提升语文知识获取。<br>当前：x"+format(this.effect())},
                                                                                        unlocked(){return hasMilestone("Eng",9)},
                                                                                        pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                        },
                                                                                        25: {
                                                                                            title: "<h1>C2",
                                                                                            cost(){return new Decimal(25)},
                                                                                            effect(){ let eff = player.Exp.points.pow(tmp.Eng.gridEffect)
                                                                                            return eff
                                                                                            },
                                                                                            canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                            currencyDisplayName: "英语单词",
                                                                                            currencyInternalName: "pp",
                                                                                            currencyLayer: "Eng",
                                                                                            pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                            tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 II】<h4><h4>效果：经验点数提升语文知识获取。<br>当前：x"+format(this.effect())},
                                                                                            unlocked(){return hasMilestone("Eng",9)},
                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                            },
                                                                                            35: {
                                                                                                title: "<h1>C3",
                                                                                                cost(){return new Decimal(40)},
                                                                                                effect(){ let eff = player.C.readingPoints.pow(1.2).pow(tmp.Eng.gridEffect)
                                                                                                return eff
                                                                                                },
                                                                                                canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                currencyDisplayName: "英语单词",
                                                                                                currencyInternalName: "pp",
                                                                                                currencyLayer: "Eng",
                                                                                                pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 III】<h4><h4>效果：阅读感悟以增加的速度提升语文知识获取。<br>当前：x"+format(this.effect())},
                                                                                                unlocked(){return hasMilestone("Eng",9)},
                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                },
                                                                                                45: {
                                                                                                    title: "<h1>C4",
                                                                                                    cost(){return new Decimal(55)},
                                                                                                    effect(){ let eff = player.points.pow(0.08).pow(tmp.Eng.gridEffect).min(1e300)
                                                                                                    return eff
                                                                                                    },
                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                    currencyDisplayName: "英语单词",
                                                                                                    currencyInternalName: "pp",
                                                                                                    currencyLayer: "Eng",
                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                    tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 IV】<h4><h4>效果：学分以降低的速度提升语文知识获取。<br>当前：x"+format(this.effect())},
                                                                                                    unlocked(){return hasMilestone("Eng",9)},
                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                    },
                                                                                                    55: {
                                                                                                    title: "<h1>C5",
                                                                                                    cost(){return new Decimal(75)},
                                                                                                    effect(){ let eff = player.C.points.pow(0.05).pow(tmp.Eng.gridEffect).min("1e500")
                                                                                                    if(hasMilestone("Eng",12)) eff = eff.pow(2)
                                                                                                    return eff
                                                                                                    },
                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                    currencyDisplayName: "英语单词",
                                                                                                    currencyInternalName: "pp",
                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                    currencyLayer: "Eng",
                                                                                                    tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 V】<h4><h4>效果：语文知识以显著降低的速度提升语文知识获取。<br>当前：x"+format(this.effect())},
                                                                                                    unlocked(){return hasMilestone("Eng",9)},
                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                    },
                                                                                                    61: {
                                                                                                        title: "<h1>R6",
                                                                                                        cost(){return new Decimal(150)},
                                                                                                        effect(){ let eff = player.C.readingPoints.pow(0.22).pow(tmp.Eng.gridEffect).min(1e32)
                                                                                                            if(getBuyableAmount("Exp",73).gte(1)) eff = eff.pow(tmp.Eng.gridEffect)
                                                                                                        return eff
                                                                                                        },
                                                                                                        currencyDisplayName: "英语单词",
                                                                                                        currencyInternalName: "pp",
                                                                                                        currencyLayer: "Eng",
                                                                                                        tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 VI】<h4><h4>效果：阅读感悟提升自身，在较高数值时达到上限。效果比上一个节点强。<br>当前：x"+format(this.effect())},
                                                                                                        unlocked(){return hasMilestone("Eng",11)},
                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                        },
                                                                                                        62: {
                                                                                                            title: "<h1>EngK6",
                                                                                                            cost(){return new Decimal(99)},
                                                                                                            effect(){ let eff = new Decimal(1e10).pow(tmp.Exp.totalChallenges.add(1)).pow(tmp.Eng.gridEffect)
                                                                                                                if(!hasUpgrade("Eng",82)) eff = eff.min(1e210)
                                                                                                            return eff
                                                                                                            },
                                                                                                            currencyDisplayName: "英语单词",
                                                                                                            currencyInternalName: "pp",
                                                                                                            currencyLayer: "Eng",
                                                                                                            tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 VI】<h4><h4>效果：经验挑战总完成次数提升英语知识获取(上限为20次)。<br>当前：x"+format(this.effect())},
                                                                                                            unlocked(){return hasMilestone("Eng",11)},
                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                            },
                                                                                                            63: {
                                                                                                                title: "<h1>P6",
                                                                                                                cost(){return new Decimal(44)},
                                                                                                                effect(){ let eff = new Decimal(0.1)
                                                                                                                return eff
                                                                                                                },
                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                currencyInternalName: "pp",
                                                                                                                currencyLayer: "Eng",
                                                                                                                tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 VI】<h4><h4>效果：一个静态的英语网格力量加成。效果比上一个加成强。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                                                                                                unlocked(){return hasMilestone("Eng",11)},
                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                },
                                                                                                                64: {
                                                                                                                    title: "<h1>Exp6",
                                                                                                                    cost(){return new Decimal(66)},
                                                                                                                    effect(){ let eff = player.Exp.points.root(15).pow(tmp.Eng.gridEffect)
                                                                                                                        if (eff>1e80) eff = new Decimal(1e20).mul(eff.div(1e20).root(30))
                                                                                                                        
                                                                                                                    return eff
                                                                                                                    },
                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                    currencyInternalName: "pp",
                                                                                                                    currencyLayer: "Eng",
                                                                                                                    tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 VI】<h4><h4>效果：经验提升自身获取。在较高数值达到极度软上限。<br>当前：x"+format(this.effect())},
                                                                                                                    unlocked(){return hasMilestone("Eng",11)},
                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                    },
                                                                                                                    65: {
                                                                                                                        title: "<h1>C6",
                                                                                                                        cost(){return new Decimal(300)},
                                                                                                                        effect(){ let eff = tmp.Eng.ppEffect.pow(tmp.Eng.gridEffect).min("1e3000")
                                                                                                                        return eff
                                                                                                                        },
                                                                                                                        canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                        currencyInternalName: "pp",
                                                                                                                        pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                        currencyLayer: "Eng",
                                                                                                                        tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 VI】<h4><h4>效果：英语知识对语文知识的加成效应再生效一次。<br>当前：x"+format(this.effect())},
                                                                                                                        unlocked(){return hasMilestone("Eng",11)},
                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                        },
                                                                                                                        16: {
                                                                                                                            title: "<h1>ReqN1",
                                                                                                                            cost(){return new Decimal(30)},
                                                                                                                            effect(){ let eff = player.C.tier.add(1).pow(tmp.Eng.gridEffect)
                                                                                                                            return eff
                                                                                                                            },
                                                                                                                            canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                            currencyDisplayName: "英语单词",
                                                                                                                            currencyInternalName: "pp",
                                                                                                                            pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                            currencyLayer: "Eng",
                                                                                                                            tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 I】<h4><h4>效果：名著阶层降低英语语法的重置需求。<br>当前：/"+format(this.effect())},
                                                                                                                            unlocked(){return hasMilestone("Eng",11)},
                                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                            },
                                                                                                                            26: {
                                                                                                                                title: "<h1>ReqN2",
                                                                                                                                cost(){return new Decimal(60)},
                                                                                                                                effect(){ let eff = player.Exp.level.add(1).pow(tmp.Eng.gridEffect)
                                                                                                                                return eff
                                                                                                                                },
                                                                                                                                canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                currencyInternalName: "pp",
                                                                                                                                pay(){player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                currencyLayer: "Eng",
                                                                                                                                tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 II】<h4><h4>效果：经验等级降低英语语法的重置需求。<br>当前：/"+format(this.effect())},
                                                                                                                                unlocked(){return hasMilestone("Eng",11)},
                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                },
                                                                                                                                36: {
                                                                                                                                    title: "<h1>ReqN3",
                                                                                                                                    cost(){return new Decimal(90)},
                                                                                                                                    effect(){ let eff = player.Eng.points.pow(5).pow(tmp.Eng.gridEffect).min(1e10)
                                                                                                                                    return eff
                                                                                                                                    },
                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                    pay(){player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                    tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 III】<h4><h4>效果：当前英语语法数量降低自身重置需求。较高数值时效果达到上限。<br>当前：/"+format(this.effect())},
                                                                                                                                    unlocked(){return hasMilestone("Eng",11)},
                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                    },
                                                                                                                                    46: {
                                                                                                                                        title: "<h1>ReqN4",
                                                                                                                                        cost(){return new Decimal(120)},
                                                                                                                                        effect(){ let eff = player.E.bestPoints.pow(3).pow(tmp.Eng.gridEffect)
                                                                                                                                        return eff
                                                                                                                                        },
                                                                                                                                        canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                                        currencyInternalName: "pp",
                                                                                                                                        pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                        currencyLayer: "Eng",
                                                                                                                                        tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 IV】<h4><h4>效果：中考最佳分数降低英语语法重置需求。较高数值时效果达到上限。<br>当前：/"+format(this.effect())},
                                                                                                                                        unlocked(){return hasMilestone("Eng",11)},
                                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                        },
                                                                                                                                        56: {
                                                                                                                                            title: "<h1>ReqN5",
                                                                                                                                            cost(){return new Decimal(150)},
                                                                                                                                            effect(){ let eff = new Decimal(5).pow(new Decimal(player.Eng.upgrades.length)).pow(tmp.Eng.gridEffect)
                                                                                                                                            return eff
                                                                                                                                            },
                                                                                                                                            canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                            currencyDisplayName: "英语单词",
                                                                                                                                            currencyInternalName: "pp",
                                                                                                                                            pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                            currencyLayer: "Eng",
                                                                                                                                            tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 V】<h4><h4>效果：英语网格节点数目降低英语语法重置需求，且上限为30个节点。<br>当前：/"+format(this.effect())},
                                                                                                                                            unlocked(){return hasMilestone("Eng",11)},
                                                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                            },
                                                                                                                                            66: {
                                                                                                                                                title: "<h1>ReqN6",
                                                                                                                                                cost(){return new Decimal(180)},
                                                                                                                                                effect(){ let eff = new Decimal(1e20)
                                                                                                                                                    if(getBuyableAmount("Exp",72).gte(1)) eff = eff.pow(2)
                                                                                                                                                return eff
                                                                                                                                                },
                                                                                                                                                canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                                currencyInternalName: "pp",
                                                                                                                                                pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                currencyLayer: "Eng",
                                                                                                                                                tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 VI】<h4><h4>效果：降低英语语法重置需求。<br>当前：/"+format(this.effect())},
                                                                                                                                                unlocked(){return hasMilestone("Eng",11)},
                                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                },
                                                                                                                                                71: {
                                                                                                                                                    title: "<h1>R7",
                                                                                                                                                    cost(){return new Decimal(233)},
                                                                                                                                                    effect(){ let eff = player.C.readingPoints.pow(0.22).pow(tmp.Eng.gridEffect).min(1e48)
                                                                                                                                                        if(getBuyableAmount("Exp",73).gte(1)) eff = eff.pow(tmp.Eng.gridEffect)
                                                                                                                                                    return eff
                                                                                                                                                    },
                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                    tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 VII】<h4><h4>效果：阅读感悟提升自身，在较高数值时达到上限。效果比上一个节点略强。<br>当前：x"+format(this.effect())},
                                                                                                                                                    unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                    },
                                                                                                                                                    72: {
                                                                                                                                                        title: "<h1>EngK7",
                                                                                                                                                        cost(){return new Decimal(399)},
                                                                                                                                                        effect(){ let eff = new Decimal(1.2).mul(tmp.Eng.gridEffect).min(2.5)
                                                                                                                                                        return eff
                                                                                                                                                        },
                                                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                                                        currencyInternalName: "pp",
                                                                                                                                                        currencyLayer: "Eng",
                                                                                                                                                        tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 VII】<h4><h4>效果：些微提升EngK1效果，在EngK4之后生效。<br>当前：^"+format(this.effect())},
                                                                                                                                                        unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                        },
                                                                                                                                                        73: {
                                                                                                                                                            title: "<h1>P7",
                                                                                                                                                            cost(){return new Decimal(69)},
                                                                                                                                                            effect(){ let eff = new Decimal(0.12)
                                                                                                                                                            return eff
                                                                                                                                                            },
                                                                                                                                                            currencyDisplayName: "英语单词",
                                                                                                                                                            currencyInternalName: "pp",
                                                                                                                                                            currencyLayer: "Eng",
                                                                                                                                                            tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 VII】<h4><h4>效果：一个静态的英语网格力量加成。效果比上一个加成强。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                                                                                                                                            unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                            },
                                                                                                                                                            74: {
                                                                                                                                                                title: "<h1>Exp7",
                                                                                                                                                                cost(){return new Decimal(200)},
                                                                                                                                                                effect(){ let eff = player.Exp.freepp.pow(15).pow(tmp.Eng.gridEffect)
                                                                                                                                                                    
                                                                                                                                                                return eff
                                                                                                                                                                },
                                                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                                                currencyInternalName: "pp",
                                                                                                                                                                currencyLayer: "Eng",
                                                                                                                                                                tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 VII】<h4><h4>效果：免费天赋点数数量提升经验获取。在较高数值达到极度软上限。<br>当前：x"+format(this.effect())},
                                                                                                                                                                unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                },
                                                                                                                                                                75: {
                                                                                                                                                                    title: "<h1>C7",
                                                                                                                                                                    cost(){return new Decimal(600)},
                                                                                                                                                                    effect(){ let eff = new Decimal(1e100).pow(new Decimal(player.E.milestones.length)).pow(tmp.Eng.gridEffect)
                                                                                                                                                                        if (eff.gte("1e8000")) eff = new Decimal("1e8000").mul(eff.div("1e8000").root(100))
                                                                                                                                                                    return eff
                                                                                                                                                                    },
                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                    tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 VII】<h4><h4>效果：每有一个考试里程碑，语文知识获取都会提升到1e100倍。<br>当前：x"+format(this.effect())},
                                                                                                                                                                    unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                    },
                                                                                                                                                                    76: {
                                                                                                                                                                        title: "<h1>ReqN7",
                                                                                                                                                                        cost(){return new Decimal(400)},
                                                                                                                                                                        effect(){ let eff = new Decimal(1e40).pow(tmp.Eng.gridEffect)
                                                                                                                                                                        return eff
                                                                                                                                                                        },
                                                                                                                                                                        canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                                                                        currencyInternalName: "pp",
                                                                                                                                                                        pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                        currencyLayer: "Eng",
                                                                                                                                                                        tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 VII】<h4><h4>效果：降低英语语法重置需求。<br>当前：/"+format(this.effect())},
                                                                                                                                                                        unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                        },
                                                                                                                                                                        17: {
                                                                                                                                                                            title: "<h1>Pt1",
                                                                                                                                                                            cost(){return new Decimal(688)},
                                                                                                                                                                            effect(){ let eff = new Decimal(10).pow(new Decimal(player.E.milestones.length)).pow(tmp.Eng.gridEffect)
                                                                                                                                                                                if (eff.gte("1e8000")) eff = new Decimal("1e8000").mul(eff.div("1e8000").root(100))
                                                                                                                                                                            return eff
                                                                                                                                                                            },
                                                                                                                                                                            canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                            currencyDisplayName: "英语单词",
                                                                                                                                                                            currencyInternalName: "pp",
                                                                                                                                                                            pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                            currencyLayer: "Eng",
                                                                                                                                                                            tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 I】<h4><h4>效果：每有一个考试里程碑，学分获取都会提升10倍。<br>当前：x"+format(this.effect())},
                                                                                                                                                                            unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                            },
                                                                                                                                                                            27: {
                                                                                                                                                                                title: "<h1>Pt2",
                                                                                                                                                                                cost(){return new Decimal(750)},
                                                                                                                                                                                effect(){ let eff = player.Exp.level.pow(12).pow(tmp.Eng.gridEffect)
                                                                                                                                                                                return eff
                                                                                                                                                                                },
                                                                                                                                                                                canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                                                                currencyInternalName: "pp",
                                                                                                                                                                                pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                currencyLayer: "Eng",
                                                                                                                                                                                tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 II】<h4><h4>效果：经验等级提升学分获取。<br>当前：x"+format(this.effect())},
                                                                                                                                                                                unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                },
                                                                                                                                                                                37: {
                                                                                                                                                                                    title: "<h1>Pt3",
                                                                                                                                                                                    cost(){return new Decimal(800)},
                                                                                                                                                                                    effect(){ let eff = player.Exp.points.pow(0.2).pow(tmp.Eng.gridEffect)
                                                                                                                                                                                    return eff
                                                                                                                                                                                    },
                                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                                    tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 III】<h4><h4>效果：经验以大大降低的倍率提升学分获取。<br>当前：x"+format(this.effect())},
                                                                                                                                                                                    unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                    },
                                                                                                                                                                                    47: {
                                                                                                                                                                                    title: "<h1>Pt4",
                                                                                                                                                                                    cost(){return new Decimal(888)},
                                                                                                                                                                                    effect(){ let eff = player.Exp.points.pow(0.3).pow(tmp.Eng.gridEffect)
                                                                                                                                                                                    return eff
                                                                                                                                                                                    },
                                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                                    tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 IV】<h4><h4>效果：经验以降低的倍率提升学分获取。<br>当前：x"+format(this.effect())},
                                                                                                                                                                                    unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                    },
                                                                                                                                                                                    57: {
                                                                                                                                                                                    title: "<h1>Pt5",
                                                                                                                                                                                    cost(){return new Decimal(960)},
                                                                                                                                                                                    effect(){ let eff = player.Exp.points.pow(0.6).pow(tmp.Eng.gridEffect)
                                                                                                                                                                                    return eff
                                                                                                                                                                                    },
                                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                                    tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 V】<h4><h4>效果：经验以些微降低的倍率提升学分获取。<br>当前：x"+format(this.effect())},
                                                                                                                                                                                    unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                    },
                                                                                                                                                                                    67: {
                                                                                                                                                                                    title: "<h1>Pt6",
                                                                                                                                                                                    cost(){return new Decimal(1025)},
                                                                                                                                                                                    effect(){ let eff = player.Exp.points.pow(tmp.Eng.gridEffect)
                                                                                                                                                                                    return eff
                                                                                                                                                                                    },
                                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                                    tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 VI】<h4><h4>效果：经验提升学分获取。<br>当前：x"+format(this.effect())},
                                                                                                                                                                                    unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                    },
                                                                                                                                                                                    77: {
                                                                                                                                                                                    title: "<h1>Pt7",
                                                                                                                                                                                    cost(){return new Decimal(1300)},
                                                                                                                                                                                    effect(){ let eff = player.Exp.points.mul((player.Exp.freepp.add(player.Exp.level)).pow(20)).pow(tmp.Eng.gridEffect)
                                                                                                                                                                                    return eff
                                                                                                                                                                                    },
                                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                                    tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 VII】<h4><h4>效果：经验*(总天赋点数^20)提升学分获取。<br>当前：x"+format(this.effect())},
                                                                                                                                                                                    unlocked(){return hasMilestone("Eng",14)},
                                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                    },
                                                                                                                                                                                    81: {
                                                                                                                                                    title: "<h1>R8",
                                                                                                                                                    cost(){return new Decimal(500)},
                                                                                                                                                    effect(){ let eff = new Decimal(1.2).pow(tmp.Eng.gridEffect).min(2)
                                                                                                                                                    return eff
                                                                                                                                                    },
                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                    tooltip(){return "<h4 style='color:#9A0707;text-shadow:0px 0px 10px;'>【阅读感悟 VIII】<h4><h4>效果：阅读技能G1提升至1.2次方。<br>当前：^"+format(this.effect())},
                                                                                                                                                    unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#890606",   color: "white", 'border-color': "#9A0707",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                    },
                                                                                                                                                    82: {
                                                                                                                                                        title: "<h1>EngK8",
                                                                                                                                                        cost(){return new Decimal(750)},
                                                                                                                                                        effect(){ let eff = new Decimal(1.2).mul(tmp.Eng.gridEffect).min(2.5)
                                                                                                                                                        return eff
                                                                                                                                                        },
                                                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                                                        currencyInternalName: "pp",
                                                                                                                                                        currencyLayer: "Eng",
                                                                                                                                                        tooltip(){return "<h4 style='color:#BA00A4;text-shadow:0px 0px 10px;'>【英语知识 VIII】<h4><h4>效果：移除EngK6的上限。"},
                                                                                                                                                        unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#A90093",   color: "white", 'border-color': "#BA00A4",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                        },
                                                                                                                                                        83: {
                                                                                                                                                            title: "<h1>P8",
                                                                                                                                                            cost(){return new Decimal(377)},
                                                                                                                                                            effect(){ let eff = new Decimal(0.15)
                                                                                                                                                            return eff
                                                                                                                                                            },
                                                                                                                                                            currencyDisplayName: "英语单词",
                                                                                                                                                            currencyInternalName: "pp",
                                                                                                                                                            currencyLayer: "Eng",
                                                                                                                                                            tooltip(){return "<h4 style='color:#EA66BB;text-shadow:0px 0px 10px;'>【网格力量 VIII】<h4><h4>效果：一个静态的英语网格力量加成。效果比上一个加成强。<br>当前：+"+format(this.effect().mul(100))+"%"},
                                                                                                                                                            unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#D955AA",   color: "white", 'border-color': "#EA66BB",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                            },
                                                                                                                                                            84: {
                                                                                                                                                                title: "<h1>Exp8",
                                                                                                                                                                cost(){return new Decimal(666)},
                                                                                                                                                                effect(){ let eff = player.Exp.freepp.pow(20).pow(tmp.Eng.gridEffect)
                                                                                                                                                                    
                                                                                                                                                                return eff
                                                                                                                                                                },
                                                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                                                currencyInternalName: "pp",
                                                                                                                                                                currencyLayer: "Eng",
                                                                                                                                                                tooltip(){return "<h4 style='color:#7F00BA;text-shadow:0px 0px 10px;'>【经验 VIII】<h4><h4>效果：免费天赋点数数量提升经验获取。在较高数值达到极度软上限。<br>当前：x"+format(this.effect())},
                                                                                                                                                                unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#8E00A9",   color: "white", 'border-color': "#7F00BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                },
                                                                                                                                                                85: {
                                                                                                                                                                    title: "<h1>C8",
                                                                                                                                                                    cost(){return new Decimal(1700)},
                                                                                                                                                                    effect(){ let eff = new Decimal(1e300).pow(new Decimal(player.Eng.milestones.length)).pow(tmp.Eng.gridEffect)
                                                                                                                                                                        if (eff.gte("1e8000")) eff = new Decimal("1e8000").mul(eff.div("1e8000").root(10))
                                                                                                                                                                    return eff
                                                                                                                                                                    },
                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                    pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                    tooltip(){return "<h4 style='color:#0070BA;text-shadow:0px 0px 10px;'>【语文知识 VII】<h4><h4>效果：每有一个英语里程碑，语文知识获取都会提升到1e200倍。<br>当前：x"+format(this.effect())},
                                                                                                                                                                    unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#0060A9",   color: "white", 'border-color': "#0070BA",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                    },
                                                                                                                                                                    86: {
                                                                                                                                                                        title: "<h1>ReqN8",
                                                                                                                                                                        cost(){return new Decimal(1075)},
                                                                                                                                                                        effect(){ let eff = new Decimal(1e50).pow(tmp.Eng.gridEffect)
                                                                                                                                                                        return eff
                                                                                                                                                                        },
                                                                                                                                                                        canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                                                                        currencyInternalName: "pp",
                                                                                                                                                                        pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                        currencyLayer: "Eng",
                                                                                                                                                                        tooltip(){return "<h4 style='color:#00C6C6;text-shadow:0px 0px 10px;'>【重置需求 VII】<h4><h4>效果：降低英语语法重置需求。<br>当前：/"+format(this.effect())},
                                                                                                                                                                        unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#00B5B5",   color: "white", 'border-color': "#00C6C6",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                        },
                                                                                                                                                                        87: {
                                                                                                                                                                            title: "<h1>Pt8",
                                                                                                                                                                            cost(){return new Decimal(1540)},
                                                                                                                                                                            effect(){ let eff = player.Exp.points.mul((player.Exp.freepp.add(player.Exp.level)).pow(50)).pow(tmp.Eng.gridEffect)
                                                                                                                                                                            return eff
                                                                                                                                                                            },
                                                                                                                                                                            canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                            currencyDisplayName: "英语单词",
                                                                                                                                                                            currencyInternalName: "pp",
                                                                                                                                                                            pay(){if (!hasMilestone("E",22)) player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                            currencyLayer: "Eng",
                                                                                                                                                                            tooltip(){return "<h4 style='color:#17EE00;text-shadow:0px 0px 10px;'>【学分 VIII】<h4><h4>效果：经验*(总天赋点数^50)提升学分获取。<br>当前：x"+format(this.effect())},
                                                                                                                                                                            unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#06DD00",   color: "white", 'border-color': "#17EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                            },
                                                                                                                                                                            18: {
                                                                                                                                                                                title: "<h1>CgN1",
                                                                                                                                                                                cost(){return new Decimal(100)},
                                                                                                                                                                                effect(){ let eff = new Decimal(1)
                                                                                                                                                                                    return eff
                                                                                                                                                                                },
                                                                                                                                                                                canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                                                                currencyInternalName: "pp",
                                                                                                                                                                                pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                currencyLayer: "Eng",
                                                                                                                                                                                tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 I】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                },
                                                                                                                                                                                28: {
                                                                                                                                                                                    title: "<h1>CgN2",
                                                                                                                                                                                    cost(){return new Decimal(200)},
                                                                                                                                                                                    effect(){ let eff = new Decimal(2)
                                                                                                                                                                                        return eff
                                                                                                                                                                                    },
                                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                                    pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                                    tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 II】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                    unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                    },
                                                                                                                                                                                    38: {
                                                                                                                                                                                    title: "<h1>CgN3",
                                                                                                                                                                                    cost(){return new Decimal(400)},
                                                                                                                                                                                    effect(){ let eff = new Decimal(3)
                                                                                                                                                                                        return eff
                                                                                                                                                                                    },
                                                                                                                                                                                    canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                    currencyDisplayName: "英语单词",
                                                                                                                                                                                    currencyInternalName: "pp",
                                                                                                                                                                                    pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                    currencyLayer: "Eng",
                                                                                                                                                                                    tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 III】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                    unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                    style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                            if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                    },
                                                                                                                                                                                    48: {
                                                                                                                                                                                        title: "<h1>CgN4",
                                                                                                                                                                                        cost(){return new Decimal(600)},
                                                                                                                                                                                        effect(){ let eff = new Decimal(4)
                                                                                                                                                                                            return eff
                                                                                                                                                                                        },
                                                                                                                                                                                        canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                                                                                        currencyInternalName: "pp",
                                                                                                                                                                                        pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                        currencyLayer: "Eng",
                                                                                                                                                                                        tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 IV】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                        unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                        },
                                                                                                                                                                                        58: {
                                                                                                                                                                                        title: "<h1>CgN5",
                                                                                                                                                                                        cost(){return new Decimal(800)},
                                                                                                                                                                                        effect(){ let eff = new Decimal(5)
                                                                                                                                                                                            return eff
                                                                                                                                                                                        },
                                                                                                                                                                                        canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                        currencyDisplayName: "英语单词",
                                                                                                                                                                                        currencyInternalName: "pp",
                                                                                                                                                                                        pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                        currencyLayer: "Eng",
                                                                                                                                                                                        tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 V】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                        unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                        style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                                if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                        },
                                                                                                                                                                                        68: {
                                                                                                                                                                                            title: "<h1>CgN6",
                                                                                                                                                                                            cost(){return new Decimal(1000)},
                                                                                                                                                                                            effect(){ let eff = new Decimal(6)
                                                                                                                                                                                                return eff
                                                                                                                                                                                            },
                                                                                                                                                                                            canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                            currencyDisplayName: "英语单词",
                                                                                                                                                                                            currencyInternalName: "pp",
                                                                                                                                                                                            pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                            currencyLayer: "Eng",
                                                                                                                                                                                            tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 VI】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                            unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                            style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                                    if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                            },
                                                                                                                                                                                            78: {
                                                                                                                                                                                                title: "<h1>CgN7",
                                                                                                                                                                                                cost(){return new Decimal(1200)},
                                                                                                                                                                                                effect(){ let eff = new Decimal(7)
                                                                                                                                                                                                    return eff
                                                                                                                                                                                                },
                                                                                                                                                                                                canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                                                                                currencyInternalName: "pp",
                                                                                                                                                                                                pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                                currencyLayer: "Eng",
                                                                                                                                                                                                tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 VII】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                                unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                                },
                                                                                                                                                                                                88: {
                                                                                                                                                                                                title: "<h1>CgN8",
                                                                                                                                                                                                cost(){return new Decimal(2221)},
                                                                                                                                                                                                effect(){ let eff = new Decimal(8)
                                                                                                                                                                                                    return eff
                                                                                                                                                                                                },
                                                                                                                                                                                                canAfford(){return player.Eng.pp.gte(this.cost())},
                                                                                                                                                                                                currencyDisplayName: "英语单词",
                                                                                                                                                                                                currencyInternalName: "pp",
                                                                                                                                                                                                pay(){ player.Eng.pp = player.Eng.pp.sub(this.cost())},
                                                                                                                                                                                                currencyLayer: "Eng",
                                                                                                                                                                                                tooltip(){return "<h4 style='color:#C6EE00;text-shadow:0px 0px 10px;'>【挑战目标 VIII】<h4><h4>效果：降低所有经验挑战的挑战目标。<br>当前：-"+format(this.effect())},
                                                                                                                                                                                                unlocked(){return hasMilestone("Eng",16)},
                                                                                                                                                                                                style() {  if (!hasUpgrade(this.layer,this.id)) return {'background-color': "#000000",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}
                                                                                                                                                                                                        if (hasUpgrade(this.layer,this.id)) return {'background-color': "#B5DD00",   color: "white", 'border-color': "#C6EE00",'border-radius': "0px", height: "100px", width: "100px"}},
                                                                                                                                                                                                },
},
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    gridEffect(){
        let eff = new Decimal(1)
        if(hasUpgrade("Eng",13)) eff = eff.add(upgradeEffect("Eng",13))
        if(hasUpgrade("Eng",23)) eff = eff.add(upgradeEffect("Eng",23))
        if(hasUpgrade("Eng",33)) eff = eff.add(upgradeEffect("Eng",33))
        if(hasUpgrade("Eng",43)) eff = eff.add(upgradeEffect("Eng",43))
        if(hasUpgrade("Eng",53)) eff = eff.add(upgradeEffect("Eng",53))
        if(hasUpgrade("Eng",63)) eff = eff.add(upgradeEffect("Eng",63))
        if(hasUpgrade("Eng",73)) eff = eff.add(upgradeEffect("Eng",73))

        if(hasUpgrade("Eng",83)) eff = eff.add(upgradeEffect("Eng",83))
        if(hasMilestone("Eng",6)) eff = eff.add(0.05)
        if(hasMilestone("Eng",10)) eff = eff.add(player.Eng.points.mul(0.01))
        if(hasChallenge("Exp",11)) eff = eff.add(format(tmp.Exp.challenges[11].rewardEffect))
        if(hasChallenge("Exp",21)) eff = eff.add(0.1)
        if((getBuyableAmount("C",88)).gte(1)) eff = eff.add(buyableEffect("C",88))
        if(hasChallenge("Exp",22)) eff = eff.add(0.12)
        return eff
    },
tooltip(){return format(player.Eng.points)+" 英语语法<br>"+format(player.Eng.power)+" 英语知识<br>"+format(player.Eng.pp)+" 英语单词"},
    layerShown() { return hasMilestone("E",14) },           
readingReq(){
    let req = new Decimal(5e13)
    if(player.Eng.points.gte(1)) req = new Decimal(1e23)
    if(player.Eng.points.gte(2)) req = new Decimal("1e27")
    if(player.Eng.points.gte(3)) req = new Decimal("1e45")
    if(player.Eng.points.gte(4)) req = new Decimal("1e66")
    if(player.Eng.points.gte(5)) req = new Decimal("1e73")
    if(player.Eng.points.gte(6)) req = new Decimal("1e123")
    if(player.Eng.points.gte(7)) req = new Decimal("1e135")
    if(player.Eng.points.gte(8)) req = new Decimal("1e20").pow(player.Eng.points)
    if(hasUpgrade("Eng",16)) req = req.div(upgradeEffect("Eng",16))
    if(hasUpgrade("Eng",26)) req = req.div(upgradeEffect("Eng",26))
    if(hasUpgrade("Eng",36)) req = req.div(upgradeEffect("Eng",36))
    if(hasUpgrade("Eng",46)) req = req.div(upgradeEffect("Eng",46))
    if(hasUpgrade("Eng",56)) req = req.div(upgradeEffect("Eng",56))
    if(hasUpgrade("Eng",66)) req = req.div(upgradeEffect("Eng",66))
    if(hasUpgrade("Eng",76)) req = req.div(upgradeEffect("Eng",76))
    if(hasUpgrade("Eng",86)) req = req.div(upgradeEffect("Eng",86))
    return req
},
pointsReq(){
    let req = new Decimal("1e390")
    if(player.Eng.points.gte(1)) req = new Decimal("1e698")
    if(player.Eng.points.gte(2)) req = new Decimal("1e1000")
    if(player.Eng.points.gte(3)) req = new Decimal("1e1900")
    if(player.Eng.points.gte(4)) req = new Decimal("1e2800")
    if(player.Eng.points.gte(5)) req = new Decimal("1e3600")
    if(player.Eng.points.gte(6)) req = new Decimal("1e7200")
    if(player.Eng.points.gte(7)) req = new Decimal("1e8200")
    if(player.Eng.points.gte(8)) req = new Decimal("1e1500").pow(player.Eng.points)
    if(hasUpgrade("Eng",16)) req = req.div(upgradeEffect("Eng",16).pow(60))
    if(hasUpgrade("Eng",26)) req = req.div(upgradeEffect("Eng",26).pow(60))
    if(hasUpgrade("Eng",36)) req = req.div(upgradeEffect("Eng",36).pow(60))
    if(hasUpgrade("Eng",46)) req = req.div(upgradeEffect("Eng",46).pow(60))
    if(hasUpgrade("Eng",56)) req = req.div(upgradeEffect("Eng",56).pow(60))
    if(hasUpgrade("Eng",66)) req = req.div(upgradeEffect("Eng",66).pow(60))
    if(hasUpgrade("Eng",76)) req = req.div(upgradeEffect("Eng",76).pow(60))
    if(hasUpgrade("Eng",86)) req = req.div(upgradeEffect("Eng",86).pow(60))
    return req
},
effect(){
    if(!getBuyableAmount("Exp",67).gte(1)) eff = new Decimal(3).pow(player.Eng.points).sub(1)
    if(getBuyableAmount("Exp",67).gte(1)&&!hasMilestone("E",18)) eff = new Decimal(100).pow(player.Eng.points.pow(1.05)).sub(1)
    if(hasMilestone("E",18)) eff = new Decimal(222).pow(player.Eng.points.pow(1.07)).sub(1)
    if(hasMilestone("C",6)) eff = eff.mul(1000)
    if(getBuyableAmount("Exp",63).gte(1)) eff = eff.mul(buyableEffect("Exp",63))
    if(hasMilestone("E",15)) eff = eff.mul(buyableEffect("Exp",64))
    if(hasUpgrade("Eng",22)) eff = eff.mul(upgradeEffect("Eng",22))
    if(hasMilestone("E",15)) eff = eff.mul(10)
    if(hasUpgrade("Eng",32)) eff = eff.mul(upgradeEffect("Eng",32))
    if(hasUpgrade("Eng",52)) eff = eff.mul(upgradeEffect("Eng",52))
    if(hasMilestone("E",21)) eff = eff.pow(1.05)
    if(hasMilestone("E",23)) eff = eff.mul(1e8)
    if(hasUpgrade("Eng",62)) eff = eff.mul(upgradeEffect("Eng",62))
    if(hasChallenge("Exp",12)) eff = eff.mul(tmp.Exp.challenges[12].rewardEffect)
    if(player.C.total5.gte(1)) eff = eff.mul(tmp.C.effect5)
    if(player.C.total6.gte(1)) eff = eff.mul(tmp.C.effect6)
    if(hasChallenge("Exp",21)) eff = eff.mul(tmp.Exp.challenges[21].rewardEffect)
    if(hasChallenge("Exp",22)) eff = eff.pow(tmp.Exp.challenges[22].rewardEffect)
    
    if(inChallenge("Exp",21)||inChallenge("Exp",22)) eff = eff.mul(0)
    return eff
},
effectDescription(){
    return "每秒生产英语知识<h2 style='color:#909561;text-shadow:0px 0px 10px;'> +"+format(tmp.Eng.effect)+" <h2>"
},

    buyables:{
        11: {
            title: "<b>重置并获得 +1 英语语法",
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() {  
                let data = tmp[this.layer].buyables[this.id]
                let display = "需要"+format(player.C.points)+" / "+format(tmp.Eng.pointsReq)+"语文知识<br>需要"+format(player.C.readingPoints)+" / "+format(tmp.Eng.readingReq)+"阅读感悟<br>警告：重置获得英语语法将会重置你语文阅读(包括名著许可前4个等级)的所有内容。同时将您的语文知识与学分开平方根！"
                return display;
            },
            unlocked() { return hasMilestone("C",0)}, 
            canAfford() { return player.C.readingPoints.gte(tmp.Eng.readingReq)&&player.C.points.gte(tmp.Eng.pointsReq)},
            buy() { 
                player.Eng.points = player.Eng.points.add(1)
                if(!hasMilestone("Eng",8))player.C.tier = new Decimal(0)
                if(!hasMilestone("Eng",8))player.C.balance1 = new Decimal(0)
                if(!hasMilestone("Eng",8))player.C.balance2 = new Decimal(0)
                if(!hasMilestone("Eng",8))player.C.total1 = new Decimal(0)
                if(!hasMilestone("Eng",8))player.C.total2 = new Decimal(0)
                if(!hasMilestone("Eng",8))player.C.totalGold = new Decimal(0)
                if(!hasMilestone("Eng",8))player.C.balanceGold = new Decimal(0)
                if(!hasMilestone("Eng",1))setBuyableAmount("C",54,new Decimal(0))
                if(!hasMilestone("Eng",1))setBuyableAmount("C",60,new Decimal(0))
                if(!hasMilestone("Eng",1))setBuyableAmount("C",61,new Decimal(0))
                if(!hasMilestone("Eng",1))setBuyableAmount("C",68,new Decimal(0))
                if(!hasMilestone("Eng",11))playersetBuyableAmount("C",41,new Decimal(0))
                if(!hasMilestone("Eng",11))playersetBuyableAmount("C",42,new Decimal(0))
                if(!hasMilestone("Eng",11))playersetBuyableAmount("C",43,new Decimal(0))
                if(!hasMilestone("Eng",11))playersetBuyableAmount("C",44,new Decimal(0))
                if(!hasMilestone("Eng",11))playersetBuyableAmount("C",59,new Decimal(0))
                if(!hasMilestone("Eng",8))player.C.readingPoints = new Decimal(1)
                
                if(!hasMilestone("Eng",2))player.C.pps = new Decimal(1)
            if(!hasMilestone("Eng",2))player.C.freeze = new Decimal(1)
            if(!hasMilestone("Eng",2))player.C.power = new Decimal(1)
            if(!hasMilestone("Eng",2))player.C.brainTier = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.points = player.C.points.sqrt().floor()
            if(!hasMilestone("Eng",8)) player.points = player.points.sqrt().floor()
            if(!hasMilestone("Eng",11))player.Eng.upgrades = []
            if(!hasMilestone("Eng",11))player.Eng.power = new Decimal(0)
            if(!hasMilestone("Eng",11))player.Eng.totalpp = new Decimal(0)
            if(!hasMilestone("Eng",11))player.Eng.pp = new Decimal(0)
            if(!hasMilestone("Eng",11))player.Eng.upgrades = []
            if(!hasMilestone("Eng",11))player.Eng.power = new Decimal(0)
            if(!hasMilestone("Eng",11))player.Eng.totalpp = new Decimal(0)
            if(!hasMilestone("Eng",11))player.Eng.pp = new Decimal(0)
                
            },
            buyMax() {
                  
            },
            style: {'height':'240px', 'width':'240px', 'font-size':'13px','border-radius': "50px",
                'background-color'() {
                    let points = player.E.inExam
                    let color = "#bf8f8f"
                    if (player.C.readingPoints.gte(tmp.Eng.readingReq)&&player.C.points.gte(tmp.Eng.pointsReq)) color = "#909561"
                    return color
                }
            },
            
    },
    12: {
        title: "<b>洗点",
        gain() { 
            let gain = new Decimal(5)
        return gain
    },
        display() {  
            let data = tmp[this.layer].buyables[this.id]
            let display = "进行一次英语语法重置，洗点您的英语网格，但是保留英语知识和英语语法。"
            return display;
        },
        unlocked() { return hasMilestone("C",0)}, 
        canAfford() { return true},
        buy() { 
            if(!hasMilestone("Eng",8))player.C.tier = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.balance1 = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.balance2 = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.total1 = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.total2 = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.totalGold = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.balanceGold = new Decimal(0)
            if(!hasMilestone("Eng",1))setBuyableAmount("C",54,new Decimal(0))
            if(!hasMilestone("Eng",1))setBuyableAmount("C",60,new Decimal(0))
            if(!hasMilestone("Eng",1))setBuyableAmount("C",61,new Decimal(0))
            if(!hasMilestone("Eng",1))setBuyableAmount("C",68,new Decimal(0))
            if(!hasMilestone("Eng",8))setBuyableAmount("C",41,new Decimal(0))
            if(!hasMilestone("Eng",8))setBuyableAmount("C",42,new Decimal(0))
            if(!hasMilestone("Eng",8))setBuyableAmount("C",43,new Decimal(0))
            if(!hasMilestone("Eng",8))setBuyableAmount("C",44,new Decimal(0))
            if(!hasMilestone("Eng",8))setBuyableAmount("C",59,new Decimal(0))
            if(!hasMilestone("Eng",8))player.C.readingPoints = new Decimal(1)
            if(!hasMilestone("Eng",2))player.C.pps = new Decimal(1)
            if(!hasMilestone("Eng",2))player.C.freeze = new Decimal(1)
            if(!hasMilestone("Eng",2))player.C.power = new Decimal(1)
            if(!hasMilestone("Eng",2))player.C.brainTier = new Decimal(0)
            if(!hasMilestone("Eng",8))player.C.points = player.C.points.sqrt().floor()
            if(!hasMilestone("Eng",8))player.points = player.points.sqrt().floor()
            if(!hasMilestone("Eng",11))player.Eng.upgrades = []
            if(hasMilestone("Eng",11)&&!hasMilestone("Eng",12))player.Eng.upgrades = ["15","25","35","45","55"]
            if(hasMilestone("Eng",12)&&!hasMilestone("Eng",15))player.Eng.upgrades = ["15","25","35","45","55","65","13","23","33","43","53","63"]
            if(hasMilestone("Eng",15)&&!hasMilestone("Eng",17))player.Eng.upgrades = ["15","25","35","45","55","65","75","13","23","33","43","53","63","73","14","24","34","44","54","64","74","17","27","37","47","57","67","77"]
            if(hasMilestone("Eng",17))player.Eng.upgrades = ["15","25","35","45","55","65","75","85","13","23","33","43","53","63","73","83","14","24","34","44","54","64","74","84","17","27","37","47","57","67","77","87"]
            player.Eng.pp = player.Eng.totalpp
            
        },
        buyMax() {
              
        },
        style: {'height':'150px', 'width':'150px', 'font-size':'10px','border-radius': "0px",
            'background-color'() {
                color = "#909561"
                return color
            }
        },
        
},
13: {
    title: "<b>完全洗点",
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() {  
        let data = tmp[this.layer].buyables[this.id]
        let display = "强行重置您全部的英语网格节点。<br>Tips:此功能只有在试着达成隐藏成就时才有作用，如果不想刷隐藏成就可以忽略！"
        return display;
    },
    unlocked() { return hasMilestone("Eng",11)}, 
    canAfford() { return true},
    buy() { 
        player.Eng.upgrades = []
        
    },
    buyMax() {
          
    },
    style: {'height':'150px', 'width':'150px', 'font-size':'10px','border-radius': "0px",
        'background-color'() {
            color = "#FF0000"
            return color
        }
    },
    
},
},
update(diff)
{
    if(player.Eng.points.gte(1)&&!hasMilestone("C",6)) player.Eng.power = player.Eng.power.add(new Decimal(diff).mul(tmp.Eng.effect))
    if(player.Eng.points.gte(1)&&player.Eng.power.lt(tmp.Eng.effect.mul(60))&&hasMilestone("C",6)) player.Eng.power = player.Eng.power.add(new Decimal(diff).mul(tmp.Eng.effect))
    if(player.Eng.points.gte(1)&&player.Eng.power.gte(tmp.Eng.effect.mul(60))&&hasMilestone("C",6)) player.Eng.power = player.Eng.power.add(new Decimal(diff).mul(tmp.Eng.effect).div(1000))
    if((player.Eng.power).gte(tmp.Eng.limit)&&!hasMilestone("Eng",14)) player.Eng.pp = player.Eng.pp.add(1),player.Eng.totalpp = player.Eng.totalpp.add(1)
    if((player.Eng.power).gte(tmp.Eng.limit)&&hasMilestone("Eng",14)) player.Eng.pp = player.Eng.pp.add(5),player.Eng.totalpp = player.Eng.totalpp.add(5)
    if(hasMilestone("Eng",2)) buyBuyable("C",41)
    if(hasMilestone("Eng",2)) buyBuyable("C",42)
    if(hasMilestone("Eng",2)) buyBuyable("C",43)
    if(hasMilestone("Eng",2)) buyBuyable("C",44)
    if(hasMilestone("Eng",2)) buyBuyable("C",59)
    if(hasMilestone("E",19)) player.Eng.time = player.Eng.time.add(new Decimal(diff))
},

milestones:{
    0: {
        requirementDescription: "1 英语语法(0)",
        effectDescription: "前10个英语语法中每个获得3倍的阅读感悟和10倍的考试经验，对英语语法重置保留天赋树内容，同时所有天赋技能成本公式由线性变为亚线性。解锁英语考试！",
        done() {
            return player.Eng.points.gte(1)
        }
    },
    1: {
        requirementDescription(){return format(new Decimal(1e8))+" 英语知识(1)"},
        effectDescription: "英语语法重置不再重置前4等级的名著许可。",
        done() {
            return player.Eng.power.gte(1e8)
        }
    },
    2: {
        requirementDescription: "2 英语语法(2)",
        effectDescription: "所有阅读感悟技能都可以自动购买。英语语法重置不再重置脑洞相关内容。同时英语网格再次扩展一行一列！",
        done() {
            return player.Eng.points.gte(2)
        }
    },
    3: {
        requirementDescription: "16 总英语单词(3)",
        effectDescription: "语文所有选择题作答快50%！",
        done() {
            return player.Eng.totalpp.gte(16)
        }
    },
    4: {
        requirementDescription: "同时拥有网格节点R1 和 R2(4)",
        effectDescription: "在语文考试中追加名著阅读！这项题目占8分！",
        done() {
            return hasUpgrade("Eng",11)&&hasUpgrade("Eng",21)
        }
    },
    5: {
        requirementDescription: "同时拥有网格节点Eng1 和 Eng2(5)",
        effectDescription: "在语文考试中追加现代文阅读！这项题目占15分！",
        done() {
            return hasUpgrade("Eng",12)&&hasUpgrade("Eng",22)
        }
    },
    6: {
        requirementDescription: "同时拥有 5 个英语网格节点(6)",
        effectDescription: "英语网格基础力量提升5%。",
        done() {
            return new Decimal(player.Eng.upgrades.length).gte(5)
        }
    },
    7: {
        requirementDescription: "同时拥有 6 个英语网格节点 & 3 英语语法(7)",
        effectDescription: "英语网格再次扩展一行一列！同时解锁一种全新的作文灵感，它的效果基于英语网格节点数目。",
        done() {
            return new Decimal(player.Eng.upgrades.length).gte(6)&&player.Eng.points.gte(3)
        }
    },
    8: {
        requirementDescription: "5 英语语法(8)",
        effectDescription: "英语语法重置和网格洗点不再会重置语文相关内容。",
        done() {
            return player.Eng.points.gte(5)
        }
    },
    9: {
        requirementDescription: "6 英语语法(9)",
        effectDescription: "在英语考试中追加3篇课外阅读。英语网格再次扩展一行一列！",
        done() {
            return player.Eng.points.gte(6)
        }
    },
    10: {
        requirementDescription: "7 英语语法(10)",
        effectDescription: "每个英语语法提升 1% 英语网格力量。在英语考试中解锁补全对话。",
        done() {
            return player.Eng.points.gte(7)
        }
    },
    11: {
        requirementDescription: "8 英语语法(11)",
        effectDescription: "英语语法重置不再重置任何东西且洗点只重置英语网格。对于任何重置保留C1~C5。同时解锁一行一列全新的英语网格！在英语考试中解锁完成句子！",
        done() {
            return player.Eng.points.gte(8)
        }
    },
    12: {
        requirementDescription: "10 英语语法(12)",
        effectDescription: "每秒获得所有好文精华的100%潜在阅读感悟。你无法继续手动领悟好文精华。同时平方C5，对于任何英语重置保留C6及P1-P6。",
        done() {
            return player.Eng.points.gte(10)
        }
    },
    13: {
        requirementDescription: "12 英语语法(13)",
        effectDescription: "P1效果翻倍。",
        done() {
            return player.Eng.points.gte(12)
        }
    },
    14: {
        requirementDescription: "同时拥有 30 个英语网格节点&最佳中考分数达到 158(14)",
        effectDescription: "经验挑战1效果x1.5。每次英语知识超越下一个英语知识获取阈值时，将获得5个英语单词。Pt列英语网格不消耗英语知识。同时解锁一行一列全新的英语网格节点！",
        done() {
            return new Decimal(player.Eng.upgrades.length).gte(30)&&player.E.bestPoints.gte(158)
        }
    },
    15: {
        requirementDescription: "28 英语语法 & 同时拥有 44 个英语网格节点(15)",
        effectDescription: "对于任何重置保留C7、Pt1-Pt7、P7及Exp1-Exp7。解锁3个高阶的作文灵感并删除3个较差的作文灵感！同时在语文阅读选项卡下解锁金句升级！此外，借景抒情的上限翻倍。",
        done() {
            return new Decimal(player.Eng.upgrades.length).gte(44)
        }
    },
    16: {
        requirementDescription: "32 英语语法 & 同时拥有 46 个英语网格节点(16)",
        effectDescription: "解锁一行一列全新的英语网格节点！",
        done() {
            return new Decimal(player.Eng.upgrades.length).gte(46)
        }
    },
    17: {
        requirementDescription: "2000 总英语单词(17)",
        effectDescription: "再度解锁3个高阶的作文灵感并删除3个较差的作文灵感，作文灵感冷却减半且题目给予的初始文笔属性保底为20，对于任何重置保留C8、Pt8、Exp8、P8。",
        done() {
            return player.Eng.totalpp.gte(2000)
        }
    },

},
    tabFormat:{
        "Main":{
            content:[
            "main-display",
            "blank",
            ["display-text",
    function() {return "您拥有的英语单词数量：<h2 style='color:#909561;text-shadow:0px 0px 10px;'>"+player.Eng.totalpp },
    {}],
    ["display-text",
    function() {return "它们给予了语文知识和学分加成 <h2 style='color:#909561;text-shadow:0px 0px 10px;'>"+format(tmp.Eng.ppEffect)+"x" },
    {}],
            ["bar","NextCD"],
            "blank",
            ["buyable",11],

"blank",
, "blank", "blank", ]
},
 "Milestones":{
            content:[
            "milestones",
            ]
},
"Grid":{
    content:[
        ["display-text",
    function() {return "您剩余可分配的英语单词数量：<h2 style='color:#909561;text-shadow:0px 0px 10px;'>"+player.Eng.pp },
    {}],
    ["display-text",
    function() {return "英语网格力量：<h2 style='color:#909561;text-shadow:0px 0px 10px;'>"+format(tmp.Eng.gridEffect.mul(100))+"%" },
    {}],
    ["display-text",
    function() {return "Tips:每次重置获取英语知识都会强制重置您英语网格的全部节点，并且重置您的英语单词&英语知识到0！"},
    {}],
    ["display-text",
    function() {if(hasMilestone("Eng",16))return "如果你无法正常显示英语网格，请调节浏览器的网页缩放或在设置中开启强制单标签模式！"},
    {}],
    ["row",[["buyable",12],["buyable",13]]],
    "blank",
    
        "upgrades",
    ],
    
},
    },
    bars:{

        NextCD: {
            direction: RIGHT,
            width: 700,
            height: 30,
            fillStyle: {'background-color' : "#909561"},
            Style: {'background-color' : "#909561"},
            req() {
                let req =new Decimal("1e3500")
                return req
            },
            display() {

                let r = "您需要 " + format(player.Eng.power) + " / " + format(tmp.Eng.limit)+ " 英语知识以获得下一个英语单词。"
                return r
            },
            progress() { 
                let f = player.Eng.power
                let p = f.div(tmp.Eng.limit)
                return p
            },
        },
    },
    limit()
    {
        let lim = new Decimal(1).mul(new Decimal(10).pow(player.Eng.totalpp.add(1)))
        if (player.Eng.totalpp.gte(150)) lim = lim.mul(new Decimal(2).pow(player.Eng.totalpp.sub(150)))
        if(hasUpgrade("Eng",12)) lim = lim.div(upgradeEffect("Eng",12))
        return lim
    },
    ppEffect()
    {
let base = new Decimal(25)
let eff = base.pow(player.Eng.totalpp)
if(getBuyableAmount("Exp",66).gte(1)) eff = eff.pow(5)
return eff
    },
})
addLayer("Am", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#c99a6b",                    // The color for this layer, which affects many elements.
    resource: "自动化",            // The name of this layer's main prestige resource.
    row: "side",   
    tooltip(){return "自动化"},                              // The row this layer is on (0 is the first row).
nodeStyle() { return {
			background: "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
		}},
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    buyables:
    {
        11: {
            title: "语文选择题自动化",
            canAfford() { return true},
            buy() {
               setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
               if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
               
            },
            display() {let display = "自动化语文选择题所有题目的作答。"
        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
        if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
        return display
    },
            effect(x) { 
              mult2 = new Decimal(1000).pow(x)
              return new Decimal(mult2)},
            unlocked(){return true},
            style:{
                "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                    
                },
            },
            12: {
                title: "语文默写自动化",
                canAfford() { return true},
                buy() {
                   setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                   if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                   
                },
                display() {let display = "自动化语文诗句默写所有题目的作答。"
            if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
            if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
            return display
        },
                effect(x) { 
                  mult2 = new Decimal(1000).pow(x)
                  return new Decimal(mult2)},
                unlocked(){return true},
                style:{
                    "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                        
                    },
                },
                13: {
                    title: "语文文言文自动化",
                    canAfford() { return true},
                    buy() {
                       setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                       if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                       
                    },
                    display() {let display = "自动化语文文言文阅读所有题目的作答。"
                if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                return display
            },
                    effect(x) { 
                      mult2 = new Decimal(1000).pow(x)
                      return new Decimal(mult2)},
                    unlocked(){return true},
                    style:{
                        "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                            
                        },
                    },
                    21: {
                        title: "语文现代文自动化",
                        canAfford() { return true},
                        buy() {
                           setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                           if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                           
                        },
                        display() {let display = "自动化语文现代文阅读所有题目的作答。"
                    if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                    if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                    return display
                },
                        effect(x) { 
                          mult2 = new Decimal(1000).pow(x)
                          return new Decimal(mult2)},
                        unlocked(){return true},
                        style:{
                            "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                
                            },
                        },
                        22: {
                            title: "语文综合性学习自动化",
                            canAfford() { return true},
                            buy() {
                               setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                               if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                               
                            },
                            display() {let display = "自动化语文综合性学习所有题目的作答。"
                        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                        if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                        return display
                    },
                            effect(x) { 
                              mult2 = new Decimal(1000).pow(x)
                              return new Decimal(mult2)},
                            unlocked(){return true},
                            style:{
                                "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                    
                                },
                            },
                            23: {
                                title: "语文名著阅读自动化",
                                canAfford() { return true},
                                buy() {
                                   setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                   if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                   
                                },
                                display() {let display = "自动化语文名著阅读所有题目的作答。"
                            if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                            if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                            return display
                        },
                                effect(x) { 
                                  mult2 = new Decimal(1000).pow(x)
                                  return new Decimal(mult2)},
                                unlocked(){return true},
                                style:{
                                    "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                        
                                    },
                                },
                                31: {
                                    title: "语文作文自动化",
                                    canAfford() { return true},
                                    buy() {
                                       setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                       if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                       
                                    },
                                    display() {let display = "自动花费60分钟进行语文作文的套作。"
                                if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                return display
                            },
                                    effect(x) { 
                                      mult2 = new Decimal(1000).pow(x)
                                      return new Decimal(mult2)},
                                    unlocked(){return true},
                                    style:{
                                        "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                            
                                        },
                                    },
                                    41: {
                                        title: "英语听力自动化",
                                        canAfford() { return true},
                                        buy() {
                                           setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                           if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                           
                                        },
                                        display() {let display = "自动化英语听力所有题目的解答。"
                                    if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                    if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                    return display
                                },
                                        effect(x) { 
                                          mult2 = new Decimal(1000).pow(x)
                                          return new Decimal(mult2)},
                                        unlocked(){return true},
                                        style:{
                                            "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                
                                            },
                                        },
                                        42: {
                                            title: "英语选择自动化",
                                            canAfford() { return true},
                                            buy() {
                                               setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                               if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                               
                                            },
                                            display() {let display = "自动化英语单项选择所有题目的解答。"
                                        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                        if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                        return display
                                    },
                                            effect(x) { 
                                              mult2 = new Decimal(1000).pow(x)
                                              return new Decimal(mult2)},
                                            unlocked(){return true},
                                            style:{
                                                "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                    
                                                },
                                            },
                                            43: {
                                                title: "英语选词填空自动化",
                                                canAfford() { return true},
                                                buy() {
                                                   setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                                   if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                                   
                                                },
                                                display() {let display = "自动化英语选词填空所有题目的解答。"
                                            if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                            if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                            return display
                                        },
                                                effect(x) { 
                                                  mult2 = new Decimal(1000).pow(x)
                                                  return new Decimal(mult2)},
                                                unlocked(){return true},
                                                style:{
                                                    "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                        
                                                    },
                                                },
                                                51: {
                                                    title: "英语阅读理解自动化",
                                                    canAfford() { return true},
                                                    buy() {
                                                       setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                                       if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                                       
                                                    },
                                                    display() {let display = "自动化英语阅读理解所有题目的解答。"
                                                if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                                if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                                return display
                                            },
                                                    effect(x) { 
                                                      mult2 = new Decimal(1000).pow(x)
                                                      return new Decimal(mult2)},
                                                    unlocked(){return true},
                                                    style:{
                                                        "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                            
                                                        },
                                                    },
                                                    52: {
                                                        title: "英语补全对话自动化",
                                                        canAfford() { return true},
                                                        buy() {
                                                           setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                                           if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                                           
                                                        },
                                                        display() {let display = "自动化英语补全对话所有题目的解答。"
                                                    if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                                    if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                                    return display
                                                },
                                                        effect(x) { 
                                                          mult2 = new Decimal(1000).pow(x)
                                                          return new Decimal(mult2)},
                                                        unlocked(){return true},
                                                        style:{
                                                            "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                                
                                                            },
                                                        },
                                                        53: {
                                                            title: "英语完成句子自动化",
                                                            canAfford() { return true},
                                                            buy() {
                                                               setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                                               if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                                               
                                                            },
                                                            display() {let display = "自动化英语完成句子所有题目的解答。"
                                                        if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                                        if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                                        return display
                                                    },
                                                            effect(x) { 
                                                              mult2 = new Decimal(1000).pow(x)
                                                              return new Decimal(mult2)},
                                                            unlocked(){return hasChallenge("Exp",12)},
                                                            style:{
                                                                "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                                    
                                                                },
                                                            },
                                                        61: {
                                                                title: "英语任务型阅读自动化",
                                                                canAfford() { return true},
                                                                buy() {
                                                                   setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                                                   if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                                                   
                                                                },
                                                                display() {let display = "自动化英语任务型阅读所有题目的解答。"
                                                            if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                                            if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                                            return display
                                                        },
                                                                effect(x) { 
                                                                  mult2 = new Decimal(1000).pow(x)
                                                                  return new Decimal(mult2)},
                                                                unlocked(){return hasChallenge("Exp",22)},
                                                                style:{
                                                                    "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                                        
                                                                    },
                                                                },
                                                                62: {
                                                                    title: "英语首字母填空自动化",
                                                                    canAfford() { return true},
                                                                    buy() {
                                                                       setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                                                                       if(getBuyableAmount(this.layer,this.id)>= 2)  setBuyableAmount(this.layer,this.id,new Decimal(0))
                                                                       
                                                                    },
                                                                    display() {let display = "自动化英语首字母填空所有题目的解答。"
                                                                if(getBuyableAmount(this.layer,this.id).gte(1)) display += "<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'><br>(已开启)"
                                                                if(getBuyableAmount(this.layer,this.id).lt(1)) display += "<h4 style='color:#FF0000;text-shadow:0px 0px 10px;'><br>(已关闭)"
                                                                return display
                                                            },
                                                                    effect(x) { 
                                                                      mult2 = new Decimal(1000).pow(x)
                                                                      return new Decimal(mult2)},
                                                                    unlocked(){return hasChallenge("Exp",22)},
                                                                    style:{
                                                                        "background": "radial-gradient(circle, #c99a6b 0%, #706d6d 100%)"
                                                                            
                                                                        },
                                                                    },
          },
    layerShown() { return hasChallenge("Exp",11)&&!inChallenge("Exp",21)&&!inChallenge("Exp",22) },
    tabFormat:{
        "Chinese":{
            content:[
                ["row",[["buyable",11],["buyable",12],["buyable",13]]],
                ["row",[["buyable",21],["buyable",22],["buyable",23]]],
                ["row",[["buyable",31]]],
   
            ],
            onclick(){ChineseAutomate()}
},      
"English":{
    content:[
        ["row",[["buyable",41],["buyable",42],["buyable",43]]],
        ["row",[["buyable",51],["buyable",52],["buyable",53]]],
        ["row",[["buyable",61],["buyable",62],["buyable",63]]],
    ],
    onclick(){EnglishAutomate()}
},          

    },
    upgrades: {
         
    },
    
})
addLayer("M", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#8B8175",                       // The color for this layer, which affects many elements.
    resource: "数学理论",            // The name of this layer's main prestige resource.
    row: 0,   
    baseResource: "学分",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,  
    position: 1,                        // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { return hasMilestone("E",24) }, 
    buyables:{
        11: {
            title: "<b>重置并获得 ??????",
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() {  
                let data = tmp[this.layer].buyables[this.id]
                let display = "需要"+format(player.Eng.power)+" / "+" 1e1444 英语知识<br>需要"+player.Eng.upgrades.length+" / "+"56 个已购买的英语网格节点<br>需要"+format(player.C.points)+" / 1e60000 语文知识<br>这是第一个数学相关资源的重置需求，目前无法重置，达到之后恭喜当前版本毕业！"
                return display;
            },
            unlocked() { return true}, 
            canAfford() { return false},
            buy() { 

            },
            buyMax() {
                  
            },
            style: {'height':'240px', 'width':'240px', 'font-size':'13px','border-radius': "50px",
            },
            
    },
         },          

    upgrades: {
         
    },
    tabFormat:{
        "Phigros":{
            content:[
                "buyables"
                
    ]
},          

    },
})
function ChineseAutomate()
{
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",31)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",32)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",33)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",34)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",35)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",36)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",37)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",38)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",39)
    
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",41)
    if(getBuyableAmount("Am",11).gte(1)) buyBuyable("E",42)
    if(getBuyableAmount("Am",12).gte(1)) buyBuyable("E",44)
    if(getBuyableAmount("Am",12).gte(1)) buyBuyable("E",45)
    if(getBuyableAmount("Am",12).gte(1)) buyBuyable("E",46)
    if(getBuyableAmount("Am",12).gte(1)) buyBuyable("E",47)
    if(getBuyableAmount("Am",12).gte(1)) buyBuyable("E",48)
    if(getBuyableAmount("Am",12).gte(1)) buyBuyable("E",49)
    if(getBuyableAmount("Am",13).gte(1)) buyBuyable("E",68)
    if(getBuyableAmount("Am",13).gte(1)) buyBuyable("E",69)
    if(getBuyableAmount("Am",13).gte(1)) buyBuyable("E",71)
    if(getBuyableAmount("Am",13).gte(1)) buyBuyable("E",72)
    if(getBuyableAmount("Am",13).gte(1)) buyBuyable("E",75)
    if(getBuyableAmount("Am",13).gte(1)) buyBuyable("E",76)
    if(getBuyableAmount("Am",13).gte(1)) buyBuyable("E",77)
    if(getBuyableAmount("Am",21).gte(1)) buyBuyable("E",167)
    if(getBuyableAmount("Am",21).gte(1)) buyBuyable("E",168)
    if(getBuyableAmount("Am",21).gte(1)) buyBuyable("E",169)
    if(getBuyableAmount("Am",21).gte(1)) buyBuyable("E",170)
    if(getBuyableAmount("Am",22).gte(1)) buyBuyable("E",107)
    if(getBuyableAmount("Am",22).gte(1)) buyBuyable("E",108)
    if(getBuyableAmount("Am",23).gte(1)) buyBuyable("E",162)
    if(getBuyableAmount("Am",23).gte(1)) buyBuyable("E",163)
    if(getBuyableAmount("Am",23).gte(1)) buyBuyable("E",164)
    if(getBuyableAmount("Am",31).gte(1)&&player.E.completedZuowen.lt(1)) buyBuyable("E",160)
}
function EnglishAutomate()
{
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",118)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",119)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",120)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",121)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",122)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",123)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",124)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",125)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",126)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",127)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",128)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",129)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",130)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",131)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",132)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",133)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",134)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",135)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",136)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",137)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",138)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",139)
    if(getBuyableAmount("Am",41).gte(1)) buyBuyable("E",140)
    if(getBuyableAmount("Am",42).gte(1)) buyBuyable("E",142)
    if(getBuyableAmount("Am",42).gte(1)) buyBuyable("E",148)
    if(getBuyableAmount("Am",42).gte(1)) buyBuyable("E",154)
    if(getBuyableAmount("Am",43).gte(1)) buyBuyable("E",172)
    if(getBuyableAmount("Am",43).gte(1)) buyBuyable("E",178)
    if(getBuyableAmount("Am",51).gte(1)) buyBuyable("E",187)
    if(getBuyableAmount("Am",51).gte(1)) buyBuyable("E",193)
    if(getBuyableAmount("Am",51).gte(1)) buyBuyable("E",199)
    if(getBuyableAmount("Am",52).gte(1)) buyBuyable("E",206)
    if(getBuyableAmount("Am",53).gte(1)) buyBuyable("E",213)
    if(getBuyableAmount("Am",61).gte(1)) buyBuyable("E",220)
    if(getBuyableAmount("Am",62).gte(1)) buyBuyable("E",227)
    if(getBuyableAmount("Am",62).gte(1)) buyBuyable("E",233)
}
function examReset()
{
    setBuyableAmount("E",31,new Decimal(0))
    setBuyableAmount("E",32,new Decimal(0))
    setBuyableAmount("E",33,new Decimal(0))
    setBuyableAmount("E",34,new Decimal(0))
    setBuyableAmount("E",35,new Decimal(0))
    setBuyableAmount("E",36,new Decimal(0))
    setBuyableAmount("E",37,new Decimal(0))
    setBuyableAmount("E",38,new Decimal(0))
    setBuyableAmount("E",39,new Decimal(0))
    setBuyableAmount("E",40,new Decimal(0))
    setBuyableAmount("E",41,new Decimal(0))
    setBuyableAmount("E",42,new Decimal(0))
    setBuyableAmount("E",44,new Decimal(0))
    setBuyableAmount("E",45,new Decimal(0))
    setBuyableAmount("E",46,new Decimal(0))
    setBuyableAmount("E",47,new Decimal(0))
    setBuyableAmount("E",48,new Decimal(0))
    setBuyableAmount("E",49,new Decimal(0))
    setBuyableAmount("E",68,new Decimal(0))
    setBuyableAmount("E",69,new Decimal(0))
    setBuyableAmount("E",71,new Decimal(0))
    setBuyableAmount("E",72,new Decimal(0))
    setBuyableAmount("E",73,new Decimal(0))
    setBuyableAmount("E",75,new Decimal(0))
    setBuyableAmount("E",76,new Decimal(0))
    setBuyableAmount("E",77,new Decimal(0))
    setBuyableAmount("E",88,new Decimal(0))
    setBuyableAmount("E",89,new Decimal(0))
    setBuyableAmount("E",90,new Decimal(0))
    setBuyableAmount("E",92,new Decimal(0))
    setBuyableAmount("E",93,new Decimal(0))
    setBuyableAmount("E",94,new Decimal(0))
    setBuyableAmount("E",95,new Decimal(0))
    setBuyableAmount("E",100,new Decimal(0))
    setBuyableAmount("E",101,new Decimal(0))
    setBuyableAmount("E",102,new Decimal(0))
    setBuyableAmount("E",103,new Decimal(0))
    setBuyableAmount("E",104,new Decimal(0))
    setBuyableAmount("E",105,new Decimal(0))
    setBuyableAmount("E",107,new Decimal(0))
    setBuyableAmount("E",108,new Decimal(0))
    setBuyableAmount("E",109,new Decimal(0))
    setBuyableAmount("E",110,new Decimal(0))
    setBuyableAmount("E",111,new Decimal(0))
    setBuyableAmount("E",112,new Decimal(0))
    setBuyableAmount("E",113,new Decimal(0))
    setBuyableAmount("E",118,new Decimal(0))
    setBuyableAmount("E",119,new Decimal(0))
    setBuyableAmount("E",120,new Decimal(0))
    setBuyableAmount("E",121,new Decimal(0))
    setBuyableAmount("E",122,new Decimal(0))
    setBuyableAmount("E",124,new Decimal(0))
    setBuyableAmount("E",125,new Decimal(0))
    setBuyableAmount("E",126,new Decimal(0))
    setBuyableAmount("E",127,new Decimal(0))
    setBuyableAmount("E",128,new Decimal(0))
    setBuyableAmount("E",130,new Decimal(0))
    setBuyableAmount("E",131,new Decimal(0))
    setBuyableAmount("E",132,new Decimal(0))
    setBuyableAmount("E",133,new Decimal(0))
    setBuyableAmount("E",134,new Decimal(0))
    setBuyableAmount("E",136,new Decimal(0))
    setBuyableAmount("E",137,new Decimal(0))
    setBuyableAmount("E",138,new Decimal(0))
    setBuyableAmount("E",139,new Decimal(0))
    setBuyableAmount("E",140,new Decimal(0))
    setBuyableAmount("E",143,new Decimal(0))
    setBuyableAmount("E",144,new Decimal(0))
    setBuyableAmount("E",145,new Decimal(0))
    setBuyableAmount("E",146,new Decimal(0))
    setBuyableAmount("E",147,new Decimal(0))
    setBuyableAmount("E",149,new Decimal(0))
    setBuyableAmount("E",150,new Decimal(0))
    setBuyableAmount("E",151,new Decimal(0))
    setBuyableAmount("E",152,new Decimal(0))
    setBuyableAmount("E",153,new Decimal(0))
    setBuyableAmount("E",155,new Decimal(0))
    setBuyableAmount("E",156,new Decimal(0))
    setBuyableAmount("E",157,new Decimal(0))
    setBuyableAmount("E",158,new Decimal(0))
    setBuyableAmount("E",159,new Decimal(0))
    setBuyableAmount("E",162,new Decimal(0))
    setBuyableAmount("E",163,new Decimal(0))
    setBuyableAmount("E",164,new Decimal(0))
    setBuyableAmount("E",166,new Decimal(0))
    setBuyableAmount("E",167,new Decimal(0))
    setBuyableAmount("E",168,new Decimal(0))
    setBuyableAmount("E",169,new Decimal(0))
    setBuyableAmount("E",170,new Decimal(0))
    setBuyableAmount("E",171,new Decimal(0))
    setBuyableAmount("E",172,new Decimal(0))
    setBuyableAmount("E",173,new Decimal(0))
    setBuyableAmount("E",174,new Decimal(0))
    setBuyableAmount("E",175,new Decimal(0))
    setBuyableAmount("E",176,new Decimal(0))
    setBuyableAmount("E",177,new Decimal(0))
    setBuyableAmount("E",178,new Decimal(0))
    setBuyableAmount("E",179,new Decimal(0))
    setBuyableAmount("E",180,new Decimal(0))
    setBuyableAmount("E",181,new Decimal(0))
    setBuyableAmount("E",182,new Decimal(0))
    setBuyableAmount("E",183,new Decimal(0))
    setBuyableAmount("E",184,new Decimal(0))
    setBuyableAmount("E",185,new Decimal(0))
    setBuyableAmount("E",187,new Decimal(0))
    setBuyableAmount("E",188,new Decimal(0))
    setBuyableAmount("E",189,new Decimal(0))
    setBuyableAmount("E",190,new Decimal(0))
    setBuyableAmount("E",191,new Decimal(0))
    setBuyableAmount("E",192,new Decimal(0))
    setBuyableAmount("E",193,new Decimal(0))
    setBuyableAmount("E",194,new Decimal(0))
    setBuyableAmount("E",195,new Decimal(0))
    setBuyableAmount("E",196,new Decimal(0))
    setBuyableAmount("E",197,new Decimal(0))
    setBuyableAmount("E",198,new Decimal(0))
    setBuyableAmount("E",199,new Decimal(0))
    setBuyableAmount("E",200,new Decimal(0))
    setBuyableAmount("E",201,new Decimal(0))
    setBuyableAmount("E",202,new Decimal(0))
    setBuyableAmount("E",203,new Decimal(0))
    setBuyableAmount("E",204,new Decimal(0))
    setBuyableAmount("E",207,new Decimal(0))
    setBuyableAmount("E",208,new Decimal(0))
    setBuyableAmount("E",209,new Decimal(0))
    setBuyableAmount("E",210,new Decimal(0))
    setBuyableAmount("E",211,new Decimal(0))
    setBuyableAmount("E",214,new Decimal(0))
    setBuyableAmount("E",215,new Decimal(0))
    setBuyableAmount("E",216,new Decimal(0))
    setBuyableAmount("E",217,new Decimal(0))
    setBuyableAmount("E",218,new Decimal(0))
    setBuyableAmount("E",221,new Decimal(0))
    setBuyableAmount("E",222,new Decimal(0))
    setBuyableAmount("E",223,new Decimal(0))
    setBuyableAmount("E",224,new Decimal(0))
    setBuyableAmount("E",225,new Decimal(0))
    setBuyableAmount("E",228,new Decimal(0))
    setBuyableAmount("E",229,new Decimal(0))
    setBuyableAmount("E",230,new Decimal(0))
    setBuyableAmount("E",231,new Decimal(0))
    setBuyableAmount("E",232,new Decimal(0))
    setBuyableAmount("E",234,new Decimal(0))
    setBuyableAmount("E",235,new Decimal(0))
    setBuyableAmount("E",236,new Decimal(0))
    setBuyableAmount("E",237,new Decimal(0))
    setBuyableAmount("E",238,new Decimal(0))
    setBuyableAmount("E",258,new Decimal(0))

}