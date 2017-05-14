function Night() {
    this.type = VISU_TYPE.TOP;
    this.container = null;
    this.initialized = false;
    this.visible = false;
    this.init = function () {
        var self = this;
        this.container = cvis();
        cla(this.container,"night");
        this.initialized = true;
    };
        this.getName = function () {
        return "night";
    };
    this.updateStr=function(){;};
    this.show = function () {
        this.container.style.height = window.innerHeight + "px";
        this.container.classList.remove('hdn');
        this.visible = true;
    };
    this.hide = function () {
        this.container.classList.add('hdn');
        this.visible = false;
    };
}
var vnight = new Night();
visu.push(vnight);


