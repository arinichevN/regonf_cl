<?php

namespace controller\program;

class start {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI1(ACP_CMD_START, $p['item']);
        \sock\suspend();
    }

}
