---
id: ssl-certificate-check-service
slug: /ssl-certificate-check-service
sidebar_position: 5
---

# Services

## UptimeCheckService

This class have the method `check` that allow:

- Verify if there is an SSL certificate in the database, and if not, create one.
- Notify users depending on whether the certificate is invalid, the request fails, 
or the certificate has expired.

Here an example:

```php

$SslCertificateService = new SslCerfiticateService();

$SslCertificateService->check();

```