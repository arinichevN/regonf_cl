function RegButton(id, slave, kind) {
    this.slave = slave;
    this.kind = kind;
    this.id = id;
    this.container = cd();
    this.selection_date = null;
    this.done = false;
    this.tmr1 = {tmr: null};
    this.goal = null;
    this.delta = null;
    this.state_r = null;
    this.FLOAT_PRES = 1;
    this.FLOAT_PRES_OUT = 0;

    this.r_cont = cd();
    this.l_cont = cd();
    this.val_cont = cd();
    this.state_cont = cd();
    this.time_cont = cd();

    this.heaterE = cd();
    this.coolerE = cd();
    this.valueE = cd();
    this.goalDeltaE = cd();
    this.muE = cd();
    this.descrE = cd();
    this.stateE = cd();
    this.stateRE = cd();
    this.timeRestE = cd();

    this.RETRY = 7;
    this.uf_count = 0;//number of bad updates

    this.heaterE.innerHTML = "&empty;";
    this.coolerE.innerHTML = "&empty;";
    this.valueE.innerHTML = "&empty;";
    this.muE.innerHTML = "&empty;";
    this.descrE.innerHTML = "&empty;";
    this.stateE.innerHTML = "&empty;";
    this.stateRE.innerHTML = "&empty;";
    this.goalDeltaE.innerHTML = "&empty;";
    this.timeRestE.innerHTML = "";

    this.updateStr = function () {
        cla([this.descrE], ["nvis"]);
    };
    this.setName = function (v) {
        this.descrE.innerHTML = v;
    };
    this.isSelected = function () {
        if (clc(this.container, "reg_selected")) {
            return true;
        }
        return false;
    };
    this.select = function () {
        if (clc(this.container, "reg_selected")) {
            clr(this.container, "reg_selected");
            this.selection_date = null;
        } else {
            this.selection_date = new Date();
            cla(this.container, "reg_selected");
        }
    };
    this.click = function () {
        this.slave.catchEdit(this.id, this.kind);
    };
    this.blink = function (style) {
        cla(this.container, style);
        var self = this;
        var tmr = window.setTimeout(function () {
            self.unmark(style);
        }, 300);
    };
    this.unmark = function (style) {
        clr(this.container, style);
    };
    this.updateInit = function (item) {
        var v = "";
//        if (item.name === null || typeof item.name === 'undefined') {
//            cla(this.descrE, "reg_dis");
//            v = "&empty;";
//        } else {
//            v = item.name;
//            clr(this.descrE, "reg_dis");
//        }
//        this.descrE.innerHTML = v;
        this.descrE.innerHTML = '';

        v = "";
        if (item.mu === null || typeof item.mu === 'undefined') {
            cla(this.muE, "reg_dis");
            v = "&empty;";
        } else {
            v = item.mu;
            clr(this.muE, "reg_dis");
        }
        this.muE.innerHTML = v;
        this.blink('reg_updated_init');
    };
    this.updateRegRuntime = function (item) {
      //  console.log(item);
        if (item.sensor.value !== null && item.state === "BUSY") {
            this.valueE.innerHTML = item.sensor.value.toFixed(this.FLOAT_PRES);
            this.uf_count = 0;
            clr(this.valueE, 'reg_dis');
            if (this.goal !== null && this.delta !== null) {
                if (item.sensor.value > this.goal + this.delta) {
                    cla(this.valueE, "reg_higher");
                    clr(this.valueE, "reg_good");
                    clr(this.valueE, "reg_lower");
                } else if (item.sensor.value < this.goal - this.delta) {
                    clr(this.valueE, "reg_higher");
                    clr(this.valueE, "reg_good");
                    cla(this.valueE, "reg_lower");
                } else {
                    clr(this.valueE, "reg_higher");
                    cla(this.valueE, "reg_good");
                    clr(this.valueE, "reg_lower");
                }
            } else {
                clr(this.valueE, "reg_higher");
                clr(this.valueE, "reg_good");
                clr(this.valueE, "reg_lower");
            }
        } else {
            this.valueE.innerHTML = '&empty;';
            cla(this.valueE, 'reg_dis');
            clr(this.valueE, "reg_higher");
            clr(this.valueE, "reg_good");
            clr(this.valueE, "reg_lower");
        }
        var v = 0.0;
        if (!item.heater.use || item.heater.output === null || typeof item.heater.output === 'undefined' || item.heater.rsl === null || typeof item.heater.rsl === 'undefined') {
            cla(this.heaterE, "reg_dis");
            v = "&empty;";
        } else {
            var output = item.heater.output;
            if (item.heater.output > item.heater.rsl) {
                output = item.heater.rsl;
            }
            if (item.heater.output < 0) {
                output = 0;
            }
            v = (output / item.heater.rsl) * 100;
            v = v.toFixed(this.FLOAT_PRES_OUT);
            clr(this.heaterE, "reg_dis");
        }
        this.heaterE.innerHTML = v;

        v = 0.0;
        if (!item.cooler.use || item.cooler.output === null || typeof item.cooler.output === 'undefined' || item.cooler.rsl === null || typeof item.cooler.rsl === 'undefined') {
            cla(this.coolerE, "reg_dis");
            v = "&empty;";
        } else {
            var output = item.cooler.output;
            if (item.cooler.output > item.cooler.rsl) {
                output = item.cooler.rsl;
            }
            if (item.cooler.output < 0) {
                output = 0;
            }
            v = (output / item.cooler.rsl) * 100;
            v = v.toFixed(this.FLOAT_PRES_OUT);
            clr(this.coolerE, "reg_dis");
        }
        this.coolerE.innerHTML = v;

        v = "";
        if (item.state === null || typeof item.state === 'undefined') {
            cla(this.stateE, "reg_dis");
            v = "&empty;";
        } else {
            v = item.state;
            clr(this.stateE, "reg_dis");
        }
        this.stateE.innerHTML = v;

        v = "";
        if (item.state_r === null || typeof item.state_r === 'undefined') {
            cla(this.stateRE, "reg_dis");
            v = "&empty;";
            this.state_r = null;
        } else {
            v = item.state_r;
            clr(this.stateRE, "reg_dis");
            this.state_r = item.state_r;
        }
        this.stateRE.innerHTML = v;

        v = "";
        if (item.change_tm_rest === null || item.change_tm_rest === -1 || typeof item.state_r === 'undefined') {
            cla(this.timeRestE, "reg_dis");
            v = "";
        } else {
            v = intToTimeStr(item.change_tm_rest);
            clr(this.timeRestE, "reg_dis");
        }
        this.timeRestE.innerHTML = v;

        this.blink('reg_updated_reg_runtime');
    };
    this.updateRegInit = function (item) {
        var goal = item.goal;
        var delta = null;
        if (this.state_r === "HEATER") {
            delta = item.heater.delta;
        } else if (this.state_r === "COOLER") {
            delta = item.cooler.delta;
        } else {
            delta = null;
        }
        var v = "";
        v = "";
        if (goal === null || delta === null) {
            cla(this.goalDeltaE, "reg_dis");
            v = "&empty;";
            this.goal = null;
            this.delta = null;
        } else {
            this.goal = goal;
            this.delta = delta;
            v = goal.toFixed(this.FLOAT_PRES) + "&PlusMinus;" + delta.toFixed(this.FLOAT_PRES);
            clr(this.goalDeltaE, "reg_dis");
        }
        this.goalDeltaE.innerHTML = v;
        this.blink('reg_updated_reg_init');
    };
    a(this.l_cont, [this.heaterE, this.coolerE]);
    a(this.val_cont, [this.valueE, this.muE]);
    a(this.state_cont, [this.stateE, this.stateRE, this.goalDeltaE]);
    a(this.time_cont, [this.timeRestE]);
    a(this.r_cont, [this.val_cont, this.state_cont, this.time_cont]);
    a(this.container, [this.l_cont, this.r_cont, this.descrE]);
    cla(this.l_cont, ["reg_l_cont"]);
    cla(this.val_cont, ["reg_val_cont"]);
    cla(this.state_cont, ["reg_state_cont"]);
    cla(this.time_cont, ["reg_time_cont"]);
    cla(this.l_cont, ["reg_l_cont"]);
    cla(this.r_cont, ["reg_r_cont"]);
    cla([this.heaterE, this.coolerE], ["reg_em_ico"]);
    cla(this.heaterE, ["reg_heater"]);
    cla(this.coolerE, ["reg_cooler"]);
    cla(this.valueE, ["reg_value"]);
    cla([this.stateE, this.stateRE], ["reg_state"]);
    cla(this.descrE, ["reg_descr"]);
    cla(this.goalDeltaE, ["reg_goalDelta"]);
    cla(this.timeRestE, ["reg_time_rest"]);
    cla(this.muE, ["reg_mu"]);
    cla([this.valueE, this.descrE], ["reg_d", "reg_dis"]);
    cla([this.valueE, this.heaterE, this.coolerE, this.stateE, this.stateRE, this.timeRestE], ["reg_reg_runtime"]);
    cla([this.goalDeltaE], ["reg_reg_init"]);
    cla([this.muE, this.descrE], ["reg_init"]);
    cla([this.valueE], ["reg_value"]);
    cla([this.valueE, this.heaterE, this.coolerE, this.stateE, this.stateRE, this.goalDeltaE], 'reg_dis');
    cla(this.container, ["reg_block", "reg_interactive"]);
    var self = this;
    this.container.onclick = function () {
        self.click();
    };
}