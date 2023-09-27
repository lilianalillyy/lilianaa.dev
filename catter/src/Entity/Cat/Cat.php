<?php declare(strict_types=1);

namespace App\Entity\Cat;

use App\Doctrine\Traits\WithDate;
use App\Entity\Tag\Tag;
use App\Entity\Tag\TagType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use RuntimeException;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;

#[ORM\Entity(repositoryClass: CatRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Cat
{
    public const PublicDir = "/cats";

    use WithDate;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: false)]

    private ?string $image = null;

    #[ORM\Column(nullable: true)]

    private ?string $thumbnail = null;

    #[ORM\Column(nullable: true)]
    private ?string $content = null;

    /**
     * @return Collection<int, Tag>
     */
    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'taggedCats')]
    #[ORM\JoinTable(name: 'cat_content_tags')]
    private ?Collection $tags = null;

    #[ORM\ManyToOne(targetEntity: Tag::class)]
    #[ORM\JoinColumn(name: 'cat_camera_tag', referencedColumnName: 'id')]
    private ?Tag $cameraTag = null;

    /**
     * @return Collection<int, Tag>
     */
    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'cats')]
    #[ORM\JoinTable(name: 'cat_tag')]
    private ?Collection $catTags = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function getTags(): array
    {
        return $this->tags?->toArray() ?? [];
    }

    /**
     * @param Tag[]|Collection<int, Tag> $tags
     */
    public function setTags(array|Collection $tags): void
    {
        $this->validateTagCollection($tags, TagType::ContentTag);

        $this->tags = $tags instanceof Collection ? $tags : new ArrayCollection($tags);
    }

    public function getCameraTag(): ?Tag
    {
        return $this->cameraTag;
    }

    public function setCameraTag(Tag $cameraTag): void
    {
        if ($cameraTag->getType() !== TagType::CameraTag) {
            throw new RuntimeException("Attempting to use a non-camera tag for Cat::cameraTag");
        }

        $this->cameraTag = $cameraTag;
    }

    public function getCatTags(): ?Collection
    {
        return $this->catTags;
    }

    public function setCatTags(array|Collection $catTags): void
    {
        $this->validateTagCollection($catTags, TagType::CatTag);

        $this->catTags = $catTags instanceof Collection ? $catTags : new ArrayCollection($catTags);
    }

    public function setImage(string $image): void
    {;
        if ($this->image && $this->image !== $image) {
            $this->removeImageFile($image);
            $this->setThumbnail(null);
        }

        $this->image = $image;

    }

    /**
     * @param string|null $thumbnail
     */
    public function setThumbnail(/* string */?string $thumbnail): void
    {
        if ($this->thumbnail && $this->thumbnail !== $thumbnail) {
            $this->removeImageFile($this->thumbnail);
        }

        $this->thumbnail = $thumbnail;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): void
    {
        $this->content = $content;
    }

    private function validateTagCollection(array|Collection $tags, TagType $type): void
    {
        foreach ($tags as $tag) {
            if (!($tag instanceof Tag)) {
                throw new RuntimeException("Array or Collection contains non-Tag items");
            }

            if ($tag->getType() !== $type) {
                throw new RuntimeException(sprintf("Attempting to pass Tag of type %s while expecting type %s", $tag->getType()->value, $type->value));
            }
        }
    }

    private function removeImageFile(string $file): void
    {
        $file = realpath(sprintf("%s/../../../public%s/%s", __DIR__, self::PublicDir, $file));
        try {
            if ($file) {
                (new Filesystem())->remove($file);
            }
        } catch (IOException) {}
    }

    public function toArray(): array
    {
        $catTags = $this->getCatTags()->toArray();

        return [
            "id" => $this->getId(),
            "image_url" => $this->getImage() ? ("/cats/" . $this->getImage()) : "/404.jpg",
            "thumbnail_url" => $this->getThumbnail() ? ("/cats/" . $this->getThumbnail()) : null,
            "cat_tags" => array_map(fn(Tag $tag) => $tag->toArray(), $catTags),
            "content" => $this->getContent(),
            "page_title" => 
                substr(
                    strip_tags(
                        $content = ($this->getContent() ?? implode(", ", array_map(fn(Tag $tag) => $tag->getContent(), $catTags)))
                    ), 0, 30
                ) . strlen($content > 30 && $this->getContent() ? "..." : ""),
            "date" => $this->getDate(),
            "camera_tag" => $this->getCameraTag()->toArray(),
            "tags" => array_map(fn(Tag $tag) => $tag->toArray(), $this->getTags()),
        ];
    }

}