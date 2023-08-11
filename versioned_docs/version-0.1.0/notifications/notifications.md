---
id: notifications
slug: /notifications
sidebar_position: 1
---

# Notifications

MoonGuard ships with some notifications for multiple use cases and scenarios,
the following notifications are available:

- Request Took Longer Than Maximum Duration.
- SSL Certificate Check Failed.
- SSL Certificate Expires Soon.
- Uptime Check Failed.
- Uptime Check Recovered.
- New Exception Log Group.

MoonGuard uses two channels to send notifications by default: email and slack.
This can be modified by your own preference in the configuration file:

```php
[
  'notifications' => [
    'channels' => ['mail', 'slack'],
    'slack' => [
      'webhook_url' => env('SLACK_WEBHOOK_URL'),
    ],
  ],
];
```

# Queue setup

To send notifications, you can set up a queue driver (we recommend Redis) or use
the default value `sync`

In your `.env` file you must add the following variables here an example:

```php
QUEUE_CONNECTION=redis
//...
REDIS_HOST=127.0.0.1
REDIS_CLIENT=predis
REDIS_PASSWORD=null
REDIS_PORT=6379
```

:::caution Heads Up
Notice: You can use **phpredis** or **predis** as a client in **REDIS_CLIENT.**
:::
