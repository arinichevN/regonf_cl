<?php

namespace controller\reg;

class enable {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI1(ACP_CMD_REGONF_PROG_ENABLE, $p['item']);
        \sock\suspend();
    }

}
