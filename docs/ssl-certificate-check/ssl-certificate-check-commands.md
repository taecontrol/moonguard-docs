---
id: ssl-certificate-check-commands
slug: /ssl-certificate-check-commands
sidebar_position: 2
---

# Commands

## CheckSslCertificateCommand

To add the `CheckSslCertificateCommand` to your Laravel application, follow these steps:

Open `app/Console/Kernel.php` file in your Laravel project and import the `CheckSslCertificateCommand` class:

`use Taecontrol\MoonGuard\Console\Commands\CheckSslCertificateCommand;`

Inside the schedule method of the Kernel class, add the following line of code:
`$schedule->command(CheckSslCertificateCommand::class)->everyMinute();`
This line schedules the CheckUptimeCommand to run every minute.

This command is responsible for verifying SSL certificates of registered sites, but only if the verification function is enabled and they are not in maintenance mode.

```php title="app/Console/Kernel.php"
use Taecontrol\MoonGuard\Console\Commands\CheckSslCertificateCommand;
//...

protected function schedule(Schedule $schedule)
{
  $schedule->command(CheckSslCertificateCommand::class)->everyMinute();
}
```
