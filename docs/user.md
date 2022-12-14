---
id: users
slug: /users
sidebar_position: 7
---

# Users
Larastats comes with its own user model (it have a default structure with some modifications) however, you will most likely want to use your project's user model. If that's the case, the next section will help you make the change on Larastats.

## Custom User Model

The following steps must be completed to use a custom User model:

1. Your **User** class must extends from `Illuminate\Database\Eloquent\Model` and implements the `Taecontrol\Larastats\Contracts\LarastatsUser` interface.
2. Your **User** class must declare `use Notifiable`.
3. Implement all the properties and methods required, you can guide yourself with the original `User.php` model from Larastats.
3. Replace the new User model class in the configuration file.