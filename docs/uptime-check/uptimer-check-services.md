---
id: uptime-check-service
slug: /uptime-check-service
sidebar_position: 5
---

# Services

## UptimeCheckService

This class have the method `check` that allow:

- Check if there is an uptime check in the database, if not, create one. 
- If a response from an instance lluminate\Http\Client\Response is received, it 
is processed, otherwise it is taken as an exception and processed as an exception.

Here an example:

```php

$uptimeService = new UptimeCheckService();

$uptimeService->check();

```