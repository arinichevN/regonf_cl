<?php

namespace controller\reg;

class set_power_heater {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1F1List(ACP_CMD_REG_PROG_SET_HEATER_POWER, $p['item']);
        \sock\suspend();
    }

}
