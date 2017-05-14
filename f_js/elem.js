function MyImage(name) {
    this.container = c("img");
    s(this.container, "src", "client/image/" + name);
}

function ToggleButtonArray(data, header_str, header_style, elem_disabled_style, elem_enabled_style, elem_cont_style, cont_style, item_style) {//data: [[name, selected],]
    this.data = [];
    this.container = cd();
    this.headerE = cd();
    this.elem_cont = cd();
    this.en_style = elem_enabled_style;
    this.dis_style = elem_disabled_style;
    this.item_style = item_style;
    this.headerE.innerHTML = header_str;
    cla(this.container, cont_style);
    cla(this.elem_cont, elem_cont_style);
    cla(this.headerE, header_style);
    a(this.container, this.headerE);
    a(this.container, this.elem_cont);
    this.toggle = function (ind) {
        //select this
        for (var i = 0; i < this.data.length; i++) {
            if (i === ind) {
                if (this.data[i].selected) {
                    return;
                } else {
                    cla(this.data[i].elem, this.en_style);
                    clr(this.data[i].elem, this.dis_style);
                    this.data[i].selected = true;
                }
                break;
            }
        }
        //deselect others
        for (var i = 0; i < this.data.length; i++) {
            if (i !== ind) {
                clr(this.data[i].elem, this.en_style);
                cla(this.data[i].elem, this.dis_style);
                this.data[i].selected = false;
            }
        }

    };
    this.selectItem = function (ind) {
        if (ind >= 0 && ind < this.data.length) {
            if (!this.data[ind].selected) {
                this.toggle(ind);
            }
        }
    };
    this.getActiveElemInd = function () {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].selected) {
                return i;
            }
        }
        return null;
    };
    this.disable = function () {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i].selected = false;
            clr(this.data[i].elem, this.en_style);
            cla(this.data[i].elem, this.dis_style);
            this.data[i].elem.disabled = true;
        }
    };
    this.enable = function () {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i].elem.disabled = true;
        }
    };
    this.updateStr = function (header_str, item_str_arr) {
        this.headerE.innerHTML = header_str;
        for (var i = 0; i < item_str_arr.length; i++) {
            this.data[i].elem.innerHTML = item_str_arr[i];
        }
    };
    var self = this;
    for (var i = 0; i < data.length; i++) {
        var elem = cb(data[i][0]);
        elem.ind = i;
        elem.onclick = function () {
            self.toggle(this.ind);
        };
        if (data[i][1]) {
            cla(elem, this.en_style);
            clr(elem, this.dis_style);
        } else {
            clr(elem, this.en_style);
            cla(elem, this.dis_style);
        }
        cla(elem, this.item_style);
        a(this.elem_cont, elem);
        this.data.push({name: data[i][0], selected: data[i][1], elem: elem});
    }

}

function NavigationButton(slave, img_path) {
    this.slave = slave;
    this.container = cb("");
    this.imgE = c("img");
    this.valE = cd();
    s(this.imgE, "src", img_path);
    cla(this.imgE, "nbi_img");
    cla(this.valE, "nbi_val");
    this.container.addEventListener("click", function () {
        showV(slave);
    }, false);
    if (typeof img_path !== 'undefined') {
        a(this.container, this.imgE);
    }
    a(this.container, this.valE);
    this.updateStr = function () {
        this.valE.innerHTML = this.slave.getName();
    };
}
function AudioMP3(path, volume) {
    this.container = c('audio');
    this.source = c('source');
    this.container.volume = volume;
    this.container.controls = false;
    this.container.loop = true;
    this.source.src = path;
    this.source.type = "audio/mp3";
    a(this.container, this.source);
    this.play = function () {
        this.container.play();
    };
    this.pause = function () {
        this.container.pause();
    };

}
function NavigationButtonOut(path, text_id, img_path) {
    //this.path = path;
    this.text_id = text_id;
    this.container = cb("");
    this.imgE = c("img");
    this.valE = cd();
    s(this.imgE, "src", img_path);
    cla(this.imgE, "nbi_img");
    cla(this.valE, "nbi_val");
    if (typeof img_path !== 'undefined') {
        a(this.container, this.imgE);
    }
    a(this.container, this.valE);
    this.container.addEventListener("click", function () {
        window.location.href = path;
    }, false);
    this.updateStr = function () {
        this.valE.innerHTML = trans.get(this.text_id);
    };
}
function NavigationButtonI(slave, img_path) {
    this.slave = slave;
    this.container = cb("");
    this.imgE = c("img");
    s(this.imgE, "src", img_path);
    this.valE = cd();
    cla(this.imgE, "nbi_img");
    cla(this.valE, "nbi_val");
    if (typeof img_path !== 'undefined') {
        a(this.container, this.imgE);
    }
    this.container.addEventListener("click", function () {
        showV(slave);
    }, false);
    this.updateStr = function () {
        this.valE.innerHTML = this.slave.getName();
    };
}
function ApplyButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.imgE = c("img");
    this.valE = cd();
    s(this.imgE, "src", "f_js/image/apply.png");
    cla(this.imgE, "nbi_img");
    cla(this.valE, "nbi_val");
    a(this.container, [this.imgE, this.valE]);
    this.container.addEventListener("click", function () {
        self.slave.apply(self.id);
    }, false);
    this.updateStr = function () {
        this.valE.innerHTML = trans.get(2);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function CancelButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.imgE = c("img");
    this.valE = cd();
    s(this.imgE, "src", "f_js/image/cancel.png");
    cla(this.imgE, "nbi_img");
    cla(this.valE, "nbi_val");
    a(this.container, [this.imgE, this.valE]);
    this.container.addEventListener("click", function () {
        self.slave.cancel(self.id);
    }, false);
    this.updateStr = function () {
        this.valE.innerHTML = trans.get(5);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function SaveButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.save(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(1);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function Fieldset() {
    this.container = c('fieldset');
    this.head = c('legend');
    a(this.container, this.head);
    this.updateStr = function (v) {
        this.head.innerHTML = v;
    };
}
function BlockerSlide(slave, interval) {
    this.container = c('input');
    s(this.container, 'type', 'range');
    s(this.container, 'step', 1);
    this.container.value = 0;
    this.container.min = 0;
    this.container.max = 100;
    this.slave = slave;
    this.interval = interval;
    this.btimer = null;
    this.blocked = true;
    this.block = function () {
        this.slave.block();
        this.container.value = 0;
    };
    this.updateStr = function (v) {
        this.head.innerHTML = v;
    };
    this.unblock = function () {
        this.slave.unblock();
    };
    var self = this;
    this.container.onchange = function () {
        var value = parseInt(this.value);
        if (value === 100) {
            self.unblock();
            self.btimer = window.setTimeout(function () {
                self.block();
            }, self.interval);
        }
    };

}
function BlockerButton(slave, interval) {
    this.container = cb('');
    this.slave = slave;
    this.interval = interval;
    this.tmr1 = {tmr: null};
    this.blocked = false;
    this.block = function () {
        this.container.innerHTML = "снять блокировку";
        this.blocked = true;
        this.slave.block();
    };
    this.updateStr = function (v) {
        this.head.innerHTML = v;
    };
    this.unblock = function () {
        this.container.innerHTML = "блокировать";
        this.blocked = false;
        this.slave.unblock();
    };
    var self = this;
    this.container.onclick = function () {
        if (self.blocked) {
            self.unblock();
            self.tmr1.tmr = window.setTimeout(function () {
                self.block();
            }, self.interval);
        } else {
            clearTmr(self.tmr1);
            self.block();
        }
    };
    this.block();
}
function CopyButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.copy(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(6);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function PasteButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.paste(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(7);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function IncButton(slave, sign, kind, incr, text) {
    var self = this;
    this.slave = slave;
    this.sign = sign;
    this.kind = kind;
    this.inc = incr;
    this.text = text;
    this.disabled = false;
    this.container = cb(this.text);
    this.container.onmousedown = function () {
        inc.down(self.slave, self.sign, self.kind, self.inc);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
}
function FloatEditFieldset(min_value, max_value) {
    this.container = null;
    this.changeB = null;
    this.signB = null;
    this.incB = null;
    this.header = null;
    this.sign = 1;
    this.value = 0.0;
    this.minv = min_value;
    this.maxv = max_value;
    this.inc = 1;
    this.timer = null;

    this.getName = function () {
        return "int edit";
    };
    this.incCB = function () {
        var r = this.value + this.inc * this.sign;
        if (r >= this.minv && r <= this.maxv) {
            this.value = this.value + (this.inc * this.sign);
            this.changeB.innerHTML = this.value.toFixed(3);
        }
    };
    this.chSign = function () {
        this.sign *= -1;
        this.updSign();
    };
    this.updSign = function () {
        if (this.sign > 0) {
            this.signB.innerHTML = "+";
        } else {
            this.signB.innerHTML = "-";
        }
    };
    this.updInc = function () {
        switch (this.inc) {
            case 0.001:
                this.inc = 0.01;
                break;
            case 0.01:
                this.inc = 0.1;
                break;
            case 0.1:
                this.inc = 1;
                break;
            case 1:
                this.inc = 10;
                break;
            case 10:
                this.inc = 100;
                break;
            case 100:
                this.inc = 1000;
                break;
            case 1000:
                this.inc = 0.001;
                break;
        }
        this.incB.innerHTML = this.inc;
    };
    this.updateStr = function (v) {
        this.header.innerHTML = v;
    };
    var self = this;
    this.container = c('fieldset');
    this.header = c('legend');

    this.changeB = cb("");
    this.changeB.innerHTML = this.value;
    this.changeB.onmousedown = function () {
        inc.down(self);
    };
    this.changeB.innerHTML = this.value.toFixed(3);
    this.signB = cb("");
    this.updSign();
    this.signB.onclick = function () {
        self.chSign();
    };
    this.incB = cb("");
    this.incB.innerHTML = this.inc;
    this.incB.onclick = function () {
        self.updInc();
    };

    a(this.container, [this.header, this.changeB, this.signB, this.incB]);

    cla([this.signB, this.incB, this.changeB], "fefs_allb");
    cla(this.signB, "fefs_singb");
    cla(this.incB, "fefs_incb");
    cla(this.changeB, "fefs_changeB");
    cla(this.header, "fefs_header");
}

function IntEditFieldset(min_value, max_value) {
    this.container = null;
    this.changeB = null;
    this.signB = null;
    this.incB = null;
    this.header = null;
    this.sign = 1;
    this.value = 0;
    this.minv = min_value;
    this.maxv = max_value;
    this.inc = 1;
    this.timer = null;

    this.getName = function () {
        return "int edit";
    };
    this.incCB = function () {
        var r = this.value + this.inc * this.sign;
        if (r >= this.minv && r <= this.maxv) {
            this.value = this.value + (this.inc * this.sign);
            this.changeB.innerHTML = this.value;
        }
    };
    this.chSign = function () {
        this.sign *= -1;
        this.updSign();
    };
    this.updSign = function () {
        if (this.sign > 0) {
            this.signB.innerHTML = "+";
        } else {
            this.signB.innerHTML = "-";
        }
    };
    this.updInc = function () {
        switch (this.inc) {
            case 1:
                this.inc = 10;
                break;
            case 10:
                this.inc = 100;
                break;
            case 100:
                this.inc = 1000;
                break;
            case 1000:
                this.inc = 1;
                break;
        }
        this.incB.innerHTML = this.inc;
    };
    this.updateStr = function (v) {
        this.header.innerHTML = v;
    };
    var self = this;
    this.container = c('fieldset');
    this.header = c('legend');

    this.changeB = cb("");
    this.changeB.innerHTML = this.value;
    this.changeB.onmousedown = function () {
        inc.down(self);
    };
    this.changeB.innerHTML = this.value;
    this.signB = cb("");
    this.updSign();
    this.signB.onclick = function () {
        self.chSign();
    };
    this.incB = cb("");
    this.incB.innerHTML = this.inc;
    this.incB.onclick = function () {
        self.updInc();
    };

    a(this.container, [this.header, this.changeB, this.signB, this.incB]);

    cla([this.signB, this.incB, this.changeB], "iefs_allb");
    cla(this.signB, "iefs_singb");
    cla(this.incB, "iefs_incb");
    cla(this.changeB, "iefs_changeB");
    cla(this.header, "iefs_header");
}

function UpButton(slave) {
    this.b = new IncButton(slave, -1, 0, 1, "&uparrow;");
    this.container = this.b.container;
    this.disabled = false;
    this.enable = function () {
        this.b.enable();
        this.disabled = false;
    };
    this.disable = function () {
        this.b.disable();
        this.disabled = true;
    };
}
function DownButton(slave) {
    this.b = new IncButton(slave, 1, 0, 1, "&downarrow;");
    this.container = this.b.container;
    this.disabled = false;
    this.enable = function () {
        this.b.enable();
        this.disabled = false;
    };
    this.disable = function () {
        this.b.disable();
        this.disabled = true;
    };
}
function LeftButton(slave) {
    var b = new IncButton(slave, -1, 1, 1, "&leftarrow;");
    this.container = b.container;
    this.disabled = false;
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
}
function RightButton(slave) {
    var b = new IncButton(slave, 1, 1, 1, "&rightarrow;");
    this.container = b.container;
    this.disabled = false;
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
}
function BackButton() {
    this.text_id = 0;
    this.container = cb(trans.get(this.text_id));
    this.container.onclick = function () {
        goBack();
    };
    this.updateStr = function () {
        this.container.innerHTML = trans.get(this.text_id);
    };
}
function UpdateButton(slave, kind) {
    var self = this;
    this.slave = slave;
    this.kind = kind;
    this.container = cb("");
    this.container.onclick = function () {
        self.slave.update(self.kind);
    };
    this.updateStr = function () {
        this.container.innerHTML = "&circlearrowright;";
        this.container.title = trans.get(46);
    };
    this.updateStr();
}
function AddButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.add(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(50);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function DeleteButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.delete(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(51);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function TimeAndDateSelector(slave, id) {
    var self = this;
    this.data = {
        year: 0,
        month: 0,
        day: 0,
        wday: 0,
        hour: 0,
        min: 0,
        sec: 0
    };
    this.wd = [];//all weekdays
    this.slave = slave;
    this.id = id;
    this.container = cd();
    this.header = cd();
    this.toyB = cb("");
    this.yearB = cb("");
    this.wdB = cb("");
    this.applyB = cb("");
    a(this.container, [this.header, this.yearB, this.toyB, this.wdB, this.applyB]);
    this.toyB.onclick = function () {
        vtoy_edit.prep(self.data.month, self.data.day, self.data.hour * 3600 + self.data.min * 60 + self.data.sec, self, 1, 54);
        showV(vtoy_edit);
    };
    this.yearB.onclick = function () {
        vint_edit.prep(self.data.year, 1900, 2099, self, 2, 52);
        showV(vint_edit);
    };
    this.wdB.onclick = function () {
        vselect_edit.prep(self.wd, 0, self, 3, 53);
        showV(vselect_edit);
    };
    this.applyB.onclick = function () {
        self.slave.catchEdit(self.data, self.id);
    };
    this.updateStr = function () {
        this.header.innerHTML = trans.get(55);
        this.wdB.innerHTML = trans.getWD(this.data.wday, 0);
        this.toyB.innerHTML = app.toToy(this.data.month, this.data.day, this.data.hour * 3600 + this.data.min * 60 + this.data.sec);
        this.mkWD();
        this.applyB.innerHTML = trans.get(2);
    };
    this.updateLabel = function () {
        this.wdB.innerHTML = trans.getWD(this.data.wday, 0);
        this.toyB.innerHTML = app.toToy(this.data.month, this.data.day, this.data.hour * 3600 + this.data.min * 60 + this.data.sec);
        this.yearB.innerHTML = this.data.year;
        this.mkWD();
    };
    this.setTimestamp = function (t) {
        var d = new Date(t);
        this.data.year = d.getFullYear();
        this.data.month = d.getMonth();
        this.data.day = d.getDate();
        this.data.wday = d.getDay();
        this.data.hour = d.getHours();
        this.data.min = d.getMinutes();
        this.data.sec = d.getSeconds();
        this.updateLabel();
    };
    //expected: min_hour_wday_day_month_year
    this.setString = function (v) {
        var arr = v.split('_');
        this.data.sec = parseInt(arr[0]);
        this.data.min = parseInt(arr[1]);
        this.data.hour = parseInt(arr[2]);
        this.data.wday = parseInt(arr[3]);
        this.data.day = parseInt(arr[4]);
        this.data.month = parseInt(arr[5]);
        this.data.year = parseInt(arr[6]);
        this.updateLabel();
    };
    this.getStrData = function () {
        var mm = intTo2str(this.data.min);
        var hh = intTo2str(this.data.hour);
        var DD = intTo2str(this.data.day);
        var MM = intTo2str(this.data.month);
        var w = this.data.wday;
        var YY = this.data.year;
        return " " + mm + hh + w + DD + MM + YY;
    };
    this.mkWD = function () {
        cleara(this.wd);
        var selected = false;
        for (var i = 0; i < 7; i++) {
            if (this.data.wday === i) {
                selected = true;
            } else {
                selected = false;
            }
            this.wd.push([trans.getWD(i, 0), selected]);
        }
    };
    this.catchEdit = function (v, k) {
        switch (k) {
            case 1://toy
                this.data.month = v.m;
                this.data.day = v.d;
                this.data.hour = Math.floor(v.t / 3600);
                this.data.min = Math.ceil(v.t % 3600 / 60);
                this.data.sec = v.t % 3600 % 60;
                this.toyB.innerHTML = app.toToy(this.data.month, this.data.day, this.data.hour * 3600 + this.data.min * 60 + this.data.sec);
                break;
            case 2://year
                this.data.year = v;
                this.yearB.innerHTML = this.data.year;
                break;
            case 3://weekday
                this.data.wday = v;
                for (var i = 0; i < v.length; i++) {
                    if (v[i][1]) {
                        this.data.wday = i;
                        for (var j = 0; j < this.wd.length; j++) {
                            if (j === i) {
                                this.wd[j][1] = true;
                            } else {
                                this.wd[j][1] = false;
                            }
                        }
                        this.wdB.innerHTML = this.wd[this.data.wday][0];
                        break;
                    }
                }
                break;
        }
    };
    this.updateStr();
}