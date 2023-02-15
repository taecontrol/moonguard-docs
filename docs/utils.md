---
id: utils
slug: /utils
sidebar_position: 12
---

# Utils

### MoonguardCommandScheduler

We made a helper class with a static function that runs the mentioned commands, you must pass the Schedule `$schedule` and two cron strings (Uptime Check cron time and SSL Certificate Check cron time):

```php title="app/Console/Kernel.php"
use Taecontrol\Moonguard\Console\MoonguardCommandScheduler;
//...

protected function schedule(Schedule $schedule)
{
  MoonguardCommandScheduler::scheduleMoonguardCommands(
    $schedule, 
    '* * * * *', 
    '* * * * *'
  );
}
```