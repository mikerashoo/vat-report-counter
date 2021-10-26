<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public function item()
    {
        return $this->belongsTo('App\Models\Item', 'item_id');
    }

    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
 
}
