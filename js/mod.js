let modInfo = {
	name: "天津中考树",
	id: "Ignotus",
	author: "Jing Wenxuan as a student from Tianjin Zili High School,Class3,Grade9",
	pointsName: "学分",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "Beta v0.0.3",
	name: "初识英语",
}

let changelog = `这里什么都没有<br>过段时间再来看看吧`
		

let winText = `恭喜你！你取得了该版本的毕业成绩！可喜可贺！<br>作者到达该版本毕业成绩的时间为2140年，你的成绩超越作者了吗？<br>作者：Lixiaohan From Tianjin Zili High School(Grade9,Class3)`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("C",11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(10)
	if(hasUpgrade("C",12)) gain = gain.mul(upgradeEffect("C",12))
	if(hasUpgrade("C",13)) gain = gain.mul(upgradeEffect("C",13))
	if(hasUpgrade("C",15)) gain = gain.mul(upgradeEffect("C",15))
	if(hasMilestone("E",1)) gain = gain.mul(player.E.bestPoints)
	if(hasMilestone("E",1)) gain = gain.mul(tmp.Exp.effect)
	if(getBuyableAmount("Exp",11).gte(1)||hasUpgrade("C",41)) gain = gain.mul(buyableEffect("Exp",11))
	if(player.C.totalGold.gte(1)) gain = gain.mul(tmp.C.effectGold1)
	if(player.Eng.totalpp.gte(1)) gain = gain.mul(tmp.Eng.ppEffect)
	if(player.C.total3.gte(1)) gain = gain.mul(tmp.C.effect3)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page


// Determines when the game "ends"
function isEndgame() {
	return player.E.bestPoints.gte(69)
}

function calculateDay() {
	let time = Date.now()
	time = time - zeroTime
	time = time/perDay
	return time
}
const zeroTime = 1196352000000 // 2007/11/26 00:00:00
const perDay = 31536000000 // milliseconds per year

function formatDay() {
	let time = calculateDay()
	return "本游戏作者 现在已经"+time+"岁了"
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
var displayThings = [
	"当前残局:中考最佳分数达到69分",
	"*目前游戏处于Beta版本，如遇到bug或者平衡问题可联系qq2119542935*",
	function(){return formatDay()},
	function() {if((player.points.gte(1444))&&(player.points.lt(8000))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1444"))) + "个葡萄糖分子。"},
	    function() {if((player.points.gte("8000"))&&(player.points.lt("64000"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("8000"))) + "个碳-60分子。"},
	    function() {if((player.points.gte("64000"))&&(player.points.lt("1e9"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("64000"))) + "个DNA。"},
	    function() {if((player.points.gte("1e9"))&&(player.points.lt("8e9"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1e9"))) + "个乙肝病毒。"},
	    function() {if((player.points.gte("8e9"))&&(player.points.lt("1.25e12"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("8e9"))) + "个新冠病毒。"},
	    function() {if((player.points.gte("1.25e12"))&&(player.points.lt("1.72e15"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.25e12"))) + "个大肠杆菌。"},
	    function() {if((player.points.gte("1.72e15"))&&(player.points.lt("3.5e20"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.72e15"))) + "个红细胞。"},
	    function() {if((player.points.gte("3.5e20"))&&(player.points.lt("1e21"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("3.5e20"))) + "个卵细胞。"},
	    function() {if((player.points.gte("1e21"))&&(player.points.lt("1e24"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1e21"))) + "个盐粒。"},
	    function() {if((player.points.gte("1e24"))&&(player.points.lt("1.2e26"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1e24"))) + "个米粒。"},
	    function() {if((player.points.gte("1.2e26"))&&(player.points.lt("1e30"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.2e26"))) + "个1元硬币。"},
	    function() {if((player.points.gte("1e30"))&&(player.points.lt("1.25e35"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1e30"))) + "个篮球。"},
	    function() {if((player.points.gte("1.25e35"))&&(player.points.lt("1e39"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.25e35"))) + "个作者。(按照作者体重43kg,密度1000g/m^3计算)"},
	    function() {if((player.points.gte("1e39"))&&(player.points.lt("8e42"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1e39"))) + "架标准航天飞机。"},
	    function() {if((player.points.gte("8e42"))&&(player.points.lt("1.6e47"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("8e42"))) + "个埃菲尔铁塔。"},
	    function() {if((player.points.gte("1.6e47"))&&(player.points.lt("1.28e48"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.6e47"))) + "个珠穆朗玛峰。"},
	    function() {if((player.points.gte("1.28e48"))&&(player.points.lt("1.28e51"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.28e48"))) + "个标准中子星。"},
	    function() {if((player.points.gte("1.28e51"))&&(player.points.lt("1.16e53"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.28e51"))) + "个土卫九。"},
	    function() {if((player.points.gte("1.16e53"))&&(player.points.lt("2.19e54"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.16e53"))) + "个谷神星（最大的小行星）。"},
	    function() {if((player.points.gte("2.19e54"))&&(player.points.lt("6.64e54"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("2.19e54"))) + "个冥王星（矮行星）。"},
	    function() {if((player.points.gte("6.64e54"))&&(player.points.lt("3.5e56"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("6.64e54"))) + "个月球。"},
	    function() {if((player.points.gte("3.5e56"))&&(player.points.lt("4.93e59"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("3.5e56"))) + "个地球。"},
	    function() {if((player.points.gte("4.93e59"))&&(player.points.lt("1.61e60"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("4.93e59"))) + "个木星。"},
	    function() {if((player.points.gte("1.61e60"))&&(player.points.lt("5.52e62"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.61e60"))) + "个比邻星。"},
	    function() {if((player.points.gte("1.61e60"))&&(player.points.lt("2.71e63"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("5.52e62"))) + "个太阳。"},
	    function() {if((player.points.gte("2.71e63"))&&(player.points.lt("9.36e66"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("2.71e63"))) + "个天狼星。"},
	    function() {if((player.points.gte("9.36e66"))&&(player.points.lt("1.02e70"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("9.36e66"))) + "个牧夫座alpha。"},
	    function() {if((player.points.gte("1.02e70"))&&(player.points.lt("8.51e71"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.02e70"))) + "个海山二A。"},
	    function() {if((player.points.gte("8.51e71"))&&(player.points.lt("1.5e78"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("8.51e71"))) + "个猎户座alpha。"},
	    function() {if((player.points.gte("1.5e78"))&&(player.points.lt("2.6e84"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.5e78"))) + "个超大质量黑洞。"},
	    function() {if((player.points.gte("2.6e84"))&&(player.points.lt("8.77e86"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("2.6e84"))) + "个奥尔特云。"},
	    function() {if((player.points.gte("8.77e86"))&&(player.points.lt("8.77e89"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("8.77e86"))) + "个猎户座悬臂。"},
	    function() {if((player.points.gte("8.77e89"))&&(player.points.lt("6.49e94"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("8.77e89"))) + "个银河系。"},
	    function() {if((player.points.gte("6.49e94"))&&(player.points.lt("1.75e100"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("6.49e94"))) + "个IC 1101（已知最大星系）。"},
	    function() {if((player.points.gte("1.75e100"))&&(player.points.lt("3.38e103"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.75e100"))) + "个本超星系团。"},
	    function() {if((player.points.gte("3.38e103"))&&(player.points.lt("1.05e109"))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("3.38e103"))) + "个史隆长城。"},
	    function() {if((player.points.gte("1.05e109"))&&(player.points.add(1).log10().lt(120))) return "如果你每个学分占据一个氢原子大小，那么它们足以制造"+format(player.points.div(new Decimal("1.05e109"))) + "个可观测宇宙。"},
	    function() {if((player.points.add(1).log10().gte(120))&&(player.points.add(1).log10().lt(240))) return "如果你每秒写2个数字，不用科学计数法写下你的学分数目需要"+format(player.points.add(1).log10().div(2)) + "秒，在此期间，作者已经完成了"+format(player.points.add(1).log10().div(2).div(60).mul(32))+"次仰卧起坐。"},
	    function() {if((player.points.add(1).log10().gte(240))&&(player.points.add(1).log10().lt(494))) return "如果你每秒写2个数字，不用科学计数法写下你的学分数目需要"+format(player.points.add(1).log10().div(2).div(60)) + "分钟，在此期间，作者已经完成了800m跑的"+format(player.points.add(1).log10().div(2).div(60).div(3.75).mul(100))+"%。"},
	    function() {if((player.points.add(1).log10().gte(494))&&(player.points.add(1).log10().lt(14400))) return "如果你每秒写2个数字，不用科学计数法写下你的学分数目需要"+format(player.points.add(1).log10().div(2).div(60)) + "分钟。<br>在此期间，物化合场中考已经完成了"+format(player.points.add(1).log10().div(2).div(60).div(120).mul(100))+"%。"},
	
]