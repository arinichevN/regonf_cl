function Countdown(slave) {
    this.t = null;//unix timestamp (seconds)
    this.slave = slave;//action
    this.running = false;
    this.container = cd();
    this.container.className='countdown';
    var etxt = c('span');
    etxt.innerHTML = 'Время осталось, с: ';
    this.timeE = c('span');
    this.ter = 0;//window timer
    this.i = 0;//window interval
    this.c = 0;//time lost
    a(this.container, [etxt, this.timeE]);
    this.start = function (t) {
        this.t = t;
        var self = this;
        this.c = Math.round(this.t - Date.now() / 1000);
        if (this.c > 0) {
            this.ter = setTimeout(function () {
                self.slave.cdServe();
                self.abort();
            }, this.c * 1000);
            this.i = setInterval(function () {
                self.update();
            }, 1000);
            this.running = true;
        }
    };
    this.update = function () {
        this.c--;
        this.timeE.innerHTML = this.c;
    };
    this.abort = function () {
        if (this.running) {
            clearInterval(this.i);
            clearTimeout(this.ter);
            this.timeE.innerHTML = '';
            this.running = false;
        }
    };
}

