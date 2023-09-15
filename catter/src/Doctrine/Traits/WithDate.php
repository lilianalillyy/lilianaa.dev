<?php declare(strict_types=1);

namespace App\Doctrine\Traits;

use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

trait WithDate
{
  #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: false, options: ["default" => "CURRENT_TIMESTAMP"])]
  private DateTime $date;

  public function getDate(): DateTime
  {
    return $this->date;
  }

  public function setDate(DateTime $date): self
  {
    $this->date = $date;
    return $this;
  }

  /**
   * @internal
   */
  #[ORM\PrePersist]
  public function addCreatedTimestamp(): void
  {
      if (empty($this->date)) {
          $this->date = new DateTime();
      }
  }
}
