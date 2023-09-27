<?php declare(strict_types=1);

namespace App\Entity\Cat;

use App\Entity\EntityServiceInterface;
use App\Utils\Images;
use RuntimeException;

/**
 * @implements EntityServiceInterface<CatRepository>
 */
class CatService implements EntityServiceInterface
{
    public function __construct(
        private readonly CatRepository $repository,
    )
    {
    }

    public function getRepository(): CatRepository
    {
        return $this->repository;
    }

    public function getImageDir(): string
    {
        return realpath(__DIR__ . "/../../../public/" . Cat::PublicDir);
    }

    public function createThumbnail(Cat $cat): string
    {
        if (!($image = $cat->getImage())) {
            throw new RuntimeException("Missing image for Cat");
        }

        $imageDir = $this->getImageDir();
        $image = sprintf("%s/%s", $imageDir, $image);

        if (is_string($imagePath = pathinfo($image))) {
            throw new RuntimeException("Malformed image path");
        }

        $thumbnail = sprintf("%s/%s_thumb.%s", $imageDir, $imagePath["filename"], $imagePath["extension"]);

        Images::resizeImage($image, 400, 400, outPath: $thumbnail);

        return $thumbnail;
    }

}