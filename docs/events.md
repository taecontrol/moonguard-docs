---
id: events
slug: /events
sidebar_position: 4
---

# Events

Larastats has a set of events that are dispatched according to the service or functionality being executed:

### \Taecontrol\Larastats\Events\UptimeCheckFailedEvent::class

This event is fired when the Uptime Check for a site fails. If your site is down - unreachable this will be dispatched.

### \Taecontrol\Larastats\Events\UptimeCheckRecoveredEvent::class

This event is fired when the Uptime Check for a site is recovered. If your site was previously in downtime and it's available again this will be dispatched.

### \Taecontrol\Larastats\Events\RequestTookLongerThanMaxDurationEvent::class

This event is fired when a request took longer than a maximum duration.

### \Taecontrol\Larastats\Events\SslCertificateExpiresSoonEvent::class

This event is fired when a SSL Certificate expiration date is soon.

### \Taecontrol\Larastats\Events\SslCertificateCheckFailedEvent::class

This event is fired when a SSL Certificate check fails. This may be triggered if a SSL Certificate is invalid.

### \Taecontrol\Larastats\Events\ExceptionLogGroupCreatedEvent::class

This event is fired when a new Exception log group is created.

### \Taecontrol\Larastats\Events\ExceptionLogGroupUpdatedEvent::class

This event is fired when an existing Exception Log Group is updated. Useful when we receive a batch of exceptions that are repeated

<br />

## Extending Listeners

Listeners may be added or replaced in Larastats configuration: `config/larastats.php`, this way you can add the behavior you need for these events.

```php
[
//...
'events' =>
  	'listen' => [
      \Taecontrol\Larastats\Events\SslCertificateExpiresSoonEvent::class => [
          \App\Listeners\MySslCertificateListener::class,
      ],
    ]
]
```
