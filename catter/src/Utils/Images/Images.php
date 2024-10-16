<?php declare(strict_types=1);

namespace App\Utils\Images;

use Nette\Utils\Image;
use Imagick;

class Images {
    public static function resizeImage(string $path, int $maxWidth = 1300, ?int $maxHeight = null, bool $exact = false, ?string $outPath = null): string
    {
        $outPath = $outPath ?? $path;

        $image = Image::fromFile($path);
        $image->resize(
            min($image->getWidth(), $maxWidth),
            !$maxHeight ? null : min($image->getHeight(), $maxHeight),
            $exact ? Image::EXACT : Image::FIT
        );

        $image->save($outPath);

        return $outPath;
    }

    public static function stripImage(string $path, int $compressionQuality = 70, ?string $outPath = null): string
    {
        if (!class_exists(Imagick::class)) {
            trigger_error("Imagick is required for " . self::class . "::stripImage()", E_USER_WARNING);
        }

        $outPath = $outPath ?? $path;

        $im = new Imagick();
        $im->readImage($path);
        $im->setImageCompressionQuality($compressionQuality);
        $im->stripImage();
        $im->writeImage($outPath);
        $im->destroy();

        return $outPath;
    }

}