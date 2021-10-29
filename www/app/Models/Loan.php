<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    public function customer()
    {
        return $this->belongsTo('App\Models\Customer', 'customer_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    public function sell()
    {
        return $this->belongsTo('App\Models\Sell', 'sell_id');
    }

    public function payments()
    {
        return $this->hasMany('App\Models\LoanPayment', 'loan_id');
    }
}
