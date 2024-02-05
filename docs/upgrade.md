---
id: upgrade
slug: /upgrade
sidebar_position: 14
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


    public function serverMetrics(): HasMany
    {
        return $this->hasMany(ServerMetric::class);
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

In case that you have a custom Exception Command setup,
Change the `DeleteOldExceptionCommand` class to `PruneExceptionCommand`in your
`console/kernel.php` file.

```php

<?php
//...
use Taecontrol\MoonGuard\Console\Commands\PruneExceptionCommand;
```


## Upgrade Migrations

MoonGuard 1.2.0, updated the `create_moonguard_tables.php.stub` file with the new
`server_metrics`table as following.

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

class CreateMoonGuardTables extends Migration
{
    public function up()
    {
      //...
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

      //...
      Schema::table('server_metrics', function (Blueprint $table) {
          $table->dropForeignIdFor(SiteRepository::resolveModelClass());
      });

      //..
      Schema::dropIfExists('server_metrics');

```

In addition, new fields have been added to the Site table, including
`server_monitoring_notification_enabled`, `cpu_limit`, `ram_limit`, and
`disk_limit`.

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

class CreateMoonGuardTables extends Migration
{
    public function up()
    {
        if (! Schema::hasTable('sites')) {
            Schema::create('sites', function (Blueprint $table) {
                //...
                $table->boolean('server_monitoring_notification_enabled')->default(false);
                $table->integer('cpu_limit')->nullable();
                $table->integer('ram_limit')->nullable();
                $table->integer('disk_limit')->nullable();
                $table->string('api_token', 60)->nullable();

                $table->timestamps();
            });
```
If you want to see the full migration file, please refers to
[migrations doc](./migrations.md))

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

Please refers to [config doc](./configuration.md)) for more information.
