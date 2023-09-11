<?php declare(strict_types=1);

namespace App\Utils\Traits;

use ReflectionEnum;

trait FromName
{
    public static function tryFromName(string $name): ?static
    {
        $reflection = new ReflectionEnum(static::class);

        return $reflection->hasCase($name)
            ? $reflection->getCase($name)->getValue()
            : null;
    }

}