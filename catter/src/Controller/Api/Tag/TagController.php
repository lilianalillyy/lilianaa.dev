<?php declare(strict_types=1);

namespace App\Controller\Api\Tag;

use App\Controller\Api\ApiController;
use App\Entity\Tag\TagRepository;
use App\Entity\Tag\TagType;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;

class TagController extends ApiController {
    public function __construct(
        private readonly TagRepository $tags
    ) {}

    #[Route('/api/tag/types', name: 'app_api_tag_types')]
    public function tags() {
        return $this->ok([
            "types" => array_map(fn (TagType $type) => $type->value, TagType::cases())
        ]);
    }

    #[Route('/api/tag', name: 'app_api_tag_list')]
    public function list(#[MapQueryParameter] ?string $type = null) {
        if ($type && !($type = TagType::tryFrom($type))) {
            return $this->error("Invalid tag type");
        }

        $tags = $this->tags->findBy($type ? ["type" => $type] : []);

        return $this->ok([
            "tags" => $tags
        ]);
    }

    #[Route('/api/tag/{id}', name: 'app_api_tag_view')]
    public function view(int $id) {
        if (!($tag = $this->tags->find($id))) {
            return $this->error("Tag not found");
        }

        return $this->ok([
            "tag" => $tag
        ]);
    }

}