<?php

namespace App\Controller\Admin\Tag;

use App\Entity\Tag\Tag;
use App\Entity\Tag\TagType;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Translation\TranslatableChoiceMessageCollection;
use Symfony\Component\Form\Extension\Core\Type\EnumType;

class TagCrudController extends AbstractCrudController
{
    public function __construct(
    ) {
    }

    public static function getEntityFqcn(): string
    {
        return Tag::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->setDisabled(true)->hideWhenCreating(),

            TextField::new('content'),

            ChoiceField::new('type', 'Tag type')
                ->allowMultipleChoices(false)
                ->setFormType(EnumType::class)
                // dumb hackaround for formatting choices out of form
                ->formatValue(fn (string $choices) => implode(
                    ", ",
                    array_map(
                        fn (string $type) => (TagType::tryFromName($type))?->getDisplayText() ?? $type, 
                        explode(", ", $choices)
                    )
                ))
                ->setFormTypeOption('class', TagType::class)
                ->setFormTypeOption('choice_label', fn(TagType|string $value) => ($value instanceof TagType ? $value : TagType::tryFrom($value))?->getDisplayText() ?? $value)
                ->setFormTypeOption('choice_value', fn (TagType|string|null $type) => ($type ? ($type instanceof TagType ? $type->value : $type) : "-"))
                ->setFormTypeOption('setter', function (Tag $entity, TagType|string $value): void {
                    $entity->setType($value instanceof TagType ? $value : TagType::from($value));
                })
                ->autocomplete()
        ];
    }

}