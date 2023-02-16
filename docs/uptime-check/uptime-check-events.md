---
id: uptime-check-events
slug: /uptime-check-events
sidebar_position: 4
---

# Events

## UptimeCheckFailedEvent

<!-- This event is fired when the Uptime Check for a site fails. If your site is down - unreachable this will be dispatched. -->
This event is triggered when the Uptime Check for a site fails. If your site is no longer reachable, this will be sent out.
## UptimeCheckRecoveredEvent

<!-- This event is fired when the Uptime Check for a site is recovered. If your site was previously in downtime and it's available again this will be dispatched. -->
This event is triggered when the Uptime Check for a site recovers. If your site was down before and is now available again, this will be sent out.
## RequestTookLongerThanMaxDurationEvent

<!-- This event is fired when a request took longer than a maximum duration. -->
This event is triggered when a request takes longer than the maximum allotted time.

