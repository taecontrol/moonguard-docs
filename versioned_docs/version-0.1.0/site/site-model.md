---
id: site-model
slug: /site-model
sidebar_position: 1
---

# Site Model
The entity of Site is represented as a model in MoonGuard, and it has the
following definition:

## Fillable Fields
| Field Name                    | Description                                                                   |
|-------------------------------|-------------------------------------------------------------------------------|
| `url`                           | The URL of the website being monitored.                                       |
| `name`                          | The name of the website being monitored.                                      |
| `uptime_check_enabled`          | A boolean value indicating whether or not uptime checks are enabled.          |
| `ssl_certificate_check_enabled` | A boolean value indicating whether or not SSL certificate checks are enabled. |
| `max_request_duration_ms`       | The maximum allowed request duration in milliseconds.                         |
| `down_for_maintenance_at`       | The date and time when the website is down for maintenance.                   |
| `api_token`                     | An API token used for authenticating requests to the MoonGuard API.           |

## Casts
| Name                   | Description                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `max_request_duration_ms`       | The maximum allowed request duration in milliseconds, casted using the `RequestDurationCast`     class   |
| `down_for_maintenance_at`       | The date and time when the website is down for maintenance, casted to an immutable datetime object |
| `uptime_check_enabled`          | The flag indicating whether uptime checks are enabled, casted to a boolean                         |
| `ssl_certificate_check_enabled` | The flag indicating whether SSL certificate checks are enabled, casted to a boolean                |

## Methods
| Method Name                                          | Return Type    | Description                                                                                                                                                                                                     |
|------------------------------------------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scopeWhereUptimeCheckEnabled(Builder $query)`         | Builder        | A query scope that filters the query to include only websites with uptime checks enabled.                                                                                                                       |
| `scopeWhereSslCertificateCheckEnabled(Builder $query)` | Builder        | A query scope that filters the query to include only websites with SSL certificate checks enabled.                                                                                                              |
| `scopeWhereIsNotOnMaintenance(Builder $query)`         | Builder        | A query scope that filters the query to include only websites that are not currently on maintenance.                                                                                                            |
| `url()`                                                | Attribute      | Returns an **Attribute** instance that represents the URL of the website.                                                                                                                                           |
| `uptimeCheck()`                                        | HasOne         | Returns a **HasOne** relationship between the **Site** model and the **UptimeCheck** model. This method allows you to retrieve the uptime check associated with the website.                                                |
| `sslCertificateCheck()`                                | HasOne         | Returns a **HasOne** relationship between the **Site** model and the **SslCertificateCheck** model. This method allows you to retrieve the SSL certificate check associated with the website.                               |
| `exceptionLogs()`                                      | HasManyThrough | Returns a **HasManyThrough** relationship between the **Site** model and the **ExceptionLog** model through the **ExceptionLogGroup** model. This method allows you to retrieve the exception logs associated with the website. |
| `exceptionLogGroups()`                                 | HasMany        | Returns a **HasMany** relationship between the **Site** model and the **ExceptionLogGroup** model. This method allows you to retrieve the exception log groups associated with the website.                                 |
| `newCollection(array $models = [])`                    | SiteCollection | Overrides the **newCollection** method to return a custom **SiteCollection** instance. This method allows you to customize the collection returned when querying the **Site** model.                                        |

# Using a custom Site Model
In case is needed to use a custom Site model we recommend the following steps:
1. Create a new `Site` class that extends from `Illuminate\Database\Eloquent\Model`
and implements the `Taecontrol\MoonGuard\Contracts\MoonGuardSite` contract.

```php
<?php

use Illuminate\Database\Eloquent\Model;
use Taecontrol\MoonGuard\Contracts\MoonGuardSite;

class Site extends Model implements MoonGuardSite
{
    // Implementation of the interface
}
```

2. The `Site` class must implement all the properties and methods required, you
can guide yourself with the original [`Site.php`](https://github.com/taecontrol/moonguard/blob/v0.1.0/src/Models/Site.php)
model from Moonguard.

3. Replace the new `Site` model class in the configuration file.

```json
'site' => [
    'model' => \Taecontrol\MoonGuard\Models\Site::class,//replace model
],
```
