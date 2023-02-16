---
id: uptime-check-commands
slug: /uptime-check-commands
sidebar_position: 3
---

# Commands 


## CheckUptimeCommand

This command checks the uptime for all your registered sites, only for those sites with Uptime Check enabled and that are not in maintenance mode:

```php title="app/Console/Kernel.php"
use Taecontrol\MoonGuard\Console\Commands\CheckUptimeCommand;
//...

protected function schedule(Schedule $schedule)
{
  $schedule->command(CheckUptimeCommand::class)->everyMinute();
}
```



