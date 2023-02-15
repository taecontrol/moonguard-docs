---
id: ssl-certificate-check-filament
slug: /ssl-certificate-check-filament
sidebar_position: 2
---

# Working with Filament

You'll be able to see your sites SSL certificate status in the main dashboard.
![Dashboard](./img/dashboard.png)

:::tip Note
This data is available after running the `CheckSslCertificateCommand` command.
:::

<br/>

## Status Card
This card displays "Certificate" (status for **Ok**, **Invalid** or **Not yet checked**).


This is an example of a status card for Google:
![Google status card with certificate status as Ok](./img/google-status.png)

This is an example of a status card for a non-existing site:
![Status card with certificate status as invalid](./img/invalid-status.png)
