---
id: exception-model
slug: /exception-model
sidebar_position: 1
---

# The ExceptionLog and ExceptionLogGroup model

Here are some features of the ExceptionLog Model and ExceptionLogGroup that can
be useful for your project:

## ExceptionLog

### Fillable Fields

| Field Name | Description |
| --- | --- |
| `message` | The error message associated with the exception |
| `type` | The type of the exception |
| `file` | The file where the exception occurred |
| `status` | The status of the exception log |
| `trace` | The stack trace of the exception |
| `request` | The HTTP request associated with the exception |
| `line` | The line number where the exception occurred |
| `thrown_at` | The date and time when the exception was thrown |
| `exception_log_group_id` | The ID of the exception log group that this exception log belongs to |

### Casts

| Name | Description |
| --- | --- |
| `status` | The status of the exception log, casted to the `ExceptionLogStatus` enum |
| `trace` | The stack trace of the exception, casted to an array |
| `request` | The HTTP request associated with the exception, casted to an array |
| `thrown_at` | The date and time when the exception was thrown, casted to an immutable datetime object |

### Methods

| Method Name | Return Type | Description |
| --- | --- | --- |
| `site()` | HasOneThrough | Returns a `HasOneThrough` relationship between the `ExceptionLog` model and the `Site` model through the `ExceptionLogGroup` model. This method allows you to retrieve the site associated with the exception log. |
| `exceptionLogGroup()` | BelongsTo | Returns a `BelongsTo` relationship between the `ExceptionLog` model and the `ExceptionLogGroup` model. This method allows you to retrieve the exception log group that this exception log belongs to. |

## ExceptionLogGroup

### Fillable Fields

| Field Name | Description |
| --- | --- |
| `site_id` | The ID of the site associated with the exception log group |
| `message` | The error message associated with the exception |
| `type` | The type of the exception |
| `file` | The file where the exception occurred |
| `line` | The line number where the exception occurred |
| `first_seen` | The date and time when the exception was first seen |
| `last_seen` | The date and time when the exception was last seen |

### Casts

| Name | Description |
| --- | --- |
| `first_seen` | The date and time when the exception was first seen, casted to an immutable datetime object |
| `last_seen` | The date and time when the exception was last seen, casted to an immutable datetime object |

### Methods

| Method Name | Return Type | Description |
| --- | --- | --- |
| `exceptionLogs()` | HasMany | Returns a `HasMany` relationship between the `ExceptionLogGroup` model and the `ExceptionLog` model. This method allows you to retrieve the exception logs associated with this exception log group. |
| `site()` | BelongsTo | Returns a `BelongsTo` relationship between the `ExceptionLogGroup` model and the `Site` model. This method allows you to retrieve the site associated with this exception log group. |

<br />

# Using a custom Exception Log Model

In case you want to create a custom **ExceptionLog** model or extends it
capabilities we recommend you the following steps:

1. Create a new **ExceptionLog** class that extends from
`Illuminate\Database\Eloquent\Model` and implements the
`Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLog` interface.

```php
<?php

use Illuminate\Database\Eloquent\Model;
use Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLog;

class ExceptionLog extends Model implements MoonGuardExceptionLog
{
  // Contract implementation
}
```

2. Implement all the properties and methods required, you can guide yourself
with the original [`ExceptionLog.php`](https://github.com/taecontrol/moonguard/blob/v0.1.0/src/Models/ExceptionLog.php) model from Moonguard.

3. Replace the new ExceptionLog model class in the configuration file.

```php
[
  'exceptions' => [
    'enabled' => true,
    'notify_time_between_group_updates_in_minutes' => 15,
    'exception_log' => [
      'model' => \Taecontrol\MoonGuard\Models\ExceptionLog::class,
    ],
    'exception_log_group' => [
      'model' => \Taecontrol\MoonGuard\Models\ExceptionLogGroup::class,
    ],
  ],
]
```

In case you want to re implement the ExceptionLogGroup model you can use the
guide of ExceptionLog model and implement
`Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLogGroup` and [`ExceptionLogGroup.php`](https://github.com/taecontrol/moonguard/blob/v0.1.0/src/Models/ExceptionLogGroup.php)
