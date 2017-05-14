<?php

namespace controller\reg;

class set_change_gap {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI2(ACP_CMD_REGONF_PROG_SET_CHANGE_GAP, $p['item']);
        \sock\suspend();
    }

}
