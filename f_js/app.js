window.onload = init;
var VISU_TYPE = {TOP: 1, DIAL: 2, MAIN: 3};
var visu = [];
var elem = [];
var light_timer = null;
var night = false;
var visu_queue = [];
var INT32_MAX = 2147483647;
var INT32_MIN = -2147483648;
var UINT32_MAX = 4294967295;
function init() {
    for (var i = 0; i < elem.length; i++) {
        elem[i].init();
    }
    for (var i = 0; i < visu.length; i++) {
        visu[i].init();
        visu[i].updateStr();
        // document.body.style.height=window.innerHeight + "px";
        a(document.body, visu[i].container);
    }
    updateAllStr();
//    window.onclick = function () {
//        enlight();
//    };
//    enlight();
    showMain();
}
function updateAllStr() {
    for (var i = 0; i < visu.length; i++) {
        visu[i].updateStr();
    }
}

function enlight() {
    if (night) {
        goBack();
    }
    if (light_timer !== null) {
        window.clearTimeout(light_timer);
    }
    light_timer = window.setTimeout(function () {
        putOut();
    }, 5000000);
    night = false;
}
function putOut() {
    if (typeof vnight !== "undefined") {
        showV(vnight);
        night = true;
    }
}

function showV(v) {
    if (visu_queue.length) {
        visu_queue[visu_queue.length - 1].hide();
    }
    visu_queue.push(v);
    v.show();
}
function goBack() {
    if (visu_queue.length) {
        if (visu_queue.length - 1 > 0) {
            visu_queue[visu_queue.length - 1].hide();
            if (visu_queue[visu_queue.length - 1].type === VISU_TYPE.DIAL) {
                visu_queue.pop();
            } else {
                while (1) {
                    visu_queue.pop();
                    if (visu_queue.length === 0 || visu_queue[visu_queue.length - 1].type === VISU_TYPE.TOP || visu_queue[visu_queue.length - 1].type === VISU_TYPE.MAIN) {
                        break;
                    }
                }
            }
            visu_queue[visu_queue.length - 1].show();
        } else {
            window.history.back();
        }
    }
}
function showMain() {
    for (var i = 0; i < visu.length; i++) {
        if (visu[i].type === VISU_TYPE.MAIN) {
            showV(visu[i]);
        }
    }
}
function updateApp(message) {//called by send when data changed on server by someone else
    if (app) {
        logger.ntf(46);
        app.update();
    }
}