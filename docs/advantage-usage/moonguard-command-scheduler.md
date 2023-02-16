---
id: moonguard-command-scheduler
slug: /moonguard-command-scheduler
sidebar_position: 1
---

# Moonguard Command Scheduler

We made a helper class with a static function that runs the mentioned commands, you must pass the Schedule `$schedule` and two cron strings (Uptime Check cron time and SSL Certificate Check cron time):

```php title="app/Console/Kernel.php"
use Taecontrol\MoonGuard\Console\MoonGuardCommandScheduler;
//...

protected function schedule(Schedule $schedule)
{
  MoonGuardCommandScheduler::scheduleMoonGuardCommands(
    $schedule, 
    '* * * * *', 
    '* * * * *'
  );
}
```