<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemCategory extends Model
{
    use HasFactory;

    protected $with = ['unit'];

    public function unit()
    {
        return $this->belongsTo('App\Models\Unit');
    }

    public function items()
    {
        return $this->hasMany('App\Models\Item', 'category_id', 'id');
    }
}
