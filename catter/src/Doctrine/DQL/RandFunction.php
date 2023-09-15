<?php declare(strict_types=1);

namespace App\Doctrine\DQL;

use Doctrine\ORM\Query\Lexer;
use Doctrine\ORM\Query\Parser;
use Doctrine\ORM\Query\SqlWalker;
use Doctrine\ORM\Query\AST\Functions\FunctionNode;

// The Doctrine developers are unwilling to implement one of very frequently
// used MySQL functions, well, fuck you.
class RandFunction extends FunctionNode
{
    public function getSql(SqlWalker $sqlWalker)
    {
        return 'RAND()';
    }

    public function parse(Parser $parser)
    {
        $parser->match(Lexer::T_IDENTIFIER);
        $parser->match(Lexer::T_OPEN_PARENTHESIS);
        $parser->match(Lexer::T_CLOSE_PARENTHESIS);
    }
}