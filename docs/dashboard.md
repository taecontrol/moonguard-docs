---
id: dashboard
slug: /dashboard
sidebar_position: 12
---

# Dashboard

You'll be able to see your sites status in the main dashboard.
![Dashboard](./uptime-check/img/dashboard.png)

:::tip Note
This data is available after running the `CheckUptimeCommand` command or `CheckSslCertificateCommand` command
depending of the case.
:::

## Status Card
The status card shows the following parameters:

- **"Performance"**:last request time in ms.
- **"Uptime"**:status for **Up** or **Down**.
- **Certificate**:status for **Ok**, **Invalid** or **Not yet checked**.
- **Exceptions**: Number of exceptions.

Here are some examples:

Status card for a local project site:

![Dehoot Uptime Status Card](./uptime-check/img/uptime-card.png)

Status card for Google:

![Google status card with certificate status as Ok](./ssl-certificate-check/img/google-status.png)

Status card for a non-existing site:

![Status card with certificate status as invalid](./ssl-certificate-check/img/invalid-status.png)