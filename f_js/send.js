var $sq = [];
var $tmo = 4000;
function send(c, d, a) {
    var dest = window.location.protocol + '//' + window.location.host + window.location.pathname;
    var start = new Date();
    $sq.push([c, d, a, start, dest]);
    if ($sq.length === 1) {
        execute();
    }
}
function sendTo(c, d, a, dest) {
    var dest = window.location.protocol + '//' + window.location.host + window.location.pathname + dest + '.php';
    var start = new Date();
    $sq.push([c, d, a, start, dest]);
    if ($sq.length === 1) {
        execute();
    }
}
function execute() {
    var r = new XMLHttpRequest();
    r.timeout = 5000;
    var timedout = false;
    var timer = window.setTimeout(function () {
        timedout = true;
        r.abort();
        $sq[0][0].abort($sq[0][2], 'execute: timeout');
        donext();
    }, $tmo);
    r.onreadystatechange = function () {
        if (r.readyState === 4 && !timedout) {
            window.clearTimeout(timer);
            if (r.status === 200) {
                processResponse(r.responseText, $sq[0][2]);
            } else {
                processResponse('{"c_status":2,"message":"HTTP response status is not 200"}', $sq[0][2]);
            }

        }
    };
    //  r.timeout = 10000;
    r.open("POST", $sq[0][4], true);
    r.setRequestHeader('Content-Type', 'application/json');
    r.send(JSON.stringify($sq[0][1]));
}
function processResponse(r, action) {
    var finish = new Date();
    var diff = finish.getTime() - $sq[0][3].getTime();
    if (r !== '') {
        try {
            var d = JSON.parse(r);
        } catch (e) {
            $sq[0][0].abort(action, 'processResponse: can not parse json', diff);
            donext();
            return;
        }
        //c_status 0-error while action execution, 1-ok, 2-error before any action execution
        switch (d.c_status) {
            case 0:
            case 1:
                for (var i = 0; i < d.data.length; i++) {
                    if (d.status[i] === 1) {
                        $sq[0][0].confirm(action, d.data[i], i, diff);
                    } else {
                        $sq[0][0].abort(action, d.data[i], i, diff);
                    }
                }
                break;
            case 2:
                $sq[0][0].abort(action, d.message, diff);
                break;
            case 3:
                $sq[0][0].abort(action, d.message, diff);
                updateApp(d.message);
                break;
        }

    } else {
        $sq[0][0].abort(action, 'processResponse: response is empty', diff);
    }
    donext();
}
function donext() {
    $sq.shift();
    if ($sq.length !== 0) {
        execute();
    }
}

