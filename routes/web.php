<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
    Route::get('/login', function () {
        return Inertia::render('login/Index');
    })->name('login');

    Route::post('login', function(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            // Regenerasi session untuk keamanan
            $request->session()->regenerate();

            return response()->json(['message' => 'Login berhasil', 'user' => Auth::user()]);
        }

        return response()->json(['error' => 'Email atau password salah'], 401);
    });

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Dashboard routes - publicly accessible
Route::prefix('dashboard')->group(function () {
    // Main dashboard
    Route::get('/', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');

    // Courses
    Route::get('/courses', function () {
        return Inertia::render('dashboard/courses/page');
    })->name('dashboard.courses');

    Route::get('/courses/{id}', function ($id) {
        return Inertia::render('dashboard/courses/[id]/page', [
            'courseId' => $id
        ]);
    })->name('dashboard.courses.show');

    Route::get('/courses/{id}/learn', function ($id) {
        return Inertia::render('dashboard/courses/[id]/learn/page', [
            'courseId' => $id
        ]);
    })->name('dashboard.courses.learn');

    // Assignments
    Route::get('/assignments', function () {
        return Inertia::render('dashboard/assignments/page');
    })->name('dashboard.assignments');

    Route::get('/assignments/{id}', function ($id) {
        return Inertia::render('dashboard/assignments/[id]/page', [
            'assignmentId' => $id
        ]);
    })->name('dashboard.assignments.show');

    // Grades
    Route::get('/grades', function () {
        return Inertia::render('dashboard/grades/page');
    })->name('dashboard.grades');

    // Calendar
    Route::get('/calendar', function () {
        return Inertia::render('dashboard/calendar/page');
    })->name('dashboard.calendar');

    // Library
    Route::get('/library', function () {
        return Inertia::render('dashboard/library/page');
    })->name('dashboard.library');

    // Settings
    Route::get('/settings', function () {
        return Inertia::render('dashboard/settings/page');
    })->name('dashboard.settings');

    // Notifications
    Route::get('/notifications', function () {
        return Inertia::render('dashboard/notifications/page');
    })->name('dashboard.notifications');
});

// Teacher routes - no authentication required
Route::prefix('teacher')->group(function () {
    Route::get('/', function () {
        return Inertia::render('teacher/page');
    })->name('teacher.dashboard');

    Route::get('/courses', function () {
        return Inertia::render('teacher/courses/page');
    })->name('teacher.courses');

    Route::get('/courses/new', function () {
        return Inertia::render('teacher/courses/new/page');
    })->name('teacher.courses.new');

    Route::post('/courses', function (Request $request) {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|min:1',
            'description' => 'required|string|min:1',
            'category' => 'required|string|min:1',
            'level' => 'required|string|min:1',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after:startDate',
            'enrollmentLimit' => 'nullable|string',
            'isPublic' => 'nullable|boolean',
            'allowSelfEnrollment' => 'nullable|boolean',
            'tags' => 'nullable|string',
        ]);

        // TODO: Create the course in the database
        // For now, just return a success response
        return response()->json(['message' => 'Course created successfully']);
    })->name('teacher.courses.store');

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

// Admin routes - no authentication required
Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/page');
    })->name('admin.dashboard');

    Route::get('/users', function () {
        return Inertia::render('admin/users/page');
    })->name('admin.users');

    Route::get('/courses', function () {
        return Inertia::render('admin/courses/page');
    })->name('admin.courses');

    Route::get('/courses/new', function () {
        return Inertia::render('admin/courses/new/page');
    })->name('admin.courses.new');

    Route::post('/courses', function (Request $request) {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|min:1',
            'description' => 'required|string|min:1',
            'category' => 'required|string|min:1',
            'level' => 'required|string|min:1',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after:startDate',
            'enrollmentLimit' => 'nullable|string',
            'isPublic' => 'nullable|boolean',
            'allowSelfEnrollment' => 'nullable|boolean',
            'tags' => 'nullable|string',
        ]);

        // TODO: Create the course in the database
        // For now, just return a success response
        return response()->json(['message' => 'Course created successfully']);
    })->name('admin.courses.store');

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
