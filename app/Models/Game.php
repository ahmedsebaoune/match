<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable =[
        'id',
        'competition_id',
        'utcDate',
        'status',
        'matchday',
        'stage',
        'winner',
        'home_team_id',
        'away_team_id',
        'full_time_home_score',
        'full_time_away_score',
        'extra_time_home_score',
        'extra_time_away_score',
        'penalties_home_score',
        'penalties_away_score',
    ];
}
