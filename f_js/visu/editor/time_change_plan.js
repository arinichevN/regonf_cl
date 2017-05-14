function TimeChangePlan() {
    this.type = VISU_TYPE.DIAL;
    this.container = null;
    this.header = null;
    this.t2 = null;
    this.delB = null;
    this.addB = null;
    this.applyB = null;
    this.cancelB = null;
    this.initialized = false;
    this.slave = null;
    this.kind = null;
    this.data = []; //[gap, shift, order]
    this.maxO = null;//maximum order number in data
    this.visible = false;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.t2 = new Table(self, 2, trans, [[326, "50%", trans.get], [327, "50%", trans.get]]);
        this.t2.cellClickControl([true, true]);
        this.delB = cb("");
        this.addB = cb("");
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
        cla([r1, r2], ["h50m", "ug1"]);
        cla(this.header, "edit_header");
        cla([this.delB, this.addB], "change");
        this.t2.enable();
        this.initialized = true;
    };
    this.getName = function () {
        return "time change plan";
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
        var max_seq = this.getMaxSeq();
        if (max_seq === null) {
            this.maxO = 0;
        } else {
            this.maxO = max_seq + 1;
        }
        this.data.push({gap: app.DEFAULT.GAP, shift: app.DEFAULT.SHIFT, seq: this.maxO});
        this.t2.appendRow([intToTimeStr(this.data[this.data.length - 1].gap), intToTimeStr(this.data[this.data.length - 1].shift)]);
        this.t2.selectLastCell();
        this.btnCntAD();
    };

    this.tblClick = function (id) {
        if (this.t2.sr === this.current_row && this.t2.sc === this.current_col) {
            var self = this;
            switch (this.t2.sc) {
                case 0:
                    vtime_edit.prep(this.data[this.t2.sr].gap, 0, 2147483647, self, 1, 326);
                    break;
                case 1:
                    vtime_edit.prep(this.data[this.t2.sr].shift, -2147483648, 2147483647, self, 2, 327);
                    break;
            }
            showV(vtime_edit);
        } else {
            this.current_row = this.t2.sr;
            this.current_col = this.t2.sc;
        }
    };
    this.catchEdit = function (v, k) {
        switch (k) {
            case 1://gap
                this.data[this.t2.sr].gap = v;
                this.t2.updateSelectedCell(intToTimeStr(this.data[this.t2.sr].gap));
                break;
            case 2://shift
                this.data[this.t2.sr].shift = v;
                this.t2.updateSelectedCell(intToTimeStr(this.data[this.t2.sr].shift));
                break;
        }
    };
    this.btnCntAD = function () {
        if (this.data.length) {
            this.delB.disabled = false;
        } else {
            this.delB.disabled = true;
        }
        if (this.maxO >= 32766 || app.valve.length === 0) {
            this.addB.disabled = true;
        } else {
            this.addB.disabled = false;
        }
    };
    this.drawTbl = function () {
        this.t2.clear();
        for (var i = 0; i < this.data.length; i++) {
            this.t2.appendRow([intToTimeStr(this.data[i].gap), intToTimeStr(this.data[i].shift)]);
        }
        this.t2.selectFirstCell();
    };
    this.resetData = function () {
        this.cp_row = null;
        cleara(this.data);
        for (var i = 0; i < app.change_plan.length; i++) {
            this.data.push({
                valve_id: app.change_plan[i].valve_id,
                gap: app.change_plan[i].gap,
                shift: app.change_plan[i].shift,
                seq: app.change_plan[i].seq
            });
        }
        this.saveB.disable();
    };
    this.sortData = function () {
        if (this.data.length) {
            var temp = [];
            var done = true;
            while (done) {
                done = false;
                for (var i = 0; i < this.data.length - 1; i++) {
                    if (this.data[i].seq > this.data[i + 1].seq) {
                        temp[0] = this.data[i].gap;
                        temp[1] = this.data[i].shift;
                        temp[2] = this.data[i].seq;
                        this.data[i].gap = this.data[i + 1].gap;
                        this.data[i].shift = this.data[i + 1].shift;
                        this.data[i].seq = this.data[i + 1].seq;
                        this.data[i + 1].gap = temp[0];
                        this.data[i + 1].shift = temp[1];
                        this.data[i + 1].seq = temp[2];
                        done = true;
                    }
                }
            }
        }
    };
    this.getMaxSeq = function () {
        if (this.data.length) {
            var m = this.data[0].seq;
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].seq > m) {
                    m = this.data[i].seq;
                }
            }
            return m;
        }
        return null;
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
var vtime_change_plan = new TimeChangePlan();
visu.push(vtime_change_plan);