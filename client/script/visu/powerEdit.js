function PowerEdit() {
    this.type = VISU_TYPE.DIAL;
    this.container = null;
    this.header = null;
    this.heaterH = null;
    this.coolerH = null;
    this.heaterB = null;
    this.coolerB = null;
    this.signB = null;
    this.incB = null;
    this.applyB = null;
    this.canceB = null;
    this.saveB = null;
    this.slave = null;
    this.kind = null;
    this.initialized = false;
    this.current_row = null;
    this.minv = 0;
    this.maxv = 100;
    this.mode = null;
    this.inc = 1;
    this.sign = 1;
    this.value = {id: null, goal: null, heater: {delta: null}, cooler: {delta: null}, change_gap: null, reg: null};
    this.MODE = {
        HEATER: 1,
        COOLER: 2
    };
    this.FLOAT_PRES = 0;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.heaterH = cd();
        this.coolerH = cd();
        this.heaterB = cb("");
        this.coolerB = cb("");
        this.gapB = cb("");
        this.signB = cb("");
        this.incB = cb("");
        this.cancelB = new CancelButton(self, 1);
        this.applyB = new ApplyButton(self, 1);
        this.heaterB.onmousedown = function () {
            self.mode = self.MODE.HEATER;
            inc.down(self);
        };
        this.coolerB.onmousedown = function () {
            self.mode = self.MODE.COOLER;
            inc.down(self);
        };
        this.updSign();
        this.signB.onclick = function () {
            self.chSign();
        };
        this.incB.innerHTML = this.inc;
        this.incB.onclick = function () {
            self.updInc();
        };
        var r2 = cd();
        this.cancelB.onclick = function () {
            self.cancel();
        };
        var rh = cd();
        var rc = cd();
        var c1 = cd();
        var c2 = cd();
        var c3 = cd();
        var c4 = cd();
        var c5 = cd();
        var c6 = cd();

        a(rh, [this.heaterH, this.heaterB]);
        a(rc, [this.coolerH, this.coolerB]);
        a(c1, [rh]);
        a(c2, [rc]);
        a(c3, [this.signB]);
        a(c4, [this.incB]);
        a(c5, [this.applyB]);
        a(c6, [this.cancelB]);
        a(this.container, [this.header, c1, c2, c3, c4, c5, c6]);
        cla([this.header], "pre_header");
        cla([c1, c2, c3, c4, c5, c6], "pre_cell3");
        cla([rh, rc, this.signB, this.incB, this.applyB, this.cancelB], "pre_icell");
        cla([this.heaterB, this.coolerB], "pre_hbtn");
        cla([this.heaterH, this.coolerH], "pre_btnH");
        cla([this.signB, this.incB, this.heaterB, this.coolerB], "pre_interactive");
        cla([this.heaterB, this.coolerB, this.cancelB, this.applyB, this.signB, this.incB], ["f1"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(312);
    };
    this.incCB = function () {
        switch (this.mode) {
            case this.MODE.HEATER:
                var r = this.value.heater + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.heater = this.value.heater + (this.inc * this.sign);
                    this.heaterB.innerHTML = this.value.heater.toFixed(this.FLOAT_PRES);
                }
                break;
            case this.MODE.COOLER:
                var r = this.value.cooler + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.cooler = this.value.cooler + (this.inc * this.sign);
                    this.coolerB.innerHTML = this.value.cooler.toFixed(this.FLOAT_PRES);
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
            case 1:
                this.inc = 10;
                break;
            case 10:
                this.inc = 100;
                break;
            case 100:
                this.inc = 1;
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
        this.heaterH.innerHTML = trans.get(315);
        this.coolerH.innerHTML = trans.get(316);
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep = function (data, slave, kind, t) {
        try {
            this.header.innerHTML = t;
            this.slave = slave;
            this.kind = kind;
            this.value.id = data.id;
            this.value.heater = data.heater.power;
            this.value.cooler = data.cooler.power;

            this.heaterB.disabled = false;
            if (isNaN(this.value.heater)) {
                this.value.heater = 0;
            }
            this.heaterB.innerHTML = this.value.heater.toFixed(this.FLOAT_PRES);

            this.coolerB.disabled = false;
            if (isNaN(this.value.cooler)) {
                this.value.cooler = 0;
            }
            this.coolerB.innerHTML = this.value.cooler.toFixed(this.FLOAT_PRES);

            this.slave.update = false;
        } catch (e) {
            alert("progEdit: prep: " + e.message);
        }
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vpower_edit = new PowerEdit();
visu.push(vpower_edit);