---
id: notifications-mail
slug: /notifications-mail
sidebar_position: 1
---
# Email configuration

To set up a testing mail delivery server, we recommend using either
[Mailtrap.io](http://mailtrap.io/) or [Mailhog](https://github.com/mailhog/MailHog).
Both of these options are easy to configure and use.

Then add the following variables in your `.env` file:

```php
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=xxxxxxxxxxx
MAIL_PASSWORD=xxxxxxxxxxx
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="demo@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```
