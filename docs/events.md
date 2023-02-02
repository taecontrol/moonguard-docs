---
id: events
slug: /events
sidebar_position: 5
---

# Events

Moonguard has a set of events that are dispatched according to the service or functionality being executed:

### UptimeCheckFailedEvent

This event is fired when the Uptime Check for a site fails. If your site is down - unreachable this will be dispatched.

### UptimeCheckRecoveredEvent

This event is fired when the Uptime Check for a site is recovered. If your site was previously in downtime and it's available again this will be dispatched.

### RequestTookLongerThanMaxDurationEvent

This event is fired when a request took longer than a maximum duration.

### SslCertificateExpiresSoonEvent

This event is fired when a SSL Certificate expiration date is soon.

### SslCertificateCheckFailedEvent

This event is fired when a SSL Certificate check fails. This may be triggered if a SSL Certificate is invalid.

### ExceptionLogGroupCreatedEvent

This event is fired when a new Exception log group is created.

### ExceptionLogGroupUpdatedEvent

This event is fired when an existing Exception Log Group is updated. Useful when we receive a batch of exceptions that are repeated

:::tip Namespace
All the mentioned events use the namespace: `Taecontrol\Moonguard\Events\<Event::class>`
:::

## Extending Listeners

Listeners may be added or replaced in Moonguard configuration: `config/moonguard.php`, this way you can add the behavior you need for these events.

```php
[
//...
'events' =>
  	'listen' => [
      \Taecontrol\Moonguard\Events\SslCertificateExpiresSoonEvent::class => [
          \App\Listeners\MySslCertificateListener::class,
      ],
    ]
]
```
