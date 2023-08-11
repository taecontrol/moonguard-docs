---
id: uptime-check-model
slug: /uptime-check-model
sidebar_position: 1
---

# The UptimeCheck Model

The entity of UptimeCheck is represented as a model in MoonGuard, and it has the
following definition:

## Fillable Fields

| Field Name                    | Description                                                                   |
|-------------------------------|-------------------------------------------------------------------------------|
| `site_id`                           | The ID of the site associated with the uptime check.                    |

## Casts

| Name                   | Description                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `status`       |  The status of the uptime check, casted to the `UptimeStatus` enum |
| `status_last_change_date`       | The date and time when the status of the uptime check was last changed, casted to an immutable datetime object |
| `last_check_date`          | The date and time when the last check was performed, casted to an immutable datetime object |
| `check_failed_event_fired_on_date` | The date and time when the check failed event was fired, casted to an immutable datetime object |
| `request_duration_ms` | The duration of the last request in milliseconds, casted using the `RequestDurationCast` class |

## Methods

| Method Name   | Return Type    | Description |
|---------------|----------------|-------------|
| `site()` | BelongsTo | Returns a `BelongsTo` relationship between the `UptimeCheck` model and the `Site` model. This method allows you to retrieve the site associated with the uptime check. |
| `saveSuccessfulCheck(Response $response)` | void | Saves the result of a successful uptime check. This method sets the status of the uptime check to "UP", updates the last check date, and saves the request duration. |
| `saveSuccessfulCheck(Response $response)` | void | Saves the result of a failed uptime check. This method sets the status of the uptime check to "DOWN", increments the number of times the check has failed in a row, updates the last check date, saves the failure reason, and sets the request duration to null. |
| `requestTookTooLong()` | bool | Returns a boolean indicating whether the last request took longer than the maximum allowed duration for the site. |
| `wasFailing()` | Attribute | Returns an `Attribute` instance that indicates whether the uptime check was failing. |
| `isEnabled()` | Attribute | Returns an `Attribute` instance that indicates whether the uptime check is enabled. |
| `booted()` | void | Overrides the `booted` method to add a callback that sets the status last change date when the status of the uptime check changes. |

# Creating a custom UptimeCheck model

If you wish to create a custom UptimeCheck model or extend its capabilities, we
recommend following these steps:

1. Create a new **UptimeCheck** class that extends from `Illuminate\Database\Eloquent\Model`
and implements the `Taecontrol\MoonGuard\Contracts\MoonGuardUptimeCheck` interface.

```php
<?php

use Illuminate\Database\Eloquent\Model;
use Taecontrol\MoonGuard\Contracts\MoonGuardUptimeCheck;

class UptimeCheck extends Model implements MoonGuardUptimeCheck
{
  //Contract implementation
}
```
2. Implement all the properties and methods required, you can guide yourself with
the original [`UptimeCheck.php`](https://github.com/taecontrol/moonguard/blob/v0.1.0/src/Models/UptimeCheck.php) model from Moonguard but here a resume.

3. Replace the new Uptime Check model class in the configuration file.

```php
[
  'uptime_check' => [
    'enabled' => true,
    'model' => \Taecontrol\MoonGuard\Models\UptimeCheck::class, -> //replace model
    'notify_failed_check_after_consecutive_failures' => 1,
    'resend_uptime_check_failed_notification_every_minutes' => 5,
  ],
]
```
