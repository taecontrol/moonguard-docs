---
id: ssl-certificate-check-commands
slug: /ssl-certificate-check-commands
sidebar_position: 3
---

# SSL Certificate Check Commands

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
