<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230910232343 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cat (id INT AUTO_INCREMENT NOT NULL, cat_camera_tag INT DEFAULT NULL, cat_tag INT DEFAULT NULL, image VARCHAR(255) NOT NULL, content VARCHAR(255) DEFAULT NULL, INDEX IDX_9E5E43A850DE3C69 (cat_camera_tag), INDEX IDX_9E5E43A8876E6293 (cat_tag), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cat_content_tags (cat_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_3C58DBDE6ADA943 (cat_id), INDEX IDX_3C58DBDBAD26311 (tag_id), PRIMARY KEY(cat_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cat ADD CONSTRAINT FK_9E5E43A850DE3C69 FOREIGN KEY (cat_camera_tag) REFERENCES tag (id)');
        $this->addSql('ALTER TABLE cat ADD CONSTRAINT FK_9E5E43A8876E6293 FOREIGN KEY (cat_tag) REFERENCES tag (id)');
        $this->addSql('ALTER TABLE cat_content_tags ADD CONSTRAINT FK_3C58DBDE6ADA943 FOREIGN KEY (cat_id) REFERENCES cat (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cat_content_tags ADD CONSTRAINT FK_3C58DBDBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cat DROP FOREIGN KEY FK_9E5E43A850DE3C69');
        $this->addSql('ALTER TABLE cat DROP FOREIGN KEY FK_9E5E43A8876E6293');
        $this->addSql('ALTER TABLE cat_content_tags DROP FOREIGN KEY FK_3C58DBDE6ADA943');
        $this->addSql('ALTER TABLE cat_content_tags DROP FOREIGN KEY FK_3C58DBDBAD26311');
        $this->addSql('DROP TABLE cat');
        $this->addSql('DROP TABLE cat_content_tags');
    }
}
