---
id: upgrade
slug: /upgrade
sidebar_position: 14
---

# Upgrade Guide

We are pleased to present version 1.2.0 of the MoonGuard Filament Plugin!

## What's new

In this release, we have added a functionality to monitor the performance and
health of your applications.

This functionality allows for tracking CPU load, RAM usage,
and hard disk storage space.

It also includes break changes, mostly related to class names, new configuration
file and updated migrations. This guide explains how to upgrade your project to
v1.2.0

## Renamed Classes



## Upgrade Migrations



## Upgrade config

Delete the all `config/moonguard.php` file and republish it using:

```bash
php artisan vendor:publish --tag="moonguard-config"
```





