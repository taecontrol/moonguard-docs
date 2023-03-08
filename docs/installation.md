---
id: installation
slug: /installation
sidebar_position: 2
---

# Installation

## Installation via Composer

```bash
composer require taecontrol/moonguard
```

## Local Development

Clone the [MoonGuard Repository](https://github.com/teacontrol/moonguard)

Once you have clone it, in your `composer.json` of your project add the
**repository** key:

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../<my-package-path>/moonguard"
        }
    ]
}
```
Then in the **require** key add the MoonGuard package:

```json
{
    "require":  {
        "taecontrol/moonguard": "dev-main"
    }
}
```
Finally you can run the `composer update` command to install MoonGuard to your project.

```bash
composer update
```

At this point you should have to register two service providers in
the `config/app.php`  :

```php
  'providers' => [
    // ...
    Taecontrol\MoonGuard\Providers\MoonGuardServiceProvider::class,
    Taecontrol\MoonGuard\Providers\MoonGuardFilamentServiceProvider::class,
  ]
```

:::tip Composer tip
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

We use queues for notifications, so we recommend that you configure Redis in your project and then run a worker:

```bash
php artisan queue:work
```
