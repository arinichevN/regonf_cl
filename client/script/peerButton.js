function PeerButton(peer) {
    this.container = cd();
    this.id = peer.id;

    this.descrE = cd();
    this.workE = c("img");

    this.tmr1 = {tmr: null};
    s(this.workE, "src", "client/image/work_un.png");

    this.workE.innerHTML = '&empty;';
    this.descrE.innerHTML = peer.name;
this.container.title=peer.address+":"+peer.port;
    this.updateStr = function () {

    };
    this.blink = function (style) {
        cla(this.container, style);
        var self = this;
        var tmr = window.setTimeout(function () {
            self.unmark(style);
        }, 300);
    };
    this.unmark = function (style) {
        clr(this.container, style);
    };
    this.update = function (state) {
        switch (state) {
            case ACP.RESP.APP_BUSY:
                s(this.workE, "src", "client/image/work_yes.png");
                break;
            case ACP.RESP.APP_IDLE:
                s(this.workE, "src", "client/image/work_no.png");
                break;
            default:
                s(this.workE, "src", "client/image/work_un.png");
                break;
        }
       this.blink('peer_updated');

    };
    a(this.container, [this.descrE, this.workE]);
    cla(this.workE, ["peer_work"]);
    cla(this.descrE, ["peer_descr"]);
    // cla([this.workE, this.descrE], ["pr_d"]);
    cla(this.container, ["peer_block", "select_none"]);

}