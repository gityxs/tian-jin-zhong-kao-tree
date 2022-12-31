
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e9) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = 2, small) {
    small = small || modInfo.allowSmall
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision, small)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e1000000")&&getBuyableAmount("Nf",12).gte(1)) return exponentialFormat(decimal, 0, false)
    else if (decimal.gte("1e10000")&&getBuyableAmount("Nf",12).gte(1)) return exponentialFormat(decimal, 0)
    else if (decimal.gte(1e9)&&getBuyableAmount("Nf",12).gte(1)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1e3)&&getBuyableAmount("Nf",12).gte(1)) return commaFormat(decimal, 0)
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(54)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(54)).mul(7)))),precision)+"那摩怛罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(53)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(53)).mul(7)))),precision)+"伽摩怛罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(52)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(52)).mul(7)))),precision)+"勃摩怛罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(51)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(51)).mul(7)))),precision)+"阿摩怛罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(50)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(50)).mul(7)))),precision)+"极量"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(49)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(49)).mul(7)))),precision)+"不动"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(48)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(48)).mul(7)))),precision)+"离娇慢"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(47)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(47)).mul(7)))),precision)+"摩鲁摩"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(46)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(46)).mul(7)))),precision)+"翳罗陀"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(45)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(45)).mul(7)))),precision)+"忏慕陀"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(44)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(44)).mul(7)))),precision)+"摩鲁陀"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(43)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(43)).mul(7)))),precision)+"诃鲁那"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(42)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(42)).mul(7)))),precision)+"达罗步陀"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(41)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(41)).mul(7)))),precision)+"奚鲁伽"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(40)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(40)).mul(7)))),precision)+"诃理三"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(39)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(39)).mul(7)))),precision)+"诃理蒲"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(38)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(38)).mul(7)))),precision)+"一动"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(37)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(37)).mul(7)))),precision)+"诃理婆"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(36)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(36)).mul(7)))),precision)+"泥罗婆"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(35)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(35)).mul(7)))),precision)+"最妙"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(34)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(34)).mul(7)))),precision)+"高出"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(33)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(33)).mul(7)))),precision)+"周广"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(32)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(32)).mul(7)))),precision)+"伺察"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(31)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(31)).mul(7)))),precision)+"奚婆罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(30)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(30)).mul(7)))),precision)+"毗睹罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(29)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(29)).mul(7)))),precision)+"三末耶"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(28)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(28)).mul(7)))),precision)+"颠倒"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(27)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(27)).mul(7)))),precision)+"异路"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(26)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(26)).mul(7)))),precision)+"一持"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(25)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(25)).mul(7)))),precision)+"称量"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(24)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(24)).mul(7)))),precision)+"毗佉担"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(23)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(23)).mul(7)))),precision)+"毗薄底"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(22)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(22)).mul(7)))),precision)+"毗婆诃"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(21)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(21)).mul(7)))),precision)+"毗素陀"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(20)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(20)).mul(7)))),precision)+"毗盛伽"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(19)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(19)).mul(7)))),precision)+"毗赡婆"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(18)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(18)).mul(7)))),precision)+"毗萨罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(17)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(17)).mul(7)))),precision)+"僧羯罗摩"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(16)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(16)).mul(7)))),precision)+"毗伽婆"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(15)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(15)).mul(7)))),precision)+"毗罗伽"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(14)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(14)).mul(7)))),precision)+"弥伽婆"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(13)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(13)).mul(7)))),precision)+"阿婆钤"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(12)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(12)).mul(7)))),precision)+"祢摩"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(11)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(11)).mul(7)))),precision)+"普摩"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(10)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(10)).mul(7)))),precision)+"界分"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(9)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(9)).mul(7)))),precision)+"多婆罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(8)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(8)).mul(7)))),precision)+"阿婆罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(7)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(7)).mul(7)))),precision)+"摩婆罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(6)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(6)).mul(7)))),precision)+"最胜"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(5)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(5)).mul(7)))),precision)+"阿伽罗"
    else if (decimal.gte(new Decimal(10).pow((new Decimal(2).pow(4)).mul(7)))) return exponentialFormat((decimal.div(new Decimal(10).pow((new Decimal(2).pow(4)).mul(7)))),precision)+"矜羯罗"
    else if (decimal.gte(1e72)) return exponentialFormat((decimal.div(1e68)),precision)+"无量大数"
    else if (decimal.gte(1e68)) return formatWhole((Math.floor(decimal / 1e68)))+"无量大数"+formatWhole((Math.floor(decimal / 1e64 % 10000)))+"不可思议"+formatWhole((Math.floor(decimal / 1e60 % 10000)))+"那由他"
    else if (decimal.gte(1e64)) return formatWhole((Math.floor(decimal / 1e64)))+"不可思议"+formatWhole((Math.floor(decimal / 1e60 % 10000)))+"那由他"+formatWhole((Math.floor(decimal / 1e56 % 10000)))+"阿僧祇"
    else if (decimal.gte(1e60)) return formatWhole((Math.floor(decimal / 1e60)))+"那由他"+formatWhole((Math.floor(decimal / 1e56 % 10000)))+"阿僧祇"+formatWhole((Math.floor(decimal / 1e52 % 10000)))+"恒河沙"
    else if (decimal.gte(1e56)) return formatWhole((Math.floor(decimal / 1e56)))+"阿僧祇"+formatWhole((Math.floor(decimal / 1e52 % 10000)))+"恒河沙"+formatWhole((Math.floor(decimal / 1e48 % 10000)))+"极"
    else if (decimal.gte(1e52)) return formatWhole((Math.floor(decimal / 1e52)))+"恒河沙"+formatWhole((Math.floor(decimal / 1e48 % 10000)))+"极"+formatWhole((Math.floor(decimal / 1e44 % 10000)))+"载"
    else if (decimal.gte(1e48)) return formatWhole((Math.floor(decimal / 1e48)))+"极"+formatWhole((Math.floor(decimal / 1e44 % 10000)))+"载"+formatWhole((Math.floor(decimal / 1e40 % 10000)))+"正"
    else if (decimal.gte(1e44)) return formatWhole((Math.floor(decimal / 1e44)))+"载"+formatWhole((Math.floor(decimal / 1e40 % 10000)))+"正"+formatWhole((Math.floor(decimal / 1e36 % 10000)))+"涧"
    else if (decimal.gte(1e40)) return formatWhole((Math.floor(decimal / 1e40)))+"正"+formatWhole((Math.floor(decimal / 1e36 % 10000)))+"涧"+formatWhole((Math.floor(decimal / 1e32 % 10000)))+"沟"
    else if (decimal.gte(1e36)) return formatWhole((Math.floor(decimal / 1e36)))+"涧"+formatWhole((Math.floor(decimal / 1e32 % 10000)))+"沟"+formatWhole((Math.floor(decimal / 1e28 % 10000)))+"穰"
    else if (decimal.gte(1e32)) return formatWhole((Math.floor(decimal / 1e32)))+"沟"+formatWhole((Math.floor(decimal / 1e28 % 10000)))+"穰"+formatWhole((Math.floor(decimal / 1e24 % 10000)))+"杼"
    else if (decimal.gte(1e28)) return formatWhole((Math.floor(decimal / 1e28)))+"穰"+formatWhole((Math.floor(decimal / 1e24 % 10000)))+"杼"+formatWhole((Math.floor(decimal / 1e20 % 10000)))+"垓"
    else if (decimal.gte(1e24)) return formatWhole((Math.floor(decimal / 1e24)))+"杼"+formatWhole((Math.floor(decimal / 1e20 % 10000)))+"垓"+formatWhole((Math.floor(decimal / 1e16 % 10000)))+"京"
    else if (decimal.gte(1e20)) return formatWhole((Math.floor(decimal / 1e20)))+"垓"+formatWhole((Math.floor(decimal / 1e16 % 10000)))+"京"+formatWhole((Math.floor(decimal / 1e12 % 10000)))+"兆"
    else if (decimal.gte(1e16)) return formatWhole((Math.floor(decimal / 1e16)))+"京"+formatWhole((Math.floor(decimal / 1e12 % 10000)))+"兆"+formatWhole((Math.floor(decimal / 1e8 % 10000)))+"亿"
    else if (decimal.gte(1e12)) return formatWhole((Math.floor(decimal / 1e12)))+"兆"+formatWhole((Math.floor(decimal / 1e8 % 10000)))+"亿"+formatWhole((Math.floor(decimal / 1e4 % 10000)))+"万"
    else if (decimal.gte(1e8)) return formatWhole((Math.floor(decimal / 1e8)))+"亿"+formatWhole((Math.floor(decimal / 1e4 % 10000)))+"万"+formatWhole((Math.floor(decimal / 1 % 10000)))+""
    else if (decimal.gte(1e4)) return formatWhole((Math.floor(decimal / 1e4)))+"万"+formatWhole((Math.floor(decimal / 1 % 10000)))+""
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")){
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else   
        return format(decimal, precision) + "⁻¹"

}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}