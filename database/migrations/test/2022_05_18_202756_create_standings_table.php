<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStandingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('standings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('competition_id')->index();
            $table->foreign('competition_id')->references('id')->on('competitions')->onDelete('cascade');
            $table->unsignedBigInteger('team_id')->index();
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
            $table->string('group')->nullable();
            $table->string('position')->nullable();
            $table->integer('won')->nullable();
            $table->integer('draw')->nullable();
            $table->integer('points')->nullable();
            $table->integer('goalsFor')->nullable();
            $table->integer('goalsAgainst')->nullable();
            $table->integer('goalDifference')->nullable();
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
        Schema::dropIfExists('standings');
    }
}
