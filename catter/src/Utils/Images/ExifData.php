<?php declare(strict_types=1);

namespace App\Utils\Images;

use DateTimeInterface;
use DateTime;

class ExifData {
    public function __construct(
        public readonly string|null $fileName,
        public readonly int|null $fileSize,
        public readonly DateTimeInterface|null $createdAt,
        public readonly string|null $mimeType,
    ) {
    }

    public static function from(array $exifData) {
        $date = $exifData['DateTimeOriginal'] ?? $exifData['FileDateTime'] ?? null;
        return new self(
            fileName: $exifData["FileName"] ?? null, 
            fileSize: $exifData["FileSize"] ?? null,
            createdAt: $date ? DateTime::createFromFormat('U', strval($date)) : null,
            mimeType: $exifData["MimeType"] ?? null,
        );
    }
}