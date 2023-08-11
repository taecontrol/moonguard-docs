---
id: ssl-certificate-scheduling
slug: /ssl-certificate-scheduling
sidebar_position: 2
---
# Scheduling CheckSslCertificate Command

The CheckSslCertificateCommand can also be scheduled using Laravel's command scheduler.

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

//add CheckSslCertificateCommand
use Taecontrol\MoonGuard\Console\Commands\CheckSslCertificateCommand;

class Kernel extends ConsoleKernel
{
    //...
}
```

Next, you can specify when the command should run in the schedule method.

```php
/**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command(CheckSslCertificateCommand::class)->everyTwoHours();
    }
```

In this case, we can set the `CheckSslCertificateCommand` to run every 2 hours.
For more scheduling options, please refer to the [Laravel documentation](https://laravel.com/docs/9.x/scheduling#schedule-frequency-options).
