---
id: create-a-custom-uptime-model
slug: /create-a-custom-uptime-model
sidebar_position: 2
---

# Creating a custom UptimeCheck Model

If you want to add new features or improve the original MoonGuard UptimeCheck
model, we allow you to create a custom UptimeCheck Model for your project doing
the following steps.

1. Create a new **UptimeCheck** class that extends from 
`Illuminate\Database\Eloquent\Model` and implements the 
`Taecontrol\MoonGuard\Contracts\MoonGuardUptimeCheck` interface.

  ```php
  <?php

  use Illuminate\Database\Eloquent\Model;
  use Taecontrol\MoonGuard\Contracts\MoonGuardUptimeCheck;

  class UptimeCheck extends Model implements MoonGuardUptimeCheck
  {
    // Contract implementation
  }
  ```

1. Implement all the properties and methods required, you can guide yourself with
the [model reference](./create-a-custom-uptime-model#model-Reference).

2. Replace the new Uptime Check model class in the configuration file.

  ```php
  <?php
  [
    'uptime_check' => [
      /*
       * Enable or disable uptime checks globally.
       */
      'enabled' => true,

      /*
       * The uptime check model to use.
       */
      'model' => \Taecontrol\MoonGuard\Models\UptimeCheck::class, -> //replace model

      /*
       * The number of consecutive failures before a notification should be sent.
       */
      'notify_failed_check_after_consecutive_failures' => 1,

      /*
       * How often a notification is resent after the uptime check fails
      */
      'resend_uptime_check_failed_notification_every_minutes' => 5,
    ],
  ]
  ```

## Model Reference

```php
<?php

namespace Taecontrol\MoonGuard\Models;

use Exception;
use Illuminate\Http\Client\Response;
use Illuminate\Database\Eloquent\Model;
use Taecontrol\MoonGuard\Enums\UptimeStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Taecontrol\MoonGuard\Casts\RequestDurationCast;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Taecontrol\MoonGuard\Repositories\SiteRepository;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Taecontrol\MoonGuard\ValueObjects\RequestDuration;
use Taecontrol\MoonGuard\Contracts\MoonGuardUptimeCheck;
use Taecontrol\MoonGuard\Repositories\UptimeCheckRepository;

class UptimeCheck extends Model implements MoonGuardUptimeCheck
{
  use HasFactory;

  protected $fillable = [
    'site_id',
  ];

  protected $casts = [
    'status' => UptimeStatus::class,
    'status_last_change_date' => 'immutable_datetime',
    'last_check_date' => 'immutable_datetime',
    'check_failed_event_fired_on_date' => 'immutable_datetime',
    'request_duration_ms' => RequestDurationCast::class,
  ];

  public function site(): BelongsTo
  {
    return $this->belongsTo(SiteRepository::resolveModelClass());
  }

  public function saveSuccessfulCheck(Response $response): void
  {
    $this->status = UptimeStatus::UP;
    $this->check_failure_reason = '';
    $this->check_times_failed_in_a_row = 0;
    $this->last_check_date = now();
    $this->request_duration_ms = RequestDuration::from(
      round(data_get($response->handlerStats(), 'total_time_us') / 1000)
    );

    $this->save();
  }

  public function saveFailedCheck(Response|Exception $response): void
  {
    $this->status = UptimeStatus::DOWN;
    $this->check_times_failed_in_a_row++;
    $this->last_check_date = now();
    $this->check_failure_reason = $response instanceof Response ? $response->reason() : $response->getMessage();
    $this->request_duration_ms = RequestDuration::from(null);
    $this->save();
  }

  public function requestTookTooLong(): bool
  {
    /** @var RequestDuration $maxRequestDuration */
    $maxRequestDuration = $this->site->max_request_duration_ms;

    return $this->request_duration_ms->toRawMilliseconds() >= $maxRequestDuration->toRawMilliseconds();
  }

  public function wasFailing(): Attribute
  {
    return Attribute::make(
      get: fn () => ! is_null($this->check_failed_event_fired_on_date),
    );
  }

  public function isEnabled(): Attribute
  {
    return Attribute::make(
      get: fn () => UptimeCheckRepository::isEnabled(),
    );
  }

  protected static function booted()
  {
    static::saving(function (self $uptime) {
      if (is_null($uptime->status_last_change_date)) {
        $uptime->status_last_change_date = now();

        return;
      }

      if ($uptime->getOriginal('status') != $uptime->status) {
        $uptime->status_last_change_date = now();
      }
    });
  }
}
```

### Fillable  fields

| Property Name | Description |
| --- | --- |
| site_id | The ID of the site associated with the uptime check |

### Casts

| Property Name | Cast Type | Description |
| --- | --- | --- |
| status | UptimeStatus | The status of the uptime check, casted to the UptimeStatus enum |
| status_last_change_date | immutable_datetime | The date and time when the status of the uptime check was last changed, casted to an immutable datetime object |
| last_check_date | immutable_datetime | The date and time when the last check was performed, casted to an immutable datetime object |
| check_failed_event_fired_on_date | immutable_datetime | The date and time when the check failed event was fired, casted to an immutable datetime object |
| request_duration_ms | RequestDurationCast | The duration of the last request in milliseconds, casted using the RequestDurationCast class |

### Methods

| Method Name | Return Type | Description |
| --- | --- | --- |
| site() | Belongs To | Returns a BelongsTo relationship between the UptimeCheck model and the Site model. This method allows you to retrieve the site associated with the uptime check. |
| saveSuccessfulCheck(Response $response) | void | Saves the result of a successful uptime check. This method sets the status of the uptime check to "UP", updates the last check date, and saves the request duration. |
| saveFailedCheck(Response\|Exception $response) | void | Saves the result of a failed uptime check. This method sets the status of the uptime check to "DOWN", increments the number of times the check has failed in a row, updates the last check date, saves the failure reason, and sets the request duration to null. |
| requestTookTooLong() | bool | Returns a boolean indicating whether the last request took longer than the maximum allowed duration for the site. |
| wasFailing() | Attribute | Returns an Attribute instance that indicates whether the uptime check was failing. |
| isEnabled() | Attribute | Returns an Attribute instance that indicates whether the uptime check is enabled. |
| booted() | N/A | Overrides the booted method to add a callback that sets the status last change date when the status of the uptime check changes. |


