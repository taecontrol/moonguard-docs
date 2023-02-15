---
id: ssl-certificate-check-model
slug: /ssl-certificate-check-model
sidebar_position: 1
---

# Model

It represents the result of the last ssl certificate check of a site.

## Relationships

You may get the related site with:

```php
$sslCheck = SslCertificateCheck::first();
$site = $sslCheck->site;
```

## Capabilities

You could save a certificate (it'll be checked) with:

```php
$sslCheck = SslCertificateCheck::first();
$certificate = new SslCertificate(...);
$url = '...';

$sslCheck->saveCertificate($certificate, $url);
```

Or save an error (exception) from checking the SSL certificate with:

```php
$sslCheck->saveError($exception);
```

You can check if your certificate check if valid, invalid or about to expire with:

```php
$sslCheck->certificateIsValid();
$sslCheck->certificateIsInvalid();
$sslCheck->certificateIsAboutToExpire(4);
```

## Attributes

- isEnabled: _bool_

## Custom Ssl Certificate Check Model

The following steps must be completed to create a custom SSL Certificate Check model:

1. Create a new **SslCertificateCheck** class that extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\Moonguard\Contracts\MoonguardSslCertificateCheck` interface.
2. Implement all the properties and methods required, you can guide yourself with the original `SslCertificateCheck.php` model from Moonguard.
3. Replace the new Site model class in the configuration file.
