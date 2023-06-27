---
id: uptime-check-commands
slug: /uptime-check-commands
sidebar_position: 2
---

# Commands 


## CheckUptimeCommand

To add the CheckUptimeCommand to your Laravel application, follow these steps:

Open the ``app/Console/Kernel.php`` file in your Laravel project.
Now we import the CheckUptimeCommand class:: ``use Taecontrol\MoonGuard\Console\Commands\CheckUptimeCommand;``

Inside the schedule method of the Kernel class, add the following line of code:
``$schedule->command(CheckUptimeCommand::class)->everyMinute();``
this line schedules the CheckUptimeCommand to run every minute.

This command is responsible for checking the uptime of registered sites with Uptime Check enabled and not in maintenance mode:

```php title="app/Console/Kernel.php"
use Taecontrol\MoonGuard\Console\Commands\CheckUptimeCommand;
//...

protected function schedule(Schedule $schedule)
{
  $schedule->command(CheckUptimeCommand::class)->everyMinute();
}
```



