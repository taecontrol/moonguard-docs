---
id: migrations
slug: /migrations
sidebar_position: 3
---

# Migrations

Here are the latest migrations and tables used in MoonGuard. You can always
publish them using:

```bash
php artisan vendor:publish --tag="moonguard-migrations"
```
In case you need a particular table you can make your own migration file and use
our Schema instruction in your project.

## create_moonguard_tables.php:

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

        if ( !Schema::hasTable('server_metrics') ) {
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

        if ( !Schema::hasTable('server_metrics') ) {
            Schema::table('server_metrics', function (Blueprint $table) {
                $table->dropForeignIdFor(SiteRepository::resolveModelClass());
            });
        }

        Schema::dropIfExists('uptime_checks');
        Schema::dropIfExists('ssl_certificate_checks');
        Schema::dropIfExists('exception_logs');
        Schema::dropIfExists('exception_log_groups');
        Schema::dropIfExists('server_metrics');
        Schema::dropIfExists('sites');
    }
};
```

## add_server_monitoring_fields_on_sites_table.php:

```php

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSMFieldsOnSitesTable extends Migration
{
    public function up()
    {
        Schema::table('sites', function (Blueprint $table) {
            $table->boolean('server_monitoring_notification_enabled')->default(false);
            $table->integer('cpu_limit')->nullable();
            $table->integer('ram_limit')->nullable();
            $table->integer('disk_limit')->nullable();
        });
    }
}
```




