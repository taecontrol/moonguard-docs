---
id: larvis
slug: /larvis
sidebar_position: 13
---

# Larvis Package

To send exception data to Moonguard, you must install the Larvis package in your Laravel application and provide an API token from Moonguard. Larvis is a Laravel package that allows you to push site monitoring data to Moonguard.

## Installation

You can install the package via Composer:

```bash
composer require taecontrol/larvis
```

## Configuration

On the `Handler.php` class of your Laravel project, add the next code to capture all exceptions:

```php
/**
 * Register the exception handling callbacks for the application.
 *
 * @return void
 */
public function register()
{
    if (! app()->environment('testing')) {
        $this->reportable(function (Throwable $e) {
            /** @var Larvis $larvis */
            $larvis = app(Larvis::class);

            $larvis->captureException($e);
        });
    }
}
```
Then, define the next `.env` vars:

```dotenv
MOONGUARD_DOMAIN=https://moonguard.test
MOONGUARD_SITE_API_TOKEN=********************
```

You can generate api tokens when you create or edit a site:
![Api Token](./exceptions/img/api-token-site.png)

check more about larvis on [Github](https://github.com/taecontrol/larvis).





