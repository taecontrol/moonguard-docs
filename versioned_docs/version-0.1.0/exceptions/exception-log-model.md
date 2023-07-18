---
id: exception-log-model
slug: /exception-log-model
sidebar_position: 1
---

# Exception Log Models

We use two models two keep track of all sites exceptions:

- Exception Log
- Exception Log Group

## Relationships

If you have an exception log you can obtain which site belongs with:

```php
$exceptionLog = ExceptionLog::first();
$exceptionLog->site;
```

You may obtain which group the exception logs belongs to:

```php
$exceptionLogGroup = $exceptionLog->exceptionLogGroup;
```

You may also obtain the site from the group:

```php
$exceptionLogGroup->site;
```

And you can obtain all the exception logs from a group:

```php
$exceptionLogs = $exceptionLogGroup->exceptionLogs;
```

## Custom Exception Log Model

The following steps must be completed to create a custom site model:

1. Create a new **ExceptionLog** class that extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLog` interface.
2. Implement all the properties and methods required, you can guide yourself with the original `ExceptionLog.php` model from Moonguard.
3. Replace the new ExceptionLog model class in the configuration file.

## Custom Exception Log Group Model

The following steps must be completed to create a custom site model:

1. Create a new **ExceptionLogGroup** class that extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\MoonGuard\Contracts\MoonGuardExceptionLogGroup` interface.
2. Implement all the properties and methods required, you can guide yourself with the original `ExceptionLogGroup.php` model from Moonguard.
3. Replace the new ExceptionLogGroup model class in the configuration file.