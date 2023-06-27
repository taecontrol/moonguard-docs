---
id: extending-listeners
slug: /extending-listeners
sidebar_position: 1
---

# Extending Listeners

Listeners can be added or changed in the Moonguard configuration file `config/moonguard.php`, allowing you to customize the behavior for these events.

```php
[
//...
'events' =>
  	'listen' => [
      \Taecontrol\MoonGuard\Events\SslCertificateExpiresSoonEvent::class => [
          \App\Listeners\MySslCertificateListener::class,
      ],
    ]
]
```