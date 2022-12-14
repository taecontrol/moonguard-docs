---
id: installation
slug: /installation
sidebar_position: 2
---

# Installation

## Installation via Composer

In order to install Larastats you must have Composer in your system.

In your application you need to add our repository in your `composer.json` file:

```json
"repositories": [
  {
    "type": "composer",
    "url": "https://satis.taecontrol.com"
  }
],
```

Next, you must add `taecontrol/larastats` package to the list of required packages:

```json
"require": {
    "php": "^8.0",
    "laravel/framework": "^9.0",
    "taecontrol/larastats": "*"
},
```

Your `composer.json` is ready to install Larastats, run `composer update` command in your console terminal:

```bash
composer update
```

It will prompt to provide your login credentials to Larastats site. We need this to authenticate your Composer session and permissions to download Larastats package source code. You can also create a Composer auth.json file (this will prevent you to type your credentials manually):

```json
{
  "http-basic": {
    "satis.taecontrol.com": {
      "username": "johndoe@example.com",
      "password": "your-api-token"
    }
  }
}
```

:::tip Composer tip
You can create your `auth.json` file with Composer:
```bash
composer config http-basic.satis.taecontrol.com johndoe@example.com your-api-token
```
:::

:::danger Take care
We don't advise to add this file to your project version control system.
:::

<br />

At this point you should have two service providers registered in `config/app.php`  :

```php
  'providers' => [
    // ...
    Taecontrol\Larastats\Providers\LarastatsServiceProvider::class,
    Taecontrol\Larastats\Providers\LarastatsFilamentServiceProvider::class,
  ]
```

:::tip Composer tip
If you don't intend to use Filament, you should remove **_LarastatsFilamentServiceProvider::class_** from your app providers array.
:::

## Migrations and Configuration file

To publish the migrations and the configuration file use:

```bash
php artisan vendor:publish --tag="larastats-migrations"
php artisan vendor:publish --tag="larastats-config"
```

You will be able to find a migration file `create_larastats_table.php` in your `database/migration` directory and a config file `config/larastats.php`. Run the following command to migrate larastats table:

```bash
php artisan migrate
```

## Queues and Workers

We use queues on notifications so we recommend you to configure redis in your project. Then run a worker:

```bash
php artisan queue:work
```