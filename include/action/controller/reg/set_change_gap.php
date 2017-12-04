<?php

namespace controller\reg;

class set_change_gap {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI2List(ACP_CMD_REG_PROG_SET_CHANGE_GAP, $p['item']);
        \sock\suspend();
    }

}
