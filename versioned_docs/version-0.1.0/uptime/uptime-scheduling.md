---
id: uptime-scheduling
slug: /uptime-scheduling
sidebar_position: 2
---

# Scheduling CheckUptime Command

Scheduling the Uptime Check can be done by utilizing the `CheckUptimeCommand`
class and Laravel's command scheduler.

Got to `app/Console/Kernel.php` and add the CheckUptimeCommand class:

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

//add CheckUptimeCommand
use Taecontrol\MoonGuard\Console\Commands\CheckUptimeCommand;

class Kernel extends ConsoleKernel
{
  //...
}
```
Then you can add when the command run in the schedule method:

```php
<?php

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
```
In this case we can run the `CheckUptimeCommand` every minute. You can check more
options in the [Laravel documentation](https://laravel.com/docs/9.x/scheduling#schedule-frequency-options).


