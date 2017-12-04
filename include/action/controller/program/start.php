<?php

namespace controller\program;

class start {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1List(ACP_CMD_PROG_START, $p['item']);
        \sock\suspend();
    }

}
