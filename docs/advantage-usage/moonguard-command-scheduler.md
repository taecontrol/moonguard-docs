---
id: moonguard-command-scheduler
slug: /moonguard-command-scheduler
sidebar_position: 1
---

# Moonguard Command Scheduler

We created a helper class with a static function that executes the Moonguard commands. You must pass in the Schedule object and two cron strings (one for the Uptime Check and one for the SSL Certificate Check) to the function:

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