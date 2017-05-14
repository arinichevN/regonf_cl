function Logger() {
    this.container = null;
    this.time_cont = null;
    this.data = []; //[id,(1-error,2-warning,3-notification)]
    this.row = 0;
    this.stl = "logger_ntf";
    this.timer = null;
    this.LLIMIT = 32;
    this.dt_diff = 0;
    this.dt_wday=0;
    this.init = function () {
        var self = this;
        this.container = cd();
        this.n_cont = cd();
        this.time_cont = cd();
        var lelem = cd();
        var relem = cd();
        lelem.onclick = function () {
            self.up();
        };
        relem.onclick = function () {
            self.down();
        };
        a(this.container, [this.n_cont, this.time_cont]);
        a(this.container, [lelem, relem]);
        cla(lelem, "logger_l");
        cla(this.container, ["logger_m", this.stl]);
        cla(relem, "logger_r");
        cla(this.time_cont, ["logger_date", "hdn"]);
        cla(this.n_cont, "cell_l70");

    };
    this.saveErr = function () {
        this.log(1, trans.get(204));
    };
    this.err = function (id) {
        this.log(1, trans.get(id));
    };
    this.wrn = function (id) {
        this.log(2, trans.get(id));
    };
    this.ntf = function (id) {
        this.log(3, trans.get(id));
    };
    this.ntfs = function (str) {
        this.log(3, str);
    };
    this.log = function (id, str) {
        this.data.push([str, id]);
        this.n_cont.innerHTML = str;
        this.setStyle(id);
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        var self = this;
        this.timer = window.setTimeout(function () {
            self.erase();
            self.timer = null;
        }, 3000);
        if (this.data.length > this.LLIMIT) {
            this.data.shift();
        }
    };
    this.dtSync = function (tmst, wday) {
        this.dt_blocked = false;
        this.dt_diff = tmst - Date.now();
        this.dt_wday=wday;
    };
    this.dtHide = function () {
        cla(this.time_cont, "hdn");
    };
    this.dtShow = function () {
        clr(this.time_cont, "hdn");
    };
    this.dtRemote = function () {
        clr(this.time_cont, "logger_dt_local");
    };
    this.showDate = function () {
        var d = new Date(Date.now() + this.dt_diff);
        var year = d.getFullYear();
        var mon = trans.getMon(d.getMonth(), 0);
        var wday = trans.getWD(this.dt_wday, 0);
        var day = d.getDate();
        var h = intTo2str(d.getHours());
        var m = intTo2str(d.getMinutes());
        var s = intTo2str(d.getSeconds());
        this.time_cont.innerHTML = wday + " " + day + " " + mon + " " + year + " " + h + ":" + m + ":" + s;
    };
    this.getDate = function () {
        return Date.now() + this.dt_diff;
    };
    this.enableDate = function () {
        var self = this;
        clr(this.time_cont, "hdn");
        window.setInterval(function () {
            self.showDate();
        }, 100);
    };
    this.success = function () {
        this.ntf(200);
    };
    this.fail = function () {
        this.wrn(201);
    };
    this.up = function () {
        if (this.row > 0) {
            this.row--;
            this.n_cont.innerHTML = this.data[this.row][0];
            this.setStyle(this.data[this.row][1]);
        }
    };
    this.down = function () {
        if (this.row < this.data.length - 1) {
            this.row++;
            this.n_cont.innerHTML = this.data[this.row][0];
            this.setStyle(this.data[this.row][1]);
        }
    };
    this.setStyle = function (id) {
        switch (id) {
            case 1:
                clr(this.n_cont, this.stl);
                this.stl = "logger_err";
                cla(this.n_cont, this.stl);
                break;
            case 2:
                clr(this.n_cont, this.stl);
                this.stl = "logger_wrn";
                cla(this.n_cont, this.stl);
                break;
            case 3:
                clr(this.n_cont, this.stl);
                this.stl = "logger_ntf";
                cla(this.n_cont, this.stl);
                break;
        }
    };
    this.erase = function () {
        this.n_cont.innerHTML = "";
    };
}
var logger = new Logger();
elem.push(logger);

