function StringEdit() {
    this.type = VISU_TYPE.DIAL;
    this.container = {};
    this.initialized = false;
    this.header = null;
    this.editor = null;
    this.lB = null;
    this.plB = null;
    this.prB = null;
    this.dB = null;
    this.cancelB = null;
    this.applyB = null;
    this.latin = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.cyrillic = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'];
    this.special = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '+', '-', '_', '.'];
    this.c_c = null; //string presentation
    this.p = 0; //active position
    this.c = 0; //current charcode
    this.ca = []; //characters array
    this.l = 0; //0-latin, 1-cyrilic
    this.timer = null;
    this.sign = 1;
    this.slave = null;
    this.kind = null;
    this.init = function () {
        var self = this;
        this.container = cvis();
        var edit_cont, alt_cont, act_cont, lr_cont, key_cont, rcont, dcont, ucont;
        this.c_c = cd();//emty character place
        this.header = cd();
        this.editor = cd();
        edit_cont = cd();
        alt_cont = cd();
        act_cont = cd();
        lr_cont = cd();
        key_cont = cd();
        ucont = cd();
        dcont = cd();
        rcont = cd();
        this.latin_cont = cd();
        this.cyrillic_cont = cd();
        this.special_cont = cd();
        for (var i = 0; i < this.latin.length; i++) {
            var b = cb(this.latin[i]);
            b.cid = this.latin[i].toString();
            b.onclick = function () {
                self.insert(this);
            };
            cla(b, "str_edit_key_latin");
            a(this.latin_cont, b);
        }
        for (var i = 0; i < this.cyrillic.length; i++) {
            var b = cb(this.cyrillic[i]);
            b.cid = this.cyrillic[i].toString();
            b.onclick = function () {
                self.insert(this);
            };
            cla(b, "str_edit_key_cyrillic");
            a(this.cyrillic_cont, b);
        }
        for (var i = 0; i < this.special.length; i++) {
            var b = cb(this.special[i]);
            b.cid = this.special[i].toString();
            b.onclick = function () {
                self.insert(this);
            };
            cla(b, "str_edit_key_special");
            a(this.special_cont, b);
        }
        this.plB = cb("&leftarrow;");
        this.prB = cb("&rightarrow;");
        this.dB = cb("&Cross;&LongLeftArrow;");
        this.latinB = cb("ABC");
        this.cyrillicB = cb("АБВ");
        this.specialB = cb("01*");
        this.cancelB = cb("");
        this.applyB = cb("");
        this.plB.onmousedown = function () {
            self.sign = -1;
            self.changeDownP();
        };
        this.plB.onmouseup = function () {
            self.changeUpP();
        };
        this.prB.onmousedown = function () {
            self.sign = 1;
            self.changeDownP();
        };
        this.prB.onmouseup = function () {
            self.changeUpP();
        };
        this.dB.disabled = true;
        this.dB.onclick = function () {
            self.delete();
        };
        this.latinB.onclick = function () {
            self.selectKind(0);
        };
        this.cyrillicB.onclick = function () {
            self.selectKind(1);
        };
        this.specialB.onclick = function () {
            self.selectKind(2);
        };
        this.cancelB.onclick = function () {
            self.cancel();
        };
        this.applyB.onclick = function () {
            self.apply();
        };
        a(this.editor, this.c_c);
        a(edit_cont, [this.header, this.editor]);
        a(ucont, [edit_cont, this.dB]);
        a(key_cont, [this.latin_cont, this.cyrillic_cont, this.special_cont]);
        a(lr_cont, [this.plB, this.prB]);
        a(alt_cont, [this.latinB, this.cyrillicB, this.specialB]);
        a(act_cont, [this.applyB, this.cancelB]);
        a(dcont, [key_cont, rcont]);
        a(rcont, [lr_cont, alt_cont, act_cont]);
        a(this.container, [ucont, dcont]);
        cla([this.header, this.editor], "h50m");
        cla(edit_cont, "w70m");
        cla(ucont, "h20m");
        cla(dcont, "h80m");
        cla(this.editor, "editor");
        cla(this.dB, "w30m");
        cla([this.plB, this.applyB], "w50m");
        cla([this.prB, this.cancelB], "w50m");
        cla(key_cont,"h60m");
        cla(rcont,"h40m");
        cla([lr_cont, alt_cont, act_cont], "h30m");
        cla(alt_cont, "toggle_cont");
        cla([this.latinB, this.cyrillicB, this.specialB], 'w33m');
        cla([this.plB, this.prB, this.dB], "f1");
        cla([this.cyrillic_cont, this.special_cont], "hdn");
        cla(this.latinB, "active_btn");
        cla(this.header, "edit_header");

        this.l = 0;
        this.c = 0;
        this.initialized = true;
    };
    this.getName = function () {
        return "string edit";
    };
    this.selectKind = function (k) {
        switch (k) {
            case 0:
                clr(this.latin_cont, "hdn");
                cla(this.cyrillic_cont, "hdn");
                cla(this.special_cont, "hdn");
                cla(this.latinB, "active_btn");
                clr(this.cyrillicB, "active_btn");
                clr(this.specialB, "active_btn");
                break;
            case 1:
                cla(this.latin_cont, "hdn");
                clr(this.cyrillic_cont, "hdn");
                cla(this.special_cont, "hdn");
                clr(this.latinB, "active_btn");
                cla(this.cyrillicB, "active_btn");
                clr(this.specialB, "active_btn");
                break;
            case 2:
                cla(this.latin_cont, "hdn");
                cla(this.cyrillic_cont, "hdn");
                clr(this.special_cont, "hdn");
                clr(this.latinB, "active_btn");
                clr(this.cyrillicB, "active_btn");
                cla(this.specialB, "active_btn");
                break;
        }
    };
    this.changeDownC = function () {
        var self = this;
        if (this.timer) {
            window.clearInterval(this.timer);
        }
        this.timer = window.setInterval(function () {
            self.changeC();
        }, 100);
    };
    this.changeDownP = function () {
        var self = this;
        if (this.timer) {
            window.clearInterval(this.timer);
        }
        this.timer = window.setInterval(function () {
            self.changeP();
        }, 100);
    };
    this.changeUpC = function () {

        if (this.timer) {
            window.clearInterval(this.timer);
        }
        this.changeC();
    };
    this.changeUpP = function () {
        if (this.timer) {
            window.clearInterval(this.timer);
        }
        this.changeP();
    };
    this.changeC = function () {
        var r = this.c + this.sign;
        switch (this.l) {
            case 0://latin
                if (r >= 0 && r < this.latin.length) {
                    this.c = r;
                    this.c_d.innerHTML = this.latin[this.c];
                }
                break;
            case 1://cyrillic
                if (r >= 0 && r < this.cyrillic.length) {
                    this.c = r;
                    this.c_d.innerHTML = this.cyrillic[this.c];
                }
                break;
            case 2://numeric
                if (r >= 0 && r < this.digit.length) {
                    this.c = r;
                    this.c_d.innerHTML = this.digit[this.c];
                }
            case 3://special
                if (r >= 0 && r < this.special.length) {
                    this.c = r;
                    this.c_d.innerHTML = this.special[this.c];
                }
        }
    };
    this.changeP = function () {
        var r = this.p + this.sign;
        if (r >= 0 && r < this.ca.length) {
            clr(this.c_c.children[this.p], "active_char");
            this.p = r;
            cla(this.c_c.children[this.p], "active_char");
        }
        this.btnControl();
    };
    this.insert = function (elem) {
        if (this.ca.length < 32) {
            var s = elem.cid;
            this.ca.splice(this.p, 0, s);
            var ce = c("span");
            ce.innerHTML = s;
            this.c_c.insertBefore(ce, this.c_c.children[this.p]);
            this.sign = 1;
            this.changeP();
            this.btnControl();
        } else {
            logger.ntf(47);
        }
    };
    this.delete = function () {
        if (this.ca.length && this.p - 1 >= 0) {
            this.c_c.removeChild(this.c_c.children[this.p - 1]);
            this.ca.splice(this.p - 1, 1);
            this.p--;
            cla(this.c_c.children[this.p], "active_char");

        }
        this.btnControl();
    };
    this.btnControl = function () {
        if (this.p === this.ca.length - 1) {
            this.prB.disabled = true;
        } else {
            this.prB.disabled = false;
        }
        if (this.p > 0) {
            this.plB.disabled = false;
            this.dB.disabled = false;
        } else {
            this.plB.disabled = true;
            this.dB.disabled = true;
        }
    };
    this.cancel = function () {
        goBack();
    };
    this.apply = function () {
        this.ca.pop();
        this.slave.catchEdit(this.ca.join(""), this.kind);
        goBack();
    };
    this.updateStr = function () {
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep = function (s, slave, kind, header) {
        cleara(this.ca);
        clearCont(this.c_c);
        this.ca = s.split("");
        this.ca.push(" ");
        for (var i = 0; i < this.ca.length; i++) {
            var ce = c("span");
            ce.innerHTML = this.ca[i];
            if (i === this.ca.length - 1) {
                cla(ce, "active_char");
            }
            a(this.c_c, ce);
        }
        this.slave = slave;
        this.kind = kind;
        this.header.innerHTML = trans.get(header);
        this.p = this.ca.length - 1;
        this.btnControl();
        this.slave.update = false;
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vstring_edit = new StringEdit();
visu.push(vstring_edit);