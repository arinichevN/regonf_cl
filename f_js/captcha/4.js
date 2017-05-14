function Captcha() {
    var self = this;
    this.hidden = false;
    this.caller = null;
    this.callerData = null;
    this.callerAction = null;
    this.ublock = function () {
    };//caller unblock action
    this.block = function () {
    };//caller block action
    this.clog = function () {
    };//caller log function
    this.idata = [];//images
    this.adata = [];//answer [0,1,1,0,0,0] 1-selected image
    this.celems = [];
    this.timeout = null;
    this.duration = null;
    this.S_GET = 1;
    this.S_CHECK = 2;
    this.container = cc();
    this.container.classList.add('captcha');
    this.header = c('header');
    var ehs = c('span');
    ehs.innerHTML = 'тест тьюринга';
    this.hideB = cb('&Cross;');
    this.hideB.className = 'close';
    this.hideB.onclick = function () {
        self.hide();
    };
    a(this.header, [ehs, this.hideB]);
    this.body = cd();
    this.body.className = 'body';
    this.permt = c('span');
    this.permt.innerHTML = 'Выбери наиболее подходящий класс для картинок.';
    this.countd = new Countdown(this);
    this.icont = cd();
    s(this.icont, 'class', 'images');
    a(this.body, [this.permt, this.countd.container, this.icont]);
    this.footer = cff();
    this.okB = cb('Проверить');
    this.okB.onclick = function () {
        self.sendC();
    };
    this.rtB = cb('Обновить');
    this.rtB.onclick = function () {
        self.block();
        self.sendG();
    };
    this.status = cst();
    a(this.footer, [this.okB, this.rtB, this.status]);
    a(this.container, [this.header, this.body, this.footer]);
    this.run = function (obj, data, action, block, ublock,clog) {
        this.caller = obj;
        this.callerData = data;
        this.callerAction = action;
        this.block = block;
        this.ublock = ublock;
        this.clog=clog;
        this.sendG();
    };
    this.build = function () {
        clearCont(this.icont);
        this.icont.scrollTop = 0;
        this.countd.abort();
        for (var i in this.idata) {
            var ec = cd();
            ec.classList.add('img');
            var ei = c('img');
            s(ei, 'id', 'captcha_' + i);
            s(ei, 'alt', 'image');
            s(ei, 'src', 'data: image/jpeg;base64,' + this.idata[i]);
            var es = cs1(this.adata, 'класс');
            this.celems.push(es);
            a(ec, [ei, es]);
            a(this.icont, ec);
        }
        var dff = this.timeout - Date.now() / 1000;
        if (dff > 1 && dff <= this.duration) {
            this.countd.start(this.timeout);
        }
        this.show();
    };
    this.show = function () {
        if (this.hidden) {
            this.container.style.left = parseInt(window.innerWidth / 2) + 'px';
            this.container.style.top = parseInt(window.innerHeight / 2) + 'px';
            this.container.classList.remove('hdn');
            this.icont.scrollTop = 0;
            this.hidden = false;
        }
    };
    this.hide = function () {
        if (!this.hidden) {
            this.container.classList.add('hdn');
            this.hidden = true;
            this.countd.abort();
        }
    };
    this.cdServe = function () {
        this.hide();
    };
    this.sendG = function () {
        var data = [{
                action: ['captcha', 'get']
            }];
        send(this, data, this.S_GET);
    };
    this.sendC = function () {
        var anw = [];
        for (var i in this.celems) {
            anw.push(this.celems[i].value);
        }
        var data = [{
                action: ['captcha', 'check'],
                param: {
                    answer: anw
                }
            }];
        this.block();
        send(this, data, this.S_CHECK);
    };
    this.confirm = function (action, d) {
        switch (action) {
            case this.S_GET:
                this.okB.disabled = false;
                while (this.celems.length) {
                    this.celems.pop();
                }
                while (this.idata.length) {
                    this.idata.pop();
                }
                for (var i in d.image) {
                    this.idata.push(d.image[i]);
                }
                while (this.adata.length) {
                    this.adata.pop();
                }
                for (var i in d.clas) {
                    this.adata.push(d.clas[i]);
                }
                this.timeout = d.timeout;
                this.duration = d.duration;
                this.build();
                this.ublock();
                break;
            case this.S_CHECK:
                this.hide();
                send(this.caller, this.callerData, this.callerAction);
                break;
        }
    };
    this.abort = function (action, m) {
        switch (action) {
            case this.S_GET:
                this.log('не удалось получить данные');
                if (this.hidden) {
                    this.clog('не удалось добавить комментарий');
                }
                break;
            case this.S_CHECK:
                this.log('неправильно');
                this.okB.disabled = true;
                this.countd.abort();
                break;
        }
        this.ublock();
    };
    this.log = function (message) {
        var self = this;
        if (this.logTimer !== null) {
            window.clearTimeout(this.logTimer);
        }
        this.status.innerHTML = message;
        this.logTimer = window.setTimeout(function () {
            self.status.innerHTML = ' ';
            self.logTimer = null;
        }, 2000);
    };
    this.hide();
}


