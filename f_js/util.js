var lgi = 0;//for logp()
function time(d, h, m, s) {
    this.d = d;
    this.h = h;
    this.m = m;
    this.s = s;
    this.toStr = function () {
        return intToTimeStr(this.getVal());
    };
    this.getVal = function () {
        return this.d * 86400 + this.h * 3600 + this.m * 60 + this.s;
    };
}
function time_now() {
    return parseInt((Date.now()) / 1000);
}

function intToTimeStr(i) {
    var d = 0, h = 0, m = 0, s = 0, r = 0;
    var hs = "", ms = "", ss = "", ns = "";
    if (i < 0) {
        ns = "-";
        i = Math.abs(i);
    }
    d = Math.floor(i / 86400);
    r = i % 86400;
    h = Math.floor(r / 3600);
    r = r % 3600;
    m = Math.floor(r / 60);
    r = r % 60;
    s = r;
    hs = intTo2str(h);
    ms = intTo2str(m);
    ss = intTo2str(s);
    if (d > 0) {
        return ns + d + ":" + hs + ":" + ms + ":" + ss;
    } else {
        return ns + hs + ":" + ms + ":" + ss;
    }
}

function intTo2str(i) {
    var s = i.toString();
    var si = "";
    if (s.length === 1) {
        si = "0" + s;
    } else if (s.length > 1) {
        si = s.slice(0, 2);
    } else {
        si = "00";
    }
    return si;
}
function boolToStr(v) {
    if (v) {
        return '&Cross;';
    }
    return ' ';
}
function cgsk(id) {
    var cl = "";
    switch (id) {
        case 0:
            cl = "gasket_0i5";
            break;
        case 1:
            cl = "gasket_1";
            break;
        case 2:
            cl = "gasket_1i5";
            break;
        case 3:
            cl = "gasket_8i5";
            break;
    }
    var el = cd();
    el.classList.add(cl);
    return el;
}
function tdelr(tbd, row) {
    tbd.removeChild(tbd.children[row]);
}
function tuc(tbd, row, col, v) {//update table cell
    tbd.children[row].children[col].innerHTML = v;
}
function tsc(tbd, row, col) {//select table cell
    cla(tbd.children[row].children[col], "active");
    tbd.children[row].scrollIntoView(false);
}
function tsr(tbd, row) {//select table row 
    cla(tbd.children[row], "active");
    tbd.children[row].scrollIntoView(false);
}
function tscr(tbd, row, col) {//select table cell
    clr(tbd.children[row].children[col], "active");
}
function tsrr(tbd, row) {//select table row 
    clr(tbd.children[row], "active");
}
function tmr(tbd, row) {//mark table row
    cla(tbd.children[row], "enabled");
}
function tumr(tbd, row) {//unmark table row
    clr(tbd.children[row], "enabled");
}
function tmc(tbd, row, col) {//mark table cell
    cla(tbd.children[row].children[col], "enabled_cell");
}
function tumc(tbd, row, col) {//mark table cell
    clr(tbd.children[row].children[col], "enabled_cell");
}
function tmc_cp(tbd, row, col) {//mark table cell
    cla(tbd.children[row].children[col], "copy_cell");
}
function tumc_cp(tbd, row, col) {//mark table cell
    clr(tbd.children[row].children[col], "copy_cell");
}
function cnb(n) {//create navigation button
    var bb = cb("");
    bb.addEventListener("click", function () {
        showV(n);
    }, false);
    return bb;
}
function cnbb(n) {//create navigation back button
    var bb = cb("");
    bb.addEventListener("click", function () {
        goBack();
    }, false);
    return bb;
}
function cvis() {
    var elem = c('section');
    elem.classList.add("hdn");
    return elem;
}

function Enum(v) {
    for (var i = 0; i < v.length; i++) {
        this[v[i]] = i;
    }
}
function cla(elem, cl) {
    if (elem instanceof Array) {
        if (cl instanceof Array) {
            for (var i = 0; i < elem.length; i++) {
                for (var j = 0; j < cl.length; j++) {
                    if (elem[i] instanceof Element) {
                        elem[i].classList.add(cl[j]);
                    } else {
                        elem[i].container.classList.add(cl[j]);
                    }
                }
            }
        } else {
            for (var i = 0; i < elem.length; i++) {
                if (elem[i] instanceof Element) {
                    elem[i].classList.add(cl);
                } else {
                    elem[i].container.classList.add(cl);
                }
            }
        }
    } else {
        if (cl instanceof Array) {
            for (var i = 0; i < cl.length; i++) {
                if (elem instanceof Element) {
                    elem.classList.add(cl[i]);
                } else {
                    elem.container.classList.add(cl[i]);
                }
            }
        } else {
            if (elem instanceof Element) {
                elem.classList.add(cl);
            } else {
                elem.container.classList.add(cl);
            }
        }
    }
}
function clr(elem, cl) {
    if (elem instanceof Array) {
        if (cl instanceof Array) {
            for (var i = 0; i < elem.length; i++) {
                for (var j = 0; j < cl.length; j++) {
                    if (elem[i] instanceof Element) {
                        elem[i].classList.remove(cl[j]);
                    } else {
                        elem[i].container.classList.remove(cl[j]);
                    }
                }
            }
        } else {
            for (var i = 0; i < elem.length; i++) {
                if (elem[i] instanceof Element) {
                    elem[i].classList.remove(cl);
                } else {
                    elem[i].container.classList.remove(cl);
                }
            }
        }
    } else {
        if (cl instanceof Array) {
            for (var i = 0; i < cl.length; i++) {
                if (elem instanceof Element) {
                    elem.classList.remove(cl[i]);
                } else {
                    elem.container.classList.remove(cl[i]);
                }
            }
        } else {
            if (elem instanceof Element) {
                elem.classList.remove(cl);
            } else {
                elem.container.classList.remove(cl);
            }
        }
    }
}
function clc(elem, cl) {//every element has every class
    if (elem instanceof Array) {
        if (cl instanceof Array) {
            for (var i = 0; i < elem.length; i++) {
                for (var j = 0; j < cl.length; j++) {
                    if (!elem[i].classList.contains(cl[j])) {
                        return false;
                    }
                }
            }
        } else {
            for (var i = 0; i < elem.length; i++) {
                if (!elem[i].classList.contains(cl)) {
                    return false;
                }
            }
        }
    } else {
        if (cl instanceof Array) {
            for (var i = 0; i < cl.length; i++) {
                if (!elem.classList.contains(cl[i])) {
                    return false;
                }
            }
        } else {
            if (!elem.classList.contains(cl)) {
                return false;
            }
        }
    }
    return true;
}
function ael(elem, ev, fn, bl) {
    if (bl) {
        bl = true;
    } else {
        bl = false;
    }
    if (elem instanceof Array) {
        if (fn instanceof Array) {
            for (var i = 0; i < elem.length; i++) {
                for (var j = 0; j < fn.length; j++) {
                    if (elem[i] instanceof Element) {
                        elem[i].addEventListener(ev, fn[j], bl);
                    } else {
                        elem[i].container.addEventListener(ev, fn[j], bl);
                    }
                }
            }
        } else {
            for (var i = 0; i < elem.length; i++) {
                if (elem[i] instanceof Element) {
                    elem[i].addEventListener(ev, fn, bl);
                } else {
                    elem[i].container.addEventListener(ev, fn, bl);
                }
            }
        }
    } else {
        if (fn instanceof Array) {
            for (var i = 0; i < fn.length; i++) {
                if (elem instanceof Element) {
                    elem.addEventListener(ev, fn[i], bl);
                } else {
                    elem.container.addEventListener(ev, fn[i], bl);
                }
            }
        } else {
            if (elem instanceof Element) {
                elem.addEventListener(ev, fn, bl);
            } else {
                elem.container.addEventListener(ev, fn, bl);
            }
        }
    }
}
function c(tagName) {
    return document.createElement(tagName);
}
function c_svg(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
}
function g(id) {
    return document.getElementById(id);
}
function a(p, c) {
    if (c instanceof Array) {
        for (var i = 0; i < c.length; i++) {
            if (c[i] instanceof Element || c[i] instanceof Text) {
                if (p instanceof Element) {
                    p.appendChild(c[i]);
                } else {
                    p.container.appendChild(c[i]);
                }
            } else {
                if (p instanceof Element) {
                    p.appendChild(c[i].container);
                } else {
                    p.container.appendChild(c[i].container);
                }
            }
        }
    } else {
        if (c instanceof Element) {
            if (p instanceof Element) {
                p.appendChild(c);
            } else {
                p.container.appendChild(c);
            }
        } else {
            if (p instanceof Element) {
                p.appendChild(c.container);
            } else {
                p.container.appendChild(c.container);
            }
        }
    }
}
function stxt(c) {
    if (c instanceof Array) {
        for (var i in c) {
            c[i].select();
        }
    } else {
        c.select();
    }
}

function s(o, a, v) {
    o.setAttribute(a, v);
}
function sc(o, v) {
    s(o, 'class', v);
}
function st(o, v) {
    s(o, 'title', v);
}
function ss(o, a, v) {
    if (o instanceof Array) {
        for (var i = 0; i < o.length; i++) {
            o.style[a] = v;
        }
    } else {
        o.style[a] = v;
    }

}
function ct(m) {
    return document.createTextNode(m);
}
function cpc(t) {
    var ec = c('div');
    ec.classList.add('content');
    var ta = t.split('\n');
    for (var i in ta) {
        var ep = c('p');
        ep.innerHTML = ta[i];
        a(ec, ep);
    }
    return ec;
}
function cit(t, p) {
    var n = c('input');
    s(n, 'type', 'text');
    s(n, 'title', t);
    s(n, 'placeholder', p);
    return n;
}
function cta(t, r, c) {
    var n = c('textarea');
    s(n, 'title', t);
    s(n, 'rows', r);
    s(n, 'cols', c);
    return n;
}
function ca(t, h, txt) {
    var n = c('a');
    s(n, 'title', t);
    s(n, 'href', h);
    n.innerHTML = txt;
    return n;
}
function cb(t) {
    var n = c('button');
    s(n, 'type', 'button');
    n.innerHTML = t;
    return n;
}
function cd() {
    return c('div');
}
function mcd(elems) {
    for (var i = 0; i < elems.length; i++) {
        var elem = cd();
        elems.splice(i, 1, elem);
        console.log(elems[i]);
    }
}
function mc(elems, v) {
    for (var i = 0; i < elems.length; i++) {
        if (v.length !== 0) {
            if (v.length >= elems.length) {
                elems[i] = c(v[i]);
            } else {
                if (i < v.length) {
                    elems[i] = c(v[i]);
                } else {
                    elems[i] = c(v[v.length - 1]);
                }
            }
        } else {
            elems[i] = c(v);
        }
    }
}
function cnum(mn, mx, v, t) {
    var n = c('input');
    s(n, 'type', 'number');
    if (mn) {
        s(n, 'min', mn);
    }
    if (mx) {
        s(n, 'max', mx);
    }
    if (v) {
        s(n, 'value', v);
    }
    if (t) {
        s(n, 'title', t);
    }
    return n;
}
function cc(m) {
    var n = cd();
    s(n, 'class', 'mobile');
    return n;
}
function chd(m) {
    var n = cd();
    s(n, 'class', 'hd');
    n.innerHTML = m;
    return n;
}
function cs(r, t) {
    var n = c('select');
    s(n, 'title', t);
    for (var i in r) {
        var o = c('option');
        s(o, 'value', r[i]);
        o.innerHTML = i;
        a(n, o);
    }
    return n;
}
function cs1(r, t) {
    var n = c('select');
    s(n, 'title', t);
    for (var i in r) {
        var o = c('option');
        s(o, 'value', r[i][0]);
        o.innerHTML = r[i][1];
        a(n, o);
    }
    return n;
}
function cs1(r, t) {
    var n = c('select');
    s(n, 'title', t);
    for (var i in r) {
        var o = c('option');
        s(o, 'value', i);
        o.innerHTML = r[i];
        a(n, o);
    }
    return n;
}
function cchk(m) {
    var n = c('input');
    s(n, 'type', 'checkbox');
    s(n, 'title', m);
    return n;
}
function cconf() {
    var e = c('span');
    s(e, 'class', 'interactive util confirm');
    s(e, 'title', 'confirm');
    e.innerHTML = '[!]';
    return e;
}
function cfh() {
    var e = cd();
    s(e, 'class', 'fheader');
    return e;
}
function cfb() {
    var e = cd();
    s(e, 'class', 'fbody');
    return e;
}
function cff() {
    var e = cd();
    s(e, 'class', 'ffooter');
    return e;
}
function hide(n) {
    n.style.display = 'none';
}
function mt(n, inh) {
    var f = false;
    var m = c('ul');
    for (var i in inh) {
        var p = c('li');
        var p1 = c('li');
        for (var j in inh[i]) {
            if (inh[i][j] === 1) {
                var l = c('li');
                l.innerHTML = n[j];
                a(p1, l);
                f = true;
            }
        }
        p.innerHTML = n[i];
        a(m, p);
    }
    return m;
}
function clearCont(cont) {
    while (cont.hasChildNodes()) {
        cont.removeChild(cont.firstChild);
    }
}
function cleara(a) {
    while (a.length) {
        a.pop();
    }
}

function clearTmr(v) {
    if (v.tmr !== null) {
        window.clearTimeout(v.tmr);
        v.tmr = null;
    }
}

function eqa(a1, a2) {
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}
function eqo(a1, a2) {
    for (var i in a1) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
}
function cpo(o1, o2) {
    for (var attr in o2) {
        o1[attr] = o2[attr];
    }
}
function asc(a, b) {
    return a - b;
}
function desc(a, b) {
    return b - a;
}
function asca(n) {
    return function (a, b) {
        var v;
        if (n instanceof Array) {
            var i = 0;
            while (v === 0 && i < n.length) {
                v = a[n[i]] - b[n[i]];
                i++;
            }
        } else {
            v = a[n] - b[n];
        }
        return v;

    };
}
function desca(n) {
    return function (a, b) {
        return b[n] - a[n];
    };
}
function gmaxa2(a, n) {//get row with max n'th column
    if (a.length) {
        var m = a[0][n];
        for (var i = 0; i < a.length; i++) {
            if (a[i][n] > m) {
                m = a[i][n];
            }
        }
        return m;
    } else {
        return null;
    }
}

function cpa2(af, at) {//clones af[][] to at[][]
    cleara(at);
    for (var i = 0; i < af.length; i++) {
        var r = [];
        for (var j = 0; j < af[i].length; j++) {
            r.push(af[i][j]);
        }
        at.push(r);
    }
}
function cpa(af, at) {
    cleara(at);
    for (var i = 0; i < af.length; i++) {
        at.push(af[i]);
    }
}
function app2(d, s) {//append to d from s
    for (var i = 0; i < s.length; i++) {
        var r = [];
        for (var j = 0; j < s[i].length; j++) {
            r.push(s[i][j]);
        }
        d.push(r);
    }
}

function ts_to_ds(v, t) {
    var dt = new Date(v * 1000);
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    if (m < 10) {
        m = '0' + m;
    }
    var d = dt.getDate();
    if (d < 10) {
        d = '0' + d;
    }
    var adt = [y, m, d];
    return adt.join(t);
}

function is_int(x) {
    if (typeof x !== 'number') {
        return false;
    }
    var rx = Math.round(x);
    x = x + '';
    rx = rx + '';
    if (x !== rx) {
        return false;
    }
    return true;
}
function is_inta(arr, column) {
    if (column || column === 0) {
        for (var i in arr) {
            if (!is_int(arr[i][column])) {
                return false;
            }
        }
    } else {
        for (var i in arr) {
            if (!is_int(arr[i])) {
                return false;
            }
        }
    }
    return true;
}
function is_unique(arr, column) {
    if (arr.length === 1) {
        return true;
    }
    var arru = [];
    var i;
    if (column || column === 0) {
        for (i = 0; i < arr.length; i++) {
            arru.push(arr[i][column]);
        }
        for (i = 0; i < arr.length; i++) {
            arru.shift();
            if (arru.some(function (x) {
                return x === arr[i][column];
            })) {
                return false;
            }
        }
    } else {
        for (i = 0; i < arr.length; i++) {
            arru.push(arr[i]);
        }
        for (i = 0; i < arr.length; i++) {
            arru.shift();
            if (arru.some(function (x) {
                return x === arr[i];
            })) {
                return false;
            }
        }
    }
    return true;
}
function get_root(arr) {
    var f = false;
    for (var i = 0; i < arr.length; i++) {
        f = false;
        for (var j = 0; j < arr.length; j++) {
            if (arr[i][0] === arr[j][1]) {
                f = true;
                break;
            }
        }
        if (!f) {
            return i;
        }
    }
    return null;
}
function get_id(elem) {
    return parseInt(elem.id.split('_')[1]);
}
function get_cid(elem) {
    return parseInt(elem.cid.split('_')[1]);
}
function l() {
    console.log('-----------------------------------------------------------------');
    for (var i in arguments) {
        console.log(arguments[i]);
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function logp() {
    console.log("increment:", lgi++);
}
function limval(v, min, max) {
    if (v < min) {
        return min;
    }
    if (v > max) {
        return max;
    }
    return v;
}