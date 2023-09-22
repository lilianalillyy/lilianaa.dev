<?php declare(strict_types=1);

namespace App\Controller\Admin\Cat;

use App\Entity\Cat\Cat;
use App\Entity\Cat\CatRepository;
use App\Entity\Tag\TagType;
use Doctrine\ORM\QueryBuilder;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;

class CatCrudController extends AbstractCrudController
{
    public function __construct(
        private CatRepository $cats
    ) {
    }

    public static function getEntityFqcn(): string
    {
        return Cat::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideWhenCreating()->setDisabled(),
            ImageField::new('image')
                ->hideWhenUpdating()
                ->setUploadDir("public/cats/")
                ->setBasePath("cats/")
                ->setUploadedFileNamePattern('cat_[year]_[month]_[day]-[contenthash].[extension]'),
            TextEditorField::new('content'),
            DateTimeField::new('date'),
            AssociationField::new('tags')
                ->hideOnIndex()
                ->setQueryBuilder(
                    fn(QueryBuilder $qb) => $qb->where("entity.type = ?0")->setParameters([TagType::ContentTag->value])
                ),
            AssociationField::new('catTags')
                ->hideOnIndex()
                ->setRequired(true)
                ->setQueryBuilder(
                    fn(QueryBuilder $qb) => $qb->where("entity.type = ?0")->setParameters([TagType::CatTag->value])
                )
                //->formatValue(fn ($val) => dd($val))
                ->setRequired(true),
            AssociationField::new('cameraTag')
                ->hideOnIndex()
                ->setQueryBuilder(
                    fn(QueryBuilder $qb) => $qb->where("entity.type = ?0")->setParameters([TagType::CameraTag->value])
                )
                ->setRequired(true)
        ];
    }

}