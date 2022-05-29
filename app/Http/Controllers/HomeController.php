<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\CurrentMatch;
use App\Models\Game;
use App\Models\Group;
use App\Models\Stage;
use App\Models\Standing;
use App\Models\team;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    private static $val = 1;
//    with world cup
    private $Competitions = array(2000, 2001, 2002, 2003, 2014, 2015, 2019, 2021);
//    already started
    private $ActiveCompetitions = array(2001, 2002, 2003, 2014, 2015, 2019, 2021);

    //
    public function show()
    {
        return Inertia::render('Home',[
            'aboutPage' => URL::route('guest.aboutPage'),
        ]);
    }    public function about()
    {
        return Inertia::render('About',[
            'aboutPage' => URL::route('guest.aboutPage'),
        ]);
    }

    public function queryCompetetion()
    {

        return Inertia::render('Home'
            );
    }

    private function competitionFromApi()
    {
        $response = Http::withHeaders([
            'X-Auth-Token' => '64f44c5bd39a456ab4a18d43d8f3ab29',
        ])->get('https://api.football-data.org/v2/competitions');

        foreach ($response->json()['competitions'] as $competition) {
            Competition::create(
                [
                    'id' => $competition['id'],
                    'currentMatchday' => $competition["currentSeason"]["currentMatchday"],
                    'name' => $competition['name'],
                    'name_country' => $competition['area']["name"],
                    'id_country' => $competition['area']["id"],
                    'logo_country' => $competition['area']["ensignUrl"],
                    'logo' => $competition['emblemUrl']
                ]
            );
        }
    }

    private function StandingsHardRefresh()
    {
        foreach ($this->Competitions as $competition) {
            Standing::where('competition_id', $competition)->delete();
            $response = Http::withHeaders([
                'X-Auth-Token' => '64f44c5bd39a456ab4a18d43d8f3ab29',
            ])->get("https://api.football-data.org/v2/competitions/$competition/standings");

            $response = $response->collect();

            foreach ($response["standings"] as $group) {
                foreach ($group["table"] as $team) {
                    if ($team["team"]['id'] != null && Team::where('id', $team["team"]['id'])->first() == null) {
                        Team::create(
                            [
                                'id' => $team["team"]['id'],
                                'name' => $team["team"]['name'],
                                'logo' => $team["team"]  ['crestUrl']
                            ]
                        );
                    }
                    Standing::create(
                        [
                            'team_id' => $team["team"]['id'],
                            'competition_id' => $response["competition"]["id"],
                            'currentMatchday' => $response["season"]['currentMatchday'],
                            'group_id' => Group::where('name', $group['group'])->first() ? Group::where('name', $group['group'])->first()->id : 100,
                            'position' => $team['position'],
                            'playedGames' => $team['playedGames'],
                            'won' => $team['won'],
                            'draw' => $team['draw'],
                            'points' => $team['points'],
                            'goalsFor' => $team['goalsFor'],
                            'goalsAgainst' => $team['goalsAgainst'],
                            'goalDifference' => $team['goalDifference'],
                        ]
                    );
                }
            }


        }

    }

    private function StandingsHotRefresh()
    {
        foreach ($this->ActiveCompetitions as $competition) {
            Standing::where('competition_id', $competition)->delete();
            $response = Http::withHeaders([
                'X-Auth-Token' => '64f44c5bd39a456ab4a18d43d8f3ab29',
            ])->get("https://api.football-data.org/v2/competitions/$competition/standings");

            $response = $response->collect();

            foreach ($response["standings"] as $group) {
                foreach ($group["table"] as $team) {
                    Standing::create(
                        [
                            'team_id' => $team["team"]['id'],
                            'competition_id' => $response["competition"]["id"],
                            'currentMatchday' => $response["season"]['currentMatchday'],
                            'group_id' => Group::where('name', $group['group'])->first() ? Group::where('name', $group['group'])->first()->id : 100,
                            'position' => $team['position'],
                            'playedGames' => $team['playedGames'],
                            'won' => $team['won'],
                            'draw' => $team['draw'],
                            'points' => $team['points'],
                            'goalsFor' => $team['goalsFor'],
                            'goalsAgainst' => $team['goalsAgainst'],
                            'goalDifference' => $team['goalDifference'],
                        ]
                    );
                }
            }


        }

    }

    private function MatchesHardRefresh()
    {
        foreach ($this->Competitions as $competition) {
            $response = Http::withHeaders([
                'X-Auth-Token' => '64f44c5bd39a456ab4a18d43d8f3ab29',
            ])->get("https://api.football-data.org/v2/competitions/$competition/matches");

            $response = $response->collect();

            foreach ($response["matches"] as $match) {
                if ($match["homeTeam"]["id"] != null && Team::where('id', $match["homeTeam"]["id"])->first() == null) {
                    Team::create(
                        [
                            'id' => $match["homeTeam"]["id"],
                            'name' => $match["homeTeam"]["name"],
                        ]
                    );
                }
                if ($match["awayTeam"]["id"] != null && Team::where('id', $match["awayTeam"]["id"])->first() == null) {
                    Team::create(
                        [
                            'id' => $match["awayTeam"]["id"],
                            'name' => $match["awayTeam"]["name"],
                        ]
                    );
                }
                $date = date('Y-m-d H:i:s', strtotime($match["utcDate"]));

                $winner = null;
                switch ($match["score"]["winner"]) {
                    case "HOME_TEAM":

                        $winner = 1;
                        break;
                    case "AWAY_TEAM":
                        $winner = 2;
                        break;
                    default:
                        $winner = 0;

                }
                Game::create(
                    [
                        'id' => $match["id"],
                        'competition_id' => $response['competition']["id"],
                        'utcDate' => $date,
                        'status' => $match["status"],
                        'matchday' => $match["matchday"],
                        'stage' => $match["stage"],
                        'winner' => $winner,
                        'home_team_id' => $match["homeTeam"]["id"],
                        'away_team_id' => $match["awayTeam"]["id"],
                        'full_time_home_score' => $match["score"]["fullTime"]["homeTeam"],
                        'full_time_away_score' => $match["score"]["fullTime"]["awayTeam"],
                        'extra_time_home_score' => $match["score"]["extraTime"]["homeTeam"],
                        'extra_time_away_score' => $match["score"]["extraTime"]["awayTeam"],
                        'penalties_home_score' => $match["score"]["penalties"]["homeTeam"],
                        'penalties_away_score' => $match["score"]["penalties"]["awayTeam"],
                    ]
                );
            }
        }

    }

    private function CurrentMatchesHardRefresh()
    {
        CurrentMatch::truncate();
        $response = Http::withHeaders([
            'X-Auth-Token' => '64f44c5bd39a456ab4a18d43d8f3ab29',
        ])->get("https://api.football-data.org/v2/matches");

        $response = $response->collect();


        foreach ($response["matches"] as $match) {
            if (in_array($match["competition"]["id"], $this->ActiveCompetitions)) {
                if ($match["homeTeam"]["id"] != null && Team::where('id', $match["homeTeam"]["id"])->first() == null) {
                    Team::create(
                        [
                            'id' => $match["homeTeam"]["id"],
                            'name' => $match["homeTeam"]["name"],
                        ]
                    );
                }
                if ($match["awayTeam"]["id"] != null && Team::where('id', $match["awayTeam"]["id"])->first() == null) {
                    Team::create(
                        [
                            'id' => $match["awayTeam"]["id"],
                            'name' => $match["awayTeam"]["name"],
                        ]
                    );
                }
                $date = date('Y-m-d H:i:s', strtotime($match["utcDate"]));

                $winner = null;
                switch ($match["score"]["winner"]) {
                    case "HOME_TEAM":

                        $winner = 1;
                        break;
                    case "AWAY_TEAM":
                        $winner = 2;
                        break;
                    default:
                        $winner = 0;

                }
                CurrentMatch::create(
                    [
                        'id' => $match["id"],
                        'competition_id' => $match['competition']["id"],
                        'utcDate' => $date,
                        'status' => $match["status"],
                        'matchday' => $match["matchday"],
                        'stage' => $match["stage"],
                        'winner' => $winner,
                        'home_team_id' => $match["homeTeam"]["id"],
                        'away_team_id' => $match["awayTeam"]["id"],
                        'full_time_home_score' => $match["score"]["fullTime"]["homeTeam"],
                        'full_time_away_score' => $match["score"]["fullTime"]["awayTeam"],
                        'extra_time_home_score' => $match["score"]["extraTime"]["homeTeam"],
                        'extra_time_away_score' => $match["score"]["extraTime"]["awayTeam"],
                        'penalties_home_score' => $match["score"]["penalties"]["homeTeam"],
                        'penalties_away_score' => $match["score"]["penalties"]["awayTeam"],
                    ]
                );
            }
        }
    }

    public function aJob()
    {
        DB::table('aJob')->insert(['inc' => HomeController::$val]);
        HomeController::$val++;
    }

    public function CurrentMatchesRange()
    {
        $currentStage = Game::where('utcDate','>=',Carbon::today())->orderBy('utcDate','asc')->limit(1)->get()[0]->stage;
        $currentStage = Stage::where('stage','FINAL')->first();
        $stages = Stage::where( 'id',$currentStage->id)->orWhere('id',$currentStage->id-1)->get();
        $matches = collect([]);
        foreach ($this->ActiveCompetitions as $cmp) {
            $cmpIns = Competition::find($cmp);
            $matches->put(
                $cmpIns->name,
                Game::where('competition_id', $cmp)->where(function ($query) use ($cmp, $cmpIns,$stages) {
                    $query->where('stage', '=', 'REGULAR_SEASON')
                        ->where(function ($query) use ($cmpIns) {
                            $query->where('matchday', $cmpIns->currentMatchday)
                                ->orWhere('matchday', $cmpIns->currentMatchday - 1);
                        });
                    $query->orWhere(function ($query) use($stages) {
                        $query->where('stage', '<>', 'REGULAR_SEASON')
                            ->where(function($query) use($stages){
                                $query->where('stage', '=',$stages[0]->stage)
                                    ->orWhere('stage', '=',$stages[1]->stage);
                            });
                    });
                })->get());
        }
        return $matches;
    }


}
