function LoggerFl() {
    this.container = null;
    this.bcont = null;
    this.header = null;
    this.row = 0;
    this.timer = null;
    this.MODE = {
        WRN: 1,
        NTF: 2,
        ERR: 3
    };
    this.STYLE = {
        WRN: "loggerfl_wrn",
        NTF: "loggerfl_ntf",
        ERR: "loggerfl_err"
    };
    this.init = function () {
        var self = this;
        this.container = cd();
        this.bcont = cd();
        this.n_cont = cd();
        this.header = cd();
        this.container.onclick = function () {
            self.hide();
        };
        a(this.bcont, [this.header, this.n_cont]);
        a(this.container, [this.bcont]);
        a(document.body, this.container);
        cla(this.container, ["loggerfl_cont"]);
        cla(this.header, ["loggerfl_head"]);
        cla(this.n_cont, "loggerfl_val");
    };
    this.err = function (id) {
        this.log(this.MODE.ERR, id, 1);
    };
    this.wrn = function (id) {
        this.log(this.MODE.WRN, id, 1);
    };
    this.ntf = function (id) {
        this.log(this.MODE.NTF, id, 1);
    };
    this.errs = function (str) {
        this.log(this.MODE.ERR, str, 0);
    };
    this.wrns = function (str) {
        this.log(this.MODE.WRN, str, 0);
    };
    this.ntfs = function (str) {
        this.log(this.MODE.NTF, str, 0);
    };
    this.log = function (id, value, mode) {
        var str = "";
        if (mode) {
            str = trans.get(value);
        } else {
            str = value;
        }
        this.n_cont.innerHTML = str;
        this.setStyle(id);
        this.show();
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        var self = this;
        this.timer = window.setTimeout(function () {
            self.hide();
            self.timer = null;
        }, 3000);
    };
    this.success = function () {
        this.ntf(200);
    };
    this.fail = function () {
        this.err(201);
    };
    this.setStyle = function (id) {
        switch (id) {
            case this.MODE.ERR:
                this.header.innerHTML = trans.get(58);
                cla(this.container, this.STYLE.ERR);
                clr(this.container, this.STYLE.WRN);
                clr(this.container, this.STYLE.NTF);
                break;
            case this.MODE.WRN:
                this.header.innerHTML = trans.get(59);
                clr(this.container, this.STYLE.ERR);
                cla(this.container, this.STYLE.WRN);
                clr(this.container, this.STYLE.NTF);
                break;
            case this.MODE.NTF:
                this.header.innerHTML = trans.get(60);
                clr(this.container, this.STYLE.ERR);
                clr(this.container, this.STYLE.WRN);
                cla(this.container, this.STYLE.NTF);
                break;
            default:
                this.header.innerHTML = "";
                clr(this.container, this.STYLE.ERR);
                clr(this.container, this.STYLE.WRN);
                clr(this.container, this.STYLE.NTF);
                break;
        }
    };
    this.show = function () {
        clr(this.container, 'hdn');
    };
    this.hide = function () {
        cla(this.container, 'hdn');
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    };
}
if (typeof logger === 'undefined') {
    var logger = new LoggerFl();
    elem.push(logger);
} else {
    console.log("warning: you have another logger");
}
