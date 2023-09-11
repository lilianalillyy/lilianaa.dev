<?php declare(strict_types=1);

namespace App\Controller\Api\Cat;

use App\Entity\Cat\Cat;
use App\Entity\Cat\CatRepository;
use App\Entity\Tag\Tag;
use App\Entity\Tag\TagRepository;
use App\Entity\Tag\TagType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;

class CatController extends AbstractController {
    public const MaxPerPage = 20;

    public function __construct(
        private readonly CatRepository $cats,
        private readonly TagRepository $tags
    ) {}

    #[Route('/api/cat', name: 'app_api_cat_list')]
    public function list(#[MapQueryParameter] int $page = 1) {
        $page = (int) ($page < 1 ? 1 : $page);

        $cats = $this->cats->createQueryBuilder('c')
            ->setFirstResult(($page - 1) * self::MaxPerPage)
            ->setMaxResults(self::MaxPerPage)
            ->getQuery()
            ->getResult();

        return new JsonResponse([
            "success" => true,
            "data" => [
                "cats" => array_map(fn (Cat $cat) => $cat->toArray(), $cats)
            ],
        ]);
    }

    #[Route('/api/cat/tags', name: 'app_api_cat_tags')]
    public function tags() {
        $tags = $this->tags->findBy([
            "type" => TagType::CatTag
        ]);

        return new JsonResponse([
            "success" => true,
            "data" => [
                "tags" => array_map(fn (Tag $tag) => $tag->toArray(), $tags)
            ],
        ]);
    }

    #[Route('/api/cat/{id}', name: 'app_api_cat_view')]
    public function view(int $id) {
        $cat = $this->cats->find($id);
        
        if (!$cat) {
            return new JsonResponse([
                "success" => false,
                "error" => "Cat not found"
            ]);
        }

        return new JsonResponse([
            "success" => true,
            "data" => [
                "cat" => $cat->toArray()
            ],
        ]);
    }
}