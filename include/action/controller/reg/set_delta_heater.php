<?php

namespace controller\reg;

class set_delta_heater {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1F1List(ACP_CMD_REGONF_PROG_SET_HEATER_DELTA, $p['item']);
        \sock\suspend();
    }

}
