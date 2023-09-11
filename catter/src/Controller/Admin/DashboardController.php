<?php declare(strict_types=1);

namespace App\Controller\Admin;

use App\Entity\Cat\CatRepository;
use App\Entity\Tag\Tag;
use App\Entity\Tag\TagRepository;
use App\Entity\User\User;
use App\Entity\Cat\Cat;
use App\Entity\User\UserRepository;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    public function __construct(
        private readonly UserRepository $users,
        private readonly TagRepository $tags,
        private readonly CatRepository $cats,
    ) {
    }

    #[Route('/admin')]
    public function index(): Response
    {
        return $this->render("admin/index.html.twig");
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Catter');
    }

    public function configureMenuItems(): iterable
    {
        return [
            MenuItem::linkToDashboard('Home', 'fa fa-home'),
            MenuItem::section('Content'),
            MenuItem::linkToCrud('Tags', 'fa fa-tag', Tag::class)
                ->setBadge($tagCount = $this->tags->count([]), $tagCount < 1 ? 'dark' : 'info'),
            MenuItem::linkToCrud('Cats', 'fa fa-cat', Cat::class)
                ->setBadge($catCount = $this->cats->count([]), $catCount < 1 ? 'dark' : 'info'),
            MenuItem::section('Users'),
            MenuItem::linkToCrud('Users', 'fa fa-user', User::class)
                ->setBadge($userCount = $this->users->count([]), $userCount < 1 ? 'dark' : 'info'),
        ];
    }


}