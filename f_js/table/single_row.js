function VTable(slave,id,t) {//single row table
    var self=this;
    this.id=id;
    this.slave=slave;
    this.container = cd();
    this.t = t;
    this.q = 0;
    this.td = [];
    this.toggleable=false;
    this.tstate=false;
    cla(this.container,"vtable");
    switch (this.t) {
        case 1:
            this.q = 12;
            break;
        case 2:
            this.q = 7;
            break;
    }

    var tbl = c("table");
    var tr = c("tr");
    for (var i = 0; i < this.q; i++) {
        var td = c("td");
        switch (this.t) {
            case 1:
                td.innerHTML = trans.getMon(i, 1);
                break;
            case 2:
                td.innerHTML = trans.getWD(i, 1);
                break;
        }
        a(tr, td);
        this.td.push(td);
    }
    this.container.addEventListener("click", function () {
        self.contClick(this);
    }, false);
    a(tbl, tr);
    a(this.container, tbl);
    cla(this.container, "vtbl_container");
    this.setData = function (d) {
        for (var i = 0; i < d.length; i++) {
            if (d[i]==="1") {
                cla(this.td[i], "enabled_cell");
            } else {
                clr(this.td[i], "enabled_cell");
            }
        }
    };
    this.update = function () {
        for (var i = 0; i < this.td.length; i++) {
            switch (this.t) {
                case 1:
                    this.td[i].innerHTML = trans.getMon(i, 1);
                    break;
                case 2:
                    this.td[i].innerHTML = trans.getWD(i, 1);
                    break;
            }
        }
    };
     this.makeToggleable=function(){
        this.toggleable=true;
    };
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
    this.enable = function () {
        cla(this.container, "vtbl_active");
        this.active = true;
    };
    this.disable = function () {
        clr(this.container, "vtbl_active");
        this.active = false;
    };
}


