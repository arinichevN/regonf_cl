function IntEdit() {
    this.type = VISU_TYPE.DIAL;
    this.container = {};
    this.initialized = false;
    this.changeB = null;
    this.signB = null;
    this.incB = null;
    this.cancelB = null;
    this.applyB = null;
    this.maxB = null;
    this.minB = null;
    this.header = null;
    this.sign = 1;
    this.value = 0;
    this.minv = 0;
    this.maxv = 65535;
    this.inc = 1;
    this.timer = null;
    this.slave = null;
    this.kind = null;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.minB = cd();
        this.minB.innerHTML = this.minv;
        this.maxB = cd();
        this.maxB.innerHTML = this.maxv;
        var r1 = cd();
        this.changeB = cb("");
        this.changeB.innerHTML = this.value;
        this.changeB.onmousedown = function () {
            inc.down(self);
        };
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
        var r2 = cd();
        this.cancelB = cb("");
        this.cancelB.onclick = function () {
            self.cancel();
        };
        this.applyB = cb("");
        this.applyB.onclick = function () {
            self.apply();
        };
        var r3 = cd();
        cla([this.header, r1], "row_ES");
        cla([this.minB, this.cancelB], "cell_l50");
        cla([this.maxB, this.applyB], "cell_r50");
        cla(this.signB, "cell_l30");
        cla(this.incB, "cell_r70");
        cla([this.changeB, r2, r3], "row_EB");
        cla(this.changeB, "change");
        cla(this.maxB, "text_r");
        cla(this.header, "edit_header");
        cla([this.cancelB, this.applyB, this.signB, this.incB, this.changeB], ["f2"]);
        a(r1, [this.minB, this.maxB]);
        a(r2, [this.signB, this.incB]);
        a(r3, [this.cancelB, this.applyB]);
        a(this.container, [this.header, r1, this.changeB, r2, r3]);
        this.initialized = true;
    };
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
    this.cancel = function () {
        goBack();
    };
    this.apply = function () {
        this.slave.catchEdit(this.value, this.kind);
        goBack();
    };
    this.updateStr = function () {
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep = function (v, min_v, max_v, slave, kind, t) {
        this.slave = slave;
        this.kind = kind;
        this.value = v;
        //this.inc = 1;
        this.minv = min_v;
        this.maxv = max_v;
        this.minB.innerHTML = this.minv;
        this.maxB.innerHTML = this.maxv;
        this.header.innerHTML = trans.get(t);
        this.changeB.innerHTML = this.value;
        // this.incB.innerHTML = this.inc;
        this.slave.update = false;
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vint_edit = new IntEdit();
visu.push(vint_edit);