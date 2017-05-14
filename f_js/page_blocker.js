function PageBlocker() {
    this.container = null;
    this.active = false;
    this.init = function () {
        this.container = cd();
        cla(this.container, ['page_blocker', 'hdn']);
        a(document.body, this.container);
    };
    this.prep = function (click, move, slave, kind) {
        var self = this;
        if (click) {
            this.container.onclick = function () {
                if (self.slave) {
                    self.slave.catchEdit(null, self.kind, null);
                }
                self.disable();
            };
        }
        if (move) {
            this.container.onmousemove = function () {
                if (self.slave) {
                    self.slave.catchEdit(null, self.kind, null);
                }
                self.disable();
            };
        }
        this.slave = slave;
        this.kind = kind;
    };
    this.enable = function () {
        clr(this.container, 'hdn');
    };
    this.disable = function () {
        cla(this.container, 'hdn');
    };
    this.toggle = function () {
        if (clc(this.container, 'hdn')) {
            clr(this.container, 'hdn');
        } else {
            cla(this.container, 'hdn');
        }
    };

}
if (typeof page_blocker === 'undefined') {
    var page_blocker = new PageBlocker();
    elem.push(page_blocker);
} else {
    console.log("warning: you have another page_blocker");
}
