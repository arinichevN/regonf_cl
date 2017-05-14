<?php

namespace controller\reg;

class get_data_runtime {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port']);
        \acp\sendPackI1(ACP_CMD_REGONF_PROG_GET_DATA_RUNTIME, $p['item']);
        $data = \acp\getRegonfDataRuntime();
        \sock\suspend();
        return $data;
    }

}
