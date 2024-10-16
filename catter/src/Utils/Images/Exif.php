<?php declare(strict_types=1);

namespace App\Utils\Images;

class Exif {
    public static function getExifData(string $filePath): ExifData|null
    {
        if (!file_exists($filePath)) {
            return null;
        }

        if (!@exif_imagetype($filePath)) {
            return null;
        }

        $exifData = @exif_read_data($filePath);

        if (!$exifData) {
            return null;
        }

        return ExifData::from($exifData);
    }
}