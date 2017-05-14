function Table(slave, id, trlt, h) {//[[text_id,width,transf],]
    var self = this;
    this.STYLE={
      ENABLED_CELL:"enabled_cell"  
    };
    this.capacity = 2147483647;
    this.minCol = 0;
    this.variable = false;
    this.htid = [];//header text id
    this.cw = [];//column width
    this.hd = [];//th
    this.c = [];//td
    this.r = [];//tr
    this.colBox = [];
    this.mc = [];//if cell[r][c] is marked
    this.sc = 0;//selected column
    this.sr = -1;//selected row
    this.ssc = 0;//selected single column
    this.ssr = -1;//selected single row
    this.colStyle = [];
    this.cell_clickable = [];
    this.m_style = null;
    this.id = id;
    this.slave = slave;
    this.trlt = trlt;
    this.active = false;
    this.container = cd();
    this.upB = new UpButton(self);
    this.downB = new DownButton(self);
    this.leftB = new LeftButton(self);
    this.rightB = new RightButton(self);
    this.hcont = cd();
    this.tcont = cd();
    this.ht = c('table');
    this.tt = c('table');
    var tr = c("tr");
    for (var i = 0; i < h.length; i++) {
        var th = c("th");
        ss(th, "width", h[i][1]);
        if (typeof h[i][0] === "number") {
            th.innerHTML = this.trlt.get(h[i][0]);
        } else {
            th.innerHTML = h[i][0];
        }
        a(tr, th);
        a(this.ht, tr);
        this.hd.push(th);
        this.htid.push(h[i][0]);
        this.cw.push(h[i][1]);
        this.cell_clickable.push(false);
    }
    this.container.addEventListener("click", function () {
        self.contClick(self.id);
    }, false);
    a(this.hcont, this.ht);
    a(this.tcont, this.tt);
    a(this.container, [this.hcont, this.tcont]);
    cla(this.container, "tbl_container");
    cla(this.hcont, "tbl_hcont");
    cla(this.tcont, "tbl_tcont");
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

    };
    this.cellClick = function (elem) {
        var row = -1;
        var p = elem.parentElement;
        while (p) {
            p = p.previousElementSibling;
            row++;
        }
        var col=-1;
        var p = elem;
        while (p) {
            p = p.previousElementSibling;
            col++;
        }
        this.selectCell(row, col);
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
    this.makeVariable = function () {
        var ar = [];
        for (var i = 0; i < this.hd.length; i++) {
            ar.push("");
        }
        this.appendRow(ar);//empty row
        this.variable = true;
    };
    this.addRow = function (v) {
        if (this.addable) {
            var self = this;
            var atd = [];
            var amc = [];
            var tr = c('tr');
            for (var i = 0; i < v.length; i++) {
                var td = c('td');
                ss(td, "width", this.cw[i]);
                if (this.colStyle[i]) {
                    cla(td, this.colStyle[i]);
                }
                var col = i;
                if (this.cell_clickable[i]) {
                    ael(td, "click", function () {
                        self.cellClick(this, col);
                    });
                    cla(td, "clickable");
                }
                td.innerHTML = v[i];
                atd.push(td);
                amc.push(false);
                a(tr, td);
            }
            this.c.splice(this.sr, 0, atd);
            this.r.splice(this.sr, 0, tr);
            this.mc.splice(this.sr, 0, amc);
            this.tt.insertBefore(tr, this.r[this.sr]);
            this.btnCnt();
        }
    };
    this.addRowAfterSelection = function (v) {
        if (this.addable) {
            var self = this;
            var atd = [];
            var amc = [];
            var tr = c('tr');
            for (var i = 0; i < v.length; i++) {
                var td = c('td');
                ss(td, "width", this.cw[i]);
                if (this.colStyle[i]) {
                    cla(td, this.colStyle[i]);
                }
                var col = i;
                if (this.cell_clickable[i]) {
                    ael(td, "click", function () {
                        self.cellClick(this, col);
                    });
                    cla(td, "clickable");
                }
                td.innerHTML = v[i];
                atd.push(td);
                amc.push(false);
                a(tr, td);
            }
            this.c.splice(this.sr, 0, atd);
            this.r.splice(this.sr, 0, tr);
            this.mc.splice(this.sr, 0, amc);
            this.tt.insertBefore(tr, this.r[this.sr]);
            this.btnCnt();
        }
    };
    this.appendRow = function (v) {
        var self = this;
        var atd = [];
        var amc = [];
        var tr = c('tr');
        for (var i = 0; i < v.length; i++) {
            var td = c('td');
            ss(td, "width", this.cw[i]);
            if (this.colStyle[i]) {
                cla(td, this.colStyle[i]);
            }
            var col = i;
            if (this.cell_clickable[i]) {
                ael(td, "click", function () {
                    self.cellClick(this);
                });
                cla(td, "clickable");
            }
            td.innerHTML = v[i];
            atd.push(td);
            amc.push(false);
            a(tr, td);
        }
        this.c.push(atd);
        this.r.push(tr);
        this.mc.push(amc);
        a(this.tt, tr);
        this.btnCnt();
    };
    this.deleteRow = function (r) {
        this.tt.removeChild(this.r[r]);
        this.r.splice(r, 1);
        this.c.splice(r, 1);
        this.mc.splice(r, 1);
    };
    this.deleteLastRow=function(){
      this.deleteRow(this.r.length-1);  
    };
    this.changeRow = function (inc) {
        var r = this.sr + inc;
        if (r >= 0 && r < this.r.length) {
            this.selectRow(r);
        }
    };
    this.changeCellV = function (inc) {
        var r = this.sr + inc;
        if (r >= 0 && r < this.r.length) {
            this.selectCell(r, this.sc);
        }
    };
    this.selectCellUp = function () {
        var r = this.sc - 1;
        if (r >= 0 && r < this.r.length) {
            this.selectCell(r, this.sc);
        }
    };
    this.selectCellDown = function () {
        var r = this.sc + 1;
        if (r >= 0 && r < this.r.length) {
            this.selectCell(r, this.sc);
        }
    };
    this.selectCellLeft = function () {
        var r = this.sr - 1;
        if (r >= 0 && r < this.c[0].length) {
            this.selectCell(this.sr, r);
        }
    };
    this.selectCellRight = function () {
        var r = this.sr + 1;
        if (r >= 0 && r < this.c[0].length) {
            this.selectCell(this.sr, r);
        }
    };
    this.deleteSelectedRow = function () {
        if (this.sr !== -1) {
            this.deleteRow(this.sr);
            if (this.sr >= this.r.length) {
                this.sr--;
            }
            this.selectCell(this.sr, this.sc);
        }
    };
    this.updateSelectedCell = function (v) {
        this.updateCell(this.sr, this.sc, v);
    };
    this.updateCell = function (r, c, v) {
        this.c[r][c].innerHTML = v;
    };
    this.markCellDis = function (r, c) {
        if (this.c.length) {
            cla(this.c[r][c], "disabled_cell");
        }
    };
    this.markCell = function (r, c, style) {
        if (this.c.length && this.mc.length) {
            cla(this.c[r][c], style);
            this.mc[r][c] = true;
        }
    };
    this.markSelectedCell = function () {
        this.markCell(this.sr, this.sc, this.STYLE.ENABLED_CELL);
    };
    this.unmarkSelectedCell = function () {
        this.unmarkCell(this.sr, this.sc, this.STYLE.ENABLED_CELL);
    };
    this.markCellS = function (r, c) {
        if (this.m_style !== null) {
            cla(this.c[r][c], this.m_style);
        }
    };
    this.unmarkCellS = function (r, c) {
        if (this.m_style !== null) {
            clr(this.c[r][c], this.m_style);
        }
    };
    this.unmarkCell = function (r, c,style) {
        clr(this.c[r][c], style);
        this.mc[r][c] = false;
    };
    this.unmarkCellDis = function (r, c) {
        clr(this.c[r][c], "disabled_cell");
    };
    this.toggleCell = function (r, c) {
        if (this.mc[r][c]) {
            this.unmarkCell(r, c, this.STYLE.ENABLED_CELL);
        } else {
            this.markCell(r, c, this.STYLE.ENABLED_CELL);
        }
    };
    this.markSingleCell = function (r, c) {
        if (this.ssr !== -1) {
            clr(this.c[this.ssr][this.ssc], "tbl_ss");
        }
        this.ssr = r;
        this.ssc = c;
        cla(this.c[this.ssr][this.ssc], "tbl_ss");
    };
    this.selectCell = function (r, c) {
        if (this.c.length) {
            if (this.sc !== -1 && this.sr !== -1) {
                clr(this.c[this.sr][this.sc], "active");
            }
            if (r !== -1 && c !== -1) {
                cla(this.c[r][c], "active");
                this.c[r][c].scrollIntoView(false);
                this.sc = c;
                this.sr = r;
                
            }
            if (typeof this.slave.cellChanged === "function") {
                    this.slave.cellChanged(this.id);
                }
            this.btnCnt();
        }
    };
    this.selectRow = function (r) {
        if (this.sr !== -1) {
            clr(this.r[this.sr], "active");
        }
        cla(this.r[r], "active");
        this.r[r].scrollIntoView(false);
        this.sr = r;
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
        clearCont(this.tt);
        cleara(this.c);
        cleara(this.r);
        cleara(this.mc);
       this.sc=-1;
      this.sr=-1;
    };
    this.updateHeader = function () {
        for (var i = 0; i < this.htid.length; i++) {
            if (typeof this.htid[i] === "number") {
                this.hd[i].innerHTML = this.trlt.get(this.htid[i]);
            }
        }
    };
    this.setColBoxes = function () {//overlaps each column with div
        var self = this;
        for (var i = 0; i < this.hd.length; i++) {
            var elem = cd();
            cla(elem, "tbl_cb");
            if (i > 0) {
                ss(elem, "width", this.cw[i]);
                ss(elem, "left", this.cw[i - 1]);
            } else {
                ss(elem, "width", this.cw[i]);
                ss(elem, "left", 0);
            }
            elem.cid = "cb_" + i;
            elem.addEventListener("click", function () {
                self.colBoxClick(this);
            }, false);
            a(this.tcont, elem);
            this.colBox.push(elem);
        }
    };
    this.setColStyle = function (v) {
        cpa(v, this.colStyle);
        for (var i = 0; i < this.c.length; i++) {
            for (var j = 0; j < this.c[i].length; j++) {
                if (this.colStyle[j]) {
                    cla(this.c[i][j], this.colStyle[j]);
                }
            }
        }
    };
    this.colBoxClick = function (el) {
        if (this.active) {
            var cid = get_cid(el);
            if (cid === this.sc) {
                if (typeof this.slave.tblBoxActivated === "function") {
                    this.slave.tblBoxActivated(this.id, cid);
                }
            } else {
                this.selectCell(this.sr, cid);
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
    this.colBoxEnable = function () {

    };
    this.cellClickControl = function (v) {
        for (var i = 0; i < v.length; i++) {
            this.cell_clickable[i] = v[i];
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


