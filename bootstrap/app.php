<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;

use Illuminate\Http\Exceptions\ThrottleRequestsException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function (Middleware $middleware): void {

        // CORS
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);

        // ROLE MIDDLEWARE
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);

    })

    ->withExceptions(function (Exceptions $exceptions): void {

        // CUSTOM RESPONSE RATE LIMIT LOGIN & FORGOT PASSWORD
        $exceptions->render(function (
            ThrottleRequestsException $e,
            $request
        ) {

            return response()->json([

                'message' => 'Terlalu banyak percobaan.',

                // sisa waktu dalam detik
                'retry_after_seconds' =>
                    (int) ($e->getHeaders()['Retry-After'] ?? 0),

                // sisa waktu dalam menit
                'retry_after_minutes' =>
                    ceil(((int) ($e->getHeaders()['Retry-After'] ?? 0)) / 60),

            ], 429);

        });

    })->create();