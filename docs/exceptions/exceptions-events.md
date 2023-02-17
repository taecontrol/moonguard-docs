---
id: exceptions-events
slug: /exceptions-events
sidebar_position: 4
---

# Events

## ExceptionLogGroupCreatedEvent

This event is triggered when a new Exception log group is created.

## ExceptionLogGroupUpdatedEvent

This event is triggered when an existing Exception Log Group is modified. This is useful when multiple repeated exceptions are received in a single batch.

:::tip Namespace
All the mentioned events use the namespace: `Taecontrol\MoonGuard\Events\<Event::class>`
:::
