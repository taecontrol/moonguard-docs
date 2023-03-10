---
id: site-model
slug: /site-model
sidebar_position: 1
---

# Site Model

Site is the representation of your production apps, webs, platforms and it represents the main entity of Moonguard, everything is related to a site.

## Atributes

- url: ***[string]***
- name: ***[string]***
- uptime_check_enabled: ***[boolean]***
- ssl_certificate_check_enabled: ***[boolean]***
- max_request_duration_ms: ***[string]***
- down_for_maintenance_at: ***[string]***
- api_token: ***[string]***

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

## Custom Site Model

Follow the next steps to make your own `Site` model:

1. Create a new `Site` class that extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\MoonGuard\Contracts\MoonGuardSite` contract.
2. The `Site` class must implement all the properties and methods required, you can guide yourself with the original `Site.php` model from Moonguard.
3. Replace the new `Site` model class in the configuration file.
