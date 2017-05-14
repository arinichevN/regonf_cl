var ACP = {
    BUF_SIZE: 508,
    CMD: {
        APP_START: '+',
        APP_STOP: '-',
        APP_EXIT: '*',
        APP_RESET: '&',
        APP_PING: '~',
        APP_HELP: '?',
        APP_PRINT: '@',
        APP_NO: '_',
        GET_FTS: 'a',
        GET_INT: 'b',
        LOG_START: 'c',
        LOG_STOP: 'd',
        SET_FLOAT: 'e',
        SET_INT: 'f',
        SET_DUTY_CYCLE_PWM: 'g',
        SET_DUTY_CYCLE_PM: 'h',
        SET_PWM_PERIOD: 'i',
        SET_PM_DUTY_TIME_MIN: 'j',
        SET_PM_IDLE_TIME_MIN: 'k',
        STOP: 'l',
        START: 'm',
        RESET: 'n',
        IRG_VALVE_TURN_ON: 'o',
        IRG_VALVE_TURN_OFF: 'p',
        IRG_VALVE_GET_DATA: 'q',
        IRG_GET_TIME: 'r'
    },
    QUANTIFIER: {
        ACP_QUANTIFIER_BROADCAST: '!',
        ACP_QUANTIFIER_SPECIFIC: '.'
    },
    RESP: {
        REQUEST_FAILED: "F",
        REQUEST_SUCCEEDED: "T",
        REQUEST_SUCCEEDED_PARTIAL: "P",
        RESULT_UNKNOWN: "R",
        COMMAND_UNKNOWN: "U",
        QUANTIFIER_UNKNOWN: "Q",
        CRC_ERROR: "C",
        BUF_OVERFLOW: "O",
        APP_BUSY: "B",
        APP_IDLE: "I"
    }
};

