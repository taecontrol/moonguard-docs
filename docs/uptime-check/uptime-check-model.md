---
id: uptime-check-model
slug: /uptime-check-model
sidebar_position: 1
---

# Model

It represents the result of the last uptime check of a site.

## Relationships

You may get the related site with:

```php
$uptimeCheck = UptimeCheck::first();
$site = $uptimeCheck->site;
```

## Capabilities

You can manually save a successful or failed request with

```php
/** saveSuccesfulCheck requires a Illuminate\Http\Client\Response */
$uptimeCheck->saveSuccessfulCheck($response);
/** saveFailedCheck requires a Exception|Illuminate\Http\Client\Response */
$uptimeCheck->saveFailedCheck($exception);
```

It's possible to know if our uptime check request took to long using:

```php
/** @var bool */
$tookTooLong = $uptimeCheck()->requestTookTooLong();
```

## Attributes

- isEnabled: _bool_
- wasFailing: _bool_

## Custom Uptime Check Model

The following steps must be completed to create a custom uptime check model:

1. Create a new **UptimeCheck** class that extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\Moonguard\Contracts\MoonguardUptimeCheck` interface.
2. Implement all the properties and methods required, you can guide yourself with the original `UptimeCheck.php` model from Moonguard.
3. Replace the new Uptime Check model class in the configuration file.