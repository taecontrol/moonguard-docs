---
id: exceptions-events
slug: /exceptions-events
sidebar_position: 4
---

# Events

## ExceptionLogGroupCreatedEvent

This event is fired when a new Exception log group is created.

## ExceptionLogGroupUpdatedEvent

This event is fired when an existing Exception Log Group is updated. Useful when we receive a batch of exceptions that are repeated

:::tip Namespace
All the mentioned events use the namespace: `Taecontrol\MoonGuard\Events\<Event::class>`
:::
