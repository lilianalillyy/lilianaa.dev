<?php declare(strict_types=1);

namespace App\Controller\Api\Cat;

use App\Controller\Api\ApiController;
use App\Entity\Cat\Cat;
use App\Entity\Cat\CatRepository;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Annotation\Route;

class CatController extends ApiController
{
    public const MaxPerPage = 20;

    public function __construct(
        private readonly CatRepository $cats,
    ) {
    }

    #[Route('/api/cat', name: 'app_api_cat_list')]
    public function list(
    #[MapQueryParameter] int $page = 1,
    #[MapQueryParameter] array $catTags = [],
    #[MapQueryParameter] array $cameraTags = [],
    #[MapQueryParameter] array $contentTags = []
    ) {
        $page = (int) ($page < 1 ? 1 : $page);

        $qb = $this->cats
            ->createQueryBuilder('c')
            ->setFirstResult(($page - 1) * self::MaxPerPage)
            ->setMaxResults(self::MaxPerPage)
            ->orderBy('c.date', 'DESC');

        if (!empty($catTags = $this->createIntArray($catTags))) {
            $qb
                ->join('c.catTag', 'cat')
                ->andWhere('cat.id IN (:catTags)')
                ->setParameter('catTags', $catTags);
        }

        if (!empty($cameraTags = $this->createIntArray($cameraTags))) {
            $qb
                ->join('c.cameraTag', 'camera')
                ->andWhere('camera.id IN (:cameraTags)')
                ->setParameter('cameraTags', $cameraTags);
        }

        if (!empty($contentTags = $this->createIntArray($contentTags))) {
            $qb
                ->join('c.tags', 'tags')
                ->andWhere('tags.id IN (:contentTags)')
                ->setParameter('contentTags', $contentTags);
        }

        $cats = $qb->getQuery()->getResult();

        return $this->ok([
            "cats" => array_map(fn(Cat $cat) => $cat->toArray(), $cats),
        ]);
    }

    #[Route('/api/cat/random', name: 'app_api_cat_random')]
    public function random(#[MapQueryParameter] ?int $catTagId = null, #[MapQueryParameter] bool $idOnly = false)
    {
        $qb = $this->cats->createQueryBuilder('c')
            ->select($idOnly ? "c.id" : "c")
            ->addOrderBy('RAND()')
            ->setMaxResults(1);

        if ($catTagId) {
            $qb->where("c.catTag = :catTagId")
                ->setParameter("catTagId", $catTagId);
        }

        $cat = $qb->getQuery()
            ->getOneOrNullResult();

        if (!$cat) {
            return $this->error("Cat not found");
        }

        return $this->ok([
            "cat" => $cat instanceof Cat ? $cat->toArray() : $cat["id"]
        ]);
    }

    #[Route('/api/cat/{id}', name: 'app_api_cat_view')]
    public function view(int $id)
    {
        if (!($cat = $this->cats->find($id))) {
            return $this->error("Cat not found");
        }

        return $this->ok([
            "cat" => $cat->toArray()
        ]);
    }

    /**
     * @internal
     * @return int[]
     */
    private function createIntArray(array $array): array
    {
        return empty($array) ? [] : array_map(fn(string $v) => intval($v), array_filter($array, is_numeric(...)));
    }
}