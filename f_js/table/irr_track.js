//time track table
function TimeGraphRow() {
    this.canvas = null;
    this.svg_width = 0;
    this.need_next = false;
    this.start_time = 0;
    this.current_state = 0;
}
function TTTable(slave, id, trlt) {//n:[name]
    var self = this;
    this.id = id;
    this.slave = slave;
    this.trlt = trlt;
    this.active = false;
    this.data = []; // [[id, time, state],
    this.container = cd();
    this.scale = 1;//1 || 60 || 3600
    this.row = [];
    cla(this.container, "svg_cont");
    this.show = function (id) {
        clearCont(this.container);
        a(this.container, this.row[id].canvas);
    };
    this.reset = function (n) {
        this.clear();
        for (var i = 0; i < n; i++) {
            var r = new TimeGraphRow();
            this.row.push(r);
        }
        for (var i = 0; i < n; i++) {
            this.row[i].canvas = c_svg("svg:svg");
            ss(this.row[i].canvas, "height", "30px");
            ss(this.row[i].canvas, "width", "0px");
        }
    };
    this.track = function (d) {//time should be after one already printed
        d.sort(asca(1));
        this.draw(d);
        app2(this.data, d);
    };
    this.draw = function (data) {
        var diff = null;
        for (var i = 0; i < this.row.length; i++) {
            diff = 0;
            for (var j = 0; j < data.length; j++) {
                if (i === data[j][0]) {
                    if (this.row[i].need_next) {
                        diff = parseInt((data[j][1] - this.row[i].start_time) / this.scale);
                        console.log("diff: ", diff);
                        if (diff > 0) {
                            var l = this.cHLine(this.row[i].svg_width, diff, this.row[i].current_state);
                            a(this.row[i].canvas, l);
                        }
                        this.row[i].svg_width += diff;
                        this.row[i].need_next = false;
                    } else {
                        this.row[i].need_next = true;
                    }
                    this.row[i].start_time = data[j][1];
                    this.row[i].current_state = data[j][2];
                }
            }
            ss(this.row[i].canvas, "width", this.row[i].svg_width + "px");
            this.drawTimeLegend();
        }
        this.drawTimeLegend(data);
    };

    this.drawTimeLegend = function () {
        for (var i = 0; i < this.row.length; i++) {
            for (var j = 0; j < this.row[i][4]; j += 60) {
                var l = this.cVLine(j);
                a(this.row.canvas, l);
            }
        }
    };
    this.cText = function (start, text) {
        var elem = c_svg("text");
        s(elem, "x", start);
        s(elem, "y", 15);
        s(elem, "fill", "black");
        elem.innerHTML = text;
        return elem;
    };
    this.cHLine = function (start, length, state) {
        var elem = c_svg("line");
        s(elem, "x1", start);
        s(elem, "y1", "30");
        s(elem, "x2", start + length);
        s(elem, "y2", "30");
        switch (state) {
            case 0:
                cla(elem, "svg_s0");
                break;
            case 1:
                cla(elem, "svg_s1");
                break;

        }
        return elem;
    };
    this.cVLine = function (start) {
        var elem = c_svg("line");
        s(elem, "x1", start);
        s(elem, "y1", "30");
        s(elem, "x2", start);
        s(elem, "y2", "0");
        cla(elem, "svg_s3");
        return elem;
    };
    this.getMaxTime = function () {
        return gmaxa2(this.data, 1);
    };
    this.sort = function () {
        this.data.sort(asca(1));
    };


    this.deleteRow = function (r) {
        this.tt.removeChild(this.r[r]);
        this.r.splice(r, 1);
        this.c.splice(r, 1);
        this.mc.splice(r, 1);
    };
    this.updateCell = function (v) {
        this.c[this.sr][this.sc].innerHTML = v;
    };
    this.clear = function () {
        clearCont(this.container);
        cleara(this.data);
        cleara(this.row);
    };
    this.updateHeader = function () {
        ;
    };
    this.setFirstColWidth = function (v) {
        for (var i = 0; i < this.row.length; i++) {
            ss(this.row[i].name_elem, "width", v);
        }
    };
}


