<?php

namespace controller\reg;

class set_em_mode {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI1S1(ACP_CMD_REGONF_PROG_SET_EM_MODE, $p['item']);
        \sock\suspend();
    }

}
