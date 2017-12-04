<?php

namespace controller\program;

class get_data_init {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        $id=\acp\requestSendI1List(ACP_CMD_PROG_GET_DATA_INIT, $p['item']);
        $data = \acp\getRegonfDataInit($id);
        \sock\suspend();
        return $data;
    }

}
