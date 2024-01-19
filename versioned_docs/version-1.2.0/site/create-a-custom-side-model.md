---
id: create-a-custom-side-model
slug: /create-a-custom-side-model
sidebar_position: 1
---

# Creating a custom Site model

If you want to add new features or improve the original MoonGuard Site model,
we allow you to create a custom Site Model for your project doing the following steps.

1. Create a new `Site` class that extends from `Illuminate\Database\Eloquent\Model` 
and implements the `Taecontrol\MoonGuard\Contracts\MoonGuardSite` contract.

  ```php
  <?php

  use Illuminate\Database\Eloquent\Model;
  use Taecontrol\MoonGuard\Contracts\MoonGuardSite;

  class Site extends Model implements MoonGuardSite
  {
    // Contract implementation
  }
  ```

2. The `Site` class must implement all the properties and methods required, you
can guide yourself with the
[model reference](./create-a-custom-side-model#model-reference).

3. Replace the new `Site` model class in the `config/moonguard.php` configuration file.

  ```php
  <?php
  [
    'site' => [
      /*
       * The site model to use.
       */
      'model' => \App\Monitor\Models\MySite::class,
    ],
  ]
  ```

## Model Reference

```php
<?php

namespace Taecontrol\MoonGuard\Models;

use Spatie\Url\Url;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Taecontrol\MoonGuard\Contracts\MoonGuardSite;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Taecontrol\MoonGuard\Casts\RequestDurationCast;
use Taecontrol\MoonGuard\Collections\SiteCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Taecontrol\MoonGuard\Database\Factories\SiteFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Taecontrol\MoonGuard\Repositories\UptimeCheckRepository;
use Taecontrol\MoonGuard\Repositories\ExceptionLogRepository;
use Taecontrol\MoonGuard\Repositories\ExceptionLogGroupRepository;
use Taecontrol\MoonGuard\Repositories\SslCertificateCheckRepository;

class Site extends Model implements MoonGuardSite
{
    use HasFactory;

    protected $fillable = [
        'url',
        'name',
        'uptime_check_enabled',
        'ssl_certificate_check_enabled',
        'max_request_duration_ms',
        'down_for_maintenance_at',
        'api_token',
        'cpu_limit',
        'ram_limit',
        'disk_limit',
        'hardware_monitoring_notification_enabled',
    ];

    protected $casts = [
        'max_request_duration_ms' => RequestDurationCast::class,
        'down_for_maintenance_at' => 'immutable_datetime',
        'uptime_check_enabled' => 'boolean',
        'ssl_certificate_check_enabled' => 'boolean',
        'hardware_monitoring_notification_enabled' => 'boolean',
    ];

    public function scopeWhereUptimeCheckEnabled(Builder $query): Builder
    {
        return $query->where('uptime_check_enabled', true);
    }

    public function scopeWhereSslCertificateCheckEnabled(Builder $query): Builder
    {
        return $query->where('ssl_certificate_check_enabled', true);
    }

    public function scopeWhereIsNotOnMaintenance(Builder $query): Builder
    {
        return $query->whereNull('down_for_maintenance_at');
    }

    public function url(): Attribute
    {
        return Attribute::make(
            get: fn () => Url::fromString($this->attributes['url']),
        );
    }

    public function uptimeCheck(): HasOne
    {
        return $this->hasOne(UptimeCheckRepository::resolveModelClass());
    }

    public function sslCertificateCheck(): HasOne
    {
        return $this->hasOne(SslCertificateCheckRepository::resolveModelClass());
    }

    public function exceptionLogs(): HasManyThrough
    {
        return $this->hasManyThrough(
            ExceptionLogRepository::resolveModelClass(),
            ExceptionLogGroupRepository::resolveModelClass()
        );
    }

    public function exceptionLogGroups(): HasMany
    {
        return $this->hasMany(ExceptionLogGroupRepository::resolveModelClass());
    }

    public function systemMetrics(): HasMany
    {
        return $this->hasMany(SystemMetric::class);
    }

    public function newCollection(array $models = []): SiteCollection
    {
        return new SiteCollection($models);
    }

    protected static function newFactory(): Factory
    {
        return SiteFactory::new();
    }
}
```

### Fillable fields:

| Field Name | Description |
| --- | --- |
| url | The URL of the site being monitored. |
| name | The name of the site being monitored. |
| uptime_check_enabled | A boolean value indicating whether or not uptime checks is enabled. |
| ssl_certificate_check_enabled | A boolean value indicating whether or not SSL certificate checks is enabled. |
| max_request_duration_ms | The maximum allowed request duration in milliseconds. |
| down_for_maintenance_at | The timestamp when the website was set down for maintenance. |
| api_token | An API token used for authenticating your site's requests to the MoonGuard API. |
| cpu_limit | The maximum CPU load average value that can be tolerated before an alert is sent. |
| ram_limit | The maximum Memory value that can be tolerated before an alert is sent. |
| disk_limit | The maximum disk space available that can be tolerated before an alert is sent. |
| hardware_monitoring_notification_enabled | A boolean value that allow send hardware monitoring notifications. |

### Casts

| Field Name | Cast Type | Description |
| --- | --- | --- |
| max_request_duration_ms | RequestDurationCast | The maximum allowed request duration in milliseconds, casted using the RequestDurationCast class. |
| down_for_maintenance_at | immutable_datetime | The date and time when the website is down for maintenance, casted to an immutable datetime object. |
| uptime_check_enabled | boolean | The flag indicating whether uptime checks are enabled, casted to a boolean. |
| ssl_certificate_check_enabled | boolean | The flag indicating whether SSL certificate checks are enabled, casted to a boolean. |
| hardware_monitoring_notification_enabled | boolean | The flag that enable hardware monitoring notifications. |

### Methods

| Method Name | Return Type | Description |
| --- | --- | --- |
| scopeWhereUptimeCheckEnabled(Builder $query) | Query Scope | Filters sites by whether or not they have uptime checks enabled. |
| scopeWhereSslCertificateCheckEnabled(Builder $query) | Query Scope | Filters sites by whether or not they have SSL certificate checks enabled. |
| scopeWhereIsNotOnMaintenance(Builder $query) | Query Scope | Filters sites by whether or not they are currently down for maintenance. |
| url() | Attribute | Returns a Url object representing the site's URL. |
| uptimeCheck() | HasOne | Returns a HasOne relationship between the Site model and the UptimeCheck model. This method allows you to retrieve the uptime check associated with the website. |
| sslCertificateCheck() | HasOne | Returns a HasOne relationship between the Site model and the SslCertificateCheck model. This method allows you to retrieve the SSL certificate check associated with the website. |
| exceptionLogs() | HasManyThrough | Returns a HasManyThrough relationship between the Site model and the ExceptionLog model through the ExceptionLogGroup model. This method allows you to retrieve the exception logs associated with the website. |
| exceptionLogGroups() | HasMany | Returns a HasMany relationship between the Site model and the ExceptionLogGroup model. This method allows you to retrieve the exception log groups associated with the website. |
| newCollection(array $models = []) | SiteCollection | Overrides the newCollection method to return a custom SiteCollection instance. This method allows you to customize the collection returned when querying the Site model. |
| systemMetrics() | HasMany | Returns HasMany relationship between the Site model and SystemMetric model. |
