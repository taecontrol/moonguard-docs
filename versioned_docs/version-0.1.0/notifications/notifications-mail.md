---
id: notifications-mail
slug: /notifications-mail
sidebar_position: 1
---

# Via Mail

## Notifications via mail

Notifications via mail are active by default, you can find this in the `moonguard.php` config file:

```php title="./config/moonguard.php"
[
  //...
  'notifications' => [
      'channels' => ['mail'],
      //...
  ],
]
```

You can remove this channel just by removing the `'mail'` string from the array.