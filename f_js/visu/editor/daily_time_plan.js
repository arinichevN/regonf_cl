function DailyTimePlan() {
    this.type = VISU_TYPE.DIAL;
    this.container = null;
    this.header = null;
    this.t2 = null;
    this.delB = null;
    this.addB = null;
    this.applyB = null;
    this.canceB = null;
    this.saveB = null;
    this.slave = null;
    this.kind = null;
    this.initialized = false;
    this.current_row = null;
    this.data = [];//[time]
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.t2 = new Table(self, 2, trans, [[325, "", trans.get]]);
        this.t2.cellClickControl([true]);
        this.addB = cb("");
        this.delB = cb("");
        this.cancelB = cb("");
        this.applyB = cb("");
        this.delB.onclick = function () {
            self.delete();
        };
        this.addB.onclick = function () {
            self.add();
        };
        this.cancelB.onclick = function () {
            self.cancel();
        };
        this.applyB.onclick = function () {
            self.apply();
        };
        var lcont = cd();
        var bcont = cd();
        var r1 = cd();
        var r2 = cd();
        a(r1, [this.addB, this.delB]);
        a(r2, [this.cancelB, this.applyB]);
        a(bcont, [r1, r2]);
        a(lcont, [this.header, this.t2]);
        a(this.container, [lcont, bcont]);
        cla([lcont, bcont, this.addB, this.delB, this.cancelB, this.applyB], ["w50m", "lg1"]);
        cla([r1, r2], ["h50m","ug1"]);
        cla(this.header, "edit_header");
        cla([this.delB, this.addB], "change");
        this.t2.enable();
        this.initialized = true;
    };
    this.getName = function () {
        return "daily time plan";
    };
    this.updateStr = function () {
        this.t2.updateHeader();
        this.addB.innerHTML = trans.get(50);
        this.delB.innerHTML = trans.get(51);
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.delete = function () {
        this.data.splice(this.t2.sr, 1);
        this.t2.deleteSelectedRow();
        this.btnCntAD();
    };
    this.add = function () {
        var d = 300;
        var maxt = 0;
        if (this.data.length) {
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i] > maxt) {
                    maxt = this.data[i];
                }
            }
        }
        if (maxt + d > 86400) {
            var found = false;
            while (1) {
                found = false;
                maxt--;
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i] === maxt) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    found = true;
                    break;
                }
                if (maxt < 0) {
                    this.addB.disabled = true;
                    break;
                }
            }
        } else {
            maxt += d;
            found = true;
        }
        if (found) {
            this.data.push(maxt);
            this.sortData();
            this.drawTbl();
            this.t2.selectCell(this.findRow(maxt),0);
        }
        this.btnCntAD();
    };
    this.tblClick = function (id) {
        if (this.t2.sr === this.current_row) {
            var self = this;
            vtime_edit.prep(this.data[this.t2.sr], 0, 86399, self, 1, 325);
            showV(vtime_edit);
        } else {
            this.current_row = this.t2.sr;
        }
    };
    this.catchEdit = function (v) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i] === v) {
                logger.fail();
                return;
            }
        }
        this.data[this.t2.sr] = v;
        this.sortData();
        this.drawTbl();
        this.t2.selectCell(this.findRow(v),0);
    };
    this.btnCntAD = function () {
        if (this.data.length) {
            this.delB.disabled = false;
        } else {
            this.delB.disabled = true;
        }
        if (this.data.length < 86400) {
            this.addB.disabled = false;
        } else {
            this.addB.disabled = true;
        }
    };
    this.drawTbl = function () {
        this.t2.clear();
        for (var i = 0; i < this.data.length; i++) {
            this.t2.appendRow([intToTimeStr(this.data[i])]);
        }
        this.t2.selectFirstCell();
    };
    this.sortData = function () {
        if (this.data.length) {
            var temp = null;
            var done = true;
            while (done) {
                done = false;
                for (var i = 0; i < this.data.length - 1; i++) {
                    if (this.data[i] > this.data[i + 1]) {
                        temp = this.data[i];
                        this.data[i] = this.data[i + 1];
                        this.data[i + 1] = temp;
                        done = true;
                    }
                }
            }
        }
    };
    this.findRow = function (v) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i] === v) {
                return i;
            }
        }
        return -1;
    };
    this.cancel = function () {
        goBack();
    };
    this.apply = function () {
        this.slave.catchEdit(this.data, this.kind);
        goBack();
    };
    this.prep = function (d, slave, kind, h) {//d: [name, selected]
        this.slave = slave;
        this.kind = kind;
        this.header.innerHTML = trans.get(h);
        cleara(this.data);
        for (var i = 0; i < d.length; i++) {
            this.data.push(d[i]);
        }
        this.drawTbl();
        this.slave.update = false;
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vdaily_time_plan = new DailyTimePlan();
visu.push(vdaily_time_plan);