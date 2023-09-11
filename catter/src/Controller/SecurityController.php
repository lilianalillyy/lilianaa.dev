<?php declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        # if ($this->getUser()) {
        #    return $this->redirectToRoute('app_admin_dashboard_index');
        #}

        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername, 
            'error' => $error,
            'page_title' => '<h1 style="margin-bottom: 2rem;">Catter</h1>',
            'target_path' => $this->generateUrl('app_admin_dashboard_index'),
            'username_label' => 'Your email',
            'username_parameter' => 'email',
            'password_parameter' => 'password',
            'remember_me_enabled' => true,
            'remember_me_parameter' => '_remember_me',
            'csrf_token_intention' => 'authenticate'
        ]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
