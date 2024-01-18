---
id: migrations
slug: /migrations
sidebar_position: 3
---

If you have previously obtained the MoonGuard migrations, you will need to
incorporate the following updates:

In the `create_moonguard_tables` migration, add the `system_metrics` table.

```php

<?php

class CreateMoonGuardTables extends Migration {
    public function up()
    {

      //...

      Schema::create('system_metrics', function (Blueprint $table) {
        $table->id();
        $table->integer('cpu_usage');
        $table->integer('memory_usage');
        $table->json('disk_usage');
        $table->foreignIdFor(SiteRepository::resolveModelClass())
          ->constrained()
          ->cascadeOnDelete()
          ->cascadeOnUpdate();

        $table->timestamps();
      });
    }

    public function down()
    {
      //...

      Schema::table('system_metrics', function (Blueprint $table) {
        $table->dropForeignIdFor(SiteRepository::resolveModelClass());
      });

      Schema::dropIfExists('system_metrics');
    }
}
```

To ensure that MoonGuard migrations are not duplicated when republished, you
need to add the `!Schema::hasTable('<table_name>')` condition to each table.
This condition secures the migration process and prevents duplication.

```php

<?php

class CreateMoonGuardTables extends Migration {
    public function up()
    {
      if ( !Schema::hasTable('<table_name>') ) {
        Schema::create('table_name', function (Blueprint $table) {
          //...
        }
      }
    }

    public function down()
    {
      if ( !Schema::hasTable('<table_name>') ) {
        Schema::table('<table_name>', function (Blueprint $table) {
          //...
        });
      }
    }
}
```

After updating the `create_moonguard_tables` file, you can run the `vendor:publish`
command again. This will not only update the existing migrations but also add a
new migration called `add_sm_fields_on_site_table`. This migration is used in our
new system monitoring feature.

Here is a full script migration `create_moonguard_tables`.

```php

<?php

use Taecontrol\MoonGuard\Enums\UptimeStatus;
use Taecontrol\MoonGuard\Enums\SslCertificateStatus;
use Taecontrol\MoonGuard\Enums\ExceptionLogStatus;
use Taecontrol\MoonGuard\Repositories\SiteRepository;
use Taecontrol\MoonGuard\Repositories\ExceptionLogGroupRepository;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMoonGuardTables extends Migration {
  public function up()
  {
    if ( !Schema::hasTable('sites') ) {
      Schema::create('sites', function (Blueprint $table) {
        $table->id();

        $table->string('url')->unique();
        $table->string('name');
        $table->boolean('uptime_check_enabled')->default(true);
        $table->boolean('ssl_certificate_check_enabled')->default(true);
        $table->unsignedInteger('max_request_duration_ms')->default(1000);
        $table->timestamp('down_for_maintenance_at')->nullable();
        $table->string('api_token', 60)->nullable();
        $table->integer('cpu_limit')->nullable();
        $table->integer('ram_limit')->nullable();
        $table->integer('disk_limit')->nullable();
        $table->boolean('hardware_monitoring_notification_enabled')->default(false);

        $table->timestamps();
      });
    }

    if ( !Schema::hasTable('uptime_checks') ) {
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

    if ( !Schema::hasTable('ssl_certificate_checks') ) {
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

    if ( !Schema::hasTable('exception_log_groups') ) {
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

    if ( !Schema::hasTable('exception_logs') ) {
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

    if ( !Schema::hasTable('system_metrics') ) {
      Schema::create('system_metrics', function (Blueprint $table) {
        $table->id();
        $table->integer('cpu_usage');
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
    if ( !Schema::hasTable('uptime_checks') ) {
      Schema::table('uptime_checks', function (Blueprint $table) {
        $table->dropForeignIdFor(SiteRepository::resolveModelClass());
      });
    }

    if ( !Schema::hasTable('ssl_certificate_checks') ) {
      Schema::table('ssl_certificate_checks', function (Blueprint $table) {
        $table->dropForeignIdFor(SiteRepository::resolveModelClass());
      });
    }

    if ( !Schema::hasTable('exception_logs') ) {
      Schema::table('exception_logs', function (Blueprint $table) {
        $table->dropForeignIdFor(SiteRepository::resolveModelClass());
        $table->dropForeignIdFor(ExceptionLogGroupRepository::resolveModelClass());
      });
    }

    if ( !Schema::hasTable('exception_log_groups') ) {
      Schema::table('exception_log_groups', function (Blueprint $table) {
        $table->dropForeignIdFor(SiteRepository::resolveModelClass());
      });
    }

    if ( !Schema::hasTable('system_metrics') ) {
      Schema::table('system_metrics', function (Blueprint $table) {
        $table->dropForeignIdFor(SiteRepository::resolveModelClass());
      });
    }

    Schema::dropIfExists('uptime_checks');
    Schema::dropIfExists('ssl_certificate_checks');
    Schema::dropIfExists('exception_logs');
    Schema::dropIfExists('exception_log_groups');
    Schema::dropIfExists('sites');
    Schema::dropIfExists('system_metrics');
  }
};
```





