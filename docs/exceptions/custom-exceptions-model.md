---
id: custom-exceptions-model
slug: /custom-exceptions-model
sidebar_position: 2
---

# Creating a custom Exception Model

If you want to add new features or improve the original MoonGuard ExceptionLog
model, we allow you to create custom models of these for your project doing the
following steps.

1. Create a new **ExceptionLog** class that extends from 
`Illuminate\Database\Eloquent\Model` and implements the 
`Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLog` interface.

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
with the [model reference](./custom-exceptions-model#Model-Reference).

3. Replace the new ExceptionLog model class in the configuration file.

```php
<?php

'exceptions' => [
  //...
  'exception_log' => [
      /*
       * The exception log model to use.
       */
      'model' => \Taecontrol\MoonGuard\Models\ExceptionLog::class,
  ],

  'exception_log_group' => [
      /*
       * The exception log group model to use.
       */
      'model' => \Taecontrol\MoonGuard\Models\ExceptionLogGroup::class,
  ],

]
```

In case you want to re implement the ExceptionLogGroup model you can use the
guide of ExceptionLog model and implement
`Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLogGroup` and `ExceptionLogGroup.php`

Please check the [model reference](./custom-exceptions-model#Model-Reference)
for more information.

## Model Reference

## Reference ExceptionLog model

```php
<?php

namespace Taecontrol\MoonGuard\Models;

use Illuminate\Database\Eloquent\Model;
use Taecontrol\MoonGuard\Enums\ExceptionLogStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Taecontrol\MoonGuard\Repositories\SiteRepository;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLog;
use Taecontrol\MoonGuard\Repositories\ExceptionLogGroupRepository;

class ExceptionLog extends Model implements MoonGuardExceptionLog
{
  use HasFactory;

  protected $fillable = [
    'message',
    'type',
    'file',
    'status',
    'trace',
    'request',
    'line',
    'thrown_at',
    'exception_log_group_id',
  ];

  protected $casts = [
    'status' => ExceptionLogStatus::class,
    'trace' => 'array',
    'request' => 'array',
    'thrown_at' => 'immutable_datetime',
  ];

  public function site(): HasOneThrough
  {
    return $this->hasOneThrough(
      SiteRepository::resolveModelClass(),
      ExceptionLogGroupRepository::resolveModelClass()
    );
  }

  public function exceptionLogGroup(): BelongsTo
  {
    return $this->belongsTo(ExceptionLogGroupRepository::resolveModelClass());
  }
}
```

### Fillable fields

| Name | Description |
| --- | --- |
| message | The error message associated with the exception |
| type | The type of the exception |
| file | The file where the exception occurred |
| status | The status of the exception log |
| trace | The stack trace of the exception |
| request | The HTTP request associated with the exception |
| line | The line number where the exception occurred |
| thrown_at | The date and time when the exception was thrown |
| exception_log_group_id | The ID of the exception log group that this exception log belongs to |

### Casts

| Name | Description |
| --- | --- |
| status | The status of the exception log, casted to the ExceptionLogStatus enum |
| trace | The stack trace of the exception, casted to an array |
| request | The HTTP request associated with the exception, casted to an array |
| thrown_at | The date and time when the exception was thrown, casted to an immutable datetime object |

### Methods

| Method Name | Return Type | Description |
| --- | --- | --- |
| site() | HasOneThrough | Returns a HasOneThrough relationship between the ExceptionLog model and the Site model through the ExceptionLogGroup model. This method allows you to retrieve the site associated with the exception log. |
| exceptionLogGroup() | BelongsTo | Returns a BelongsTo relationship between the ExceptionLog model and the ExceptionLogGroup model. This method allows you to retrieve the exception log group that this exception log belongs to. |


## Reference ExceptionLogGroup model

```php
<?php

namespace Taecontrol\MoonGuard\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Taecontrol\MoonGuard\Repositories\SiteRepository;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Taecontrol\MoonGuard\Repositories\ExceptionLogRepository;
use Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLogGroup;

class ExceptionLogGroup extends Model implements MoonGuardExceptionLogGroup
{
  use HasFactory;

  protected $fillable = [
    'site_id',
    'message',
    'type',
    'file',
    'line',
    'first_seen',
    'last_seen',
  ];

  protected $casts = [
    'first_seen' => 'immutable_datetime',
    'last_seen' => 'immutable_datetime',
  ];

  public function exceptionLogs(): HasMany
  {
    return $this->hasMany(ExceptionLogRepository::resolveModelClass());
  }

  public function site(): BelongsTo
  {
    return $this->belongsTo(SiteRepository::resolveModelClass());
  }
}
```

### Fillable fields

| Name | Description |
| --- | --- |
| site_id | The ID of the site associated with the exception log group |
| message | The error message associated with the exception |
| type | The type of the exception |
| file | The file where the exception occurred |
| line | The line number where the exception occurred |
| first_seen | The date and time when the exception was first seen |
| last_seen | The date and time when the exception was last seen |

### **Casts**

| Column Name | Description |
| --- | --- |
| first_seen | The date and time when the exception was first seen, casted to an immutable datetime object |
| last_seen | The date and time when the exception was last seen, casted to an immutable datetime object |

### **Methods**

| Method Name | Return Type | Description |
| --- | --- | --- |
| exceptionLogs() | HasMany | Returns a HasMany relationship between the ExceptionLogGroup model and the ExceptionLog model. This method allows you to retrieve the exception logs associated with this exception log group. |
| site() | BelongsTo | Returns a BelongsTo relationship between the ExceptionLogGroup model and the Site model. This method allows you to retrieve the site associated with this exception log group. |
