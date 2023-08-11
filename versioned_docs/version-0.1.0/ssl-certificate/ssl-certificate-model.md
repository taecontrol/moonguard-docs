---
id: ssl-certificate-model
slug: /ssl-certificate-model
sidebar_position: 1
---

# The SslCertificateCheck model

The entity of SslCertificateCheck is represented as a model in MoonGuard, and it has the
following definition:

### Casts

| Name | Description |
| --- | --- |
| `status` | The status of the SSL certificate check, casted to the `SslCertificateStatus` enum |
| `expiration_date` | The expiration date of the SSL certificate, casted to an immutable datetime object |

### Methods

| Method Name | Return Type | Description |
| --- | --- | --- |
| `site()` | BelongsTo | Returns a `BelongsTo` relationship between the `SslCertificateCheck` model and the `Site` model. This method allows you to retrieve the site associated with the SSL certificate check. |
| `saveCertificate(SslCertificate $certificate, Url $url)` | void | Saves the result of a successful SSL certificate check. This method sets the status of the SSL certificate check to "VALID" if the certificate is valid, or "INVALID" if the certificate is invalid. It also saves the expiration date and issuer of the certificate. |
| `saveError(Exception $exception)` | void | Saves the result of a failed SSL certificate check. This method sets the status of the SSL certificate check to "INVALID", and saves the failure reason. |
| `certificateIsValid()` | bool | Returns a boolean indicating whether the SSL certificate is valid. |
|`certificateIsInvalid()` | bool | Returns a boolean indicating whether the SSL certificate is invalid. |
| `certificateIsAboutToExpire(int $maxDaysToExpire)` | bool | Returns a boolean indicating whether the SSL certificate is about to expire within the specified number of days. |
| `isEnabled()` | Attribute | Returns an `Attribute` instance that indicates whether the SSL certificate check is enabled. |

<br />

## Using a custom SslCertificateCheck Model

In case you want to create a custom SslCertificateCheck model or extends it
capabilities we recommend you the following steps:

1. Create a new **SslCertificateCheck** class that extends from
`Illuminate\Database\Eloquent\Model` and implements the
`Taecontrol\MoonGuard\Contracts\MoonGuardSslCertificateCheck` interface.

```php
<?php

use Illuminate\Database\Eloquent\Model;
use Taecontrol\MoonGuard\Contracts\MoonGuardSslCertificateCheck;

class UptimeCheck extends Model implements MoonGuardSslCertificateCheck
{
  //Contract implementation
}
```
2. Implement all the properties and methods required, you can guide yourself
with the original [`SslCertificateCheck.php`](https://github.com/taecontrol/moonguard/blob/v0.1.0/src/Models/SslCertificateCheck.php)
model from Moonguard here a resume.

3. Replace the SslCertificateCheck class in the configuration file.

```php
[
  'ssl_certificate_check' => [
    'enabled' => true,
    'model' => \Taecontrol\MoonGuard\Models\SslCertificateCheck::class, //-> replace model
    'notify_expiring_soon_if_certificate_expires_within_days' => 7,
    'cron_schedule' => '* * * * *',
  ],
]
```
