<?php

namespace controller\program;

class stop {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1List(ACP_CMD_PROG_STOP, $p['item']);
        \sock\suspend();
    }

}
