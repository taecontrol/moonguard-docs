---
id: uptime-check-events
slug: /uptime-check-events
sidebar_position: 4
---

# Events

## UptimeCheckFailedEvent

This event is fired when the Uptime Check for a site fails. If your site is down - unreachable this will be dispatched.

## UptimeCheckRecoveredEvent

This event is fired when the Uptime Check for a site is recovered. If your site was previously in downtime and it's available again this will be dispatched.

## RequestTookLongerThanMaxDurationEvent

This event is fired when a request took longer than a maximum duration.
