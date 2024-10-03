<?php declare(strict_types=1);

namespace App\Command;

use App\Entity\Cat\CatService;
use App\Entity\Tag\TagRepository;
use App\Entity\Tag\TagType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;
use RuntimeException;

#[AsCommand(name: 'catter:cat:hide-by-cat-tag')]
class HideCatsByCatTag extends Command
{
    public function __construct(
        private readonly CatService $cats,
        private readonly TagRepository $tags,
        private readonly EntityManagerInterface $em,
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);

        $catTagQuestion = new Question('Enter a cat tag id');
        $catTagQuestion->setValidator(function ($value) {
            if (!is_numeric($value)) {
                throw new RuntimeException("Cat tag id must be a number");
            }

            return intval($value);
        });

        $catTagId = $io->askQuestion($catTagQuestion);
        $catTag = $this->tags->findOneBy([
            'id' => $catTagId,
            'type' => TagType::CatTag,
        ]);

        if (!$catTag) {
            $io->error(sprintf("Cat tag with id %d does not exist", $catTagId));
            return Command::INVALID;
        }

        $cats = $catTag->getCats()->toArray();

        foreach ($cats as $cat) {
            $cat->setHidden(true);
            $this->em->persist($cat);

            $io->info(sprintf("Cat with id %d was hidden", $cat->getId()));
        }

        $this->em->flush();

        $io->success("Done.");

        return Command::SUCCESS;
    }

}