<?php

namespace controller\reg;

class set_delta_cooler {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1F1List(ACP_CMD_REGONF_PROG_SET_COOLER_DELTA, $p['item']);
        \sock\suspend();
    }

}
