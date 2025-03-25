<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Login, register and password reset routes - must be before auth middleware routes
Route::middleware('guest')->group(function () {
    // Login Routes
    Route::get('login', function () {
        return Inertia::render('login/Index');
    })->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // Register Routes
    Route::get('register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    // Password Reset Routes
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Dashboard routes - require authentication
Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');
    
    Route::get('/courses', function () {
        return Inertia::render('dashboard/courses/page');
    })->name('dashboard.courses');
    
    Route::get('/assignments', function () {
        return Inertia::render('dashboard/assignments/page');
    })->name('dashboard.assignments');
    
    Route::get('/grades', function () {
        return Inertia::render('dashboard/grades/page');
    })->name('dashboard.grades');
    
    Route::get('/library', function () {
        return Inertia::render('dashboard/library/page');
    })->name('dashboard.library');
    
    Route::get('/settings', function () {
        return Inertia::render('dashboard/settings/page');
    })->name('dashboard.settings');
    
    Route::get('/calendar', function () {
        return Inertia::render('dashboard/calendar/page');
    })->name('dashboard.calendar');
    
    // Course detail route with dynamic ID
    Route::get('/courses/{id}/learn', function ($id) {
        return Inertia::render('dashboard/courses/[id]/learn/static-page', [
            'courseId' => $id
        ]);
    })->name('dashboard.courses.learn');
});

// Teacher routes - require teacher role
Route::middleware(['auth', 'role:teacher'])->prefix('teacher')->group(function () {
    Route::get('/', function () {
        return Inertia::render('teacher/page');
    })->name('teacher.dashboard');
    
    Route::get('/courses', function () {
        return Inertia::render('teacher/courses/page');
    })->name('teacher.courses');
    
    Route::get('/students', function () {
        return Inertia::render('teacher/students/page');
    })->name('teacher.students');
    
    Route::get('/assignments', function () {
        return Inertia::render('teacher/assignments/page');
    })->name('teacher.assignments');
    
    Route::get('/analytics', function () {
        return Inertia::render('teacher/analytics/page');
    })->name('teacher.analytics');
    
    Route::get('/gradebook', function () {
        return Inertia::render('teacher/gradebook/page');
    })->name('teacher.gradebook');
    
    Route::get('/materials', function () {
        return Inertia::render('teacher/materials/page');
    })->name('teacher.materials');
    
    Route::get('/rubrics', function () {
        return Inertia::render('teacher/rubrics/page');
    })->name('teacher.rubrics');
    
    Route::get('/announcements', function () {
        return Inertia::render('teacher/announcements/page');
    })->name('teacher.announcements');
});

// Admin routes - require admin role
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/page');
    })->name('admin.dashboard');
    
    Route::get('/users', function () {
        return Inertia::render('admin/users/page');
    })->name('admin.users');
    
    Route::get('/courses', function () {
        return Inertia::render('admin/courses/page');
    })->name('admin.courses');
    
    Route::get('/settings', function () {
        return Inertia::render('admin/settings/page');
    })->name('admin.settings');
    
    Route::get('/roles', function () {
        return Inertia::render('admin/roles/page');
    })->name('admin.roles');
    
    Route::get('/logs', function () {
        return Inertia::render('admin/logs/page');
    })->name('admin.logs');
    
    Route::get('/analytics', function () {
        return Inertia::render('admin/analytics/page');
    })->name('admin.analytics');
    
    Route::get('/integrations', function () {
        return Inertia::render('admin/integrations/page');
    })->name('admin.integrations');
});

// Comment out or remove this line if it exists
// require __DIR__.'/auth.php';
