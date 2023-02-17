---
id: ssl-certificate-check-commands
slug: /ssl-certificate-check-commands
sidebar_position: 2
---

# Commands

## CheckSslCertificateCommand

This command verifies the SSL certificates of all your registered sites, but only if the SSL Certificate Check feature is enabled and the sites are not in maintenance mode:

```php title="app/Console/Kernel.php"
use Taecontrol\MoonGuard\Console\Commands\CheckSslCertificateCommand;
//...

protected function schedule(Schedule $schedule)
{
  $schedule->command(CheckSslCertificateCommand::class)->everyMinute();
}
```
