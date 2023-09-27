<?php declare(strict_types=1);

namespace App\EventListener;

use App\Entity\Cat\Cat;
use App\Entity\Cat\CatService;
use App\Utils\Images;
use EasyCorp\Bundle\EasyAdminBundle\Event\AbstractLifecycleEvent;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityUpdatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: BeforeEntityPersistedEvent::class)]
#[AsEventListener(event: BeforeEntityUpdatedEvent::class)]
readonly class CatPersistListener
{
    public function __construct(
        private CatService $cats,
    )
    {
    }

    public function __invoke(AbstractLifecycleEvent $event): void
    {
        $entity = $event->getEntityInstance();

        if (!($entity instanceof Cat) || empty($entity->getImage()) || !empty($entity->getThumbnail())) {
            return;
        }

        $imageDir = $this->cats->getImageDir();

        $image = sprintf("%s/%s", $imageDir, $entity->getImage());

        if (!file_exists($image)) {
            trigger_error("Missing image: $image");
        }

        Images::stripImage($image);

        $entity->setThumbnail(str_replace($imageDir . "/", "", $this->cats->createThumbnail($entity)));
    }
}