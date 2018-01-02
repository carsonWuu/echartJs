/**
**      Author：张云飞
**        Time：2014年5月14日
** Description：prototype拓展
**/

//字符串去前后空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

//转换成格式化过的时间串
String.prototype.toFormattedTimeString = function (format) {
    if (this == "" || this == "1-01-01" || this == "1970-01-01" || this == "1-01-01 00:00:00") {
        return "";
    }
    var dt;
    if (this instanceof Date) {
        dt = this;
    }
    else {
        dt = new Date(this);
        if (isNaN(dt)) {
            var value = parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1'), 10);
            dt = new Date();
            dt.setTime(value);
        }
    }
    if (dt.format(format) == "1-01-01" || dt.format(format) == "1-01-01 08:00:00") {
        return "";
    }
    if (format == undefined || format == null || format == "") {
        return dt.format("yyyy-MM-dd hh:mm:ss");
    }
    return dt.format(format);
};

//时间格式转换
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(),    //day 
        "h+": this.getHours(),   //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
        "S": this.getMilliseconds() //millisecond 
    };
    if (format == undefined || format == null || format == "") {
        format = "yyyy-MM-dd hh:mm:ss";
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//时间转换成短日期格式
Date.prototype.toShortDate = function (dateTime) {
    var myDate = dateTime;
    if (dateTime == undefined || dateTime == null) {
        myDate = new Date();
    }
    var YY = myDate.getFullYear();
    var MM = myDate.getMonth() + 1;
    var DD = myDate.getDate();

    return YY + "-" + MM + "-" + DD;
}

/**
 * 将数值四舍五入后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
Number.prototype.toFormattedMoney = function (digit) {
    var num = this.toString().replace(/\$|\,/g, '');
    if (isNaN(num) || num == "0") {
        return "0";
    }
    var sign = (num == Math.abs(num)); //正数
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = 0;

    if (digit == 1) {
        cents = num % 10;
    }
    else {
        cents = num % 100;
        if (cents < 10) {
            cents = "0" + cents;
        }
    }

    num = Math.floor(num / 100).toString();
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }

    var formatted = digit == 0 ? (sign ? '' : '-') + num : (sign ? '' : '-') + num + '.' + cents;
    return formatted;
}