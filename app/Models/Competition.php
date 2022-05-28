<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{

    protected $fillable = [
        'id',
        'name',
        'name_country',
        'id_country',
        'logo_country',
        'logo',
        'currentMatchday'
    ];
    use HasFactory;
}
