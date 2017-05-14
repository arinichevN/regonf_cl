<?php

namespace controller\reg;

class set_goal {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI1F1(ACP_CMD_REGONF_PROG_SET_GOAL, $p['item']);
        \sock\suspend();
    }

}
