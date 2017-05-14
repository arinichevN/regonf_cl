<?php

namespace controller;

class ping {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackBroadcast(ACP_CMD_APP_PING);
        $data= \acp\getBufParseStateData();
        \sock\suspend();
        return $data;
    }

}
