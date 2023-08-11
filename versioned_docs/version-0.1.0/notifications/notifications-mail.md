---
id: notifications-mail
slug: /notifications-mail
sidebar_position: 1
---
# Email configuration


MoonGuard uses the mail configuration from your Laravel app to send any email
notification.

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

After properly setting up the parameters of your mail provider, MoonGuard is
able to send email notifications.
