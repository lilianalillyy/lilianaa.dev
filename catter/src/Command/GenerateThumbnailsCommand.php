<?php declare(strict_types=1);

namespace App\Command;

use App\Entity\Cat\CatService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'catter:cat:generate-thumbnails')]
class GenerateThumbnailsCommand extends Command
{
    public function __construct(
        private readonly CatService $cats,
        private readonly EntityManagerInterface $em,
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);

        $all = $io->confirm("Regenerate all thumbnails?", false);

        $cats = $this->cats->getRepository()->findBy($all ? [] : ["thumbnail" => null]);

        foreach ($cats as $cat) {
            $cat->setThumbnail(str_replace($this->cats->getImageDir() . "/", "", $this->cats->createThumbnail($cat)));
            $this->em->persist($cat);
        }

        $this->em->flush();

        return Command::SUCCESS;
    }

}