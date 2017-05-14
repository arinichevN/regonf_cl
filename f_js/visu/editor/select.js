function Select() {
    this.type = VISU_TYPE.DIAL;
    this.STYLE = {
        ENABLED_ROW: "enabled_cell"
    };
    this.container = {};
    this.initialized = false;
    this.cancelB = null;
    this.applyB = null;
    this.header = null;
    this.tbl = null;
    this.slave = null;
    this.kind = null;
    this.data = [];//[name, selected]
    this.tr = [];//tr elements
    this.sr = null;//selected row (in singleselection mode)
    this.multi = false;//multiselection

    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        var tcont=cd();
        this.tbl = c("table");
        this.cancelB = cb("");
        this.cancelB.onclick = function () {
            self.cancel();
        };
        this.applyB = cb("");
        this.applyB.onclick = function () {
            self.apply();
        };
        var lcont = cd();
        var rcont = cd();
        a(tcont,this.tbl);
        a(rcont, [this.applyB,this.cancelB ]);
        a(lcont, [this.header, tcont]);
        a(this.container, [lcont, rcont]);
        cla(this.header,"select_header");
        cla(lcont,"select_lcont");
        cla(tcont,"select_tcont");
        cla([lcont, rcont], "w50m");
        cla([this.applyB, this.cancelB], "h50m");
        this.initialized = true;
    };
    this.getName = function () {
        return "select edit";
    };
    this.updateStr = function () {
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.cancel = function () {
        goBack();
    };
    this.apply = function () {
        this.slave.catchEdit(this.data, this.kind);
        goBack();
    };
    this.prep = function (d, multi, slave, kind, h) {//d: [name, selected]
        this.slave = slave;
        this.kind = kind;
        if (multi) {
            this.multi = true;
        }
        cleara(this.data);
        for (var i = 0; i < d.length; i++) {
            this.data.push([d[i][0],d[i][1]]);
        }
        this.drawTbl();
        if (this.data.length === 0) {
            this.applyB.disabled = true;
        }else{
            this.applyB.disabled = false;
        }
        this.header.innerHTML = trans.get(h);
        this.slave.update=false;
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
    this.drawTbl = function () {
        var self = this;
        cleara(this.tr);
        clearCont(this.tbl);
        this.sr=null;
        for (var i = 0; i < this.data.length; i++) {
            var tr = c("tr");
            var td = c("td");
            td.innerHTML = this.data[i][0];
            tr.cid = "r_" + i;
            tr.addEventListener("click", function () {
                self.rowClick(this);
            }, false);
            if (this.data[i][1]) {
                cla(tr, this.STYLE.ENABLED_ROW);
                if(!this.multi){
                    this.sr=i;
                }
            }
            this.tr.push(tr);
            a(tr, td);
            a(this.tbl, tr);
        }
    };
    this.rowClick = function (el) {
        var cid = get_cid(el);
        if (el.classList.contains(this.STYLE.ENABLED_ROW)) {
            clr(el, this.STYLE.ENABLED_ROW);
            this.data[cid][1] = false;
        } else {
            if (!this.multi) {
                if (this.sr !== null) {
                    clr(this.tr[this.sr], this.STYLE.ENABLED_ROW);
                    this.data[this.sr][1] = false;
                }
                this.sr = cid;
            }
            cla(el, this.STYLE.ENABLED_ROW);
            this.data[cid][1] = true;
        }
    };
}
var vselect_edit = new Select();
visu.push(vselect_edit);

