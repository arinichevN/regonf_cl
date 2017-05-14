function HelpElectric() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.initialized = false;
    this.content = null;
    this.bb = null;
    this.init = function () {
        this.container = cvis();
        this.content = c("img");
        s(this.content, "src", "client/image/help/electric.png");
        this.bb = new BackButton();
        a(this.container, [this.content, this.bb]);
        cla(this.bb,["f1", "help_b"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(404);
    };
    this.updateStr = function () {
        this.bb.updateStr();
    };
    this.show = function () {
        clr(this.container,'hdn');
    };
    this.hide = function () {
        cla(this.container,'hdn');
    };
}
var vhelp_electric = new HelpElectric();
visu.push(vhelp_electric);