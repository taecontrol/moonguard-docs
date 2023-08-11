---
id: moonguard-scheduler
slug: /moonguard-scheduler
sidebar_position: 9
---

# Moonguard Command scheduler

We created a helper class with a static function that executes the Moonguard
commands. You must pass in the Schedule object and two cron strings
(one for the Uptime Check and one for the SSL Certificate Check) to the function:

```php
use Taecontrol\MoonGuard\Console\MoonGuardCommandsScheduler;
//...

protected function schedule(Schedule $schedule)
{
  MoonGuardCommandsScheduler::scheduleMoonGuardCommands(
    $schedule,
    '* * * * *',
    '* * * * *'
  );
}
```
