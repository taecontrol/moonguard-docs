---
id: contributions
slug: /contributions
sidebar_position: 13
---

# Contributions Guide

At this time we are currently accepting the current forms of contributions:

* Bug reports.
* Pull requests for bug fixes.
* Feature suggestions.

## Bug Reports

If you encounter a bug, please make sure to include a descriptive title and a
clear description of the issue in your report. It is also helpful to provide
any relevant information and code samples that can help the maintainers
replicate the bug and develop a fix as easily as possible.

## Development

### Installation

To install a development environment, fork the MoonGuard project and clone it in
your computer. Then create a laravel project and add in the `composer.json` the
following:

```php
<?php
{

  //Another keys....

  "repositories": [
    {
        "type": "path",
        "url": "../<MoonGuard_path>/moonguard"
    }
  ]
}
```

finally install the local package:

```bash
composer require taecontrol/moonguard
```

### Pull requests

Before create a pull requests, please make sure you have the following guidelines:

* In case you are fixing a bug from the GitHub issue tracker, the name of the branch
have to be `BUG-<issue number>`.

* Pull requests should include the name of the branch in the title if they are
bug fixes from the GitHub issue tracker, as well as the title of the issue.
It is also recommended to include the issue number in the description, like
this: `Closes #<issue number>`. This way, contributors can quickly identify the issue.

* Be sure to include tests to verify that the issue has been resolved.

* It is important to run phpunit and php-cs-fixer before making any changes, in
order to ensure that they do not break the project.

## Support Questions

GitHub issue trackers are not intended to provide help or support for now.
