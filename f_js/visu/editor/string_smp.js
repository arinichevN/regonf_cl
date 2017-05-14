function StringEditSmp() {
    this.type = VISU_TYPE.DIAL;
    this.container = {};
    this.initialized = false;
    this.header = null;
    this.editor = null;
    this.lB = null;
    this.plB = null;
    this.prB = null;
    this.dB = null;
    this.inE = null;
    this.cancelB = null;
    this.applyB = null;
    this.good_char = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я',
        'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ы', 'э', 'ю', 'я',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '+', '-', '_', '.', ' ', ':'
    ];
    this.timer = null;
    this.slave = null;
    this.kind = null;
    this.max_size = null;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        var editor = cd();
        this.inE = c("input");
        s(this.inE, "size", 50);
        var bcont = cd();
        this.cancelB = cb("");
        this.applyB = cb("");
        this.inE.onkeyup = function () {
            self.checkText();
        }
        this.cancelB.onclick = function () {
            self.cancel();
        };
        this.applyB.onclick = function () {
            self.apply();
        };
        a(editor, this.inE);
        a(bcont, [this.applyB, this.cancelB]);
        a(this.container, [this.header, editor, bcont]);
        cla(this.inE, "fi");
        cla([this.header, editor], "h30m");
        cla(editor, "editor");
        cla(bcont, "h30m");
        cla([this.cancelB, this.applyB], "w50m");
        cla(this.header, "edit_header");
        this.initialized = true;
    };
    this.getName = function () {
        return "simple string editor";
    };
    this.checkText = function () {
        if (this.inE.value.length > this.max_size) {
            this.applyB.disabled = true;
            logger.err(206);
            return;
        }
        for (var i = 0; i < this.inE.value.length; i++) {
            if (!this.checkChar(this.inE.value.charAt(i))) {
                this.applyB.disabled = true;
                logger.err(207);
                return;
            }
        }
        this.applyB.disabled = false;
    };
    this.checkChar = function (c) {
        for (var i = 0; i < this.good_char.length; i++) {
            if (this.good_char[i] === c) {
                return true;
            }
        }
        return false;
    };
    this.cancel = function () {
        goBack();
    };
    this.apply = function () {
        this.slave.catchEdit(this.inE.value, this.kind);
        goBack();
    };
    this.updateStr = function () {
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep = function (s, max_size, slave, kind, header) {
        this.inE.value=s;
        this.slave = slave;
        this.max_size = max_size;
        this.kind = kind;
        this.header.innerHTML = trans.get(header);
        this.slave.update = false;
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vstring_edit_smp = new StringEditSmp();
visu.push(vstring_edit_smp);