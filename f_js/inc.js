//waits a delay and then repeats callback function every interval
function Inc() {
    this.active = false;
    this.delay = 300;
    this.interval = 100;
    this.slave = null;
    this.start_timer = null;
    this.run_timer = null;
    this.sign = null;
    this.inc = null;
    this.kind = null;
    this.init = function () {
        var self = this;
        window.addEventListener('mouseup', function () {
            self.up();
        }, false);
    };
    this.down = function (slave, sign, kind, inc) {
        this.slave = slave;
        this.sign = sign;
        this.kind = kind;
        this.inc = inc;
        var self = this;
        this.start_timer = window.setTimeout(function () {
            self.run();
        }, this.delay);
        this.active = true;
    };
    this.up = function () {
        if (this.active) {
            window.clearTimeout(this.start_timer);
            if (this.run_timer) {
                window.clearInterval(this.run_timer);
                this.run_timer = null;
            }
            this.slave.incCB(this.sign, this.kind, this.inc);
            this.cf = null;
            this.active = false;
        }
    };
    this.upS = function () {
        if (this.active) {
            window.clearTimeout(this.start_timer);
            if (this.run_timer) {
                window.clearInterval(this.run_timer);
                this.run_timer = null;
            }
            this.cf = null;
            this.active = false;
        }
    };
    this.run = function () {
        var self = this;
        this.run_timer = window.setInterval(function () {
            self.slave.incCB(self.sign, self.kind, self.inc);
        }, 100);
    };
}
var inc = new Inc();
elem.push(inc);

