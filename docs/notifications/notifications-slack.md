---
id: notifications-slack
slug: /notification-slack
sidebar_position: 2
---

# Via Slack

## Notifications via Slack

MoonGuard uses `laravel/slack-notification-channel` as a dependency to build Slack notifications, in case you want to send MoonGuard notifications to Slack you need a Slack Weebhook URL.

You can get this webhook through creating a [Slack App on Slack API site.](https://api.slack.com/apps?new_app=1) It's a easy process where you have to create an app for your workspace.

We took some screenshots for guidence:

1. Create an App from scratch.

![Create an App from scratch](./img/slack-app-1.png#center)

2. Activate an incoming Webhook.

![Add an incoming Webhook](./img/slack-app-2.png#center)

3. Add a new incoming Webhook.

![Add an incoming Webhook](./img/slack-app-3.png#center)

4. Decide which channel to post notifications.

![!Decide which channel to post notifications](./img/slack-app-4.png#center)

After obtaining the Webhook URL, you have to update the `.env` file of your Laravel project with the `SLACK_WEBHOOK_URL` variable:

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/TTW2G=asdW3/B042W9dsd9L/D2D329QLMNsdi12
```

:::info Note
If you're using a custom user model, it must implement the `routeNotificationForSlack():string` method.
:::