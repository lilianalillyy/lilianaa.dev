<?php

namespace App\Controller\Admin\User;

use App\Entity\User\User;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserCrudController extends AbstractCrudController
{
    public function __construct(
        private readonly UserPasswordHasherInterface $hasher
    ) {}

    public static function getEntityFqcn(): string
    {
        return User::class;
    }
    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->setDisabled(true)->hideWhenCreating(),
            EmailField::new('email'),
            TextField::new('password')
                ->setFormType(PasswordType::class)
                ->onlyOnForms()
                ->onlyWhenCreating(),
            ChoiceField::new('roles', 'Roles')
                ->allowMultipleChoices()
                ->autocomplete()
                ->setChoices([
                    "User" => User::UserRole,
                    "Admin" => User::AdminRole,
                ])
        ];
    }

    public function persistEntity(EntityManagerInterface $em, $entityInstance): void
    {
        assert($entityInstance instanceof User);

        $entityInstance->setPassword(
            $this->hasher->hashPassword($entityInstance, $entityInstance->getPassword())
        );

        parent::persistEntity($em, $entityInstance);
    }
    
}
