---
id: notifications
slug: /notifications
sidebar_position: 1
---

# Notifications

Moonguard ships with some notifications for different use cases and scenarios, we've added the following notifications:

- New Exception Log Group.
- Request Took Longer Than Maximum Duration.
- SSL Certificate Check Failed.
- SSL Certificate Expires Soon.
- Uptime Check Failed.
- Uptime Check Recovered.

:::tip Take care
All the notifications are using the `Illuminate\Contracts\Queue\ShouldQueue` interface and `Illuminate\Bus\Queueable` trait, you must setup a queue driver to send notifications (we recommend redis).
:::
