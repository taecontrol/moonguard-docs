---
id: notifications-mail
slug: /notifications-mail
sidebar_position: 1
---
# Email configuration


MoonGuard uses the Mail configuration that the user's app has in their project,
and it is not possible to send notifications via email without it.

Once you have config your email, add the following variables of the email in the
project `.env` file:

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
