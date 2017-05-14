function HelpMenu() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.initialized = false;
    this.b1 = null;
    this.b2 = null;
    this.bb = null;
    this.init = function () {
        try {
            this.container = cvis();
            this.b1 = new NavigationButton(vhelp_logic);
            this.b2 = new NavigationButton(vhelp_electric);
            this.bb = new BackButton();
            a(this.container, [this.b1, this.b2, this.bb]);
            cla([this.b1, this.b2, this.bb], ["h33m", "ug1", "f2"]);
            this.initialized = true;
        } catch (e) {
            alert("menu_auto: init: " + e.message);
        }
    };
    this.getName = function () {
        try {
            return trans.get(402);
        } catch (e) {
            alert("menu_auto: getName: " + e.message);
        }
    };
    this.updateStr = function () {
        try {
            this.b1.updateStr();
            this.b2.updateStr();
            this.bb.updateStr();
        } catch (e) {
            alert("menu_auto: updateStr: " + e.message);
        }
    };
    this.show = function () {
        try {
            clr(this.container, 'hdn');
        } catch (e) {
            alert("menu_auto: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, 'hdn');
        } catch (e) {
            alert("menu_auto: hide: " + e.message);
        }
    };
}
var vhelp_menu = new HelpMenu();
visu.push(vhelp_menu);