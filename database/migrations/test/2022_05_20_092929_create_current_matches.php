<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrentMatches extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('current_matches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('competition_id');
            $table->foreign('competition_id')->references('id')->on('competitions')->onDelete('cascade');
            $table->dateTime('utcDate')->nullable();
            $table->string('status')->nullable();
            $table->integer('matchday')->nullable();
            $table->string('stage')->nullable();
            $table->integer('winner')->nullable();
            $table->unsignedBigInteger('home_team_id')->nullable();
            $table->foreign('home_team_id')->references('id')->on('teams')->onDelete('cascade');
            $table->unsignedBigInteger('away_team_id')->nullable();
            $table->foreign('away_team_id')->references('id')->on('teams')->onDelete('cascade');
            $table->string('full_time_home_score')->nullable();
            $table->string('full_time_away_score')->nullable();
            $table->string('extra_time_home_score')->nullable();
            $table->string('extra_time_away_score')->nullable();
            $table->string('penalties_home_score')->nullable();
            $table->string('penalties_away_score')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('current_matches');
    }
}
