function SingleRowDisplayTable(slave, id, trlt, h) {//[[text_id,width,transf],]
    var self = this;
    this.capacity = 2147483647;
    this.minCol = 0;
    this.variable = false;
    this.htid = [];//header text id
    this.cw = [];//column width
    this.hd = [];//th
    this.c = [];//td
    this.r = [];//tr
    this.colBox = [];
    this.data = [];
    this.mc = [];//if cell[r][c] is marked
    this.sc = null;//selected column
    this.sr = null;//selected row
    this.id = id;
    this.slave = slave;
    this.trlt = trlt;
    this.active = false;
    this.container = c('table');
    this.upB = new UpButton(self);
    this.downB = new DownButton(self);
    this.leftB = new LeftButton(self);
    this.rightB = new RightButton(self);
    var trh = c("tr");
    var trd = c("tr");
    var tda = [];
    for (var i = 0; i < h.length; i++) {
        var th = c("th");
        ss(th, "width", h[i][1]);
        if (typeof h[i][0] === "number") {
            th.innerHTML = this.trlt.get(h[i][0]);
        } else {
            th.innerHTML = h[i][0];
        }
        var td = c("td");
        tda.push(td);
        a(trh, th);
        a(trd, td);
        this.hd.push(th);
        this.htid.push(h[i][0]);
        this.cw.push(h[i][1]);

    }
    this.c.push(tda);
    this.r.push(td);
    a(this.container, [trh, trd]);
    this.container.addEventListener("click", function () {
        self.contClick(self.id);
    }, false);
      cla(this.container, "tbl_container");
    this.incCB = function (sign, kind) {
        switch (kind) {
            case 0://row
                var r = this.sr + sign;
                if (r >= 0 && r < this.r.length) {
                    this.selectCell(r, this.sc);
                }
                break;
            case 1://column
                var r = this.sc + sign;
                if (r >= this.minCol && r < this.c[0].length) {
                    this.selectCell(this.sr, r);
                }
                break;
        }
        if (typeof this.slave.cellChanged === "function") {
            this.slave.cellChanged(this.id);
        }
    };
    this.btnCnt = function () {
        if (this.sr <= 0) {
            if (!this.upB.disabled) {
                this.upB.disable();
                inc.upS();
            }
        } else {
            this.upB.enable();
        }
        if (this.sr >= this.r.length - 1) {
            if (!this.downB.disabled) {
                this.downB.disable();
                inc.upS();
            }
        } else {
            this.downB.enable();
        }
        if (this.sc === this.minCol || this.c.length === 0) {
            if (!this.leftB.disabled) {
                this.leftB.disable();
                inc.upS();
            }
        } else {
            this.leftB.enable();
        }
        if (this.c.length === 0 || this.sc === this.c[0].length - 1) {
            if (!this.rightB.disabled) {
                this.rightB.disable();
                inc.upS();
            }
        } else {
            this.rightB.enable();
        }
    };
    this.appendRow = function (v) {
        this.data.push(v);
        this.btnCnt();
    };
    this.changeRow = function (inc) {
        var r = this.sr + inc;
        if (r >= 0 && r < this.data.length) {
            this.showRow(r);
        }
    };
    this.showRow = function (row) {
        for (var i = 0; i < this.data[0].length; i++) {
            this.c[0][i].innerHTML = this.data[row][i];
            this.sr = row;
        }
    };
    this.showFirstRow = function () {
        this.showRow(0);
    };
    this.selectCell = function (row, col) {
        if (row !== this.sr) {
            this.showRow(row);
        }
        if (this.sc !== null && this.sr !== null) {
            clr(this.c[this.sr][this.sc], "active");
        }
        cla(this.c[0][col], "active");
        this.sc = col;
        this.btnCnt();

    };
    this.selectRow = function (r) {
        this.showRow(r);
        cla(this.r[0], "active");
    };
    this.selectFirstRow = function () {
        if (this.r.length) {
            this.selectRow(0);
        }
    };
    this.selectLastRow = function () {
        if (this.r.length) {
            this.selectRow(this.r.length - 1);
        }
    };
    this.selectFirstCell = function () {
        if (this.r.length) {
            this.selectCell(0, this.minCol);
        }
    };
    this.selectLastCell = function () {
        if (this.r.length) {
            this.selectCell(this.r.length - 1, this.sc);
        }
    };
    this.getSCellValue = function () {
        return this.c[this.sr][this.sc].innerHTML;
    };
    this.clear = function () {
        cleara(this.data);
    };
    this.updateHeader = function () {
        for (var i = 0; i < this.htid.length; i++) {
            if (typeof this.htid[i] === "number") {
                this.hd[i].innerHTML = this.trlt.get(this.htid[i]);
            }
        }
    };

    this.contClick = function () {
        if (typeof this.slave.tblClick === "function") {
            this.slave.tblClick(this.id);
        }
        if (!this.active) {
            this.enable();
            if (typeof this.slave.tblActivated === "function") {
                this.slave.tblActivated(this.id);
            }
        }
    };
    this.enable = function () {
        cla(this.container, "tbl_active");
        this.active = true;
    };
    this.disable = function () {
        clr(this.container, "tbl_active");
        this.active = false;
    };
    this.btnCnt();
}


