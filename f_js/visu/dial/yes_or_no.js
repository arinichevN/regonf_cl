function YesOrNo() {
    this.container =null;
    this.header=null;
    this.mcont=null;
    this.initialized = false;
    this.kind = null;
    this.slave = null;
    this.yesB = null;
    this.noB = null;
    this.init = function () {
        var self = this;
        this.container = cd();
        this.header=c("header");
        this.mcont=c("article");
        var r=cd();
        this.yesB = cb("");
        this.noB = cb("");
        this.yesB.onclick = function () {
            self.slave.yes(self.kind);
        };
        a(r,[this.yesB,this.noB]);
        a(this.container,[this.header,this.mcont,r]);
        cla(this.container,"yn_dial");
        this.noB.onclick = function () {
            cla(self.container, "hdn");
        };
    };
    this.updateStr = function () {
        this.yesB.innerHTML = trans.get();
        this.noB.innerHTML = trans.get();
    };
    this.show = function (slave, kind,header, message) {
        this.slave = slave;
        this.kind = kind;
        this.header.innerHTML=header;
        this.mcont.innerHMTL = message;
        clr(this.container, "hdn");
    };
}
var yond = new YesOrNo();
elem.push(yond);