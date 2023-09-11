<?php declare(strict_types=1);

namespace App\Controller\Front;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class FrontController extends AbstractController
{
    #[Route("/")]
    public function index() {
        return $this->redirect("https://lilianaa.dev");
    }
}