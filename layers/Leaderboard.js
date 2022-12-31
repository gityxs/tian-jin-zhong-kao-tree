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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "xx中学9年14班三年连任班长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "高冷学神，实力靠的是日积月累的勤奋与努力！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
            },
             
            style() {return {'background-color': "#DDDDDD", filter: "brightness("+new Decimal(100)+"%)", color: "black", 'border-color': "#00FF00",'border-radius': "0px", height: "100px", width: "100px"}},
            autoed() { return false},
        },
        992: {
            title(){return "<h2>"+player.E.name+"<h2>"},
            gain() { 
                let gain = new Decimal(5)
            return gain
        },
            display() { // Everything else displayed in the buyable button after the title
                  
                display = "这就是你呀~！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>"
                if(player.E.bestPoints.lt(150)) display += "家里蹲录取"
                if(player.E.bestPoints.gte(150)&&player.E.bestPoints.lt(165)) display += "天津市滨海新区汉沽中等专业学校录取"
        if(player.E.bestPoints.gte(165)) display += "天津市北辰职业中等技术学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "9年级级部大名人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "逆袭有方的女学神"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "BOF大会双冠王"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Arcaea知名画师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "活力四射的高傲学霸"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "音游圈知名曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "9年级14班数学课代表组长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "9年级14班学习委员组长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "9年级14班副班长在任"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "乐于助人的14班交际姐妹花"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市南开中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Chronostasis曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市耀华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "maimai狂热玩家"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市耀华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "大佬音游曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市耀华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "默默无闻的学习怪才"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市实验中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "物理课代表，对理科有着超常的兴趣"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市实验中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "副数学课代表，没什么特点，就是均衡"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第四中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "“重量级”英语课代表"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第42中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "独立音乐人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第42中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市海河中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "天赋音乐人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第7中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "大抽象画师兼曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第21中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市咸水沽第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "雷酸镭椰叶"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市静海第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "外星人学生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第二中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "外星人学生+1"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第45中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "外星人学生+114514"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第25中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "日本某转学生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第3中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "......"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津大学附属中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "遥不可及的虚空"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市紫云中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "......这是个bot随机生成的名字，剩下的编不出来了"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市自立中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "......这还是个bot随机生成的名字......此人在现实中不存在"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第14中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "......这又双叒叕是个bot随机生成的名字......你问为什么这个人名这么奇怪？问bot去......"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市南仓中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我是谁？我在哪？"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市民族中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "咕咕咕！咕咕？咕咕咕咕咕咕咕！！！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第13中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我永远单推tpz!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市梅江中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "小 心 立 秋"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市建华中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "某橘子"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市塘沽第二中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "某香蕉"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市油田第三中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "无极烤串店正式开张！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市复兴中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "刀姐......"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市滨海中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "鸽游官方谱师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第32中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我觉得世征ftr是个6.jpg"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市扶轮中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "平平无奇的9年级14班学生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第82中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我也平平无奇...只是和我上面那个哥们关系比较好..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第78中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我咋排名这么低啊...下半辈子要完蛋了..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市青光中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "楼上别凡尔赛了..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市津英中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Life is FAR FAR LOST!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市宝坻区王卜庄高级中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "你 蛇 红 了 . j p g"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市军粮城中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "FOREVER~~~"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市唐官屯中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "哎，这成绩，打工人的命啊"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市太平村中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Phigros现任美术组组长"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市潘庄中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "MIDI扒谱狂人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市油田第一中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "有梦想的Phigros音游人"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市田家炳中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "混音大师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市大港第八中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我是歌姬(字面意思)"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市蓟州区下营中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我是歌姬(网络意思)"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市丰台中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "还好不是职高吓死老娘了"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市汉沽第六中学录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "啊啊啊啊啊啊!!!我没有买外卖!!!奥运会 会 会 会 会..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一商业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "⚪⚪⚪!⚪⚪!⚪⚪!⚪⚪⚪⚪⚪⚪⚪!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市第一轻工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "你别想收了这首歌"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市机电工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "FPS领域著名大神"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市仪表无线电工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "弱气猫猫"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市经济贸易学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "我好666，排名就是66"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市东丽区职业教育中心学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "↑我才是66！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市南洋工业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "最后提醒大家一句——多喝热水！"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市宝坻区职业教育与成人教育中心录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "When you get to the higher...higher..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市信息工程学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Invisible Frenzy!!!"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市劳动保护学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "平平无奇音游曲师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市南开区职业中等专业学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "平平无奇音游曲师+1"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>天津市北辰职业中等技术学校录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "音游曲师+2"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "有实力无需BGA"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Here We are,Nick of Time"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "音游界女高音"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "音游界女高音"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "鼓先生"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "渴望被怜爱的谱师"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "火山操纵者"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "草(一语双关)"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "草先生的搭档"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "默默无闻，无人知晓"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "默默无闻，无人知晓+1"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "啊？这居然是曲师？"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "奈亚子"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "嗯？我只是睡了一觉而已，中考结束了？"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "楼上那位大哥，没错，考完了，还出分了..."
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Dynamix官方谱师1号"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = ""
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "Dynamix官方谱师2号"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                display = "中考得分<br>家里蹲录取"
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
            player.E.inChinese = new Decimal(0)  
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
                  
                let display = ("热烈祝贺本班88名学生中17名学生成功考入市五所！6名学生获得1000分以上的高分！<br>Tips:本排行榜中所有人名均为TomatoAPI生成，经历全为虚构，没有采用任何一个真实人名！<br>如有雷同，纯属巧合！")
                return display;
            },
            unlocked() { return true }, 
            canAfford() { return false},
            buy() { 
                 
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