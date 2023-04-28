<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'completed',
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'completed' => 'boolean',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
