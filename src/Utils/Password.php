<?php
    namespace AltayPereira\Ingresso\Utils;

    class Password
    {
        public static function hash(string $password): string
        {
            return hash('sha256', $password . sha1($password) . md5($password));
        }

        public static function verify(string $password, string $hash): bool
        {
            return self::hash($password) === $hash;
        }
    
    
    }