<?php

namespace App\Http\Controllers;

use App\Events\AgentActivityEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgentActivityController extends Controller
{
    public function checkIn(){
        broadcast(new AgentActivityEvent('check-in'));
    }

    public function checkOut(){
        broadcast(new AgentActivityEvent('check-out'));
    }
}
