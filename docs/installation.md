---
id: installation
slug: /installation
sidebar_position: 2
---

# Installation

MoonGuard must be installed in a Laravel project using Composer.

## Installation via Composer

```bash
composer require taecontrol/moonguard
```

## Migrations and Configuration file

To publish the migrations and the configuration file use:

```bash
php artisan vendor:publish --tag="moonguard-migrations"
php artisan vendor:publish --tag="moonguard-config"
```

You will be able to find a migration file called `create_moonguard_table.php` in your `database/migration` directory, and a configuration file called `config/moonguard.php`. To migrate the Moonguard table, run the following command:

```bash
php artisan migrate
```

## Queues and Workers

We use queues for notifications, so we recommend to configure Redis in your project and then run a worker:

```bash
php artisan queue:work
```


## Development and local usage

In case you intend to extend or modify MoonGuard, you've to clone [MoonGuard repository](https://github.com/teacontrol/moonguard) in your disk.

Once you have clone it, update the `composer.json` of one of your projects where you intend to use MoonGuard as a dependecy, update the `repositories` key:

```json
{
  "repositories": [
    {
      "type": "path",
      "url": "../<path>/moonguard"
    }
  ]
}
```

Then add MoonGuard package and version `dev-main` in the `require` key:

```json
{
  "require": {
    "taecontrol/moonguard": "dev-main"
  }
}
```


# Moonguard Command Scheduler

We created a helper class with a static function that executes the Moonguard commands. You must pass in the Schedule object and two cron strings (one for the Uptime Check and one for the SSL Certificate Check) to the function:

```php title="app/Console/Kernel.php"
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

Finally you can run the `composer update` command to install MoonGuard (locally) in your project.

```bash
composer update
```