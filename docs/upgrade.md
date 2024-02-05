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

## Renamed Classes



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

Also, new fields in the Site table `server_monitoring_notification_enabled`,
`cpu_limit`, `ram_limit`, and `disk_limit` were added.

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
if you want to see the full migration file, please refers to
[migrations docs](./migrations.md))

## Upgrade config



Delete the all `config/moonguard.php` file and republish it using:

```bash
php artisan vendor:publish --tag="moonguard-config"
```





