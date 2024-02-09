---
id: commands
slug: /commands
sidebar_position: 13
---

# Commands

If you choose not to use the `MoonGuardCommandScheduler`, you can set up each command individually as follows:

## Scheduling CheckUptime Command

Scheduling the Uptime Check can be done through the `CheckUptimeCommand` class
and Laravel's command scheduler.

Go to **`app/Console/Kernel.php`** and use the `CheckUptimeCommand` class and
add schedule the command in the `schedule()` method:

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Taecontrol\MoonGuard\Console\Commands\CheckUptimeCommand;

class Kernel extends ConsoleKernel
{
  //...
   /**
   * Define the application's command schedule.
   *
   * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
   * @return void
   */
  protected function schedule(Schedule $schedule)
  {
    $schedule->command(CheckUptimeCommand::class)->everyMinute();
  }
}
```

With this, all your sites uptime status will be updated every minute.

## Scheduling CheckSslCertificate Command

The `CheckSslCertificateCommand` can also be scheduled using Laravel's command Scheduler
and specify when the command should run in the schedule method.

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Taecontrol\MoonGuard\Console\Commands\CheckSslCertificateCommand;

class Kernel extends ConsoleKernel
{
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
}
```

In this case, we can set the `CheckSslCertificateCommand` to run every
2 hours.

## Scheduling PruneException Command

The `PruneExceptionCommand` deletes all exceptions that are older than 7 days
by default. You can change its behavior in the configuration file.

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Taecontrol\MoonGuard\Console\Commands\PruneExceptionCommand;

class Kernel extends ConsoleKernel
{
    /**
   * Define the application's command schedule.
   *
   * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
   * @return void
   */
  protected function schedule(Schedule $schedule)
  {
      $schedule->command(PruneExceptionCommand::class)->daily();
  }
}
```

## Scheduling PruneServerMetric Command

The `PruneServerMetricCommand` deletes all the Systems Monitoring data older than
7 days by default. You can change its behavior in the configuration file.

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Taecontrol\MoonGuard\Console\Commands\PruneServerMetricCommand;

class Kernel extends ConsoleKernel
{
    /**
   * Define the application's command schedule.
   *
   * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
   * @return void
   */
  protected function schedule(Schedule $schedule)
  {
      $schedule->command(PruneServerMetricCommand::class)->daily();
  }
}
```

For more scheduling options, please refer to the [Laravel documentation](https://laravel.com/docs/10.x/scheduling#schedule-frequency-options).
