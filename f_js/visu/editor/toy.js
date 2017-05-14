function ToyEdit() {
    this.type=VISU_TYPE.DIAL;
    this.container={};
    this.initialized=false;
    this.header=null;
    this.mB=null;
    this.dB=null;
    this.tB=null;
    this.signB=null;
    this.incB=null;
    this.inctB=null;
    this.cancelB=null;
    this.applyB=null;
    this.sign=1;
    this.mv=0;
    this.dv=0;
    this.tv=65535;
    this.inc=1;
    this.inct=1;
    this.inct_d=0;
    this.timer=null;
    this.slave=null;
    this.kind=null;
    this.init=function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.mB = cb("");
        this.dB = cb("");
        this.tB = cb("");
        this.dB.innerHTML = this.value;
        this.mB.innerHTML = this.value;
        this.tB.innerHTML = this.value;
        this.mB.onmousedown = function () {
            inc.down(self, self.inc, 1);
        };
        this.dB.onmousedown = function () {
            inc.down(self, self.inc, 2);
        };
        this.tB.onmousedown = function () {
            inc.down(self, self.inc, 3);
        };
        this.signB = cb("");
        this.updSign();
        this.signB.onclick = function () {
            self.chSign();
        };
        this.incB = cb("");
        this.incB.innerHTML = this.inc;
        this.incB.onclick = function () {
            self.chInc();
        };
        this.inctB = cb("");
        this.inctB.innerHTML = this.inc;
        this.inctB.onclick = function () {
            self.chIncT();
        };
        this.cancelB = cb("");
        this.cancelB.onclick = function () {
            self.cancel();
        };
        this.applyB = cb("");
        this.applyB.onclick = function () {
            self.apply();
        };
        var r1 = cd();
        var r2 = cd();
        var r3 = cd();
        cla([this.header], "row_ES");
        cla([r1, r2, r3], "row_EBB");
        cla([this.mB, this.signB], "cell_l33");
        cla([this.dB, this.incB], "cell_m33");
        cla([this.tB, this.inctB], "cell_r33");
        cla([this.mB, this.dB, this.tB], "change");
        cla(this.cancelB, "cell_l50");
        cla(this.applyB, "cell_r50");
        cla(this.header, "edit_header");
        a(r1, [this.mB, this.dB, this.tB]);
        a(r2, [this.signB, this.incB, this.inctB]);
        a(r3, [this.cancelB, this.applyB]);
        a(this.container, [this.header, r1, r2, r3]);
        this.initialized = true;
    };
        this.getName = function () {
        return "toy edit";
    };
    this.incCB=function (sign, kind) {
        switch (kind) {
            case 1://month
                var r = this.mv + this.inc * this.sign;
                if (r >= 0 && r <= 11) {
                    this.mv = r;
                    this.showM();
                }
                if (this.dv > trans.getMMax(this.mv)) {
                    this.dv = 0;
                    this.showD();
                }
                break;
            case 2://day
                var r = this.dv + this.inc * this.sign;
                if (r >= 0 && r <= trans.getMMax(this.mv)) {
                    this.dv = r;
                    this.showD();
                }
                break;
            case 3://tod
                var r = this.tv + this.inct * this.sign;
                if (r >= 0 && r <= 86399) {
                    this.tv = this.tv + (this.inct * this.sign);
                    this.showT();
                }
                break;
        }
    };
    this.chSign=function () {
        this.sign *= -1;
        this.updSign();
    };
    this.updSign=function () {
        if (this.sign > 0) {
            this.signB.innerHTML = "+";
        } else {
            this.signB.innerHTML = "-";
        }
    };
    this.chInc=function () {
        switch (this.inc) {
            case 1:
                this.inc = 3;
                break;
            case 3:
                this.inc = 7;
                break;
            default:
                this.inc = 1;
                break;
        }
        this.incB.innerHTML = this.inc;
    };
    this.chIncT=function () {
        if (this.inct_d < 2) {
            this.inct_d++;
        } else {
            this.inct_d = 0;
        }
        switch (this.inct_d) {
            case 0:
                this.inct = 1;
                break;
            case 1:
                this.inct = 60;
                break;
            case 2:
                this.inct = 3600;
                break;
        }
        this.inctB.innerHTML = trans.getP(this.inct_d, 1);

    };
    this.cancel=function () {
        goBack();
    };
    this.apply=function () {
        var data={
            m:this.mv,
            d:this.dv,
            t:this.tv
        };
        this.slave.catchEdit(data, this.kind);
        goBack();
    };
    this.showM=function () {
        this.mB.innerHTML = trans.getMon(this.mv, 0);
    };
    this.showD=function () {
        this.dB.innerHTML = this.dv;
    };
    this.showT=function () {
        this.tB.innerHTML = intToTimeStr(this.tv);
    };
    this.updateStr=function () {
        this.inctB.innerHTML = trans.getP(this.inct_d, 1);
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep=function (mv, dv, tv, slave, kind, t) {
        this.slave = slave;
        this.kind = kind;
        this.mv = mv;
        this.dv = dv;
        this.tv = tv;
        this.header.innerHTML = trans.get(t);
        this.showM();
        this.showD();
        this.showT();
        this.slave.update=false;
    };
    this.show=function () {
        clr(this.container, "hdn");
    };
    this.hide=function () {
        cla(this.container, "hdn");
    };
}
var vtoy_edit=new ToyEdit();
visu.push(vtoy_edit);