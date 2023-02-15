---
id: extending-listeners
slug: /extending-listeners
sidebar_position: 2
---

# Extending Listeners

Listeners may be added or replaced in Moonguard configuration: `config/moonguard.php`, this way you can add the behavior you need for these events.

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