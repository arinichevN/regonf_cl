function GroupElem(descr) {
    this.container = cd();
    this.done = false;
    this.tmr1 = {tmr: null};
    this.content = cd();
    this.descrE = cd();
    this.descrE.innerHTML = descr;
    this.updateStr = function () {

    };
    a(this.container, [this.descrE, this.content]);
    cla(this.content, ["gr_content"]);
    cla(this.descrE, ["gr_descr"]);
    cla(this.container, ["gr_block", "select_none"]);
}