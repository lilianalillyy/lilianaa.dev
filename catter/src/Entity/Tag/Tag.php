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

    /**
     * Many Groups have Many Users.
     * @var Collection<int, Cat>
     */
    #[ORM\ManyToMany(targetEntity: Cat::class, mappedBy: 'tags')]
    private Collection $users;

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

    public function __toString(): string
    {
        return sprintf("#%s: %s", $this->getId(), $this->getContent());
    }

    public function toArray(): array
    {
        return [
            "id" => $this->getId(),
            "type" => $this->getType()->value,
            "content" => $this->getContent()
        ];
    }

}