<?php

namespace controller\program;

class disable {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\requestSendI1List(ACP_CMD_PROG_DISABLE, $p['item']);
        \sock\suspend();
    }

}
