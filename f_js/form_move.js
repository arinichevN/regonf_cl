var form_move = {
    init: function () {
        var self = this;
        this.type = 0;
        this.dx = 0;
        this.dy = 0;
        this.elem = null;
        this.handle = null;
        this.allow = true;
        this.active = false;
        var f = document.getElementsByClassName('mobile');
        var i, j, c;
        for (i = 0; i < f.length; i++) {
            f[i].firstElementChild.onmousedown = function (e) {
                self.mouseDown(e, this);
            };
            f[i].style.left = parseInt(window.innerWidth / 2) + 'px';
            f[i].style.top = parseInt(window.innerHeight / 2) + 'px';
            for (j = 0; j < f[i].firstElementChild.children.length; j++) {
                if (j !== 0) {
                    f[i].firstElementChild.children[j].onmouseenter = function () {
                        self.btme();
                    };
                    f[i].firstElementChild.children[j].onmouseleave = function () {
                        self.btml();
                    };
                }
            }
        }
        var fm = function (e) {
            self.divMove(e);
        };
        var fu = function () {
            self.mouseUp();
        };
        window.addEventListener('mousemove', fm, false);
        window.addEventListener('mouseup', fu, false);
    },
    btme: function () {
        this.allow = false;
    },
    btml: function () {
        this.allow = true;
    },
    mouseUp: function () {
        if (this.active) {
            this.handle.style.cursor = 'default';
            this.active = false;
        }
    },
    mouseDown: function (e, elem) {
        if (this.allow) {
            var self = this;
            this.handle = elem;
            this.elem = elem.parentElement;
            elem.style.cursor = 'move';
            this.dx = e.clientX - elem.parentElement.style.left.replace('px', '');
            this.dy = e.clientY - elem.parentElement.style.top.replace('px', '');
            this.active = true;
        }
    },
    divMove: function (e) {
        if (this.active) {
            var aX = e.clientX - this.dx;
            var aY = e.clientY - this.dy;
            this.elem.style.left = aX + 'px';
            this.elem.style.top = aY + 'px';
        }
    }
};


