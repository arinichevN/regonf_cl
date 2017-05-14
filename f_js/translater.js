function Translater() {
    this.container = null;
    this.dict = [];
    this.active_lang = null;
    this.lang = [];//available languages array
    this.langB = [];
    this.MONTH_OFFSET = 20;
    this.MONTH_FULL_OFFSET = 8;
    this.WEEKDAY_OFFSET = 39;
    this.WEEKDAY_FULL_OFFSET = 32;
    this.month = [
        [0, 0, "january", "jan"],
        [1, 0, "february", "feb"],
        [2, 0, "march", "mar"],
        [3, 0, "april", "apr"],
        [4, 0, "may", "may"],
        [5, 0, "june", "jun"],
        [6, 0, "july", "jul"],
        [7, 0, "august", "aug"],
        [8, 0, "september", "sep"],
        [9, 0, "october", "oct"],
        [10, 0, "november", "nov"],
        [11, 0, "december", "dec"],
        [0, 1, "январь", "янв"],
        [1, 1, "февраль", "фев"],
        [2, 1, "март", "мар"],
        [3, 1, "апрель", "апр"],
        [4, 1, "май", "май"],
        [5, 1, "июнь", "июн"],
        [6, 1, "июль", "июл"],
        [7, 1, "август", "авг"],
        [8, 1, "сентябрь", "сен"],
        [9, 1, "октябрь", "окт"],
        [10, 1, "ноябрь", "ноя"],
        [11, 1, "декабрь", "дек"]
    ];
    this.weekday = [
        [0, 0, "sunday", "su"], [0, 1, "воскресенье", "вс"],
        [1, 0, "monday", "mo"], [1, 1, "понедельник", "пн"],
        [2, 0, "tuesday", "tu"], [2, 1, "вторник", "вт"],
        [3, 0, "wednesday", "we"], [3, 1, "среда", "ср"],
        [4, 0, "thursday", "th"], [4, 1, "четверг", "чт"],
        [5, 0, "friday", "fr"], [5, 1, "пятница", "пт"],
        [6, 0, "saturday", "sa"], [6, 1, "суббота", "сб"]
    ];
    this.period = [
        [0, 0, "second", "s"],
        [1, 0, "minute", "m"],
        [2, 0, "hour", "h"],
        [3, 0, "day", "d"],
        [0, 1, "секунда", "с"],
        [1, 1, "минута", "мин"],
        [2, 1, "час", "ч"],
        [3, 1, "сутки", "сут"]
    ];
    this.month_max = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
    this.init = function () {
        this.container = cd();
        cla(this.container, "toggle_cont");
    };
    this.setLang = function (al, l) {//call it once
        var self = this;
        this.active_lang = al;
        for (var i = 0; i < l.length; i++) {
            var b = cb(l[i]);
            b.cid = i;
            b.onclick = function () {
                self.changeLang(this);
            };
            cla(b, [ "f2"]);
            if (i === this.active_lang) {
                cla(b, "active_btn");
            }
            a(this.container, b);
            this.langB.push(b);
            this.lang.push(l[i]);
        }
    };
    this.addDict = function (v) {
        for (var i = 0; i < v.length; i++) {
            this.dict.push([v[i][0], v[i][1], v[i][2]]);
        }
    };
    this.changeLang = function (elem) {
        for (var i = 0; i < this.langB.length; i++) {
            if (elem.cid === i) {
                this.active_lang = i;
                cla(this.langB[i], "active_btn");
            } else {
                clr(this.langB[i], "active_btn");
            }
        }
        for (var i = 0; i < visu.length; i++) {
            visu[i].updateStr();
        }
    };
    this.get = function (id) {
        for (var i = 0; i < this.dict.length; i++) {
            if (this.dict[i][0] === id && this.dict[i][1] === this.active_lang) {
                return this.dict[i][2];
            }
        }
        return "";
    };
    this.getP = function (id) {
        for (var i = 0; i < this.period.length; i++) {
            if (this.period[i][0] === id && this.period[i][1] === this.active_lang) {
                return this.period[i][2];
            }
        }
        return "";
    };
    this.getMon = function (id, l) {
        for (var i = 0; i < this.month.length; i++) {
            if (this.month[i][0] === id && this.month[i][1] === this.active_lang) {
                return this.month[i][2 + l];
            }
        }
        return "";
    };
    this.getMonCut = function (id) {
        return this.getMon(id, 1);
    };
    this.getMMax = function (id) {
        return this.month_max[id];
    };
    this.getWD = function (id, l) {
        for (var i = 0; i < this.weekday.length; i++) {
            if (this.weekday[i][0] === id && this.weekday[i][1] === this.active_lang) {
                return this.weekday[i][2 + l];
            }
        }
        return "";
    };
    this.getWDE = function (id, l) {
        return this.getWD(this.wdEn2Ru(id), l);
    };
    this.wdEn2Ru = function (id) {
        switch (id) {
            case 0:
                return 6;
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 4;
            case 6:
                return 5;
            default:
                return null;
        }
    };
    this.wdRu2En = function (id) {
        switch (id) {
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 4;
            case 4:
                return 5;
            case 5:
                return 6;
            case 6:
                return 0;
            default:
                return null;
        }
    };
    this.setBStyle = function (style) {
        for (var i = 0; i < this.langB.length; i++) {
            cla(this.langB[i], style);
        }
    };
}
var trans = new Translater();
elem.push(trans);

