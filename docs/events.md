---
id: events
slug: /events
sidebar_position: 2
---

# Events

MoonGuard uses and registers multiple events to execute actions through
listeners. We have created a series of events related to Uptime checks, SSL
Certificate checks, and Exceptions:

## UptimeCheckFailedEvent

When a site's Uptime Check fails this event is triggered. This commonly happens
when the site is unreachable, MoonGuard utilizes a listener
(**UptimeCheckFailedListener)** that listen for this event ****to send out a
notification (**UptimeCheckFailedNotification)** to all users, notifying them
of the failure.

## UptimeCheckRecoveredEvent

This event is triggered when the Uptime Check for a site recovers. If a site
was down before and is now available again, this event will be sent out.
MoonGuard uses a **UptimeCheckRecoveredListener** to send a
**UptimeCheckRecoveredNotification** to all users.

## RequestTookLongerThanMaxDurationEvent

This event is triggered when a request takes longer than the maximum allotted
time. MoonGuard utilizes a listener (**RequestTookLongerThanMaxDurationListener)**
to listen for this event and sends out a notification
(**RequestTookLongerThanMaxDurationNotification)** to all users, notifying them
of the issue.

## SslCertificateExpiresSoonEvent

This event is triggered when an SSL certificate is close to expiring. MoonGuard
utilizes a listener (**SslCertificateExpiresSoonListener)** to listen for this
event and sends out a notification (**SslCertificateExpiresSoonNotification)**
to all users, notifying them of the issue.

## SslCertificateCheckFailedEvent

This event is triggered when an SSL certificate check fails. This may happen if
the SSL certificate check is not valid. MoonGuard utilizes a listener
(**SslCertificateCheckFailedListener)** to listen for this event and sends out
a notification (**SslCertificateCheckFailedNotification)** to all users,
notifying them of the issue.

## ExceptionLogGroupCreatedEvent

This event is triggered when a new exception log group is created. MoonGuard
utilizes a listener (**ExceptionLogGroupCreatedListener)** to listen for this
event and sends out a notification (**ExceptionLogGroupNotification)** to all
users, notifying them of the creation.

### ExceptionLogGroupUpdatedEvent

This event is triggered when an existing exception log group is modified. This
is useful when multiple repeated exceptions are received in a single batch.
MoonGuard utilizes a listener (**ExceptionLogGroupUpdatedListener)** to listen
for this event and sends out a notification (**ExceptionLogGroupNotification)**
to all users, notifying them of the update.

If you need to modify the behavior of the Listener, they can be replaced by your
own listeners from the MoonGuard configuration file:

```bash
[
    //...
    'events' => [
        'listen' => [
            \Taecontrol\MoonGuard\Events\UptimeCheckRecoveredEvent::class => [
                \Taecontrol\MoonGuard\Listeners\MyListener::class,
            ],
            //...
        ],
    ]
];
```
