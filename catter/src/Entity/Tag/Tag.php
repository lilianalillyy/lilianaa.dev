<?php declare(strict_types=1);

namespace App\Entity\Tag;

use App\Entity\Cat\Cat;
use App\Entity\Tag\TagType;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TagRepository::class)]
class Tag
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(enumType: TagType::class, nullable: false)]

    private ?TagType $type = null;

    #[ORM\Column(nullable: false)]
    private ?string $content = null;

    #[ORM\Column(nullable: true)]
    private ?string $exifMake = null;

    #[ORM\Column(nullable: true)]
    private ?string $exifModel = null;

    /**
     * @var Collection<int, Cat>
     */
    #[ORM\ManyToMany(targetEntity: Cat::class, mappedBy: 'tags')]
    private Collection $taggedCats;

    /**
     * For CatTags only
     * @var Collection<int, Cat>
     */
    #[ORM\ManyToMany(targetEntity: Cat::class, mappedBy: 'catTags')]
    private Collection $cats;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?TagType
    {
        return $this->type;
    }

    public function setType(TagType $type): void
    {
        $this->type = $type;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    public function getExifMake(): ?string 
    {
        return $this->exifMake;
    }

    public function setExifMake(?string $exifMake): void
    {
        $this->exifMake = $exifMake;
    }

    public function getExifModel(): ?string
    {
        return $this->exifModel;
    }

    public function setExifModel(?string $exifModel): void
    {
        $this->exifModel = $exifModel;
    }

    public function getTaggedCats(): Collection
    {
        return $this->taggedCats;
    }

    public function getCats(): Collection
    {
        return $this->cats;
    }

    public function __toString(): string
    {
        return sprintf("#%s: %s", $this->getId(), $this->getContent());
    }

    public function toArray(): array
    {
        $specificData = [];

        if ($this->getType() === TagType::CameraTag) {
            $specificData["exif"] = [
                "make" => $this->getExifMake(),
                "model" => $this->getExifModel(),
            ];
        }

        return [
            "id" => $this->getId(),
            "type" => $this->getType()->value,
            "content" => $this->getContent(),
            ...$specificData,
        ];
    }

}