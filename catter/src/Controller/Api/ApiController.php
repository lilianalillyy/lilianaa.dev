<?php declare(strict_types=1);

namespace App\Controller\Api;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends AbstractController {
    public function ok(mixed $data): JsonResponse
    {
        return $this->json([
            "success" => true,
            "data" => $data
        ]);
    }

    public function error(string $error): JsonResponse
    {
        return $this->json([
            "success" => false,
            "error" => $error
        ]);
    }
    
}