---
id: notifications-slack
slug: /notification-slack
sidebar_position: 2
---

# Slack Setup

MoonGuard uses [laravel/slack-notification-channel](https://github.com/laravel/slack-notification-channel) 
as a dependency to build Slack notifications, in case you want to send MoonGuard
notifications to Slack you need a Slack Weebhook URL.

To obtain the webhook, you can create a [Slack App on the Slack API site.](https://api.slack.com/apps?new_app=1)
This is a simple process that involves creating an app for your workspace:

1. Create an App from scratch.
In the “Create New App” buttom press create app “From scratch”

![Create an App from scratch](./img/slack-app-1.png#center)

2. Activate an incoming Webhook.

![Add an incoming Webhook](./img/slack-app-2.png#center)

3. Add a new incoming Webhook.

![Add an incoming Webhook](./img/slack-app-3.png#center)

4. Decide which channel to post notifications.

![!Decide which channel to post notifications](./img/slack-app-4.png#center)

Once you have obtained the webhook URL, you must update the .env file of your
Laravel project with the SLACK_WEBHOOK_URL variable.

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/TTW2G=asdW3/B042W9dsd9L/D2D329QLMNsdi12
```

Finally activate the Slack channel in the MoonGuard config file.

```php
<?php
[
  'notifications' => [
    /*
     * The notification channels that are used by default.
     */
    'channels' => ['mail'], <- //add slack (optional)

    'slack' => [
      /*
       * The Slack webhook url setup.
       */
      'webhook_url' => env('SLACK_WEBHOOK_URL'),
    ],
  ],
];
```

:::info Note
If you're using a custom user model, it must implement the
`routeNotificationForSlack():string` method.
:::
