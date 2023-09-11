<?php declare(strict_types=1);

namespace App\Entity\Tag;

use App\Utils\Traits\FromName;

enum TagType: string
{
    use FromName;

    case CatTag = "cat_tag";

    case CameraTag = "camera_tag";
    
    case ContentTag = "content_tag";

    public function getDisplayText(): string
    {
        return match ($this) {
            self::CatTag => "Cat",
            self::CameraTag => "Camera Type",
            self::ContentTag => "Content"
        };
    }
}