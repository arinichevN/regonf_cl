/*
 * simple table
 */
function STable(slave,id,h) {//[[[text_id,rowspan,colspan,width],],]
    var self = this;
    this.id=id;
    this.slave=slave;
    this.hd = [];//th
    this.htid = [];//header text id
    this.cw=[];//col width
    this.c=[];//td
    this.colStyle=[];
    this.container = cd();
    this.tbl = c("table");
    this.ht = c('thead');
    this.tt = c('tbody');
    this.toggleable=false;
    this.tstate=false;
    cla(this.container,"stable");
    for (var i = 0; i < h.length; i++) {
        var tr = c("tr");
        var hda = [];
        var htida = [];
        for (var j = 0; j < h[i].length; j++) {
            var th = c("th");
            ss(th, "width", h[i][j][3]);
            th.innerHTML = trans.get(h[i][j][0]);
            if (h[i][j][1] > 1) {
                s(th, "rowspan", h[i][j][1]);
            }
            if (h[i][j][2] > 1) {
                s(th, "colspan", h[i][j][2]);
            }else{
                this.cw.push(h[i][j][3]);
            }
            a(tr, th);
            hda.push(th);
            htida.push(h[i][j][0]);
        }
        a(this.ht, tr);
        this.hd.push(hda);
        this.htid.push(htida);
    }
    this.container.addEventListener("click", function () {
        self.contClick(this);
    }, false);
    a(this.tbl, [this.ht,this.tt]);
    a(this.container, this.tbl);
    cla(this.container, "stbl_container");
    this.contClick = function () {
        if(this.toggleable){
            this.tstate=!this.tstate;
            this.slave.tblToggled(this.id,this.tstate);
          if(this.tstate){
              cla(this.container,"tbl_toggOn");
          }else{
             clr(this.container,"tbl_toggOn");
          }
        }
    };
    this.updateHeader = function () {
        for (var i = 0; i < this.htid.length; i++) {
            for (var j = 0; j < this.htid[i].length; j++) {
                this.hd[i][j].innerHTML = trans.get(this.htid[i][j]);
            }
        }
    };
    this.appendRow = function (v) {
        var tr = c('tr');
        var tda=[];
        for (var i = 0; i < v.length; i++) {
            var td = c('td');
            ss(td, "width", this.cw[i]);
            if (this.colStyle[i]) {
                cla(td, this.colStyle[i]);
            }
            td.innerHTML = v[i];
            a(tr, td);
           tda.push(td);
        }
         this.c.push(tda);
        a(this.tt, tr);
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
    this.makeToggleable=function(){
        this.toggleable=true;
    };
    this.markCell = function (r, c) {
        cla(this.c[r][c], "enabled_cell");
    };
    this.unmarkCell = function (r, c) {
        cla(this.c[r][c], "enabled_cell");
    };
    this.clear = function () {
        clearCont(this.tt);
    };
    this.enable = function () {
        cla(this.container, "stbl_active");
        this.active = true;
    };
    this.disable = function () {
        clr(this.container, "stbl_active");
        this.active = false;
    };
}

