<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('phone');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        DB::insert('insert into users (id, name, username, email, phone, password) values (?, ?, ?, ?, ?, ?)', [1, 'Sylvester Ekweozor', "@Sylvester", "a@a.com", "+19345615678", Hash::make("p")]);
        DB::insert('insert into users (id, name, username, email, phone, password) values (?, ?, ?, ?, ?, ?)', [2, 'Micheal Moris', "Moris12", "b@a.com", "+19915678", Hash::make("p")]);
        DB::insert('insert into users (id, name, username, email, phone, password) values (?, ?, ?, ?, ?, ?)', [3, 'Dayle ALex', "DyZ_1", "c@a.com", "+1923415678", Hash::make("p")]);
        DB::insert('insert into users (id, name, username, email, phone, password) values (?, ?, ?, ?, ?, ?)', [4, 'Olly Dutch', "Olly_Great", "d@a.com", "+1992315678", Hash::make("p")]);
        DB::insert('insert into users (id, name, username, email, phone, password) values (?, ?, ?, ?, ?, ?)', [5, 'ALex Oliver', "Oliver", "e@a.com", "+1912315678", Hash::make("p")]);
        DB::insert('insert into users (id, name, username, email, phone, password) values (?, ?, ?, ?, ?, ?)', [6, 'Phoebe Anderson', "Anderson_Sky", "f@a.com", "+1942315678", Hash::make("p")]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
