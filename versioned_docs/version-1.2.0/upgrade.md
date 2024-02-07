---
id: upgrade
slug: /upgrade
sidebar_position: 3
---

# Upgrade Guide

We are pleased to present version 1.2.0 of the MoonGuard Filament Plugin!

## What's new

In this release, we have added a functionality to monitor the performance and
health of your applications.

This functionality allows for tracking CPU load, RAM usage,
and hard disk storage space.

It also includes break changes, mostly related to class names, new configuration
file and updated migrations. This guide explains how to upgrade your project to
v1.2.0

## Update custom Site model

When creating a custom `site` model, make sure to include any new variables for
the `site` table in both the `$fillable` and `$cast` variables. Additionally, don't
forget to add the `serverMetrics()` relation method.

```php

<?php

namespace Taecontrol\MoonGuard\Models;

use Spatie\Url\Url;
use Illuminate\Database\Eloquent\Model;
//...

class Site extends Model implements MoonGuardSite
{
    use HasFactory;

    protected $fillable = [
        //...
        'cpu_limit',
        'ram_limit',
        'disk_limit',
        'server_monitoring_notification_enabled',
    ];

    protected $casts = [
        //...
        'server_monitoring_notification_enabled' => 'boolean',
    ];

    //...
    public function serverMetrics(): HasMany
    {
        return $this->hasMany(ServerMetric::class);
    }
}
```

## Commands

The `MoonGuardCommandScheduler` is being updated to include a new
`PruneServerMetricCommand` and to change the `DeleteOldExceptionCommand` class to
`PruneExceptionCommand`. Therefore, you need to ensure that you add these changes
to your scheduler.

```php

<?php

use Taecontrol\MoonGuard\Console\MoonGuardCommandsScheduler;
//...

protected function schedule(Schedule $schedule): void
{
  MoonGuardCommandsScheduler::scheduleMoonGuardCommands(
    $schedule,
    //...
    '0 0 * * *', //<-- [Optional] Prune Exceptions Cron
    '0 0 * * *' //<-- [Optional] Prune Server Metrics
  );
}
```

In case that you're using `DeleteOldExceptionCommand` you need to replace it with
the new `PruneExceptionCommand`, in your `console/kernel.php` file.

```php

<?php
//...
use Taecontrol\MoonGuard\Console\Commands\PruneExceptionCommand;
```


## Migrations

We have updated the main migration stub file to include a new `server_metrics`
table. Additionally, we have added new fields to the Site table, such as
`server_monitoring_notification_enabled`, `cpu_limit`, `ram_limit`, and `disk_limit`,
to support the new server monitoring feature.

This implies creating a new migration

```bash
php artisan make:migration create_server_metrics_tables

```

Then add the following structure:

```php

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Taecontrol\MoonGuard\Enums\UptimeStatus;
use Illuminate\Database\Migrations\Migration;
use Taecontrol\MoonGuard\Enums\ExceptionLogStatus;
use Taecontrol\MoonGuard\Enums\SslCertificateStatus;
use Taecontrol\MoonGuard\Repositories\SiteRepository;
use Taecontrol\MoonGuard\Repositories\ExceptionLogGroupRepository;

class CreateServerMetricsTables extends Migration
{
    public function up()
    {
        if (! Schema::hasTable('sites')) {
            Schema::create('sites', function (Blueprint $table) {
                $table->id();

                $table->string('url')->unique();
                $table->string('name');
                $table->boolean('uptime_check_enabled')->default(true);
                $table->boolean('ssl_certificate_check_enabled')->default(true);
                $table->unsignedInteger('max_request_duration_ms')->default(1000);
                $table->timestamp('down_for_maintenance_at')->nullable();
                $table->boolean('server_monitoring_notification_enabled')->default(false);
                $table->integer('cpu_limit')->nullable();
                $table->integer('ram_limit')->nullable();
                $table->integer('disk_limit')->nullable();
                $table->string('api_token', 60)->nullable();

                $table->timestamps();
            });
        }

        if (! Schema::hasTable('uptime_checks')) {
            Schema::create('uptime_checks', function (Blueprint $table) {
                $table->id();

                $table->string('look_for_string')->default('');
                $table->string('status')->default(UptimeStatus::NOT_YET_CHECKED->value);
                $table->text('check_failure_reason')->nullable();
                $table->integer('check_times_failed_in_a_row')->default(0);
                $table->timestamp('status_last_change_date')->nullable();
                $table->timestamp('last_check_date')->nullable();
                $table->timestamp('check_failed_event_fired_on_date')->nullable();
                $table->integer('request_duration_ms')->nullable();
                $table->string('check_method')->default('get');
                $table->text('check_payload')->nullable();
                $table->text('check_additional_headers')->nullable();
                $table->string('check_response_checker')->nullable();

                $table->foreignIdFor(SiteRepository::resolveModelClass())
                    ->constrained()
                    ->onDelete('cascade');

                $table->timestamps();
            });
        }

        if (! Schema::hasTable('ssl_certificate_checks')) {
            Schema::create('ssl_certificate_checks', function (Blueprint $table) {
                $table->id();

                $table->string('status')->default(SslCertificateStatus::NOT_YET_CHECKED->value);
                $table->string('issuer')->nullable();
                $table->timestamp('expiration_date')->nullable();
                $table->string('check_failure_reason')->nullable();

                $table->foreignIdFor(SiteRepository::resolveModelClass())
                    ->constrained()
                    ->onDelete('cascade');

                $table->timestamps();
            });
        }

        if (! Schema::hasTable('exception_log_groups')) {
            Schema::create('exception_log_groups', function (Blueprint $table) {
                $table->id();

                $table->text('message');
                $table->string('type');
                $table->string('file');
                $table->unsignedInteger('line');
                $table->timestamp('first_seen');
                $table->timestamp('last_seen');
                $table->timestamps();

                $table->foreignIdFor(SiteRepository::resolveModelClass())
                    ->constrained()
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();
            });
        }

        if (! Schema::hasTable('exception_logs')) {
            Schema::create('exception_logs', function (Blueprint $table) {
                $table->id();

                $table->text('message');
                $table->string('type');
                $table->string('file');
                $table->string('status')->default(ExceptionLogStatus::UNRESOLVED->value);
                $table->unsignedInteger('line');
                $table->json('trace');
                $table->json('request')->nullable();
                $table->timestamp('thrown_at');

                $table->foreignIdFor(ExceptionLogGroupRepository::resolveModelClass())
                    ->constrained()
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();

                $table->timestamps();
            });
        }

        if (! Schema::hasTable('server_metrics')) {
            Schema::create('server_metrics', function (Blueprint $table) {
                $table->id();
                $table->integer('cpu_load');
                $table->integer('memory_usage');
                $table->json('disk_usage');
                $table->foreignIdFor(SiteRepository::resolveModelClass())
                    ->constrained()
                    ->cascadeOnDelete()
                    ->cascadeOnUpdate();

                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::table('uptime_checks', function (Blueprint $table) {
            $table->dropForeignIdFor(SiteRepository::resolveModelClass());
        });

        Schema::table('ssl_certificate_checks', function (Blueprint $table) {
            $table->dropForeignIdFor(SiteRepository::resolveModelClass());
        });

        Schema::table('exception_logs', function (Blueprint $table) {
            $table->dropForeignIdFor(SiteRepository::resolveModelClass());
            $table->dropForeignIdFor(ExceptionLogGroupRepository::resolveModelClass());
        });

        Schema::table('exception_log_groups', function (Blueprint $table) {
            $table->dropForeignIdFor(SiteRepository::resolveModelClass());
        });

        Schema::table('server_metrics', function (Blueprint $table) {
            $table->dropForeignIdFor(SiteRepository::resolveModelClass());
        });

        Schema::dropIfExists('uptime_checks');
        Schema::dropIfExists('ssl_certificate_checks');
        Schema::dropIfExists('exception_logs');
        Schema::dropIfExists('exception_log_groups');
        Schema::dropIfExists('server_metrics');
        Schema::dropIfExists('sites');
    }
}
```

Finally run the migrations to update the database.

```bash
php artisan migrate
```
Please refers to [migrations documentation](./migrations.md) for more information.

## Upgrade config

We have updated our `moonguard.php` configuration file to incorporate the server
metrics features. As part of this update, we have changed the
`exception_deletion` configuration to `prune_deletion`.

```php
<?php
[
  //...
  'prune_exception' => [
    /*
     * Enable or disable pruning exceptions data.
     */
    'enabled' => true,

    /*
     * Eliminates exceptions that are older than 7 days.
     */
    'prune_exceptions_older_than_days' => 7,
  ],
]
```

We have also included the `prune_server_monitoring` configuration and added the
`ServerMetricAlertEvent` and `ServerMetricAlertListener` classes to the event array.

```php

<?php

[
  //...
  'prune_server_monitoring' => [
    /*
    * Enables or disables pruning server monitoring data.
    */
    'enabled' => true,

    /*
    * Deletes server monitoring logs that are older than 7 days..
    */
    'prune_server_monitoring_records_older_than_days' => 7,
  ],
]
```

```php

<?php

[
  //...
  'events' => [
    /*
    * the events that can be listened for.
    * you can add your own listeners here.
    */
    'listen' => [
      //...
      \Taecontrol\MoonGuard\Events\ServerMetricAlertEvent::class => [
          \Taecontrol\MoonGuard\Listeners\ServerMetricAlertListener::class,
      ],
    ],
  ],
]
```

Please refers to [config documentation](./configuration.md) for more information.
