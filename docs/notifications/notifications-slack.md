---
id: notifications-slack
slug: /notification-slack
sidebar_position: 2
---

# Via Slack

## Notifications via Slack

In order to send notifications via Slack, you must install the Slack notification channel via Composer:

```bash
composer require laravel/slack-notification-channel
```

Then we add `slack` on channels in `moonguard.php` configuration file:

```php  title="./config/moonguard.php"
[
  //...
  'notifications' => [
      'channels' => ['mail', 'slack'],
      'slack' => [
          'webhook_url' => env('SLACK_WEBHOOK_URL'),
      ],
  ],
]
```

You'll need a Webhook URL from Slack, you can obtain this webhook after creating a [Slack App](https://api.slack.com/apps?new_app=1) and configure an "Incoming Webhook", then add the Webhook URL on the `SLACK_WEBHOOK_URL` in your project `.env`:

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/TTW2G=asdW3/B042W9dsd9L/D1D329QLMNsdi12
```

:::tip Note
Your user model must implement the `routeNotificationForSlack():string` function.
:::