---
id: create-a-custom-ssl-certificate-model
slug: /create-a-custom-ssl-certificate-model
sidebar_position: 2
---

# Creating a custom SslCertificateCheck model

If you want to add new features or improve the original MoonGuard
SslCertificateCheck model, we allow you to create a custom SslCertificateCheck
Model for your project doing the following steps.

1. Create a new **SslCertificateCheck** class that extends from 
`Illuminate\Database\Eloquent\Model` and implements the 
`Taecontrol\MoonGuard\Contracts\MoonGuardSslCertificateCheck` interface.

  ```php
  <?php

  use Illuminate\Database\Eloquent\Model;
  use Taecontrol\MoonGuard\Contracts\MoonGuardSslCertificateCheck;

  class SslCertificateCheck extends Model implements MoonGuardSslCertificateCheck
  {
    //Contract implementation
  }
  ```

2. Implement all the properties and methods required, you can guide yourself
with [model reference](./create-a-custom-ssl-certificate-model#model-reference).

3. Replace the SslCertificateCheck class in the configuration file.

  ```php
  <?php

  'ssl_certificate_check' => [
    /*
     * Enable or disable ssl certificate checks globally.
     */
    'enabled' => true,

    /*
     * The ssl certificate check model to use.
     */
    'model' => \Taecontrol\MoonGuard\Models\SslCertificateCheck::class,
  ]
  ```

## Model Reference

```php
<?php

namespace Taecontrol\MoonGuard\Models;

use Exception;
use Spatie\Url\Url;
use Illuminate\Database\Eloquent\Model;
use Spatie\SslCertificate\SslCertificate;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Taecontrol\MoonGuard\Enums\SslCertificateStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Taecontrol\MoonGuard\Repositories\SiteRepository;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Taecontrol\MoonGuard\Contracts\MoonGuardSslCertificateCheck;
use Taecontrol\MoonGuard\Repositories\SslCertificateCheckRepository;

class SslCertificateCheck extends Model implements MoonGuardSslCertificateCheck
{
  use HasFactory;

  protected $casts = [
    'status' => SslCertificateStatus::class,
    'expiration_date' => 'immutable_datetime',
  ];

  public function site(): BelongsTo
  {
    return $this->belongsTo(SiteRepository::resolveModelClass());
  }

  public function saveCertificate(SslCertificate $certificate, Url $url): void
  {
    $this->status = $certificate->isValid($url)
      ? SslCertificateStatus::VALID
      : SslCertificateStatus::INVALID;

    $this->expiration_date = $certificate->expirationDate();
    $this->issuer = $certificate->getIssuer();
    $this->check_failure_reason = null;

    $this->save();
  }

  public function saveError(Exception $exception): void
  {
    $this->status = SslCertificateStatus::INVALID;
    $this->expiration_date = null;
    $this->issuer = '';
    $this->check_failure_reason = $exception->getMessage();

    $this->save();
  }

  public function certificateIsValid(): bool
  {
    return $this->status === SslCertificateStatus::VALID;
  }

  public function certificateIsInvalid(): bool
  {
    return $this->status === SslCertificateStatus::INVALID;
  }

  public function certificateIsAboutToExpire(int $maxDaysToExpire): bool
  {
    return $this->expiration_date?->diffInDays() <= $maxDaysToExpire;
  }

  public function isEnabled(): Attribute
  {
    return Attribute::make(
      get: fn () => SslCertificateCheckRepository::isEnabled(),
    );
  }
}
```

### Casts

| Property Name | Cast Type | Description |
| --- | --- | --- |
| status | SslCertificateStatus | The status of the SSL certificate check, casted to the SslCertificateStatus enum |
| expiration_date | immutable_datetime | The expiration date of the SSL certificate, casted to an immutable datetime object |

### Methods

| Function Name | Return Type | Description |
| --- | --- | --- |
| site | BelongsTo | Returns a BelongsTo relationship between the SslCertificateCheck model and the Site model. This method allows you to retrieve the site associated with the SSL certificate check. |
| saveCertificate(SslCertificate $certificate, Url $url) | void | Saves the result of a successful SSL certificate check. This method sets the status of the SSL certificate check to "VALID" if the certificate is valid, or "INVALID" if the certificate is invalid. It also saves the expiration date and issuer of the certificate. |
| saveError(Exception $exception) | void | Saves the result of a failed SSL certificate check. This method sets the status of the SSL certificate check to "INVALID", and saves the failure reason. |
| certificateIsValid() | bool | Returns a boolean indicating whether the SSL certificate is valid. |
| certificateIsInvalid() | bool | Returns a boolean indicating whether the SSL certificate is invalid. |
| certificateIsAboutToExpire(int $maxDaysToExpire) | bool | Returns a boolean indicating whether the SSL certificate is about to expire within the specified number of days. |
| isEnabled() | Attribute | Returns an Attribute instance that indicates whether the SSL certificate check is enabled. |
