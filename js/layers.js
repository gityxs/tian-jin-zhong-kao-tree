addLayer("C", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        tier: new Decimal(0),
        brainTier: new Decimal(0),
        readingPoints: new Decimal(0),
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
        end: new Decimal(0),
        read: new Decimal(0),
                  // "points" is the internal name for the main resource of the layer.
    }},
    goldMult()
    {
        let mult = new Decimal(1)
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
        if(player.C.totalGold.gte(1)) mult = mult.mul(tmp.C.effectGold2)
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
    
    
    infoboxes: {
        1: {
                title(){return "1阶好文精华"},
                body(){
                        let a = "您总共获得过<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(player.C.total1)+"<h4>个1阶好文精华，加成语文知识获取<h4 style='color:#00FF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effect1)+"x<h4>(上限在5000兆).<br>"
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
                    let a = "您总共获得过<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(player.C.totalGold)+"<h4>个金句摘抄，加成学分与语文知识获取<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effectGold1)+"x<h4>(上限在100穰).<br>，同时提升阅读感悟获取效率<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(tmp.C.effectGold2)+"x<h4>(上限在30).<br>"
                    let b = "您当前拥有<h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>"+format(player.C.balanceGold)+"<h4>个金句摘抄。<br>"
                    let c = "金句摘抄是脑洞精炼的必要原料！"

                    return a + b + c
            },
            style() { return {borderColor: "#FFFF00",}},
            titleStyle() { return {backgroundColor: "#FFFF00",color: "#000000"}},
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
            style() { return {'background-color': "#111111",color: "white", 'border-color': "#444444",'border-radius': "5px", height: "120px", width: "240px"}},
            unlocked(){return true},
            
          },
        21: {
            title: "1阶精选好文",
            canAfford() { return false},
            buy() {
               setBuyableAmount("Nf",11,new Decimal(1))
               setBuyableAmount("Nf",12,new Decimal(0))
            },
            display() {return "阅读进度："+format(player.C.remain1)+"/ 2<br>阅读奖励：<br>(100%)1阶好文精华*1<br>(2.5%)金句摘抄*1"},
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
            unlocked(){return hasMilestone("E",8)},
            
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
            unlocked(){return hasMilestone("E",8)},
            
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
            unlocked(){return hasMilestone("E",8)},
            
          },
          41: {
            title: "阅读技能1:阅读感悟效率提升",
            canAfford() { return player.C.readingPoints.gte(this.cost())},
            cost(x) {return new Decimal(10).pow(x.add(1))},
            buy() {
              player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升阅读感悟获取倍率。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：阅读感悟获取x${format(this.effect())}`},
            effect(x) { 
              let base = new Decimal(2)
              mult2 = base.pow(x)
              return mult2},
            unlocked(){return hasMilestone("E",8)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
          },
          42: {
            title: "阅读技能2:天赋技能2基础倍增",
            canAfford() { return player.C.readingPoints.gte(this.cost())},
            cost(x) {return new Decimal(15).mul(new Decimal(3).pow(x))},
            buy() {
              player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `倍增天赋技能2基础。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：天赋技能2基础x${format(this.effect())}`},
            effect(x) { 
              let base = new Decimal(1.5)
              if(hasMilestone("E",9)) x = x.add(2)
              mult2 = base.pow(x)
              return mult2},
            unlocked(){return hasMilestone("E",8)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
          },
          43: {
            title: "阅读技能3:经验获取倍增",
            canAfford() { return player.C.readingPoints.gte(this.cost())},
            cost(x) {return new Decimal(30).mul(new Decimal(4).pow(x))},
            buy() {
              player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `倍增考试过程中的经验获取。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：所有经验获取x${format(this.effect())}`},
            effect(x) { 
              let base = new Decimal(2.5)
              mult2 = base.pow(x)
              return mult2},
            unlocked(){return hasMilestone("E",8)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
          },
          44: {
            title: "阅读技能4:金句摘抄概率提升",
            canAfford() { return player.C.readingPoints.gte(this.cost())},
            cost(x) {return new Decimal(200).mul(new Decimal(5).pow(x))},
            buy() {
              player.C.readingPoints = player.C.readingPoints.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升金句摘抄的获取概率。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}阅读感悟\n效果：金句摘抄获取概率+${format(this.effect())}%`},
            effect(x) { 
              let base = new Decimal(0.5)
              mult2 = base.mul(x)
              return mult2},
            unlocked(){return hasMilestone("C",4)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
          },
    },
    update(diff)
    {
    if(player.C.remain1.lte(0)&&!tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain1 = new Decimal(2), player.C.balance1 = player.C.balance1.add(tmp.C.readMult), player.C.total1 = player.C.total1.add(tmp.C.readMult), player.C.end = new Decimal(1)
    if(player.C.remain1.lte(0)&&tmp.C.goldChance.gte(player.E.random.mul(10))) player.C.remain1 = new Decimal(2), player.C.balance1 = player.C.balance1.add(tmp.C.readMult), player.C.total1 = player.C.total1.add(tmp.C.readMult), player.C.end = new Decimal(1),player.C.totalGold = player.C.totalGold.add(tmp.C.goldMult),player.C.balanceGold = player.C.balanceGold.add(tmp.C.goldMult)
    if(player.C.end.gte(1)&&player.C.tier == 0) player.C.current = new Decimal(1)
    if(hasMilestone("E",6)) player.C.currentlyFreeze = player.C.currentlyFreeze.sub(diff)
    if(player.C.currentlyFreeze.lt(0)) player.C.currentlyFreeze = player.C.freeze, player.C.read = new Decimal(1)
    if(player.C.read.gte(1)&&player.C.current == 1) player.C.remain1 = player.C.remain1.sub(player.C.power),player.C.read = new Decimal(0)
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
        let sc = new Decimal("1e16")
        return sc;
    },
    softcapPower() {
        let scp = new Decimal(0.53)
        if(hasMilestone("C",3)) scp = scp.plus(0.03)
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
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
    upgrades: {
        11: {
            title: "在山的那边",
            description: "每秒自动生产10学分。",
            cost: new Decimal(10),
            effect(){ let eff = new Decimal(10)
            return eff
            },
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
                if(getBuyableAmount("Exp",13).gte(1)) eff = eff.mul(buyableEffect("Exp",13))
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
                    if(getBuyableAmount("Exp",13).gte(1)) eff = eff.mul(buyableEffect("Exp",13))
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
                        if(getBuyableAmount("Exp",13).gte(1)) eff = eff.mul(buyableEffect("Exp",13))
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
                            if(getBuyableAmount("Exp",13).gte(1)) eff = eff.mul(buyableEffect("Exp",13))
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
    },
    passiveGeneration(){return hasMilestone('C',1)? 1 : 0},
    tabFormat:{
        "Main":{
            content:[
    "main-display",
    function(){if(!hasMilestone("C",1))return "prestige-button"},
    "blank",
    ["display-text",
            function() {return "↑点击以学习语文，提升语文知识！"},
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
["buyable",11],
["buyable",21],
function(){if(player.C.totalGold.gte(1))return ["infobox","2"]},
function(){if(player.C.total1.gte(1))return ["infobox","1"]},

["row",[["buyable",31],["buyable",32],["buyable",33]]],
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
["row",[["buyable",44]]],
],
unlocked(){return hasMilestone("E",8)}
},
}
})

addLayer("E", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,
        random: new Decimal(0),                    // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        bestPoints: new Decimal(0),
        rank: new Decimal(109123),
        inExam: new Decimal(0),
        completedExam: new Decimal(0),
        year: new Decimal(2022),
        Chinese: new Decimal(0),
        inChinese: new Decimal(0),
        ChineseBest: new Decimal(0),
        ChineseTime: new Decimal(0),
        freeze: new Decimal(0),       // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FFFFFF",                       // The color for this layer, which affects many elements.
    resource: "中考分数",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "学分",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

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
            requirementDescription: "最佳中考分数达到 16 (10)",
            effectDescription: "恭喜目前版本毕业！",
            done() {
                return player.E.bestPoints.gte(16)
            },
            unlocked(){
                return hasMilestone("E",9)
                            },
        },
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    buyables:{
    11: {
        title: "参加中考！",
        gain() { 
            let gain = new Decimal(5)
        return gain
    },
        display() { // Everything else displayed in the buyable button after the title
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
        player.E.inChinese = new Decimal(1)
        player.E.points = new Decimal(0)
        },
        buyMax() {
            // I'll do this later ehehe
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
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本试卷分为第I卷（选择题）、第II卷两部分。第I卷为第1页至第4页。第II卷为第5页至第8页。<br>试卷满分120分，答题时间120min。<h4>剩余时间:<h2>"+player.E.ChineseTime+"s<h2><h4>祝你考试顺利！<h4>")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "150px", width: "600px"}},
    autoed() { return false},
},
22: {
    title(){return "<h2>一、选择题<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共11小题，共28分。1~4小题、6小题，每题2分；5小题，7~11小题，每题3分")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
31: {
    title(){return "(2分) 选择题T1：字音字形"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
32: {
    title(){return "(2分) 选择题T2：词语选择"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance()))setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
33: {
    title(){return "(2分) 选择题T3：病句辨析"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
34: {
    title(){return "(2分) 选择题T4：标点符号判断"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
35: {
    title(){return "(3分) 选择题T5：诗词赏析"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
36: {
    title(){return "(2分) 选择题T6：说明文阅读-Easy"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(2)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
37: {
    title(){return "(3分) 选择题T7：说明文阅读-Hard"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
38: {
    title(){return "(3分) 选择题T8：说明文阅读-Insane"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e10000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte("1e3000")) chs = new Decimal(0.001)
        if(player.C.points.gte("1e3000")&&!player.C.points.gte("1e4000")) chs = new Decimal(0.1)
        if(player.C.points.gte("1e4000")&&!player.C.points.gte("1e6000")) chs = new Decimal(1)
        if(player.C.points.gte("1e6000")&&!player.C.points.gte("1e10000")) chs = new Decimal(5)
        if(player.C.points.gte("1e10000")) chs = player.C.points.log10().div(24000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        return chs
    },
    time(){
        let time = new Decimal(3000)
        if(player.C.points.gte("1e2000")) time = time.sub(900)
        if(player.C.points.gte("1e5000")) time = time.sub(600)
        if(player.C.points.gte("1e8000")) time = time.sub(300)
        if(player.C.points.gte("1e16000")) time = time.sub(300)
        if(player.C.points.gte("1e24000")) time = time.sub(300)
        if(player.C.points.gte("1e32000")) time = time.sub(300)
        if(player.C.points.gte("1e64000")) time = time.sub(150)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
39: {
    title(){return "(3分) 选择题T9：课内文言文赏析-Easy"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
41: {
    title(){return "(3分) 选择题T10：课内文言文赏析-Hard"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
42: {
    title(){return "(3分) 选择题T11：课内文言文赏析-Insane"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return true }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(3)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
43: {
    title(){return "<h2>二、诗句补充<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共1小题，共7分。")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
44: {
    title(){return "(1分)①小学诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
45: {
    title(){return "(1分)②七年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
46: {
    title(){return "(1分)③七年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
47: {
    title(){return "(1分)④八年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
48: {
    title(){return "(1分)⑤八年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
49: {
    title(){return "(2分)⑥*理解性默写*九年级诗词"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
51: {
    title(){return "交卷！"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        if(player.E.inChinese.gte(1))display = ("完成你本次中考语文科目的考试。<br>*交卷后无法对语文科目答题卡进行操作！<br><h4 style='color:#FFFF00;text-shadow:0px 0px 10px;'>请慎重交卷，在交卷前认真检查答题卡！<h4>")
        if(player.E.inChinese.lt(1))display = ("您已完成本次中考语文科目的考试。努力完成剩余科目的考试吧！")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return player.E.inChinese.gte(1)},
    buy() { 
    player.E.inChinese = new Decimal(0)  
    player.E.points = player.E.points.add(player.E.Chinese)
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.inChinese.gte(1))return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "10px", height: "100px", width: "300px"}
    if(player.E.inChinese.lt(1))return {'background-color': "#000000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFFFF",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
52: {
    title(){return "完成中考并查分！"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("完成你"+player.E.year+"年的中考旅程，并且查询中考分数。你所有科目的对错题情况也会揭晓。<br>*确保你已完成您所有已解锁科目的考试，再点击此处完成中考！")
        return display;
    },
    unlocked() { return player.E.inExam.gte(1)&&player.E.completedExam.lt(1) }, 
    canAfford() { return true},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "10px", height: "100px", width: "300px"}},
    autoed() { return false},
},
53: {
    title(){return "<h2>天津市初中学业水平考试信息综合查询平台<h1><br><h3>"+player.E.year+"年初中学业水平考试成绩查询结果<h3>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("姓名：Zihan Zhang<br>考生号：202050007<br>考场号：25081<br>座位号：51<br>考试日期："+player.E.year+".6.8")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
         
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#DDDDDD", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#FFFFFF",'border-radius': "3px", height: "150px", width: "600px"}},
    autoed() { return false},
},
54: {
    title(){return "<h3>语文："+player.E.Chinese+"/120"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
55: {
    title(){return "<h3>数学：0/120"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#7A7064", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#8B8175",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
56: {
    title(){return "<h3>英语：0/120"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#808450", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#909561",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
57: {
    title(){return "<h3>政治：0/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#628D44", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#739E55",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
58: {
    title(){return "<h3>历史：0/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#379350", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
59: {
    title(){return "<h3>地理：0/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#24A089", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#35B09A",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
60: {
    title(){return "<h3>生物：0/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#1686C3", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
61: {
    title(){return "<h3>物理：0/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#1035D0", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2146E0",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
62: {
    title(){return "<h3>化学：0/100"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#601EDC", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#702FED",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
63: {
    title(){return "<h3>体育：0/40"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#EB1DEC", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FC2EFD",'border-radius': "3px", height: "30px", width: "200px"}},
    autoed() { return false},
},
64: {
    title(){return "<h3>总成绩："+player.E.points+"/1000"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#DDDD00", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "3px", height: "30px", width: "600px"}},
    autoed() { return false},
},
65: {
    title(){return "<h2>录取通知书"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("Ignotus同学：<br>您以"+player.E.points+"分数被我校录取，中考排名天津市第"+tmp.E.Rank+"名，请凭本通知书来我校报到。<br><br>祝您高中学习生活愉快！<br><br><br><h2 style='color:#000000;text-shadow:0px 0px 10px;'>                  家里蹲<h2>")
        return display;
    },
    unlocked() { return true }, 
    canAfford() { return false},
    buy() { 
    player.E.completedExam = new Decimal(1)  
    player.E.inChinese = new Decimal(0) 
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#DDDDDD", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#FFFFFF",'border-radius': "3px", height: "200px", width: "600px"}},
    autoed() { return false},
},
66: {
    title(){return "<h2>好耶！"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("总结考试经验，记录考试成绩，备战"+player.E.year.add(1)+"年的中考！<br>Tips:点击*1次(多点后果自负！)*此按钮之后等待约5秒后刷新页面并点击【Main】以继续游戏")
        return display;
    },
    unlocked() { return player.E.inExam.gte(1) }, 
    canAfford() { return true},
    buy() { 
    if(player.Exp.unlocked)player.Exp.points = player.Exp.points.add(new Decimal(10).mul(tmp.Exp.expMult))
    if(player.Exp.unlocked)player.Exp.points = player.Exp.points.add(player.E.points.mul(5).mul(tmp.Exp.expMult))
    if(player.E.points.gte(6))player.Exp.points = player.Exp.points.add((player.E.points.sub(5)).mul(100).mul(tmp.Exp.expMult))
    if(player.E.points.gte(11))player.Exp.points = player.Exp.points.add((player.E.points.sub(10)).mul(10000).mul(tmp.Exp.expMult))
    player.E.inExam = new Decimal(0)
    if(tmp.E.Rank.lt(player.E.rank)) player.E.rank = tmp.E.Rank
    if(player.E.points.gte(player.E.bestPoints)) player.E.bestPoints = player.E.points
    player.E.Chinese = new Decimal(0)
    player.E.points = new Decimal(0)
    player.E.completedExam = new Decimal(0)
    player.E.freeze = new Decimal(360)
    examReset()
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "3px", height: "100px", width: "400px"}},
    autoed() { return false},
},
67: {
    title(){return "<h2>三、文言文阅读<h2>"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本大题共3小题，共7分。")
        return display;
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return false},
    buy() { 
         
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "60px", width: "600px"}},
    autoed() { return false},
},
68: {
    title(){return "(1分)T13:①解释文言文字词意思"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
69: {
    title(){return "(1分)T13:②解释文言文字词意思"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e9000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e5000)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e6000)&&!player.C.points.gte(1e112)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e7000)&&!player.C.points.gte(1e140)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e8000)&&!player.C.points.gte(1e192)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e9000)) chs = player.C.points.log10().div(270).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
         if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
         if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
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
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
70: {
    title(){return "(2分)T14:翻译文言文句子"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本小题包含2个答题点，前一个答题点回答的正确与否将会影响后一个答题点的回答成功率！")
        return display;
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return false},
    buy() { 
         
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
71: {
    title(){return "答题点1(Easy)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
72: {
    title(){return "答题点2(Hard)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        if(getBuyableAmount("E",71) == 1) chs = chs.mul(1.2)
        if(getBuyableAmount("E",71) == 2) chs = chs.mul(0.6)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
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
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "200px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "200px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "200px"}},
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
    display() { // Everything else displayed in the buyable button after the title
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
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "200px", width: "200px"}},
    autoed() { return false},
},
74: {
    title(){return "(3分)T15:分析文言文人物形象"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        let display = ("本小题包含3个答题点，前一个答题点回答的正确与否将会影响后一个答题点的回答成功率！")
        return display;
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return false},
    buy() { 
         
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "200px"}},
    autoed() { return false},
},
75: {
    title(){return "答题点1(Easy)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e10000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e6000)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e6000)&&!player.C.points.gte(1e8000)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e8000)&&!player.C.points.gte(1e9000)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e9000)&&!player.C.points.gte(1e10000)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e10000)) chs = player.C.points.log10().div(50000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        return chs
    },
    time(){
        let time = new Decimal(2400)
        if(player.C.points.gte(1e6000)) time = time.sub(720)
        if(player.C.points.gte(1e8000)) time = time.sub(480)
        if(player.C.points.gte(1e16000)) time = time.sub(240)
        if(player.C.points.gte(1e40000)) time = time.sub(240)
        if(player.C.points.gte(1e80000)) time = time.sub(240)
        if(player.C.points.gte(1e160000)) time = time.sub(240)
        if(player.C.points.gte(1e320000)) time = time.sub(120)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "133px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "133px"}},
    autoed() { return false},
},
76: {
    title(){return "答题点2(Hard)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
        let data = tmp[this.layer].buyables[this.id]
        display = "推荐语文知识：1e30000<br>正确概率："+format(this.chance())+"%<br>预计耗时："+format(this.time())+"s<br>点击以解题！"
        return display;
    },
    chance(){
        if(!player.C.points.gte(1e18000)) chs = new Decimal(0.001)
        if(player.C.points.gte(1e18000)&&!player.C.points.gte(1e24000)) chs = new Decimal(0.01)
        if(player.C.points.gte(1e24000)&&!player.C.points.gte(1e28000)) chs = new Decimal(0.1)
        if(player.C.points.gte(1e28000)&&!player.C.points.gte(1e30000)) chs = new Decimal(0.5)
        if(player.C.points.gte(1e30000)) chs = player.C.points.log10().div(120000).mul(100).min(100)
        if(getBuyableAmount("Nf",21).gte(1)) chs = chs.mul(0.7)
        if(getBuyableAmount("Nf",23).gte(1)) chs = chs.mul(1.3).min(100)
        if(getBuyableAmount("E",73).gte(1)) chs = chs.mul(buyableEffect("E",73)).min(100)
        if(getBuyableAmount("E",75) == 1) chs = chs.mul(1.2)
        if(getBuyableAmount("E",75) == 2) chs = chs.mul(0.6)
        return chs
    },
    time(){
        let time = new Decimal(2400)
        if(player.C.points.gte(1e6000)) time = time.sub(720)
        if(player.C.points.gte(1e8000)) time = time.sub(480)
        if(player.C.points.gte(1e16000)) time = time.sub(240)
        if(player.C.points.gte(1e40000)) time = time.sub(240)
        if(player.C.points.gte(1e80000)) time = time.sub(240)
        if(player.C.points.gte(1e160000)) time = time.sub(240)
        if(player.C.points.gte(1e320000)) time = time.sub(120)
        if(getBuyableAmount("Nf",21).gte(1)) time = time.mul(0.5)
        if(getBuyableAmount("Nf",23).gte(1)) time = time.mul(2)
        if(getBuyableAmount("E",75) == 1) time = time.mul(0.8)
        if(getBuyableAmount("E",75) == 2) time = time.mul(2)
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "133px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "133px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "133px"}},
    autoed() { return false},
},
77: {
    title(){return "答题点3(Insane)"},
    gain() { 
        let gain = new Decimal(5)
    return gain
},
    display() { // Everything else displayed in the buyable button after the title
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
        return time
    },
    unlocked() { return hasMilestone("C",2) }, 
    canAfford() { return (!player.E.ChineseTime.lt(this.time()))&&getBuyableAmount(this.layer,this.id).lt(1)&&player.E.inChinese.gte(1)},
    buy() { 
    player.E.ChineseTime = player.E.ChineseTime.sub(this.time())
    if((player.E.random.mul(10)).lt(this.chance())) setBuyableAmount(this.layer,this.id,new Decimal(1)),player.E.Chinese = player.E.Chinese.add(1)
    else (setBuyableAmount(this.layer,this.id,new Decimal(2)))
    },
    buyMax() {
        // I'll do this later ehehe
    },
    style() { if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).lt(1))return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "100px", width: "134px"}
    if(player.E.completedExam.lt(1)&&getBuyableAmount(this.layer,this.id).gte(1))return {'background-color': "#000088", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#0000FF",'border-radius': "10px", height: "100px", width: "134px"}
    if(player.E.completedExam.gte(1)&&getBuyableAmount(this.layer,this.id)==1)return {'background-color': "#008800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#00FF00",'border-radius': "10px", height: "100px", width: "134px"}
    else return {'background-color': "#880000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "10px", height: "100px", width: "134px"}},
    autoed() { return false},
},
    },
    Rank(){
return new Decimal(109123).sub(player.E.points.mul(10))
    },
    update(diff)
    {
        player.E.random = new Decimal(Math.random()*10)
        if(player.E.freeze.gt(0))player.E.freeze = player.E.freeze.sub(new Decimal(5).mul(diff))
        if(player.E.freeze.lt(0))player.E.freeze = new Decimal(0)
    },
    branches:["C"],
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
        ["bar", "NextCD"],
        ["infobox","introBox"],
    "grid",

"blank",
"upgrades",
"milestones",

"blank",
, "blank", "blank", ]
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
    ["buyable",51],
    
    ],
    buttonStyle: {"border-color": "#888888","background-color": "#666666"},  
    style:{"background-color":"#222222"},
    unlocked(){return player.E.inExam.gte(1)}
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
    ["row",[["buyable",66]]],
    
],
unlocked(){return player.E.completedExam.gte(1)}
},
    },

})
addLayer("L", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#702FED",                       // The color for this layer, which affects many elements.
    resource: "排行榜",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    tooltip(){return "排行榜"},                     // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasMilestone("E",6)},          // Returns a bool for if this layer's node should be visible in the tree.
    buyables: {
        11: {
            title(){return player.E.bestPoints.gt(1027)?"<h2>#2<h2>":"<h2>#1<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        12: {
            title(){return "<h2>Kening Zhao<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "xx中学9年14班三年连任班长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        13: {
            title(){return "<h2>1,027分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        21: {
            title(){return player.E.bestPoints.gt(1025.5)?"<h2>#3<h2>":"<h2>#2<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        22: {
            title(){return "<h2>Yanze Song<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "高冷学神，实力靠的是日积月累的勤奋与努力！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        23: {
            title(){return "<h2>1,025.5分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        991: {
            title(){return "Player"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#DDDDDD", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        992: {
            title(){return "<h2>Ignotus<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "这就是你呀~！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#DDDDDD", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        993: {
            title(){return "<h2>"+player.E.bestPoints+"分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#DDDDDD", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        31: {
            title(){return player.E.bestPoints.gt(1021)?"<h2>#4<h2>":"<h2>#3<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        32: {
            title(){return "<h2>Yilin Liu<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "9年级级部大名人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        33: {
            title(){return "<h2>1,021分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        41: {
            title(){return player.E.bestPoints.gt(1016)?"<h2>#5<h2>":"<h2>#4<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        42: {
            title(){return "<h2>Zihan Ge<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "逆袭有方的女学神"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        43: {
            title(){return "<h2>1,016分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        51: {
            title(){return player.E.bestPoints.gt(1013)?"<h2>#6<h2>":"<h2>#5<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        52: {
            title(){return "<h2>Sakuzyo<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "BOF大会双冠王"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        53: {
            title(){return "<h2>1,013分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        61: {
            title(){return player.E.bestPoints.gt(1004)?"<h2>#7<h2>":"<h2>#6<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        62: {
            title(){return "<h2>Shiera<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Arcaea知名画师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        63: {
            title(){return "<h2>1,004分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        71: {
            title(){return player.E.bestPoints.gt(999)?"<h2>#8<h2>":"<h2>#7<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        72: {
            title(){return "<h2>Zhengran Wang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "活力四射的高傲学霸"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        73: {
            title(){return "<h2>999分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        81: {
            title(){return player.E.bestPoints.gt(996)?"<h2>#9<h2>":"<h2>#8<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        82: {
            title(){return "<h2>Se-U-Ra<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "音游圈知名曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        83: {
            title(){return "<h2>996分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        91: {
            title(){return player.E.bestPoints.gt(985)?"<h2>#10<h2>":"<h2>#9<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        92: {
            title(){return "<h2>Xiaohan Li<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "9年级14班数学课代表组长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        93: {
            title(){return "<h2>985分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        101: {
            title(){return player.E.bestPoints.gt(980)?"<h2>#11<h2>":"<h2>#10<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        102: {
            title(){return "<h2>Zhengtong Yan<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "9年级14班学习委员组长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        103: {
            title(){return "<h2>980分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        111: {
            title(){return player.E.bestPoints.gt(976)?"<h2>#12<h2>":"<h2>#11<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        112: {
            title(){return "<h2>Yuanyuan Zhu<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "9年级14班副班长在任"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        113: {
            title(){return "<h2>976分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        121: {
            title(){return player.E.bestPoints.gt(972)?"<h2>#13<h2>":"<h2>#12<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        122: {
            title(){return "<h2>Xinyu Cao<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "乐于助人的14班交际姐妹花"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        123: {
            title(){return "<h2>972分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        131: {
            title(){return player.E.bestPoints.gt(961)?"<h2>#14<h2>":"<h2>#13<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        132: {
            title(){return "<h2>Kurokoutei<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Chronostasis曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        133: {
            title(){return "<h2>961分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市耀华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        141: {
            title(){return player.E.bestPoints.gt(960)?"<h2>#15<h2>":"<h2>#14<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        142: {
            title(){return "<h2>Huanmao<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "maimai狂热玩家"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        143: {
            title(){return "<h2>960分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市耀华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        151: {
            title(){return player.E.bestPoints.gt(957)?"<h2>#16<h2>":"<h2>#15<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        152: {
            title(){return "<h2>xi<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "大佬音游曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        153: {
            title(){return "<h2>957分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市耀华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        161: {
            title(){return player.E.bestPoints.gt(949)?"<h2>#17<h2>":"<h2>#16<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        162: {
            title(){return "<h2>Meng Zhang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "默默无闻的学习怪才"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        163: {
            title(){return "<h2>949分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市实验中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        171: {
            title(){return player.E.bestPoints.gt(944)?"<h2>#18<h2>":"<h2>#17<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        172: {
            title(){return "<h2>Yinuo Huang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "物理课代表，对理科有着超常的兴趣"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        173: {
            title(){return "<h2>944分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市实验中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        181: {
            title(){return player.E.bestPoints.gt(942)?"<h2>#19<h2>":"<h2>#18<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        182: {
            title(){return "<h2>Huichen Li<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "副数学课代表，没什么特点，就是均衡"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        183: {
            title(){return "<h2>942分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第四中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        191: {
            title(){return player.E.bestPoints.gt(936)?"<h2>#20<h2>":"<h2>#19<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        192: {
            title(){return "<h2>Hetong Wang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "“重量级”英语课代表"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        193: {
            title(){return "<h2>936分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第42中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        201: {
            title(){return player.E.bestPoints.gt(935)?"<h2>#21<h2>":"<h2>#20<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        202: {
            title(){return "<h2>Mitiao Jiang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "独立音乐人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        203: {
            title(){return "<h2>935分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第42中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        211: {
            title(){return player.E.bestPoints.gt(932)?"<h2>#22<h2>":"<h2>#21<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        212: {
            title(){return "<h2>Wenxuan Jing<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        213: {
            title(){return "<h2>932分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市海河中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        221: {
            title(){return player.E.bestPoints.gt(928)?"<h2>#23<h2>":"<h2>#22<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        222: {
            title(){return "<h2>HyuN<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "天赋音乐人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        223: {
            title(){return "<h2>928分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第7中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#888800", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FFFF00",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        231: {
            title(){return player.E.bestPoints.gt(926)?"<h2>#24<h2>":"<h2>#23<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        232: {
            title(){return "<h2>Zris<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "大抽象画师兼曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        233: {
            title(){return "<h2>926分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第21中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        241: {
            title(){return player.E.bestPoints.gt(923)?"<h2>#25<h2>":"<h2>#24<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        242: {
            title(){return "<h2>Zuxuan Song<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        243: {
            title(){return "<h2>923分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市咸水沽第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        251: {
            title(){return player.E.bestPoints.gt(919)?"<h2>#26<h2>":"<h2>#25<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        252: {
            title(){return "<h2>SunsetRay<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "雷酸镭椰叶"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        253: {
            title(){return "<h2>919分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市静海第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        261: {
            title(){return player.E.bestPoints.gt(917)?"<h2>#27<h2>":"<h2>#26<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        262: {
            title(){return "<h2>Maintain7716<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "外星人学生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        263: {
            title(){return "<h2>917分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第二中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        271: {
            title(){return player.E.bestPoints.gt(914)?"<h2>#28<h2>":"<h2>#27<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        272: {
            title(){return "<h2>Happy Birthday is a Nerd<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "外星人学生+1"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        273: {
            title(){return "<h2>914分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第45中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        281: {
            title(){return player.E.bestPoints.gt(910)?"<h2>#29<h2>":"<h2>#28<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        282: {
            title(){return "<h2>Zero Zero Five<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "外星人学生+114514"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        283: {
            title(){return "<h2>910分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第25中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        291: {
            title(){return player.E.bestPoints.gt(905)?"<h2>#30<h2>":"<h2>#29<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        292: {
            title(){return "<h2>Hatsune Miku<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "日本某转学生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        293: {
            title(){return "<h2>905分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第3中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        301: {
            title(){return player.E.bestPoints.gt(902)?"<h2>#31<h2>":"<h2>#30<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        302: {
            title(){return "<h2>Ke Wang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "......"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        303: {
            title(){return "<h2>902分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津大学附属中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        311: {
            title(){return player.E.bestPoints.gt(899)?"<h2>#32<h2>":"<h2>#31<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        312: {
            title(){return "<h2>void<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "遥不可及的虚空"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        313: {
            title(){return "<h2>899分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市紫云中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        321: {
            title(){return player.E.bestPoints.gt(893)?"<h2>#33<h2>":"<h2>#32<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        322: {
            title(){return "<h2>Canran Chen<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "......这是个bot随机生成的名字，剩下的编不出来了"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        323: {
            title(){return "<h2>893分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市自立中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        331: {
            title(){return player.E.bestPoints.gt(880)?"<h2>#34<h2>":"<h2>#33<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        332: {
            title(){return "<h2>Jiayi Sun<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "......这还是个bot随机生成的名字......此人在现实中不存在"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        333: {
            title(){return "<h2>880分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第14中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        341: {
            title(){return player.E.bestPoints.gt(878)?"<h2>#35<h2>":"<h2>#34<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        342: {
            title(){return "<h2>Tanfei Yao<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "......这又双叒叕是个bot随机生成的名字......你问为什么这个人名这么奇怪？问bot去......"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        343: {
            title(){return "<h2>878分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市南仓中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        351: {
            title(){return player.E.bestPoints.gt(869)?"<h2>#36<h2>":"<h2>#35<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        352: {
            title(){return "<h2>Xuanyu Chen<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我是谁？我在哪？"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        353: {
            title(){return "<h2>869分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市民族中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        361: {
            title(){return player.E.bestPoints.gt(862)?"<h2>#37<h2>":"<h2>#36<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        362: {
            title(){return "<h2>EBIMAYO<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "咕咕咕！咕咕？咕咕咕咕咕咕咕！！！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        363: {
            title(){return "<h2>862分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第13中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        371: {
            title(){return player.E.bestPoints.gt(845)?"<h2>#38<h2>":"<h2>#37<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        372: {
            title(){return "<h2>t+pazolite<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我永远单推tpz!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        373: {
            title(){return "<h2>845分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市梅江中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        381: {
            title(){return player.E.bestPoints.gt(837)?"<h2>#39<h2>":"<h2>#38<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        382: {
            title(){return "<h2>Early Autumn<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "小 心 立 秋"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        383: {
            title(){return "<h2>837分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市建华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        391: {
            title(){return player.E.bestPoints.gt(824)?"<h2>#40<h2>":"<h2>#39<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        392: {
            title(){return "<h2>Kagamine Rin<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "某橘子"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        393: {
            title(){return "<h2>824分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市塘沽第二中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        401: {
            title(){return player.E.bestPoints.gt(823)?"<h2>#41<h2>":"<h2>#40<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        402: {
            title(){return "<h2>Kagamine Len<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "某香蕉"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        403: {
            title(){return "<h2>823分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市油田第三中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        411: {
            title(){return player.E.bestPoints.gt(816)?"<h2>#42<h2>":"<h2>#41<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        412: {
            title(){return "<h2>Wu Ji Catcats<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "无极烤串店正式开张！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        413: {
            title(){return "<h2>816分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市复兴中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        421: {
            title(){return player.E.bestPoints.gt(808)?"<h2>#43<h2>":"<h2>#42<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        422: {
            title(){return "<h2>Utility Knife-Knife<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "刀姐......"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        423: {
            title(){return "<h2>808分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市滨海中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        431: {
            title(){return player.E.bestPoints.gt(801)?"<h2>#44<h2>":"<h2>#43<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        432: {
            title(){return "<h2>One Hundred and Ninety Eight<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "鸽游官方谱师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        433: {
            title(){return "<h2>801分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第32中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        441: {
            title(){return player.E.bestPoints.gt(799)?"<h2>#45<h2>":"<h2>#44<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        442: {
            title(){return "<h2>Toaster<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我觉得世征ftr是个6.jpg"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        443: {
            title(){return "<h2>799分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市扶轮中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#1575B2", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#2897D4",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        451: {
            title(){return player.E.bestPoints.gt(793)?"<h2>#46<h2>":"<h2>#45<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        452: {
            title(){return "<h2>Xinyi Zhang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "平平无奇的9年级14班学生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        453: {
            title(){return "<h2>793分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第82中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        461: {
            title(){return player.E.bestPoints.gt(777)?"<h2>#47<h2>":"<h2>#46<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        462: {
            title(){return "<h2>Xinyi Wang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我也平平无奇...只是和我上面那个哥们关系比较好..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        463: {
            title(){return "<h2>777分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第78中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        471: {
            title(){return player.E.bestPoints.gt(764)?"<h2>#48<h2>":"<h2>#47<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        472: {
            title(){return "<h2>Ziyu Wang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我咋排名这么低啊...下半辈子要完蛋了..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        473: {
            title(){return "<h2>764分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市青光中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        481: {
            title(){return player.E.bestPoints.gt(761)?"<h2>#49<h2>":"<h2>#48<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        482: {
            title(){return "<h2>Runying Tian<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "楼上别凡尔赛了..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        483: {
            title(){return "<h2>761分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市津英中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        491: {
            title(){return player.E.bestPoints.gt(736)?"<h2>#50<h2>":"<h2>#49<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        492: {
            title(){return "<h2>Nitro<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Life is FAR FAR LOST!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        493: {
            title(){return "<h2>736分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市宝坻区王卜庄高级中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        501: {
            title(){return player.E.bestPoints.gt(722)?"<h2>#51<h2>":"<h2>#50<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        502: {
            title(){return "<h2>ak+q<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "你 蛇 红 了 . j p g"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        503: {
            title(){return "<h2>722分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市军粮城中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        511: {
            title(){return player.E.bestPoints.gt(704)?"<h2>#52<h2>":"<h2>#51<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        512: {
            title(){return "<h2>Yuri<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "FOREVER~~~"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        513: {
            title(){return "<h2>704分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市唐官屯中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        521: {
            title(){return player.E.bestPoints.gt(701)?"<h2>#53<h2>":"<h2>#52<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        522: {
            title(){return "<h2>Jiaqi Zhang<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "哎，这成绩，打工人的命啊"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        523: {
            title(){return "<h2>701分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市太平村中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        531: {
            title(){return player.E.bestPoints.gt(685)?"<h2>#54<h2>":"<h2>#53<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        532: {
            title(){return "<h2>MiaonKui<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Phigros现任美术组组长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        533: {
            title(){return "<h2>685分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市潘庄中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        541: {
            title(){return player.E.bestPoints.gt(673)?"<h2>#55<h2>":"<h2>#54<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        542: {
            title(){return "<h2>OnlyMyBlackScore<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "MIDI扒谱狂人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        543: {
            title(){return "<h2>673分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市油田第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        551: {
            title(){return player.E.bestPoints.gt(666)?"<h2>#56<h2>":"<h2>#55<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        552: {
            title(){return "<h2>Trees Of Spring and Autumn<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "有梦想的Phigros音游人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        553: {
            title(){return "<h2>666分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市田家炳中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        561: {
            title(){return player.E.bestPoints.gt(664)?"<h2>#57<h2>":"<h2>#56<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        562: {
            title(){return "<h2>Aoi<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "混音大师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        563: {
            title(){return "<h2>664分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市大港第八中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        571: {
            title(){return player.E.bestPoints.gt(648)?"<h2>#58<h2>":"<h2>#57<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        572: {
            title(){return "<h2>Megurine Ruka<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我是歌姬(字面意思)"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        573: {
            title(){return "<h2>648分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市蓟州区下营中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        581: {
            title(){return player.E.bestPoints.gt(639)?"<h2>#59<h2>":"<h2>#58<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        582: {
            title(){return "<h2>Yuhang Guo<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我是歌姬(网络意思)"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        583: {
            title(){return "<h2>639分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市丰台中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        591: {
            title(){return player.E.bestPoints.gt(610)?"<h2>#60<h2>":"<h2>#59<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        592: {
            title(){return "<h2>Ruolei Shen<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "还好不是职高吓死老娘了"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        593: {
            title(){return "<h2>610分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市汉沽第六中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        601: {
            title(){return player.E.bestPoints.gt(574)?"<h2>#61<h2>":"<h2>#60<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        602: {
            title(){return "<h2>Camelia<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "啊啊啊啊啊啊!!!我没有买外卖!!!奥运会 会 会 会 会..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        603: {
            title(){return "<h2>574分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一商业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        611: {
            title(){return player.E.bestPoints.gt(556)?"<h2>#62<h2>":"<h2>#61<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        612: {
            title(){return "<h2>Team Grimoire<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "⚪⚪⚪!⚪⚪!⚪⚪!⚪⚪⚪⚪⚪⚪⚪!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        613: {
            title(){return "<h2>556分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市第一轻工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        621: {
            title(){return player.E.bestPoints.gt(523)?"<h2>#63<h2>":"<h2>#62<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        622: {
            title(){return "<h2>Maozon<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "你别想收了这首歌"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        623: {
            title(){return "<h2>523分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市机电工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        631: {
            title(){return player.E.bestPoints.gt(507)?"<h2>#64<h2>":"<h2>#63<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        632: {
            title(){return "<h2>Xuchun Wu<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "FPS领域著名大神"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        633: {
            title(){return "<h2>507分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市仪表无线电工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        641: {
            title(){return player.E.bestPoints.gt(496)?"<h2>#65<h2>":"<h2>#64<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        642: {
            title(){return "<h2>Fallen_Cat<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "弱气猫猫"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        643: {
            title(){return "<h2>496分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市经济贸易学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        651: {
            title(){return player.E.bestPoints.gt(448)?"<h2>#66<h2>":"<h2>#65<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        652: {
            title(){return "<h2>Xuedong Cheng<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "我好666，排名就是66"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        653: {
            title(){return "<h2>448分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市东丽区职业教育中心学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        661: {
            title(){return player.E.bestPoints.gt(421)?"<h2>#67<h2>":"<h2>#66<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        662: {
            title(){return "<h2>Jingxuan Shen<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "↑我才是66！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        663: {
            title(){return "<h2>421分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市南洋工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#268240", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#48A461",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        671: {
            title(){return player.E.bestPoints.gt(388)?"<h2>#68<h2>":"<h2>#67<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        672: {
            title(){return "<h2>Hot Water P<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "最后提醒大家一句——多喝热水！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        673: {
            title(){return "<h2>388分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市宝坻区职业教育与成人教育中心录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        681: {
            title(){return player.E.bestPoints.gt(334)?"<h2>#69<h2>":"<h2>#68<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        682: {
            title(){return "<h2>PSYQUI<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "When you get to the higher...higher..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        683: {
            title(){return "<h2>334分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市信息工程学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        691: {
            title(){return player.E.bestPoints.gt(256)?"<h2>#70<h2>":"<h2>#69<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        692: {
            title(){return "<h2>Kobaryo<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Invisible Frenzy!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        693: {
            title(){return "<h2>256分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市劳动保护学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        701: {
            title(){return player.E.bestPoints.gt(224)?"<h2>#71<h2>":"<h2>#70<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        702: {
            title(){return "<h2>Normal1zer<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "平平无奇音游曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        703: {
            title(){return "<h2>224分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市南开区职业中等专业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        711: {
            title(){return player.E.bestPoints.gt(175)?"<h2>#72<h2>":"<h2>#71<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        712: {
            title(){return "<h2>Dongwei Yan<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "平平无奇音游曲师+1"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        713: {
            title(){return "<h2>175分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>天津市滨海新区汉沽中等专业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        721: {
            title(){return player.E.bestPoints.gt(121)?"<h2>#73<h2>":"<h2>#72<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        722: {
            title(){return "<h2>Megalo_PaleWhite<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "音游曲师+2"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        723: {
            title(){return "<h2>121分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        731: {
            title(){return player.E.bestPoints.gt(111)?"<h2>#74<h2>":"<h2>#73<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        732: {
            title(){return "<h2>Lime<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "有实力无需BGA"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        733: {
            title(){return "<h2>111分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        741: {
            title(){return player.E.bestPoints.gt(103)?"<h2>#75<h2>":"<h2>#74<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        742: {
            title(){return "<h2>P4Koo<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Here We are,Nick of Time"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        743: {
            title(){return "<h2>103分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        751: {
            title(){return player.E.bestPoints.gt(99)?"<h2>#76<h2>":"<h2>#75<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        752: {
            title(){return "<h2>Chiyoko<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "音游界女高音"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        753: {
            title(){return "<h2>99分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        751: {
            title(){return player.E.bestPoints.gt(99)?"<h2>#76<h2>":"<h2>#75<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        752: {
            title(){return "<h2>Chiyoko<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "音游界女高音"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        753: {
            title(){return "<h2>99分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        761: {
            title(){return player.E.bestPoints.gt(90)?"<h2>#77<h2>":"<h2>#76<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        762: {
            title(){return "<h2>Frums<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "鼓先生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        763: {
            title(){return "<h2>90分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        771: {
            title(){return player.E.bestPoints.gt(83)?"<h2>#78<h2>":"<h2>#77<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        772: {
            title(){return "<h2>F2M5<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "渴望被怜爱的谱师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        773: {
            title(){return "<h2>83分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        781: {
            title(){return player.E.bestPoints.gt(68)?"<h2>#79<h2>":"<h2>#78<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        782: {
            title(){return "<h2>Ruze<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "火山操纵者"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        783: {
            title(){return "<h2>68分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        791: {
            title(){return player.E.bestPoints.gt(62)?"<h2>#80<h2>":"<h2>#79<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        792: {
            title(){return "<h2>LeaF<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "草(一语双关)"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        793: {
            title(){return "<h2>62分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        801: {
            title(){return player.E.bestPoints.gt(49)?"<h2>#81<h2>":"<h2>#80<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        802: {
            title(){return "<h2>Optie<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "草先生的搭档"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        803: {
            title(){return "<h2>49分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        811: {
            title(){return player.E.bestPoints.gt(47)?"<h2>#82<h2>":"<h2>#81<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        812: {
            title(){return "<h2>rN<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "默默无闻，无人知晓"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        813: {
            title(){return "<h2>47分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        821: {
            title(){return player.E.bestPoints.gt(41)?"<h2>#83<h2>":"<h2>#82<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        822: {
            title(){return "<h2>Abyss Idols<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "默默无闻，无人知晓+1"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        823: {
            title(){return "<h2>41分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        831: {
            title(){return player.E.bestPoints.gt(36)?"<h2>#84<h2>":"<h2>#83<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        832: {
            title(){return "<h2>Fn<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "啊？这居然是曲师？"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        833: {
            title(){return "<h2>36分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        841: {
            title(){return player.E.bestPoints.gt(22)?"<h2>#85<h2>":"<h2>#84<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        842: {
            title(){return "<h2>Hyphen<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "奈亚子"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        843: {
            title(){return "<h2>22分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        851: {
            title(){return player.E.bestPoints.gt(13)?"<h2>#86<h2>":"<h2>#85<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        852: {
            title(){return "<h2>Guanyu Ren<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "嗯？我只是睡了一觉而已，中考结束了？"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        853: {
            title(){return "<h2>13分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        861: {
            title(){return player.E.bestPoints.gt(7)?"<h2>#87<h2>":"<h2>#86<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        862: {
            title(){return "<h2>Yuxin Feng<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "楼上那位大哥，没错，考完了，还出分了..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        863: {
            title(){return "<h2>7分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        871: {
            title(){return player.E.bestPoints.gt(4)?"<h2>#88<h2>":"<h2>#87<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        872: {
            title(){return "<h2>B-Wing<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Dynamix官方谱师1号"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        873: {
            title(){return "<h2>4分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        881: {
            title(){return player.E.bestPoints.gt(0)?"<h2>#89<h2>":"<h2>#88<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        882: {
            title(){return "<h2>Homeee<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "Dynamix官方谱师2号"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "300px"}},
            autoed() { return false},
        },
        883: {
            title(){return "<h2>0分<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() {return {'background-color': "#BB0000", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#FF0000",'border-radius': "0px", height: "100px", width: "200px"}},
            autoed() { return false},
        },
        981: {
            title(){return "<h2>"+player.E.year+"年天津市初中学业水平考试得分排行榜<h2><br><h3>xx中学9年级14班<h3>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                let display = ("热烈祝贺本班88名学生中17名学生成功考入市五所！6名学生获得1000分以上的高分！<br>Tips:本排行榜中所有人名均为TomatoAPI生成，经历全为虚构，没有采用任何一个真实人名！<br>如有雷同，纯属巧合！")
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
                 
            },
            buyMax() {
                // I'll do this later ehehe
            },
            style() { return {'background-color': "#666666", filter: "brightness("+new Decimal(100)+"%)", color: "white", 'border-color': "#888888",'border-radius': "10px", height: "150px", width: "600px"}},
            autoed() { return false},
        },
    },
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    tabFormat:{
        "Main":{
            content:[
                ["buyable",981],
                function() {if(player.E.bestPoints.gt(1027))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",11],["buyable",12],["buyable",13]]]},
                function() {if(!player.E.bestPoints.gt(1027)&&(player.E.bestPoints.gt(1025.5)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",21],["buyable",22],["buyable",23]]]},
                function() {if(!player.E.bestPoints.gt(1025.5)&&(player.E.bestPoints.gt(1021)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",31],["buyable",32],["buyable",33]]]},
                function() {if(!player.E.bestPoints.gt(1021)&&(player.E.bestPoints.gt(1016)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",41],["buyable",42],["buyable",43]]]},
                function() {if(!player.E.bestPoints.gt(1016)&&(player.E.bestPoints.gt(1013)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",51],["buyable",52],["buyable",53]]]},
                function() {if(!player.E.bestPoints.gt(1013)&&(player.E.bestPoints.gt(1004)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",61],["buyable",62],["buyable",63]]]},
                function() {if(!player.E.bestPoints.gt(1004)&&(player.E.bestPoints.gt(999)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",71],["buyable",72],["buyable",73]]]},
                function() {if(!player.E.bestPoints.gt(999)&&(player.E.bestPoints.gt(996)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",81],["buyable",82],["buyable",83]]]},
                function() {if(!player.E.bestPoints.gt(996)&&(player.E.bestPoints.gt(985)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",91],["buyable",92],["buyable",93]]]},
                function() {if(!player.E.bestPoints.gt(985)&&(player.E.bestPoints.gt(980)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",101],["buyable",102],["buyable",103]]]},
                function() {if(!player.E.bestPoints.gt(980)&&(player.E.bestPoints.gt(976)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",111],["buyable",112],["buyable",113]]]},
                function() {if(!player.E.bestPoints.gt(976)&&(player.E.bestPoints.gt(972)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",121],["buyable",122],["buyable",123]]]},
                function() {if(!player.E.bestPoints.gt(972)&&(player.E.bestPoints.gt(961)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",131],["buyable",132],["buyable",133]]]},
                function() {if(!player.E.bestPoints.gt(961)&&(player.E.bestPoints.gt(960)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",141],["buyable",142],["buyable",143]]]},
                function() {if(!player.E.bestPoints.gt(960)&&(player.E.bestPoints.gt(957)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",151],["buyable",152],["buyable",153]]]},
                function() {if(!player.E.bestPoints.gt(957)&&(player.E.bestPoints.gt(949)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",161],["buyable",162],["buyable",163]]]},
                function() {if(!player.E.bestPoints.gt(949)&&(player.E.bestPoints.gt(944)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",171],["buyable",172],["buyable",173]]]},
                function() {if(!player.E.bestPoints.gt(944)&&(player.E.bestPoints.gt(942)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",181],["buyable",182],["buyable",183]]]},
                function() {if(!player.E.bestPoints.gt(942)&&(player.E.bestPoints.gt(936)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",191],["buyable",192],["buyable",193]]]},
                function() {if(!player.E.bestPoints.gt(936)&&(player.E.bestPoints.gt(935)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",201],["buyable",202],["buyable",203]]]},
                function() {if(!player.E.bestPoints.gt(935)&&(player.E.bestPoints.gt(932)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",211],["buyable",212],["buyable",213]]]},
                function() {if(!player.E.bestPoints.gt(932)&&(player.E.bestPoints.gt(928)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",221],["buyable",222],["buyable",223]]]},
                function() {if(!player.E.bestPoints.gt(928)&&(player.E.bestPoints.gt(926)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",231],["buyable",232],["buyable",233]]]},
                function() {if(!player.E.bestPoints.gt(926)&&(player.E.bestPoints.gt(923)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",241],["buyable",242],["buyable",243]]]},
                function() {if(!player.E.bestPoints.gt(923)&&(player.E.bestPoints.gt(919)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",251],["buyable",252],["buyable",253]]]},
                function() {if(!player.E.bestPoints.gt(923)&&(player.E.bestPoints.gt(917)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",261],["buyable",262],["buyable",263]]]},
                function() {if(!player.E.bestPoints.gt(917)&&(player.E.bestPoints.gt(914)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",271],["buyable",272],["buyable",273]]]},
                function() {if(!player.E.bestPoints.gt(914)&&(player.E.bestPoints.gt(910)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",281],["buyable",282],["buyable",283]]]},
                function() {if(!player.E.bestPoints.gt(910)&&(player.E.bestPoints.gt(905)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",291],["buyable",292],["buyable",293]]]},
                function() {if(!player.E.bestPoints.gt(905)&&(player.E.bestPoints.gt(902)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",301],["buyable",302],["buyable",303]]]},
                function() {if(!player.E.bestPoints.gt(902)&&(player.E.bestPoints.gt(899)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",311],["buyable",312],["buyable",313]]]},
                function() {if(!player.E.bestPoints.gt(899)&&(player.E.bestPoints.gt(893)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",321],["buyable",322],["buyable",323]]]},
                function() {if(!player.E.bestPoints.gt(893)&&(player.E.bestPoints.gt(880)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",331],["buyable",332],["buyable",333]]]},
                function() {if(!player.E.bestPoints.gt(880)&&(player.E.bestPoints.gt(878)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",341],["buyable",342],["buyable",343]]]},
                function() {if(!player.E.bestPoints.gt(878)&&(player.E.bestPoints.gt(869)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",351],["buyable",352],["buyable",353]]]},
                function() {if(!player.E.bestPoints.gt(869)&&(player.E.bestPoints.gt(862)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",361],["buyable",362],["buyable",363]]]},
                function() {if(!player.E.bestPoints.gt(862)&&(player.E.bestPoints.gt(845)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",371],["buyable",372],["buyable",373]]]},
                function() {if(!player.E.bestPoints.gt(845)&&(player.E.bestPoints.gt(837)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",381],["buyable",382],["buyable",383]]]},
                function() {if(!player.E.bestPoints.gt(837)&&(player.E.bestPoints.gt(824)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",391],["buyable",392],["buyable",393]]]},
                function() {if(!player.E.bestPoints.gt(824)&&(player.E.bestPoints.gt(823)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",401],["buyable",402],["buyable",403]]]},
                function() {if(!player.E.bestPoints.gt(823)&&(player.E.bestPoints.gt(816)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",411],["buyable",412],["buyable",413]]]},
                function() {if(!player.E.bestPoints.gt(816)&&(player.E.bestPoints.gt(808)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",421],["buyable",422],["buyable",423]]]},
                function() {if(!player.E.bestPoints.gt(808)&&(player.E.bestPoints.gt(801)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",431],["buyable",432],["buyable",433]]]},
                function() {if(!player.E.bestPoints.gt(801)&&(player.E.bestPoints.gt(799)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",441],["buyable",442],["buyable",443]]]},
                function() {if(!player.E.bestPoints.gt(799)&&(player.E.bestPoints.gt(793)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",451],["buyable",452],["buyable",453]]]},
                function() {if(!player.E.bestPoints.gt(793)&&(player.E.bestPoints.gt(777)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",461],["buyable",462],["buyable",463]]]},
                function() {if(!player.E.bestPoints.gt(777)&&(player.E.bestPoints.gt(764)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",471],["buyable",472],["buyable",473]]]},
                function() {if(!player.E.bestPoints.gt(764)&&(player.E.bestPoints.gt(761)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",481],["buyable",482],["buyable",483]]]},
                function() {if(!player.E.bestPoints.gt(761)&&(player.E.bestPoints.gt(736)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",491],["buyable",492],["buyable",493]]]},
                function() {if(!player.E.bestPoints.gt(736)&&(player.E.bestPoints.gt(722)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",501],["buyable",502],["buyable",503]]]},
                function() {if(!player.E.bestPoints.gt(722)&&(player.E.bestPoints.gt(704)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",511],["buyable",512],["buyable",513]]]},
                function() {if(!player.E.bestPoints.gt(704)&&(player.E.bestPoints.gt(701)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",521],["buyable",522],["buyable",523]]]},
                function() {if(!player.E.bestPoints.gt(701)&&(player.E.bestPoints.gt(685)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",531],["buyable",532],["buyable",533]]]},
                function() {if(!player.E.bestPoints.gt(685)&&(player.E.bestPoints.gt(673)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",541],["buyable",542],["buyable",543]]]},
                function() {if(!player.E.bestPoints.gt(673)&&(player.E.bestPoints.gt(666)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",551],["buyable",552],["buyable",553]]]},
                function() {if(!player.E.bestPoints.gt(666)&&(player.E.bestPoints.gt(664)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",561],["buyable",562],["buyable",563]]]},
                function() {if(!player.E.bestPoints.gt(664)&&(player.E.bestPoints.gt(648)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",571],["buyable",572],["buyable",573]]]},
                function() {if(!player.E.bestPoints.gt(648)&&(player.E.bestPoints.gt(639)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",581],["buyable",582],["buyable",583]]]},
                function() {if(!player.E.bestPoints.gt(639)&&(player.E.bestPoints.gt(610)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",591],["buyable",592],["buyable",593]]]},
                function() {if(!player.E.bestPoints.gt(610)&&(player.E.bestPoints.gt(574)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",601],["buyable",602],["buyable",603]]]},
                function() {if(!player.E.bestPoints.gt(574)&&(player.E.bestPoints.gt(556)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",611],["buyable",612],["buyable",613]]]},
                function() {if(!player.E.bestPoints.gt(556)&&(player.E.bestPoints.gt(523)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",621],["buyable",622],["buyable",623]]]},
                function() {if(!player.E.bestPoints.gt(523)&&(player.E.bestPoints.gt(507)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",631],["buyable",632],["buyable",633]]]},
                function() {if(!player.E.bestPoints.gt(507)&&(player.E.bestPoints.gt(496)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",641],["buyable",642],["buyable",643]]]},
                function() {if(!player.E.bestPoints.gt(496)&&(player.E.bestPoints.gt(448)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",651],["buyable",652],["buyable",653]]]},
                function() {if(!player.E.bestPoints.gt(448)&&(player.E.bestPoints.gt(421)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",661],["buyable",662],["buyable",663]]]},
                function() {if(!player.E.bestPoints.gt(421)&&(player.E.bestPoints.gt(388)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",671],["buyable",672],["buyable",673]]]},
                function() {if(!player.E.bestPoints.gt(388)&&(player.E.bestPoints.gt(334)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",681],["buyable",682],["buyable",683]]]},
                function() {if(!player.E.bestPoints.gt(334)&&(player.E.bestPoints.gt(256)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",691],["buyable",692],["buyable",693]]]},
                function() {if(!player.E.bestPoints.gt(256)&&(player.E.bestPoints.gt(224)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",701],["buyable",702],["buyable",703]]]},
                function() {if(!player.E.bestPoints.gt(224)&&(player.E.bestPoints.gt(175)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",711],["buyable",712],["buyable",713]]]},
                function() {if(!player.E.bestPoints.gt(175)&&(player.E.bestPoints.gt(121)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",721],["buyable",722],["buyable",723]]]},
                function() {if(!player.E.bestPoints.gt(121)&&(player.E.bestPoints.gt(111)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",731],["buyable",732],["buyable",733]]]},
                function() {if(!player.E.bestPoints.gt(111)&&(player.E.bestPoints.gt(103)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",741],["buyable",742],["buyable",743]]]},
                function() {if(!player.E.bestPoints.gt(103)&&(player.E.bestPoints.gt(99)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",751],["buyable",752],["buyable",753]]]},
                function() {if(!player.E.bestPoints.gt(99)&&(player.E.bestPoints.gt(90)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",761],["buyable",762],["buyable",763]]]},
                function() {if(!player.E.bestPoints.gt(90)&&(player.E.bestPoints.gt(83)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",771],["buyable",772],["buyable",773]]]},
                function() {if(!player.E.bestPoints.gt(83)&&(player.E.bestPoints.gt(68)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",781],["buyable",782],["buyable",783]]]},
                function() {if(!player.E.bestPoints.gt(68)&&(player.E.bestPoints.gt(62)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",791],["buyable",792],["buyable",793]]]},
                function() {if(!player.E.bestPoints.gt(62)&&(player.E.bestPoints.gt(49)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",801],["buyable",802],["buyable",803]]]},
                function() {if(!player.E.bestPoints.gt(49)&&(player.E.bestPoints.gt(47)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",811],["buyable",812],["buyable",813]]]},
                function() {if(!player.E.bestPoints.gt(47)&&(player.E.bestPoints.gt(41)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",821],["buyable",822],["buyable",823]]]},
                function() {if(!player.E.bestPoints.gt(41)&&(player.E.bestPoints.gt(36)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",831],["buyable",832],["buyable",833]]]},
                function() {if(!player.E.bestPoints.gt(36)&&(player.E.bestPoints.gt(22)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",841],["buyable",842],["buyable",843]]]},
                function() {if(!player.E.bestPoints.gt(22)&&(player.E.bestPoints.gt(13)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",851],["buyable",852],["buyable",853]]]},
                function() {if(!player.E.bestPoints.gt(13)&&(player.E.bestPoints.gt(7)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",861],["buyable",862],["buyable",863]]]},
                function() {if(!player.E.bestPoints.gt(7)&&(player.E.bestPoints.gt(4)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",871],["buyable",872],["buyable",873]]]},
                function() {if(!player.E.bestPoints.gt(4)&&(player.E.bestPoints.gt(0)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
                function() {return ["row",[["buyable",881],["buyable",882],["buyable",883]]]},
                function() {if(!player.E.bestPoints.gt(0)&&(player.E.bestPoints.gt(-1)))return ["row",[["buyable",991],["buyable",992],["buyable",993]]]},
        ["bar", "NextCD"],
        ["infobox","introBox"],
    "grid",
    

"blank",
"upgrades",
"milestones",

"blank",
, "blank", "blank", ]
},
    },
})
addLayer("Exp", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                   // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        level: new Decimal(0),
        pp: new Decimal(0),
        best11: new Decimal(0),
        best12: new Decimal(0),
        best21: new Decimal(0),
        freepp: new Decimal(0),
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
return mult
    },
    limit()
    {
        let lim = new Decimal(10).mul(new Decimal(2).pow(player.Exp.level.add(1)))
        return lim
    },
    infoboxes: {
        introBox: {
                title: "经验点数获取",
                body(){
                        let a = "每次参加中考，经验点数+10<br>中考成绩不足6分时，每获得1分，经验点数+5<br>中考成绩在6-10分之间时，每获得1分，经验点数+100<br>中考成绩在11-20分之间时，每获得1分，经验点数+10000"

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
    },
    effect()
    {
        let eff = new Decimal(1)
        eff = eff.mul(new Decimal(3).pow(player.Exp.level)).mul(player.points.add(10).log10().log2().cbrt())
        if(hasMilestone("E",2))eff = eff.mul(player.points.add(10).log10().log2().root(5))
        if(hasMilestone("E",4))eff = eff.pow(2)
        if(hasUpgrade("C",25))eff = eff.mul(upgradeEffect("C",25))
        if(hasMilestone("C",4))eff = eff.mul(tmp.C.effectGold2)
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
    ["row",[["buyable",21]]],
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
    ["row",[["buyable",51]]],
    
],
unlocked(){return hasMilestone("E",7)},
},
},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    buyables: {
        11: {
          title: "技能1：学分获取",
          canAfford() { return player.Exp.pp.gte(this.cost())},
          cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
          if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
          if(hasMilestone("E",8))return x},
          buy() {
            player.Exp.pp = player.Exp.pp.sub(this.cost())
             setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
             
          },
          display() {return `提升学分获取。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：学分获取x${format(this.effect())}`},
          effect(x) { 
            let base = new Decimal(10000)
            if(hasUpgrade("C",31)) base = base.mul(upgradeEffect("C",31))
            if(!hasUpgrade("C",41))mult2 = base.pow(x)
            if(hasUpgrade("C",41))mult2 = base.pow(player.Exp.best11)
            return mult2},
          unlocked(){return hasMilestone("E",3)},
          style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
        },
        12: {
            title: "技能2：语文知识获取",
            cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
            if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
            if(hasMilestone("E",8))return x},
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
            if(hasUpgrade("C",42))mult2 = base.pow(player.Exp.best12)
                return new Decimal(mult2)},
            unlocked(){return hasMilestone("E",3)},
            style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
          },
          13: {
            title: "技能3：第一行语文升级效果倍增",
            cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
            if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
            if(hasMilestone("E",8))return x},
            canAfford() { return player.Exp.pp.gte(this.cost())},
            buy() {
                player.Exp.pp = player.Exp.pp.sub(this.cost())
               setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `提升第一行全部语文升级效果。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：第一行全部语文升级效果x${format(this.effect())}`},
            effect(x) { 
                let base = new Decimal(20)
                if(hasUpgrade("C",33)) base = base.mul(upgradeEffect("C",33))
                mult2 = base.pow(x)
                return new Decimal(mult2)},
                style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",4)}
          },
          21: {
            title: "技能4：阅读摘抄能力提升",
            cost(x) {if(!hasMilestone("E",6))return new Decimal(2).pow(x)
            if(hasMilestone("E",6)&&!hasMilestone("E",8))return new Decimal(2).pow((x).sub(1)).floor()
            if(hasMilestone("E",8))return x},
            canAfford() { return player.Exp.pp.gte(this.cost())},
            buy() {
                player.Exp.pp = player.Exp.pp.sub(this.cost())
               setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            display() {return `增加所有好文精华获取速度。\n当前等级： ${format(getBuyableAmount(this.layer, this.id))}\n价格：${format(this.cost())}天赋点\n效果：所有好文精华获取速度x${format(this.effect())}`},
            effect(x) { 
                let base = new Decimal(1)
                if(!hasMilestone("E",9))mult2 = base.add(x)
                if(hasMilestone("E",9))mult2 = base.add(player.Exp.best21)
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
               player.Exp.pp = player.Exp.level.add(player.Exp.freepp)
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
            canAfford() { return player.Exp.points.gte(this.cost())},
            cost(x) {return new Decimal(100).pow(x)},
            buy() {
                player.Exp.freepp = player.Exp.freepp.add(1)
                player.Exp.pp = player.Exp.pp.add(1)
                player.Exp.points = player.Exp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {return `将你的经验点数转化为天赋点数。价格：${format(this.cost())}经验点数\n效果：获得${format(this.effect())}个免费天赋点`},
            effect(x) { 
              return x
            },
              style() { return {'border-radius': "5px", height: "200px", width: "200px"}},
            unlocked(){return hasMilestone("E",7)}
          },
    },
})
addLayer("Nf", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

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

    layerShown() { return true },   
    tooltip(){return "考试策略"},      // Returns a bool for if this layer's node should be visible in the tree.
    tabFormat:{
        "NumberFormating":{
            
content:[function() {if(hasMilestone("C",2))return ["row",[["buyable",21],["buyable",22],["buyable",23]]]},],
},
},       
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})
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

}