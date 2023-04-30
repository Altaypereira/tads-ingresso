<?php
    namespace AltayPereira\Ingresso\Utils;
    

    class Token
    {
        public static function generate($data)
        {
            $hash = "";
            foreach ($data as $key => $value) {
                $hash .= "\$;" . sha1($value) . md5($value) . $key . uniqid();
            }
            return hash('adler32', $hash);
        }
    
    
    }