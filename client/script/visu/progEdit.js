function ProgEdit() {
    this.type = VISU_TYPE.DIAL;
    this.container = null;
    this.header = null;
    this.goalH = null;
    this.gapH = null;
    this.goalB = null;
    this.heaterB = null;
    this.coolerB = null;
    this.signB = null;
    this.incB = null;
    this.regB = null;
    this.powerB = null;
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
    this.value = {id: null, goal: null, heater: {use: null, delta: null, power: null, output: null}, cooler: {use: null, delta: null, power: null, output: null}, change_gap: null, reg: null, set_power: false};
    this.MODE = {
        GOAL: 1,
        DELTAH: 2,
        DELTAC: 3,
        GAP: 4
    };
    this.CATCH = {
        POWER: 1,
        HEATER: 2,
        COOLER: 3
    };
    this.FLOAT_PRES = 1;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.goalH = cd();
        this.gapH = cd();
        this.goalB = cb("");
        this.heaterB = cb("");
        this.coolerB = cb("");
        this.gapB = cb("");
        this.signB = cb("");
        this.incB = cb("");
        this.regB = cb("");
        this.powerB = cb("");
        this.cancelB = new CancelButton(self, 1);
        this.applyB = new ApplyButton(self, 1);
        this.regB.onclick = function () {
            if (self.value.reg) {
                self.value.reg = false;
                clr(self.regB, "pre_active");
            } else {
                self.value.reg = true;
                cla(self.regB, "pre_active");
            }
        };
        this.goalB.onmousedown = function () {
            self.mode = self.MODE.GOAL;
            inc.down(self);
        };
        this.heaterB.onmousedown = function () {
            self.showHeaterDial();
        };
        this.coolerB.onmousedown = function () {
            self.showCoolerDial();
        };
        this.gapB.onmousedown = function () {
            self.mode = self.MODE.GAP;
            inc.down(self);
        };
        this.powerB.onclick = function () {
            self.showPowerDial();
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
        var rg = cd();
        var rdh = cd();
        var rdc = cd();
        var rgap = cd();
        var c1 = cd();
        var c2 = cd();
        var c3 = cd();
        var c4 = cd();
        var c5 = cd();
        var c6 = cd();
        var c7 = cd();
        var c8 = cd();
        var c9 = cd();
        var c10 = cd();

        a(rg, [this.goalH, this.goalB]);
        a(rgap, [this.gapH, this.gapB]);
        a(c1, [rg]);
        a(c2, [rgap]);
        a(c3, [this.signB]);
        a(c4, [this.incB]);
        a(c5, [this.heaterB]);
        a(c6, [this.coolerB]);

        a(c7, [this.regB]);
        a(c8, [this.powerB]);
        a(c9, [this.applyB]);
        a(c10, [this.cancelB]);
        a(this.container, [this.header, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10]);
        cla([this.header], "pre_header");
        cla([c5, c6, c7, c8], "pre_cell1");
        cla([c1, c2, c3, c4, c9, c10], "pre_cell2");
        cla([rg, this.heaterB, this.coolerB, rgap, this.signB, this.incB, this.regB, this.powerB, this.applyB, this.cancelB], "pre_icell");
        cla([this.goalB, this.gapB], "pre_hbtn");
        cla([this.goalH, this.gapH], "pre_btnH");
        cla([this.signB, this.incB, this.goalB, this.gapB], "pre_interactive");
        cla([this.regB], ["pre_toggle", "f1"]);
        cla([this.goalB, this.heaterB, this.coolerB, this.gapB, this.powerB, this.cancelB, this.applyB, this.signB, this.incB], ["f1"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(312);
    };
    this.incCB = function () {
        switch (this.mode) {
            case this.MODE.GOAL:
                var r = this.value.goal + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.goal = this.value.goal + (this.inc * this.sign);
                    this.goalB.innerHTML = this.value.goal.toFixed(this.FLOAT_PRES);
                }
                break;
            case this.MODE.GAP:
                var r = this.value.change_gap + this.inc * this.sign;
                if (r >= 0 && r <= this.maxv) {
                    this.value.change_gap = Math.round(this.value.change_gap + (this.inc * this.sign));
                    this.gapB.innerHTML = intToTimeStr(this.value.change_gap);
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
                this.inc = 0.1;
                break;
            case 1000:
                this.inc = 0.01;
                break;
        }
        this.incB.innerHTML = this.inc;
    };
    this.showPowerDial = function () {
        vpower_edit.prep(this.value, this, this.CATCH.POWER, trans.get(325));
        showV(vpower_edit);
    };
    this.showHeaterDial = function () {
        vem_edit.prep(this.value.heater, this, this.CATCH.HEATER, trans.get(315));
        showV(vem_edit);
    };
    this.showCoolerDial = function () {
        vem_edit.prep(this.value.cooler, this, this.CATCH.COOLER, trans.get(316));
        showV(vem_edit);
    };
    this.catchEdit = function (d, kind, apply) {
        try {
            switch (kind) {
                case this.CATCH.POWER:
                    if (apply) {
                        this.value.set_power = true;
                        this.value.heater.power = d.heater;
                        this.value.cooler.power = d.cooler;
                    }
                    break;
                case this.CATCH.HEATER:
                    if (apply) {
                        this.value.heater.use = d.use;
                        this.value.heater.delta = d.delta;
                    }
                    //console.log("heater: ",this.value.heater);
                    break;
                case this.CATCH.COOLER:
                    if (apply) {
                         this.value.cooler.use = d.use;
                        this.value.cooler.delta = d.delta;
                    }
                    //console.log("cooler: ",this.value.heater);
                    break;
                default:
                    console.log("catchEdit: bad k");
                    break;
            }
        } catch (e) {
            alert("progEdit: catchEdit: " + e.message);
        }
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
        this.goalH.innerHTML = trans.get(318);
        this.heaterB.innerHTML = trans.get(315);
        this.coolerB.innerHTML = trans.get(316);
        this.gapH.innerHTML = trans.get(320);
        this.powerB.innerHTML = trans.get(325);

        this.regB.innerHTML = trans.get(323);
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep = function (data, slave, kind, t) {
        try {
            this.header.innerHTML = t;
            this.slave = slave;
            this.kind = kind;
            this.value.id = data.id;
            this.value.goal = data.reg.goal;

            this.value.heater.use = data.reg.heater.use;
            this.value.heater.power = (data.reg.heater.output / data.reg.heater.rsl) * 100;
            this.value.heater.delta = data.reg.heater.delta;

            this.value.cooler.use = data.reg.cooler.use;
            this.value.cooler.power = (data.reg.cooler.output / data.reg.cooler.rsl) * 100;
            this.value.cooler.delta = data.reg.cooler.delta;

            this.value.set_power = false;
            this.value.change_gap = data.reg.change_gap;

            if (data.reg.state === 'OFF') {
                this.value.reg = false;
            } else if (data.reg.state === null) {
                this.value.reg = null;
            } else {
                this.value.reg = true;
            }

            if (this.value.goal === null) {
                this.goalB.disabled = true;
            } else {
                this.goalB.innerHTML = this.value.goal.toFixed(this.FLOAT_PRES);
                this.goalB.disabled = false;
            }

//            if (this.value.heater.delta === null) {
//                this.heaterB.disabled = true;
//            } else {
//                this.heaterB.innerHTML = this.value.heater.delta.toFixed(this.FLOAT_PRES);
//                this.heaterB.disabled = false;
//            }
//
//            if (this.value.cooler.delta === null) {
//                this.coolerB.disabled = true;
//            } else {
//                this.coolerB.innerHTML = this.value.cooler.delta.toFixed(this.FLOAT_PRES);
//                this.coolerB.disabled = false;
//            }

            if (this.value.change_gap === null) {
                this.gapB.disabled = true;
            } else {
                this.gapB.innerHTML = intToTimeStr(this.value.change_gap);
                this.gapB.disabled = false;
            }

            if (this.value.reg === true) {
                cla(this.regB, "pre_active");
                this.regB.disabled = false;
            } else if (this.value.reg === false) {
                clr(this.regB, "pre_active");
                this.regB.disabled = false;
            } else if (this.value.reg === null) {
                clr(this.regB, "pre_active");
                this.regB.disabled = true;
            }

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
var vprog_edit = new ProgEdit();
visu.push(vprog_edit);