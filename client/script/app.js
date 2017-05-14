var app = {
    ACTION: {
        CONTROLLER: {
            START: 1,
            STOP: 2,
            RESET: 3,
            EXIT: 4,
            PRINT: 5,
            GET_HELP: 6,
            GET_DATE: 7,
            GET_STATE: 8,
            EM: {
                GET_DATAA: 20,
                GET_DATA: 21,
                TURN_ON_H: 22,
                TURN_ON_C: 23,
                TURN_OFF_H: 24,
                TURN_OFF_C: 25
            },
            PROGRAM: {
                LOAD: 30,
                RESET: 31,
                START: 32,
                STOP: 33,
                GET_DATA_RUNTIME: 34,
                GET_DATA_INIT: 35,
            }
        },
        PROGRAM: {
            GETA: 40,
            SAVE_BUSY_TIME: 41,
            GETA_DESCRIPTION: 42
        },
        VALVE_PROG_GETA: 50
    },
    LIMIT: {
        GET_DATA: 3
    },
    NAME_SIZE: 32,
    controller_state: null,
    version: 1,
    controller_version: null,
    version_acceptable: {
        controller: [1],
        f_php: [2],
        f_js: [2]
    },
    init: function () {
        trans.setLang(1, ["english", "русский"]);
    },
    update: function () {
        this.sendU();
    },
    checkJsVersion: function () {
        var found = false;
        for (var i = 0; i < this.version_acceptable.f_js.length; i++) {
            if (this.version_acceptable.f_js[i] === f_js_version) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current f_js version: " + f_js_version + "\n";
            var s2 = "acceptable f_js versions: " + this.version_acceptable.f_js.join(" ") + "\n";
            alert("incompatible f_js version!\n" + s1 + s2);
        }
    },
    checkControllerVersion: function (v) {
        this.controller_version = v;
        var found = false;
        for (var i = 0; i < this.version_acceptable.controller.length; i++) {
            if (this.version_acceptable.controller[i] === v) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current controller version: " + this.controller_version + "\n";
            var s2 = "acceptable controller versions: " + this.version_acceptable.controller.join(" ") + "\n";
            alert("incompatible controller version!\n" + s1 + s2);
        }
    },
    sendControllerGetDate: function (slave) {
        var data = [
            {
                action: ['controller', 'get_date']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_DATE, 'json_udp_acp');
    },
    sendControllerGetState: function (slave) {
        var data = [
            {
                action: ['controller', 'get_state']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_STATE, 'json_udp_acp');
    },
    sendGetProgDataRuntime: function (slave, data) {
        var data = [
            {
                action: ['controller', 'program', 'get_data_runtime'],
                param: data
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.PROGRAM.GET_DATA_RUNTIME, 'json_udp_acp');
    },
    sendGetProgDataInit: function (slave, data) {
        var data = [
            {
                action: ['controller', 'program', 'get_data_init'],
                param: data
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.PROGRAM.GET_DATA_INIT, 'json_udp_acp');
    },
    sendGeta: function (slave) {
        var data = [
            {
                action: ['program', 'geta']
            }
        ];
        sendTo(slave, data, this.ACTION.PROGRAM.GETA, 'json_db');
    },
    sendGetaDescription: function (slave) {
        var data = [
            {
                action: ['program', 'geta_description']
            }
        ];
        sendTo(slave, data, this.ACTION.PROGRAM.GETA_DESCRIPTION, 'json_db');
    },
    sendProgSaveBusyTime: function (slave, d) {
        var data = [
            {
                action: ['program', 'save_busy_time'],
                param: d
            }
        ];
        sendTo(slave, data, this.ACTION.PROGRAM.SAVE_BUSY_TIME, 'json_db');
    },
    sendI1List: function (kind, slave, program_id_arr) {
        switch (kind) {
            case this.ACTION.CONTROLLER.PROGRAM.LOAD:
                var data = [
                    {
                        action: ['controller', 'program', 'load'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.PROGRAM.RESET:
                var data = [
                    {
                        action: ['controller', 'program', 'reset'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.PROGRAM.START:
                var data = [
                    {
                        action: ['controller', 'program', 'start'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.PROGRAM.STOP:
                var data = [
                    {
                        action: ['controller', 'program', 'stop'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_ON_H:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_on_h'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_ON_C:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_on_c'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_OFF_H:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_off_h'],
                        param: program_id_arr
                    }
                ];
                break;
            case this.ACTION.CONTROLLER.EM.TURN_OFF_C:
                var data = [
                    {
                        action: ['controller', 'em', 'turn_off_c'],
                        param: program_id_arr
                    }
                ];
                break;
        }
        sendTo(slave, data, kind, 'json_udp_acp');
    },
    sendValveProgGeta: function (slave) {
        var data = [
            {
                action: ['valve_prog_geta']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE_PROG_GETA, 'json_db');
    }
};
elem.push(app);
