---
id: site-model
slug: /site-model
sidebar_position: 1
---

# Site Model

Site is the representation of your production apps, webs, platforms and they are the main entity of Larastats, everything is related to a site.

You can create a new Site using:

```php
$site = Site::create([
  'url' => 'https://myApp.com',
  'name' => 'My App'
  'uptime_check_enabled' => true
  'ssl_certificate_check_enabled' => true
  'max_request_duration_ms' => 2000
]);
```

## Site relationships

To obtain the uptime check from a site we may use:

```php
$uptimeCheck = $site->uptimeCheck;
```

To obtain the ssl certificate check from a site we may use:

```php
$sslCertificateCheck = $site->sslCertificateCheck;
```

To obtain the exceptions of a site you may use:

```php
$exceptions = $site->exceptionLogs;
```

Or by exception groups:

```php
$exceptionGroups = $site->exceptionLogGroups;
```

## Scopes

You may use some of the following scopes:

- scopeWhereUptimeCheckEnabled(Bulder $query): Builder
- scopeWhereSslCertificateCheckEnabled(Bulder $query): Builder
- scopeWhereIsNotOnMaintenance(Bulder $query): Builder

## Atributes

- url: _string_

## Custom Site Model

The following steps must be completed to create a custom site model:

1. Create a new **Site** class that extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\Larastats\Contracts\LarastatsSite` interface.
2. Implement all the properties and methods required, you can guide yourself with the original `Site.php` model from Larastats.
3. Replace the new Site model class in the configuration file.
