<?php

namespace App\Http\Controllers;

class Responser 
{
    public static function info($status = false, $message = "", $data = null)
    {
        return [
            "status"  =>  $status, 
            "message" => $message, 
            "data" => $data
        ];
    }
}

