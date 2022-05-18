<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    //
    public function show()
    {
        return Inertia::render('Home',[
            "response" => Competition::get()->toJson(),
        ]);
    }
    public function queryCompetetion()
    {
        $competitions = Competition::where()->get();
        foreach ($competitions as $competition)
        {
            $response = Http::withHeaders([
                'X-Auth-Token' => '64f44c5bd39a456ab4a18d43d8f3ab29',
            ])->get("https://api.football-data.org/v2/competitions/$competition->id/standings");


        }


        return Inertia::render('Home',[
            "response" => Competition::get()->toJson(),
        ]);
    }

    private function competitionFromApi(){
        $response = Http::withHeaders([
            'X-Auth-Token' => '64f44c5bd39a456ab4a18d43d8f3ab29',
        ])->get('https://api.football-data.org/v2/competitions');

        foreach($response->json()['competitions'] as $competition)
        {
            Competition::create(
                [
                    'id'=> $competition['id'],
                    'name'=> $competition['name'],
                    'name_country'=> $competition['area']["name"],
                    'id_country'=> $competition['area']["id"],
                    'logo_country'=> $competition['area']["ensignUrl"],
                    'logo'=> $competition['emblemUrl']
                ]
            );
        }
    }

}
