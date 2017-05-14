function EMEdit() {
    this.type = VISU_TYPE.DIAL;
    this.container = null;
    this.header = null;
    this.deltaH = null;
    this.deltaB = null;
    this.useB = null;
    this.signB = null;
    this.incB = null;
    this.applyB = null;
    this.canceB = null;
    this.saveB = null;
    this.slave = null;
    this.kind = null;
    this.initialized = false;
    this.current_row = null;
    this.minv = INT32_MIN;
    this.maxv = INT32_MAX;
    this.mode = null;
    this.inc = 1;
    this.sign = 1;
    this.value = {delta: null, use: null};
    this.MODE = {
        DELTA: 1
    };
    this.FLOAT_PRES = 2;
    this.init = function () {
        try{
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.deltaH = cd();
        this.deltaB = cb("");
        this.useB = cb("");
        this.signB = cb("");
        this.incB = cb("");
        this.cancelB = new CancelButton(self, 1);
        this.applyB = new ApplyButton(self, 1);
        this.deltaB.onmousedown = function () {
            self.mode = self.MODE.DELTA;
            inc.down(self);
        };
        this.useB.onclick = function () {
            if (self.value.use) {
                self.value.use = false;
                clr(self.useB, "pre_active");
            } else {
                self.value.use = true;
                cla(self.useB, "pre_active");
            }
        };
        this.updSign();
        this.signB.onclick = function () {
            self.chSign();
        };
        this.incB.innerHTML = this.inc;
        this.incB.onclick = function () {
            self.updInc();
        };
        this.cancelB.onclick = function () {
            self.cancel();
        };
        var rd = cd();
        var c1 = cd();
        var c2 = cd();
        var c3 = cd();
        var c4 = cd();
        var r1 = cd();
        var r2 = cd();
        a(rd, [this.deltaH, this.deltaB]);
        a(c1, [this.signB]);
        a(c2, [this.incB]);
        a(c3, [this.applyB]);
        a(c4, [this.cancelB]);
        a(r1, [this.useB]);
        a(r2, [rd]);
        a(this.container, [this.header, r2, c1, c2, r1, c3, c4]);
        cla([this.header], "pre_header");
        cla([c1, c2, c3, c4], "pre_cell4");
        cla([r1, r2], "pre_row4");
        cla([rd, this.signB, this.incB, this.applyB, this.cancelB], "pre_icell");
        cla([this.deltaB], "pre_hbtn");
        cla([this.deltaH], "pre_btnH");
        cla([this.signB, this.incB, this.deltaB], "pre_interactive");
        cla([this.deltaB, this.cancelB, this.applyB, this.signB, this.incB], ["f1"]);
        cla([this.useB], ["pre_toggle", "pre_em_mode", "f1"]);
        this.initialized = true;
        } catch (e) {
            alert("emEdit: init: " + e.message);
        }
    };
    this.getName = function () {
        return trans.get(312);
    };
    this.incCB = function () {
        switch (this.mode) {
            case this.MODE.DELTA:
                var r = this.value.delta + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.delta = this.value.delta + (this.inc * this.sign);
                    this.deltaB.innerHTML = this.value.delta.toFixed(this.FLOAT_PRES);
                }
                break;
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
                this.inc = 0.01;
                break;
        }
        this.incB.innerHTML = this.inc;
    };
    this.cancel = function (id) {

        this.slave.catchEdit(this.value, this.kind, 0);
        goBack();
    };
    this.apply = function (id) {
        this.slave.catchEdit(this.value, this.kind, 1);
        goBack();
    };
    this.updateStr = function () {
        this.deltaH.innerHTML = trans.get(319);
        this.useB.innerHTML = trans.get(329);
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep = function (data, slave, kind, t) {
        // console.log("input: ", data);
        try {
            this.header.innerHTML = t;
            this.slave = slave;
            this.kind = kind;
            this.value.delta = data.delta;
            this.value.use = data.use;
            var v = null;

            this.deltaB.disabled = false;
            if (this.value.delta === null) {
                v = "";
                this.deltaB.disabled = true;
            } else {
                v = this.value.delta.toFixed(this.FLOAT_PRES);
            }
            this.deltaB.innerHTML = v;

            if (this.value.use === true) {
                cla(this.useB, "pre_active");
                this.useB.disabled = false;
            } else if (this.value.use === false) {
                clr(this.useB, "pre_active");
                this.useB.disabled = false;
            } else if (this.value.use === null) {
                clr(this.useB, "pre_active");
                this.useB.disabled = true;
            }

            this.slave.update = false;
        } catch (e) {
            alert("emEdit: prep: " + e.message);
        }
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vem_edit = new EMEdit();
visu.push(vem_edit);