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

After installation you need to register two service providers in the `config/app.php`:

```php
  'providers' => [
    // ...
    Taecontrol\MoonGuard\Providers\MoonGuardServiceProvider::class,
    Taecontrol\MoonGuard\Providers\MoonGuardFilamentServiceProvider::class,
  ]
```

:::info Notice
If you don't intend to use Filament, you should remove **_MoonguardFilamentServiceProvider::class_** from your app providers array.
:::

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

Finally you can run the `composer update` command to install MoonGuard (locally) in your project.

```bash
composer update
```