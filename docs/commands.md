---
id: commands
slug: /commands
sidebar_position: 4
---

# Commands 

We prepared several commands to be scheduled in you app kernel.

## CheckUptimeCommand

This command checks the uptime for all your registered sites, only for those sites with Uptime Check enabled and that are not in maintenance mode:

```php title="app/Console/Kernel.php"
use Taecontrol\Moonguard\Console\Commands\CheckUptimeCommand;
//...

protected function schedule(Schedule $schedule)
{
  $schedule->command(CheckUptimeCommand::class)->everyMinute();
}
```

## CheckSslCertificateCommand

This command checks all your registered sites SSL certificates, only sites with SSL Certificate Check enabled and that are not in maintenance mode:

```php title="app/Console/Kernel.php"
use Taecontrol\Moonguard\Console\Commands\CheckSslCertificateCommand;
//...

protected function schedule(Schedule $schedule)
{
  $schedule->command(CheckSslCertificateCommand::class)->everyMinute();
}
```

## Utils

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
