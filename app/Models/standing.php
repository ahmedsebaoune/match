<?php

namespace App\Models;

use App\Models\Traits\HasCompositePrimaryKeyTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Standing extends Model
{
    use HasFactory, HasCompositePrimaryKeyTrait;
    protected $primaryKey = ['competition_id','group_id','position'];
    protected $fillable = [
        'competition_id',
        'team_id',
        'currentMatchday',
        'group_id',
        'position',
        'playedGames',
        'won',
        'draw',
        'points',
        'goalsFor',
        'goalsAgainst',
        'goalDifference',
    ];
}
