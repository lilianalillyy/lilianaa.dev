<?php declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * @template T of EntityRepository
 */
interface EntityServiceInterface
{
    /**
     * @return T
     */
    public function getRepository(): EntityRepository;

}