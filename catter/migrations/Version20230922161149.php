<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230922161149 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cat_tag (cat_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_876E6293E6ADA943 (cat_id), INDEX IDX_876E6293BAD26311 (tag_id), PRIMARY KEY(cat_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cat_tag ADD CONSTRAINT FK_876E6293E6ADA943 FOREIGN KEY (cat_id) REFERENCES cat (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cat_tag ADD CONSTRAINT FK_876E6293BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cat DROP FOREIGN KEY FK_9E5E43A8876E6293');
        $this->addSql('DROP INDEX IDX_9E5E43A8876E6293 ON cat');
        $this->addSql('ALTER TABLE cat DROP cat_tag');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cat_tag DROP FOREIGN KEY FK_876E6293E6ADA943');
        $this->addSql('ALTER TABLE cat_tag DROP FOREIGN KEY FK_876E6293BAD26311');
        $this->addSql('DROP TABLE cat_tag');
        $this->addSql('ALTER TABLE cat ADD cat_tag INT DEFAULT NULL');
        $this->addSql('ALTER TABLE cat ADD CONSTRAINT FK_9E5E43A8876E6293 FOREIGN KEY (cat_tag) REFERENCES tag (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_9E5E43A8876E6293 ON cat (cat_tag)');
    }
}
