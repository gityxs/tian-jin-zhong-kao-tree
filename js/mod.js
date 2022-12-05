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
	num: "Beta v0.0.1",
	name: "梦之肇始",
}

let changelog = `这里什么都没有<br>过段时间再来看看吧`
		

let winText = `恭喜你！你取得了该版本的毕业成绩！可喜可贺！<br>作者到达该版本毕业成绩的时间为2105年，你的成绩超越作者了吗？<br>作者：Jing Wenxuan From Tianjin Zili High School(Grade9,Class3)`

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
	if(player.Exp.unlocked) gain = gain.mul(tmp.Exp.effect)
	if(getBuyableAmount("Exp",11).gte(1)||hasUpgrade("C",41)) gain = gain.mul(buyableEffect("Exp",11))
	if(player.C.totalGold.gte(1)) gain = gain.mul(tmp.C.effectGold1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page


// Determines when the game "ends"
function isEndgame() {
	return player.E.bestPoints.gte(16)
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
	"当前残局:中考最佳分数达到16分",
	"*目前游戏处于Beta版本，如遇到bug或者平衡问题可联系qq2119542935*",
	function(){return formatDay()}
	
]